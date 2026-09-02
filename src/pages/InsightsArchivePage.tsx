import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { insightArticles } from '@/data/insights';
import { archiveInsights } from '@/data/archive-insights';

const articles = [...insightArticles, ...archiveInsights].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function InsightsArchivePage() {
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    document.title = 'Insights | Wahito Musonge & Company Advocates LLP';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="pt-28">
        <header className="bg-gray-50 py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-4 md:px-8">
            <a
              href={`${baseUrl}#home`}
              className="mb-10 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
              Knowledge centre
            </p>
            <h1 className="font-serif text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">
              INSIGHTS
            </h1>
            <div className="mt-6 h-0.5 w-16 bg-secondary" />
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-primary/70">
              Our Legal Insights provide timely analysis, practical guidance, and
              informed commentary on developments in Kenyan law.
            </p>
          </div>
        </header>

        <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <a
                key={article.slug}
                href={`${baseUrl}insights/${article.slug}`}
                className="group flex h-full flex-col border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-gray-200">
                  <img
                    src={`${baseUrl}images/${article.image}`}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-grow flex-col p-8">
                  <div className="mb-4 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-secondary">
                    <span>LEGAL INSIGHT</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span className="text-gray-400">{article.date}</span>
                  </div>
                  <h2 className="mb-4 font-serif text-xl text-primary transition-colors group-hover:text-secondary">
                    {article.title}
                  </h2>
                  <p className="mb-6 flex-grow text-sm leading-relaxed text-primary/70">
                    {article.excerpt}
                  </p>
                  <span className="mt-auto text-sm font-semibold tracking-widest text-primary transition-colors group-hover:text-secondary">
                    READ MORE
                  </span>
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