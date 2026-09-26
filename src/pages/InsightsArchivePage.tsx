import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { insightArticles } from '@/data/insights';
import { archiveInsights } from '@/data/archive-insights';

const staticArticles = [...insightArticles, ...archiveInsights].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function InsightsArchivePage() {
  const baseUrl = import.meta.env.BASE_URL;
  const [articles, setArticles] = useState(staticArticles);

  useEffect(() => {
    document.title = 'Insights | Wahito Musonge & Company Advocates LLP';
    window.scrollTo({ top: 0, behavior: 'instant' });
    fetch('/api/public/posts')
      .then((response) => (response.ok ? response.json() : []))
      .then((posts: Array<{
        slug: string;
        title: string;
        excerpt: string;
        featuredImage: string | null;
        category: string;
        tags: string[];
        author: string;
        publicationDate: string | null;
        createdAt: string;
        content: string;
      }>) => {
        const staticSlugs = new Set(staticArticles.map((article) => article.slug));
        const dynamicArticles = posts
          .filter((post) => !staticSlugs.has(post.slug))
          .map((post) => ({
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
            seoTitle: post.title,
            seoDescription: post.excerpt,
            featuredImageAlt: post.title,
          }));
        setArticles([...staticArticles, ...dynamicArticles].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ));
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Navbar />
      <main className="pt-[90px]">
        <header className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
            <a
              href={`${baseUrl}#home`}
              className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-secondary hover:text-primary transition-colors uppercase"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>

            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">
              Knowledge centre
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-primary leading-[1.2]">
              Posts
            </h1>
            <div className="mx-auto mt-10 h-px w-24 bg-gray-300" />

            <p className="mt-10 font-serif text-[17px] italic text-secondary max-w-3xl mx-auto leading-relaxed">
              Our Legal Insights provide timely analysis, practical guidance, and
              informed commentary on developments in Kenyan law.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-[11px] font-medium uppercase tracking-[0.1em]">
              <a
                href={`${baseUrl}legalnuggets`}
                className="text-primary underline underline-offset-4 transition-colors hover:text-secondary"
              >
                Explore Legal Nuggets
              </a>
              <a
                href={`${baseUrl}contact`}
                className="text-primary underline underline-offset-4 transition-colors hover:text-secondary"
              >
                Discuss your matter
              </a>
            </div>
          </div>
        </header>

        <section className="container mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <a
                key={article.slug}
                href={`${baseUrl}insights/${article.slug}`}
                className="group flex flex-col h-full"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 mb-6">
                  <img
                    src={article.image.startsWith('/') || article.image.startsWith('http') ? article.image : `${baseUrl}images/${article.image}`}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/nairobi-skyline.png`;
                    }}
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="mb-3 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">
                    <span>{article.date}</span>
                  </div>
                  <h3 className="mb-4 font-serif text-[22px] text-primary transition-colors group-hover:text-secondary leading-[1.3]">
                    {article.title}
                  </h3>
                  <p className="text-[15px] leading-[1.8] text-primary flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 text-[11px] font-medium tracking-[0.1em] text-primary transition-colors group-hover:text-secondary underline underline-offset-4 uppercase">
                    READ MORE
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}