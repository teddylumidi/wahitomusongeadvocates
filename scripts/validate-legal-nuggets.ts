import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { archiveInsights } from "../src/data/archive-insights";
import { insightArticles } from "../src/data/insights";
import type { InsightArticle } from "../src/data/insights";

type ExportPost = {
  slug: string;
  status: string;
  title: string;
  author: string;
  content: string;
  categories: string[];
  tags: string[];
};

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceDirectory = resolve(scriptDirectory, "../../..");
const defaultExportPath = resolve(
  workspaceDirectory,
  "attached_assets/data_1788339010602.zip",
);
const exportArgument = process.argv
  .slice(2)
  .find((argument) => argument !== "--");
const exportPath = resolve(exportArgument ?? defaultExportPath);

function decodeXml(value: string): string {
  const cdataMatch = value.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  const withoutCdata = cdataMatch ? cdataMatch[1] : value;

  return withoutCdata
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#([0-9]+);/g, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function extractTag(item: string, tagName: string): string {
  const escapedTagName = tagName.replace(":", "\\:");
  const match = item.match(
    new RegExp(
      `<${escapedTagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTagName}>`,
    ),
  );
  return match ? decodeXml(match[1]).trim() : "";
}

function extractTaxonomies(item: string, domain: "category" | "post_tag") {
  const values: string[] = [];
  const categoryPattern = /<category\b([^>]*)>([\s\S]*?)<\/category>/g;

  for (const match of item.matchAll(categoryPattern)) {
    const domainMatch = match[1].match(/\bdomain=["']([^"']+)["']/);
    if (domainMatch?.[1] === domain) {
      values.push(decodeXml(match[2]).trim());
    }
  }

  return values.filter(Boolean);
}

export function readExportXml(path: string): string {
  if (!existsSync(path)) {
    throw new Error(`WordPress export not found: ${path}`);
  }

  try {
    return execFileSync("unzip", ["-p", path, "data.xml"], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (error) {
    throw new Error(
      `Could not read data.xml from WordPress export ${path}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

export function readExportPosts(xml: string): ExportPost[] {
  return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/g)]
    .map((match) => match[1])
    .filter((item) => extractTag(item, "wp:post_type") === "post")
    .map((item) => ({
      slug: extractTag(item, "wp:post_name"),
      status: extractTag(item, "wp:status"),
      title: extractTag(item, "title"),
      author: extractTag(item, "dc:creator"),
      content: extractTag(item, "content:encoded"),
      categories: extractTaxonomies(item, "category"),
      tags: extractTaxonomies(item, "post_tag"),
    }));
}

function normalizeTitle(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

export function articleIdentifiers(article: InsightArticle): string[] {
  return [article.slug, ...(article.aliases ?? [])].filter(Boolean);
}

function validateArticleMetadata(
  article: InsightArticle,
  articleIndex: number,
  errors: string[],
) {
  const label = `local article ${articleIndex + 1} (${article.slug || "no slug"})`;

  if (!article.slug.trim()) errors.push(`${label} has no canonical slug.`);
  if (!article.title.trim()) errors.push(`${label} has no title.`);
  if (!article.date.trim()) errors.push(`${label} has no date.`);
  if (!article.image.trim()) errors.push(`${label} has no image.`);
  if (!article.excerpt.trim()) errors.push(`${label} has no excerpt.`);
  if (!article.author.trim()) errors.push(`${label} has no author metadata.`);
  if (article.categories.length === 0) {
    errors.push(`${label} has no category metadata.`);
  }
  if (article.tags.length === 0) {
    errors.push(`${label} has no tag metadata.`);
  }
  if (article.blocks.length === 0) {
    errors.push(`${label} has no body blocks.`);
  }

  article.blocks.forEach((block, blockIndex) => {
    if (!block.text.trim()) {
      errors.push(
        `${label} has an empty body block at position ${blockIndex + 1}.`,
      );
    }
  });
}

export function validate() {
  const posts = readExportPosts(readExportXml(exportPath));
  const publishedPosts = posts.filter((post) => post.status === "publish");
  const draftPosts = posts.filter((post) => post.status === "draft");
  const localArticles = [...insightArticles, ...archiveInsights];
  const errors: string[] = [];

  if (publishedPosts.length === 0) {
    errors.push("The WordPress export contains no published posts.");
  }

  if (publishedPosts.some((post) => !post.slug)) {
    errors.push("Every published WordPress post must have a source slug.");
  }

  const publishedSlugs = new Set(publishedPosts.map((post) => post.slug));
  const routeOwners = new Map<string, string>();
  for (const article of localArticles) {
    for (const identifier of articleIdentifiers(article)) {
      const previousOwner = routeOwners.get(identifier);
      if (previousOwner) {
        errors.push(
          `Public article route "${identifier}" is claimed by both ${previousOwner} and ${article.slug}.`,
        );
      } else {
        routeOwners.set(identifier, article.slug);
      }
    }
  }

  const missingPublishedSlugs = publishedPosts
    .filter((post) => !routeOwners.has(post.slug))
    .map((post) => post.slug);
  if (missingPublishedSlugs.length > 0) {
    errors.push(
      `Published WordPress posts missing from local records or aliases: ${missingPublishedSlugs.join(", ")}`,
    );
  }

  const localRecordsWithoutSource = localArticles
    .filter(
      (article) =>
        !articleIdentifiers(article).some((identifier) =>
          publishedSlugs.has(identifier),
        ),
    )
    .map((article) => article.slug);
  if (localRecordsWithoutSource.length > 0) {
    errors.push(
      `Local article records do not map to a published WordPress slug: ${localRecordsWithoutSource.join(", ")}`,
    );
  }

  const draftSlugs = draftPosts.map((post) => post.slug).filter(Boolean);
  const exposedDraftSlugs = draftSlugs.filter((slug) => routeOwners.has(slug));
  if (exposedDraftSlugs.length > 0) {
    errors.push(
      `Draft WordPress posts are exposed through public article routes: ${exposedDraftSlugs.join(", ")}`,
    );
  }

  const blankDraftRoute = localArticles.some((article) =>
    articleIdentifiers(article).some((identifier) => !identifier.trim()),
  );
  if (blankDraftRoute) {
    errors.push(
      "A public article route has a blank slug, which can expose a draft.",
    );
  }

  const draftTitles = new Set(
    draftPosts.map((post) => normalizeTitle(post.title)).filter(Boolean),
  );
  const exposedDraftTitles = localArticles
    .filter((article) => draftTitles.has(normalizeTitle(article.title)))
    .map((article) => article.title);
  if (exposedDraftTitles.length > 0) {
    errors.push(
      `Draft WordPress posts are present in local public records by title: ${exposedDraftTitles.join(" | ")}`,
    );
  }

  localArticles.forEach((article, articleIndex) =>
    validateArticleMetadata(article, articleIndex, errors),
  );

  publishedPosts.forEach((post) => {
    const label = `published WordPress post "${post.slug}"`;
    if (!post.content.trim()) errors.push(`${label} has no body content.`);
    if (!post.author.trim()) errors.push(`${label} has no author metadata.`);
    if (post.categories.length === 0) {
      errors.push(`${label} has no category metadata.`);
    }
    if (post.tags.length === 0) {
      errors.push(`${label} has no tag metadata.`);
    }
  });

  if (errors.length > 0) {
    throw new Error(
      `Legal Nuggets validation failed with ${errors.length} error${
        errors.length === 1 ? "" : "s"
      }:\n- ${errors.join("\n- ")}`,
    );
  }

  console.log(
    `Legal Nuggets validation passed: ${publishedPosts.length} published posts, ` +
      `${localArticles.length} local records, ${draftPosts.length} drafts kept private.`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) ===
    resolve(scriptDirectory, "validate-legal-nuggets.ts")
) {
  validate();
}
