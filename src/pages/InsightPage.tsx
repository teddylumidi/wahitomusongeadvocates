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
            className="mb-4 pl-2 leading-[1.8] text-[15px] text-primary marker:text-secondary"
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
          className={`mb-8 ml-6 ${listType === "ol" ? "list-decimal" : "list-disc"}`}
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
          className="mb-6 mt-16 text-[26px] md:text-3xl font-serif text-primary leading-[1.3]"
        >
          {block.text}
        </h2>,
      );
    } else if (block.type === "h3") {
      rendered.push(
        <h3 key={index} className="mb-4 mt-10 text-[22px] font-serif text-primary leading-[1.3]">
          {block.text}
        </h3>,
      );
    } else if (block.type === "quote") {
      rendered.push(
        <blockquote
          key={index}
          className="my-10 border-l-2 border-secondary pl-6 leading-relaxed italic text-[17px] font-serif text-secondary"
        >
          {block.text}
        </blockquote>,
      );
    } else {
      rendered.push(
        <p key={index} className="mb-8 leading-[1.8] text-[15px] text-primary">
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
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Navbar />
      <main className="pt-[90px]">
        <header className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
            <a
              href={insightsUrl}
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-secondary hover:text-primary transition-colors mb-8 uppercase"
            >
              <ArrowLeft size={15} />
              ALL INSIGHTS
            </a>

            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">
              {isImportedArticle ? "Legal Nugget" : "Featured insight"}
            </p>
            <h1 className="text-4xl md:text-5xl text-primary leading-[1.2] font-serif">
              {article.title}
            </h1>
            <div className="mx-auto mt-10 h-px w-24 bg-gray-300" />

            <div className="mt-10">
              <p className="text-[13px] tracking-wide text-primary">
                {article.date}
              </p>
              <p className="mt-2 text-[13px] text-primary">
                By {article.author}
              </p>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-4xl px-4 md:px-8 mt-16">
          <img
            src={`${import.meta.env.BASE_URL}images/${article.image}`}
            alt=""
            className="w-full aspect-[2.2/1] object-cover grayscale"
          />
        </div>

        <article className="container mx-auto max-w-3xl px-4 md:px-8 py-16 md:py-24">
          {renderInsightBlocks(article.blocks)}

          {(article.categories.length > 0 || article.tags.length > 0) && (
            <div className="mt-16 border-t border-gray-200 pt-10">
              {article.categories.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="mr-3 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">
                    Categories
                  </span>
                  {article.categories.map((category) => (
                    <span
                      key={category}
                      className="border border-gray-200 px-4 py-1.5 text-[11px] text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-3 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">
                    Tags
                  </span>
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[13px] text-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <aside className="mt-16 border-t border-gray-200 pt-12">
              <h2 className="mb-8 font-serif text-[22px] text-primary">
                Related insights
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {article.relatedArticles.map((relatedArticle) => (
                  <a
                    key={relatedArticle.slug}
                    href={`${import.meta.env.BASE_URL}insights/${relatedArticle.slug}`}
                    className="border border-gray-200 p-6 text-[14px] leading-[1.6] text-primary transition-colors hover:border-secondary hover:text-secondary"
                  >
                    {relatedArticle.title}
                  </a>
                ))}
              </div>
            </aside>
          )}

          <div className="mt-20 pt-12 border-t border-gray-200 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <a
              href={homeUrl}
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors uppercase"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>
            <a
              href={`${import.meta.env.BASE_URL}#contact`}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-[11px] font-medium tracking-[0.1em] hover:bg-black/80 transition-colors uppercase"
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
