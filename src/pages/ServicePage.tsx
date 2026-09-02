import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getService } from '@/data/services';

type ServicePageProps = {
  slug: string;
};

export function ServicePage({ slug }: ServicePageProps) {
  const service = getService(slug);
  const baseUrl = import.meta.env.BASE_URL;
  const homeUrl = `${baseUrl}#home`;
  const servicesUrl = `${baseUrl}services`;

  useEffect(() => {
    if (!service) return;
    document.title = `${service.title} | Wahito Musonge & Company Advocates LLP`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute('content', service.intro[0]);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navbar />
        <main className="pb-32 pt-40">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
              Page not found
            </p>
            <h1 className="mb-8 font-serif text-4xl text-primary">
              That service is unavailable.
            </h1>
            <a
              href={servicesUrl}
              className="inline-flex items-center gap-2 bg-primary px-7 py-4 text-xs font-semibold tracking-widest text-white transition-colors hover:bg-secondary"
            >
              <ArrowLeft size={15} />
              BACK TO SERVICES
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
              href={servicesUrl}
              className="mb-10 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft size={15} />
              ALL SERVICES
            </a>
            <div className="grid items-end gap-12 md:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                  Services
                </p>
                <h1 className="font-serif text-4xl leading-tight text-primary md:text-5xl lg:text-6xl">
                  {service.title}
                </h1>
              </div>
              {service.tagline && (
                <div className="md:pb-2">
                  <p className="font-serif text-xl italic leading-relaxed text-primary/70">
                    {service.tagline}
                  </p>
                  <div className="mt-6 h-0.5 w-16 bg-secondary" />
                </div>
              )}
            </div>
          </div>
        </header>

        <article className="container mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            {service.intro.map((paragraph) => (
              <p key={paragraph} className="mb-6 text-lg leading-[1.9] text-primary/75">
                {paragraph}
              </p>
            ))}
          </div>

          {service.sections.length > 0 && (
            <section className="mt-16 border-t border-primary/10 pt-16 md:mt-24 md:pt-24">
              <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
                {service.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="mb-4 font-serif text-2xl text-primary">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-primary/75 leading-[1.9]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}

          {service.reasons && service.reasons.length > 0 && (
            <section className="mt-16 border-t border-primary/10 pt-16 md:mt-24 md:pt-24">
              <div className="mb-12 max-w-3xl">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                  Our approach
                </p>
                <h2 className="font-serif text-3xl text-primary md:text-4xl">
                  Why Choose Wahito Musonge &amp; Co. Advocates LLP?
                </h2>
                <div className="mt-6 h-0.5 w-16 bg-secondary" />
              </div>
              <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
                {service.reasons.map((reason) => (
                  <div key={reason.heading}>
                    <h3 className="mb-3 font-serif text-xl text-primary">
                      {reason.heading}
                    </h3>
                    {reason.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-primary/75 leading-[1.9]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}

          {service.closingHeading && service.closingText && (
            <section className="mt-16 border-t border-primary/10 pt-16 md:mt-24 md:pt-24">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl text-primary md:text-4xl">
                  {service.closingHeading}
                </h2>
                <div className="mx-auto my-6 h-0.5 w-16 bg-secondary" />
                <p className="text-lg leading-relaxed text-primary/75">
                  {service.closingText}
                </p>
                <p className="mt-6 font-serif italic text-primary/75">
                  Contact us today to schedule a confidential consultation with
                  one of our advocates.
                </p>
              </div>
            </section>
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