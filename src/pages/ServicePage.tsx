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
    <div className="min-h-screen bg-white font-sans text-foreground">
      <Navbar />
      <main className="pt-[90px]">
        <header className="bg-white py-16 md:py-24 border-b border-gray-100">
          <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
            <a
              href={servicesUrl}
              className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-secondary hover:text-primary transition-colors uppercase"
            >
              <ArrowLeft size={15} />
              ALL SERVICES
            </a>

            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary">
              Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-primary leading-[1.2]">
              {service.title}
            </h1>
            <div className="mx-auto mt-10 h-px w-24 bg-gray-300" />

            {service.tagline && (
              <p className="mt-10 font-serif text-[17px] italic text-secondary max-w-2xl mx-auto leading-relaxed">
                {service.tagline}
              </p>
            )}
          </div>
        </header>

        <article className="container mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            {service.intro.map((paragraph) => (
              <p key={paragraph} className="mb-8 text-[15px] leading-[1.8] text-primary">
                {paragraph}
              </p>
            ))}
          </div>

          {service.sections.length > 0 && (
            <section className="mt-16 border-t border-gray-200 pt-16 md:mt-24 md:pt-24">
              <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
                {service.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="mb-4 font-serif text-[22px] text-primary leading-[1.3]">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-[1.8] text-primary mb-4"
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
            <section className="mt-16 border-t border-gray-200 pt-16 md:mt-24 md:pt-24">
              <div className="mb-12 max-w-3xl">
                <p className="mb-5 text-[11px] font-medium tracking-[0.1em] uppercase text-secondary">
                  Our approach
                </p>
                <h2 className="font-serif text-3xl text-primary md:text-[32px] leading-[1.2]">
                  Why Choose Wahito Musonge &amp; Co. Advocates LLP?
                </h2>
                <div className="mt-8 h-px w-24 bg-gray-300" />
              </div>
              <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
                {service.reasons.map((reason) => (
                  <div key={reason.heading}>
                    <h3 className="mb-4 font-serif text-[22px] text-primary leading-[1.3]">
                      {reason.heading}
                    </h3>
                    {reason.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[15px] leading-[1.8] text-primary mb-4"
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
            <section className="mt-16 border-t border-gray-200 pt-16 md:mt-24 md:pt-24">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-3xl text-primary md:text-[32px] leading-[1.2]">
                  {service.closingHeading}
                </h2>
                <div className="mx-auto my-8 h-px w-24 bg-gray-300" />
                <p className="text-[15px] leading-[1.8] text-primary mb-6">
                  {service.closingText}
                </p>
                <p className="font-serif italic text-[17px] text-secondary">
                  Contact us today to schedule a confidential consultation with
                  one of our advocates.
                </p>
              </div>
            </section>
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