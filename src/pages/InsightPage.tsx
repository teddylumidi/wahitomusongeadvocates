import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { insightArticles, type InsightArticle, type InsightBlock } from "@/data/insights";
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
  const [dynamicArticle, setDynamicArticle] = useState<InsightArticle | null>(null);
  const article = featuredArticle ?? importedArticle ?? dynamicArticle;
  const homeUrl = `${import.meta.env.BASE_URL}#home`;
  const baseUrl = import.meta.env.BASE_URL;
  const insightsUrl = `${baseUrl}insights`;
  const isImportedArticle = !featuredArticle && Boolean(importedArticle);

  useEffect(() => {
    if (!featuredArticle && !importedArticle) {
      fetch(`/api/public/posts/${encodeURIComponent(slug)}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((post) => {
          if (!post) return;
          setDynamicArticle({
            slug: post.slug,
            title: post.title,
            date: new Date(post.publicationDate ?? post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            image: post.featuredImage ?? 'nairobi-skyline.png',
            excerpt: post.excerpt,
            author: post.author,
            categories: [post.category],
            tags: post.tags,
            blocks: [],
            contentHtml: post.content,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            canonicalUrl: post.canonicalUrl,
            featuredImageAlt: post.featuredImageAlt,
            relatedArticles: (post.relatedPosts ?? []).map((related: { title: string; slug: string }) => ({
              title: related.title,
              slug: related.slug,
            })),
          });
        })
        .catch(() => undefined);
    }
    if (!article) return;
    const seoTitle = article.seoTitle || `${article.title} | Wahito Musonge & Company Advocates LLP`;
    const seoDescription = article.seoDescription || article.excerpt;
    const imageUrl = article.image.startsWith('/') || article.image.startsWith('http')
      ? new URL(article.image, window.location.origin).toString()
      : new URL(`${baseUrl}images/${article.image}`, window.location.origin).toString();
    document.title = seoTitle;
    setMetaTag('description', seoDescription);
    setMetaTag('og:title', seoTitle, 'property');
    setMetaTag('og:description', seoDescription, 'property');
    setMetaTag('og:type', 'article', 'property');
    setMetaTag('og:image', imageUrl, 'property');
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', seoTitle);
    setMetaTag('twitter:description', seoDescription);
    setCanonical(article.canonicalUrl || window.location.href);
    const existingSchema = document.getElementById('article-schema');
    existingSchema?.remove();
    const schema = document.createElement('script');
    schema.id = 'article-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: seoDescription,
      author: { '@type': 'Person', name: article.author },
      datePublished: article.date,
      image: imageUrl,
      mainEntityOfPage: window.location.href,
    });
    document.head.appendChild(schema);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article, featuredArticle, importedArticle, slug]);

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
            src={article.image.startsWith('/') || article.image.startsWith('http') ? article.image : `${import.meta.env.BASE_URL}images/${article.image}`}
            alt={article.featuredImageAlt || article.title}
            className="w-full aspect-[2.2/1] object-cover grayscale"
          />
        </div>

        <article className="container mx-auto max-w-3xl px-4 md:px-8 py-16 md:py-24">
          {article.contentHtml ? (
            <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          ) : renderInsightBlocks(article.blocks)}

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
              href={`${baseUrl}contact`}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-[11px] font-medium tracking-[0.1em] hover:bg-black/80 transition-colors uppercase"
            >
              DISCUSS YOUR MATTER
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-[11px] font-medium uppercase tracking-[0.1em]">
            <a
              href={`${baseUrl}practice-areas`}
              className="text-primary underline underline-offset-4 transition-colors hover:text-secondary"
            >
              Explore practice areas
            </a>
            <a
              href={`${baseUrl}legalnuggets`}
              className="text-primary underline underline-offset-4 transition-colors hover:text-secondary"
            >
              Visit Legal Nuggets
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}
