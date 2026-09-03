import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getSitePage, type SitePageBlock } from '@/data/site-pages';

type SitePageProps = {
  slug: string;
};

function renderBlock(block: SitePageBlock, index: number) {
  if (block.type === 'image') {
    return (
      <img
        key={index}
        src={`${import.meta.env.BASE_URL}images/${block.src}`}
        alt={block.alt}
        className="my-10 aspect-[3/2] w-full object-cover grayscale"
      />
    );
  }

  if (block.type === 'h2') {
    return (
      <h2 key={index} className="mb-6 mt-16 font-serif text-2xl text-primary md:text-3xl leading-[1.3]">
        {block.text}
      </h2>
    );
  }

  if (block.type === 'h3') {
    return (
      <h3 key={index} className="mb-4 mt-10 font-serif text-[22px] text-primary leading-[1.3]">
        {block.text}
      </h3>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote
        key={index}
        className="my-10 border-l-2 border-secondary pl-6 italic font-serif text-[17px] leading-relaxed text-secondary"
      >
        {block.text}
      </blockquote>
    );
  }

  if (block.type === 'ul') {
    return (
      <ul key={index} className="mb-8 ml-6 list-disc space-y-4 text-primary text-[15px] marker:text-secondary">
        {block.items.map((item) => (
          <li key={item} className="pl-2 leading-[1.8]">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="mb-8 leading-[1.8] text-[15px] text-primary">
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
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Navbar />
      <main className="pt-[90px]">
        <header className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
            <a
              href={homeUrl}
              className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-secondary hover:text-primary transition-colors uppercase"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>

            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">
              {page.eyebrow ?? 'Wahito Musonge & Company Advocates LLP'}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-primary leading-[1.2]">
              {page.title}
            </h1>
            <div className="mx-auto mt-10 h-px w-24 bg-gray-300" />
          </div>
        </header>

        <article className="container mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
          {page.image && (
            <img
              src={`${baseUrl}images/${page.image}`}
              alt={page.title}
              className="w-full max-w-lg mx-auto aspect-square object-cover grayscale mb-16"
            />
          )}
          {page.blocks.map(renderBlock)}

          {page.slug === 'about-me' && (
            <div className="mt-16 grid gap-8 border-t border-gray-200 pt-16 sm:grid-cols-2">
              <a
                href={`${baseUrl}mary-njogu-wahito`}
                className="group overflow-hidden border border-gray-100 bg-gray-50 transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={`${baseUrl}images/mary-wahito-njogu.jpeg`} alt="Mary Wahito Njogu" className="h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-14">
                    <h3 className="font-serif text-[24px] text-white">Mary Wahito Njogu</h3>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">Founding Partner</p>
                  <span className="text-[11px] font-medium tracking-[0.1em] text-primary uppercase underline underline-offset-4">View Profile</span>
                </div>
              </a>
              <a
                href={`${baseUrl}managing-partner`}
                className="group overflow-hidden border border-gray-100 bg-gray-50 transition-all hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={`${baseUrl}images/nerima-musonge.jpeg`} alt="Nerima Musonge" className="h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-14">
                    <h3 className="font-serif text-[24px] text-white">Nerima Musonge</h3>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">Managing Partner</p>
                  <span className="text-[11px] font-medium tracking-[0.1em] text-primary uppercase underline underline-offset-4">View Profile</span>
                </div>
              </a>
            </div>
          )}

          <div className="mt-16 flex flex-col gap-6 border-t border-gray-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={homeUrl}
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-primary transition-colors hover:text-secondary uppercase"
            >
              <ArrowLeft size={15} />
              BACK TO HOME
            </a>
            <a
              href={`${baseUrl}#contact`}
              className="inline-flex items-center gap-2 bg-black px-8 py-3 text-[11px] font-medium tracking-[0.1em] text-white transition-colors hover:bg-black/80 uppercase"
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