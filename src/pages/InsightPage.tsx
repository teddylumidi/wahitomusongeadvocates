import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { insightArticles, type InsightBlock } from "@/data/insights";
import { archiveInsights } from "@/data/archive-insights";

type InsightPageProps = {
  slug: string;
};

function renderInsightBlocks(blocks: InsightBlock[]) {
  const rendered = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    if (block.type === "li") {
      const listType = block.list === "ol" ? "ol" : "ul";
      const listItems = [];

      while (
        index < blocks.length &&
        blocks[index].type === "li" &&
        (blocks[index].list === listType || !blocks[index].list)
      ) {
        const listBlock = blocks[index];
        listItems.push(
          <li
            key={`${index}-${listItems.length}`}
            className="mb-3 pl-2 leading-relaxed text-primary/75 marker:text-secondary"
          >
            {listBlock.text}
          </li>,
        );
        index += 1;
      }

      const List = listType === "ol" ? "ol" : "ul";
      rendered.push(
        <List
          key={`list-${index}`}
          className={`mb-6 ml-6 ${listType === "ol" ? "list-decimal" : "list-disc"}`}
        >
          {listItems}
        </List>,
      );
      continue;
    }

    if (block.type === "h2") {
      rendered.push(
        <h2
          key={index}
          className="mb-5 mt-12 text-2xl font-serif text-primary md:text-3xl"
        >
          {block.text}
        </h2>,
      );
    } else if (block.type === "h3") {
      rendered.push(
        <h3 key={index} className="mb-4 mt-8 text-xl font-serif text-primary">
          {block.text}
        </h3>,
      );
    } else if (block.type === "quote") {
      rendered.push(
        <blockquote
          key={index}
          className="my-8 border-l-2 border-secondary pl-6 leading-relaxed italic text-primary/70"
        >
          {block.text}
        </blockquote>,
      );
    } else {
      rendered.push(
        <p key={index} className="mb-6 leading-[1.9] text-primary/75">
          {block.text}
        </p>,
      );
    }

    index += 1;
  }

  return rendered;
}

export function InsightPage({ slug }: InsightPageProps) {
  const featuredArticle = insightArticles.find(
    (item) => item.slug === slug || item.aliases?.includes(slug),
  );
  const importedArticle = archiveInsights.find(
    (item) => item.slug === slug || item.aliases?.includes(slug),
  );
  const article = featuredArticle ?? importedArticle;
  const homeUrl = `${import.meta.env.BASE_URL}#home`;
  const insightsUrl = `${import.meta.env.BASE_URL}#insights`;
  const isImportedArticle = !featuredArticle && Boolean(importedArticle);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | Wahito Musonge & Company Advocates LLP`;
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    description?.setAttribute("content", article.excerpt);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navbar />
        <main className="pt-40 pb-32">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-secondary mb-5">
              Page not found
            </p>
            <h1 className="text-4xl font-serif text-primary mb-8">
              That insight is unavailable.
            </h1>
            <a
              href={insightsUrl}
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 text-xs font-semibold tracking-widest hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={15} />
              BACK TO INSIGHTS
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="pt-28">
        <header className="bg-gray-50 py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-4 md:px-8">
            <a
              href={insightsUrl}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-secondary hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft size={15} />
              ALL INSIGHTS
            </a>
            <div className="grid md:grid-cols-[1fr_0.8fr] gap-12 items-end">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                  {isImportedArticle ? "Legal Nugget" : "Featured insight"}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-serif text-primary">
                  {article.title}
                </h1>
              </div>
              <div className="md:pb-2">
                <p className="text-sm tracking-wide text-primary/60">
                  {article.date}
                </p>
                <p className="mt-2 text-sm text-primary/60">
                  By {article.author}
                </p>
                <div className="w-16 h-0.5 bg-secondary mt-6"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-5xl px-4 md:px-8">
          <img
            src={`${import.meta.env.BASE_URL}images/${article.image}`}
            alt=""
            className="w-full aspect-[2.2/1] object-cover grayscale"
          />
        </div>

        <article className="container mx-auto max-w-3xl px-4 md:px-8 py-16 md:py-24">
          {renderInsightBlocks(article.blocks)}

          {(article.categories.length > 0 || article.tags.length > 0) && (
            <div className="mt-12 border-t border-gray-200 pt-8">
              {article.categories.length > 0 && (
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    Categories
                  </span>
                  {article.categories.map((category) => (
                    <span
                      key={category}
                      className="border border-gray-200 px-3 py-1 text-xs text-primary/65"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    Tags
                  </span>
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs text-primary/55">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <aside className="mt-14 border-t border-gray-200 pt-10">
              <h2 className="mb-6 font-serif text-2xl text-primary">
                Related insights
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {article.relatedArticles.map((relatedArticle) => (
                  <a
                    key={relatedArticle.slug}
                    href={`${import.meta.env.BASE_URL}insights/${relatedArticle.slug}`}
                    className="border border-gray-200 p-4 text-sm leading-relaxed text-primary transition-colors hover:border-secondary hover:text-secondary"
                  >
                    {relatedArticle.title}
                  </a>
                ))}
              </div>
            </aside>
          )}

          <div className="mt-16 pt-10 border-t border-gray-200 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
            <a
              href={homeUrl}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary hover:text-secondary transition-colors"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>
            <a
              href={`${import.meta.env.BASE_URL}#contact`}
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 text-xs font-semibold tracking-widest hover:bg-secondary transition-colors"
            >
              DISCUSS YOUR MATTER
              <ArrowUpRight size={15} />
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
