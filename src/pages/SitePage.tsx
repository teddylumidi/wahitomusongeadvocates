import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getSitePage, type SitePageBlock } from '@/data/site-pages';

type SitePageProps = {
  slug: string;
};

function renderBlock(block: SitePageBlock, index: number) {
  if (block.type === 'h2') {
    return (
      <h2 key={index} className="mb-5 mt-12 font-serif text-2xl text-primary md:text-3xl">
        {block.text}
      </h2>
    );
  }

  if (block.type === 'h3') {
    return (
      <h3 key={index} className="mb-4 mt-8 font-serif text-xl text-primary">
        {block.text}
      </h3>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote
        key={index}
        className="my-8 border-l-2 border-secondary pl-6 italic leading-relaxed text-primary/70"
      >
        {block.text}
      </blockquote>
    );
  }

  if (block.type === 'ul') {
    return (
      <ul key={index} className="mb-6 ml-6 list-disc space-y-3 text-primary/75 marker:text-secondary">
        {block.items.map((item) => (
          <li key={item} className="pl-2 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="mb-6 leading-[1.9] text-primary/75">
      {block.text}
    </p>
  );
}

export function SitePage({ slug }: SitePageProps) {
  const page = getSitePage(slug);
  const baseUrl = import.meta.env.BASE_URL;
  const homeUrl = `${baseUrl}#home`;
  const aboutUrl = `${baseUrl}about-me`;

  useEffect(() => {
    if (!page) return;
    document.title = `${page.title} | Wahito Musonge & Company Advocates LLP`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const firstParagraph = page.blocks.find((block) => block.type === 'p');
    if (firstParagraph?.type === 'p') {
      description?.setAttribute('content', firstParagraph.text);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  if (!page) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navbar />
        <main className="pb-32 pt-40">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
              Page not found
            </p>
            <h1 className="mb-8 font-serif text-4xl text-primary">
              That page is unavailable.
            </h1>
            <a
              href={homeUrl}
              className="inline-flex items-center gap-2 bg-primary px-7 py-4 text-xs font-semibold tracking-widest text-white transition-colors hover:bg-secondary"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
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
              href={homeUrl}
              className="mb-10 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>
            <div className="grid items-end gap-12 md:grid-cols-[1fr_0.7fr]">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                  {page.eyebrow ?? 'Wahito Musonge & Company Advocates LLP'}
                </p>
                <h1 className="font-serif text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">
                  {page.title}
                </h1>
              </div>
              {page.image && (
                <img
                  src={`${baseUrl}images/${page.image}`}
                  alt={page.title}
                  className="aspect-[3/4] w-full object-cover grayscale"
                />
              )}
            </div>
          </div>
        </header>

        <article className="container mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
          {page.blocks.map(renderBlock)}

          {page.slug === 'about-me' && (
            <div className="mt-16 grid gap-6 border-t border-primary/10 pt-12 sm:grid-cols-2">
              <a
                href={`${baseUrl}mary-njogu-wahito`}
                className="group border border-primary/10 bg-gray-50 p-7 transition-colors hover:border-secondary/60 hover:bg-white"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Founding Partner
                </p>
                <h3 className="font-serif text-2xl text-primary transition-colors group-hover:text-secondary">
                  Mary Wahito Njogu
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary">
                  VIEW PROFILE <ArrowUpRight size={14} />
                </span>
              </a>
              <a
                href={`${baseUrl}managing-partner`}
                className="group border border-primary/10 bg-gray-50 p-7 transition-colors hover:border-secondary/60 hover:bg-white"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Managing Partner
                </p>
                <h3 className="font-serif text-2xl text-primary transition-colors group-hover:text-secondary">
                  Nerima Musonge
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary">
                  VIEW PROFILE <ArrowUpRight size={14} />
                </span>
              </a>
            </div>
          )}

          <div className="mt-16 flex flex-col gap-5 border-t border-gray-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={homeUrl}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary transition-colors hover:text-secondary"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>
            <a
              href={`${baseUrl}#contact`}
              className="inline-flex items-center gap-2 bg-primary px-7 py-4 text-xs font-semibold tracking-widest text-white transition-colors hover:bg-secondary"
            >
              CONTACT THE FIRM
              <ArrowUpRight size={15} />
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}