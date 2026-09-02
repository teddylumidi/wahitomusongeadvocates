import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { archiveInsights } from "../src/data/archive-insights";
import { insightArticles } from "../src/data/insights";
import {
  articleIdentifiers,
  readExportPosts,
  readExportXml,
} from "./validate-legal-nuggets";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const appDirectory = resolve(scriptDirectory, "..");
const workspaceDirectory = resolve(appDirectory, "../..");
const defaultExportPath = resolve(
  workspaceDirectory,
  "attached_assets/data_1788339010602.zip",
);
const exportArgument = process.argv
  .slice(2)
  .find((argument) => argument !== "--");
const exportPath = resolve(exportArgument ?? defaultExportPath);
const builtIndexPath = resolve(appDirectory, "dist/public/index.html");

type RouteExpectation = {
  sourceSlug: string;
  canonicalSlug: string;
  title: string;
};

type DraftExpectation = {
  slug: string;
  title: string;
};

function findBrowser(): string {
  const configuredBrowser = process.env.CHROME_BIN ?? process.env.CHROMIUM_BIN;
  const candidates = [
    configuredBrowser,
    "/home/runner/workspace/.local/conversation-workspace/files/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
    "chromium",
    "chromium-browser",
    "google-chrome",
    "google-chrome-stable",
  ].filter(Boolean) as string[];
  const failures: string[] = [];

  for (const candidate of candidates) {
    let executable = candidate;
    if (candidate.includes("/")) {
      if (!existsSync(candidate)) continue;
    } else {
      const result = spawnSync("sh", ["-c", `command -v ${candidate}`], {
        encoding: "utf8",
      });
      if (result.status !== 0 || !result.stdout.trim()) continue;
      executable = result.stdout.trim();
    }

    const versionResult = spawnSync(executable, ["--version"], {
      encoding: "utf8",
      timeout: 10_000,
    });
    if (versionResult.status === 0) {
      return executable;
    }
    failures.push(
      `${executable}: ${
        versionResult.error?.message ||
        versionResult.stderr.trim() ||
        `exit ${versionResult.status}`
      }`,
    );
  }

  throw new Error(
    "Could not start Chromium. Set CHROME_BIN or CHROMIUM_BIN to a runnable browser. " +
      failures.join(" | "),
  );
}

async function waitForDebugEndpoint(port: number): Promise<string> {
  const endpointUrl = `http://127.0.0.1:${port}/json`;
  const deadline = Date.now() + 15_000;
  let lastError = "browser did not expose a debugging endpoint";

  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpointUrl);
      if (response.ok) {
        const targets = (await response.json()) as Array<{
          type?: string;
          webSocketDebuggerUrl?: string;
        }>;
        const pageTarget = targets.find(
          (target) => target.type === "page" && target.webSocketDebuggerUrl,
        );
        if (pageTarget?.webSocketDebuggerUrl) {
          return pageTarget.webSocketDebuggerUrl;
        }
      } else {
        lastError = `browser returned HTTP ${response.status}`;
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 100));
  }

  throw new Error(`Timed out connecting to Chromium: ${lastError}`);
}

let cdpCommandId = 0;

async function sendCdpCommand(
  socket: WebSocket,
  method: string,
  params: Record<string, unknown> = {},
): Promise<Record<string, unknown>> {
  cdpCommandId += 1;
  const id = cdpCommandId;

  return new Promise((resolveCommand, rejectCommand) => {
    const handleMessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as {
        id?: number;
        error?: { message?: string };
        result?: Record<string, unknown>;
      };
      if (message.id !== id) return;
      socket.removeEventListener("message", handleMessage);
      if (message.error) {
        rejectCommand(
          new Error(message.error.message ?? `CDP error for ${method}`),
        );
      } else {
        resolveCommand(message.result ?? {});
      }
    };

    socket.addEventListener("message", handleMessage);
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function renderRoute(
  browser: string,
  url: string,
  userDataDirectory: string,
): Promise<string> {
  const debugPort = await getFreePort();
  const browserProcess = spawn(
    browser,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-sync",
      "--disable-extensions",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${debugPort}`,
      "--remote-allow-origins=*",
      `--user-data-dir=${userDataDirectory}`,
      "about:blank",
    ],
    {
      stdio: ["ignore", "ignore", "ignore"],
    },
  );
  let socket: WebSocket | undefined;

  try {
    const webSocketDebuggerUrl = await waitForDebugEndpoint(debugPort);
    socket = await new Promise<WebSocket>((resolveSocket, rejectSocket) => {
      const connection = new WebSocket(webSocketDebuggerUrl);
      connection.addEventListener("open", () => resolveSocket(connection));
      connection.addEventListener("error", () =>
        rejectSocket(new Error("Could not connect to Chromium DevTools.")),
      );
    });
    await sendCdpCommand(socket, "Page.enable");
    await sendCdpCommand(socket, "Runtime.enable");
    await sendCdpCommand(socket, "Page.navigate", { url });
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 1_500));

    const evaluation = await sendCdpCommand(socket, "Runtime.evaluate", {
      expression: "document.documentElement.outerHTML",
      returnByValue: true,
    });
    const result = evaluation.result as
      { type?: string; value?: unknown } | undefined;
    if (result?.type !== "string" || typeof result.value !== "string") {
      throw new Error(`Chromium returned no DOM for ${url}.`);
    }
    return result.value;
  } finally {
    socket?.close();
    const browserExit = new Promise<void>((resolveExit) => {
      if (browserProcess.exitCode !== null) {
        resolveExit();
      } else {
        browserProcess.once("close", () => resolveExit());
      }
    });
    browserProcess.kill("SIGKILL");
    await Promise.race([
      browserExit,
      new Promise<void>((resolveExit) => setTimeout(resolveExit, 2_000)),
    ]);
  }
}

function getFreePort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not determine a free port."));
        return;
      }
      server.close(() => resolvePort(address.port));
    });
  });
}

async function waitForPreview(url: string): Promise<void> {
  const deadline = Date.now() + 15_000;
  let lastError = "preview did not respond";

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = `preview returned HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 100));
  }

  throw new Error(`Timed out waiting for the built site: ${lastError}`);
}

function readRouteExpectations(): {
  published: RouteExpectation[];
  drafts: DraftExpectation[];
} {
  const posts = readExportPosts(readExportXml(exportPath));
  const localArticles = [...insightArticles, ...archiveInsights];
  const routeOwners = new Map(
    localArticles.flatMap((article) =>
      articleIdentifiers(article).map(
        (identifier) => [identifier, article] as const,
      ),
    ),
  );
  const published = posts
    .filter((post) => post.status === "publish")
    .map((post) => {
      const article = routeOwners.get(post.slug);
      if (!article) {
        throw new Error(
          `Published source slug "${post.slug}" has no local article route.`,
        );
      }
      return {
        sourceSlug: post.slug,
        canonicalSlug: article.slug,
        title: article.title,
      };
    });

  return {
    published,
    drafts: posts
      .filter((post) => post.status === "draft")
      .map((post) => ({ slug: post.slug, title: post.title })),
  };
}

function draftProbeSlug(draft: DraftExpectation, index: number): string {
  const titleSlug = draft.title
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return draft.slug || `draft-${titleSlug || index + 1}`;
}

async function checkRenderedRoute(
  browser: string,
  baseUrl: string,
  slug: string,
  expected: { title?: string; unavailable: boolean },
  userDataDirectory: string,
): Promise<void> {
  const url = `${baseUrl}/insights/${slug}`;
  const page = await renderRoute(browser, url, userDataDirectory);
  const unavailable = page.includes("That insight is unavailable.");
  if (unavailable !== expected.unavailable) {
    throw new Error(
      `${url} rendered ${unavailable ? "the not-found page" : "an article"}, ` +
        `but expected ${expected.unavailable ? "the not-found page" : "an article"}.`,
    );
  }
  if (expected.title && !page.includes(expected.title)) {
    throw new Error(
      `${url} did not render the expected article "${expected.title}".`,
    );
  }
}

async function smokeTestRoutes(): Promise<void> {
  if (!existsSync(builtIndexPath)) {
    throw new Error(
      `Built site not found at ${builtIndexPath}. Run "pnpm run build" first.`,
    );
  }

  const browser = findBrowser();
  const { published, drafts } = readRouteExpectations();
  if (published.length === 0) {
    throw new Error("No published Legal Nuggets were found to test.");
  }
  if (drafts.length === 0) {
    throw new Error("No draft Legal Nuggets were found to test.");
  }

  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const preview = spawn(
    "pnpm",
    [
      "exec",
      "vite",
      "preview",
      "--config",
      "vite.config.ts",
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      cwd: appDirectory,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  const userDataDirectory = mkdtempSync(join(tmpdir(), "legal-nugget-routes-"));

  try {
    await waitForPreview(`${baseUrl}/`);

    for (const route of published) {
      await checkRenderedRoute(
        browser,
        baseUrl,
        route.sourceSlug,
        {
          title: route.title,
          unavailable: false,
        },
        userDataDirectory,
      );
    }

    const aliases = published.filter(
      (route) => route.sourceSlug !== route.canonicalSlug,
    );
    if (aliases.length !== 3) {
      throw new Error(
        `Expected three source-slug aliases, found ${aliases.length}.`,
      );
    }
    for (const alias of aliases) {
      await checkRenderedRoute(
        browser,
        baseUrl,
        alias.sourceSlug,
        {
          title: alias.title,
          unavailable: false,
        },
        userDataDirectory,
      );
      await checkRenderedRoute(
        browser,
        baseUrl,
        alias.canonicalSlug,
        {
          title: alias.title,
          unavailable: false,
        },
        userDataDirectory,
      );
    }

    await checkRenderedRoute(
      browser,
      baseUrl,
      "does-not-exist",
      {
        unavailable: true,
      },
      userDataDirectory,
    );
    for (const [index, draft] of drafts.entries()) {
      await checkRenderedRoute(
        browser,
        baseUrl,
        draftProbeSlug(draft, index),
        { unavailable: true },
        userDataDirectory,
      );
    }

    console.log(
      `Legal Nugget route smoke test passed: ${published.length} published source slugs, ` +
        `${aliases.length} aliases, unknown slug, and ${drafts.length} drafts.`,
    );
  } finally {
    preview.kill("SIGTERM");
    rmSync(userDataDirectory, {
      recursive: true,
      force: true,
      maxRetries: 10,
      retryDelay: 100,
    });
  }
}

smokeTestRoutes().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
