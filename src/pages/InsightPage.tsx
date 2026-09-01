import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { insightArticles } from '@/data/insights';

type InsightPageProps = {
  slug: string;
};

export function InsightPage({ slug }: InsightPageProps) {
  const article = insightArticles.find((item) => item.slug === slug);
  const homeUrl = `${import.meta.env.BASE_URL}#home`;
  const insightsUrl = `${import.meta.env.BASE_URL}#insights`;

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | Wahito Musonge & Company Advocates LLP`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute('content', article.excerpt);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navbar />
        <main className="pt-40 pb-32">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-secondary mb-5">Page not found</p>
            <h1 className="text-4xl font-serif text-primary mb-8">That insight is unavailable.</h1>
            <a href={insightsUrl} className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 text-xs font-semibold tracking-widest hover:bg-secondary transition-colors">
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
            <a href={insightsUrl} className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-secondary hover:text-primary transition-colors mb-10">
              <ArrowLeft size={15} />
              ALL INSIGHTS
            </a>
            <div className="grid md:grid-cols-[1fr_0.8fr] gap-12 items-end">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] uppercase text-secondary mb-5">Featured insight</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-serif text-primary">
                  {article.title}
                </h1>
              </div>
              <div className="md:pb-2">
                <p className="text-sm text-primary/60 tracking-wide">{article.date}</p>
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
          {article.blocks.map((block, index) => {
            if (block.type === 'h2') {
              return <h2 key={index} className="text-2xl md:text-3xl font-serif text-primary mt-12 mb-5">{block.text}</h2>;
            }
            if (block.type === 'h3') {
              return <h3 key={index} className="text-xl font-serif text-primary mt-8 mb-4">{block.text}</h3>;
            }
            if (block.type === 'li') {
              return (
                <li key={index} className="ml-6 pl-2 mb-3 text-primary/75 leading-relaxed marker:text-secondary">
                  {block.text}
                </li>
              );
            }
            if (block.type === 'quote') {
              return <blockquote key={index} className="border-l-2 border-secondary pl-6 my-8 italic text-primary/70 leading-relaxed">{block.text}</blockquote>;
            }
            return <p key={index} className="text-primary/75 leading-[1.9] mb-6">{block.text}</p>;
          })}

          <div className="mt-16 pt-10 border-t border-gray-200 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
            <a href={homeUrl} className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary hover:text-secondary transition-colors">
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>
            <a href={`${import.meta.env.BASE_URL}#contact`} className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 text-xs font-semibold tracking-widest hover:bg-secondary transition-colors">
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