import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const topics = [
  {
    title: 'Employment Law Updates',
    serviceSlug: 'employment-labour-law',
    text: 'Stay informed on emerging employment legislation, workplace compliance requirements, disciplinary procedures, redundancy processes, and recent decisions from the Employment and Labour Relations Court.',
  },
  {
    title: 'Commercial & Corporate Insights',
    serviceSlug: 'corporate-commercial',
    text: 'Explore practical guidance on commercial transactions, contract drafting, regulatory obligations, corporate governance, and strategies for managing legal risk in business.',
  },
  {
    title: 'Property & Conveyancing',
    serviceSlug: 'property-real-estate',
    text: 'Understand key legal considerations surrounding land transactions, property ownership, leases, due diligence, and developments in Kenyan property law.',
  },
  {
    title: 'Tax & Regulatory Compliance',
    serviceSlug: 'regulatory-public-law',
    text: 'Keep up to date with tax obligations, regulatory requirements, compliance frameworks, and significant decisions affecting businesses and taxpayers.',
  },
  {
    title: 'Family & Succession Law',
    serviceSlug: 'family-children-succession',
    text: "Access clear guidance on estate planning, succession, wills, probate, matrimonial property, and family law to help safeguard your family's future.",
  },
  {
    title: 'Litigation & Dispute Resolution',
    serviceSlug: 'dispute-resolution',
    text: 'Gain insights into court procedures, alternative dispute resolution, debt recovery, commercial litigation, and practical strategies for resolving disputes efficiently.',
  },
];

export function LegalNuggetsPage() {
  const baseUrl = import.meta.env.BASE_URL;
  const homeUrl = `${baseUrl}#home`;
  const whatsappUrl =
    'https://wa.me/254722775294?text=Hello%20Wahito%20Musonge%20%26%20Company%20Advocates%20LLP';

  useEffect(() => {
    document.title =
      'The Legal Nuggets Initiative | Wahito Musonge & Company Advocates LLP';
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    description?.setAttribute(
      'content',
      'Practical legal knowledge for individuals, businesses, employers, and institutions across Kenya.',
    );
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-primary">
      <Navbar />
      <main className="pt-[90px]">
        <section className="px-4 pb-20 pt-20 text-center md:pb-24 md:pt-28">
          <div className="mx-auto max-w-4xl">
            <a
              href={homeUrl}
              className="mb-10 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft size={15} />
              Back to home
            </a>
            <p className="mb-7 text-[11px] font-medium uppercase tracking-[0.18em] text-secondary">
              Legal Nuggets Initiative
            </p>
            <h1 className="font-serif text-4xl leading-[1.15] text-secondary md:text-6xl">
              What is the Legal Nuggets Initiative?
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-[1.8] text-primary md:text-[17px]">
              It is a community whereby we educate the common mwananchi on legal
              matters in Kenya as part of our duty to society as Advocates.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-black px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-secondary"
            >
              Join our WhatsApp Community Today
              <ArrowUpRight size={15} />
            </a>
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-[11px] font-medium uppercase tracking-[0.1em]">
              <a
                href={`${baseUrl}insights`}
                className="text-primary underline underline-offset-4 transition-colors hover:text-secondary"
              >
                Read legal insights
              </a>
              <a
                href={`${baseUrl}contact`}
                className="text-primary underline underline-offset-4 transition-colors hover:text-secondary"
              >
                Speak with an advocate
              </a>
            </div>
          </div>
        </section>

        <div className="h-[260px] w-full overflow-hidden bg-gray-100 md:h-[440px]">
          <img
            src={`${baseUrl}images/nairobi-skyline.png`}
            alt="Nairobi skyline"
            className="h-full w-full object-cover grayscale"
          />
        </div>

        <section className="px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 text-2xl text-secondary">✦</div>
              <h2 className="font-serif text-4xl leading-[1.2] text-primary md:text-5xl">
                Stay Informed. Stay Protected.
              </h2>
              <p className="mt-8 text-[15px] leading-[1.8] text-primary md:text-[17px]">
                The law is constantly evolving, and informed decisions begin
                with reliable legal knowledge. Our Legal Insights provide
                practical guidance, timely commentary, and expert analysis on
                developments that affect individuals, businesses, employers,
                and institutions across Kenya.
              </p>
            </div>

            <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => (
                <article key={topic.title}>
                  <div className="mb-5 text-2xl text-secondary">✦</div>
                  <h3 className="font-sans text-[15px] font-semibold text-primary">
                    <a
                      href={`${baseUrl}services/${topic.serviceSlug}`}
                      className="transition-colors hover:text-secondary"
                    >
                      {topic.title}
                    </a>
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.8] text-primary">
                    {topic.text}
                  </p>
                  <a
                    href={`${baseUrl}services/${topic.serviceSlug}`}
                    className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary underline underline-offset-4"
                  >
                    View related service
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa] px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-4xl leading-[1.2] text-primary md:text-5xl">
                Knowledge Center: Practical Legal Resources
              </h2>
              <p className="mt-8 text-[15px] leading-[1.8] text-primary md:text-[17px]">
                Our Knowledge Centre is designed to make the law accessible
                through practical, easy-to-understand content prepared by our
                advocates.
              </p>
            </div>

            <div className="mt-16 grid items-center gap-12 md:grid-cols-2 md:gap-20">
              <div>
                <div className="mb-5 text-2xl text-secondary">✦</div>
                <h3 className="font-serif text-3xl text-primary">
                  Articles &amp; Publications
                </h3>
                <ul className="mt-7 space-y-4 text-[15px] leading-[1.7] text-primary">
                  <li className="flex gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-secondary" />
                    In-depth legal analysis of emerging legal issues.
                  </li>
                  <li className="flex gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-secondary" />
                    Practical guides for individuals and businesses.
                  </li>
                  <li className="flex gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-secondary" />
                    Commentary on significant court decisions and legislative
                    developments.
                  </li>
                </ul>
              </div>
              <img
                src={`${baseUrl}images/articles-publications.png`}
                alt="Advocate reviewing legal publications"
                className="h-full max-h-[420px] w-full object-cover grayscale"
              />
            </div>

            <div className="mt-20 grid items-center gap-12 md:grid-cols-2 md:gap-20">
              <img
                src={`${baseUrl}images/legal-alerts.png`}
                alt="Advocates reviewing a legal alert together"
                className="order-2 h-full max-h-[420px] w-full object-cover grayscale md:order-1"
              />
              <div className="order-1 md:order-2">
                <div className="mb-5 text-2xl text-secondary">✦</div>
                <h3 className="font-serif text-3xl text-primary">
                  Legal Alerts
                </h3>
                <ul className="mt-7 space-y-4 text-[15px] leading-[1.7] text-primary">
                  <li className="flex gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-secondary" />
                    Updates on new legislation and regulatory changes.
                  </li>
                  <li className="flex gap-3">
                    <Check size={16} className="mt-1 shrink-0 text-secondary" />
                    Timely insights to help you remain compliant and manage
                    legal risk effectively.
                  </li>
                </ul>
              </div>
            </div>

            <blockquote className="mx-auto mt-20 max-w-3xl border-l-2 border-secondary pl-6 font-serif text-[18px] italic leading-relaxed text-secondary">
              “The law is most powerful when it transforms uncertainty into
              confidence and rights into lasting protection.”
              <footer className="mt-4 font-sans text-[11px] not-italic uppercase tracking-[0.12em] text-primary">
                Nerima Musonge · Managing Partner
              </footer>
            </blockquote>

            <div className="mt-16 flex flex-wrap justify-center gap-4 border-t border-gray-200 pt-10">
              <a
                href={`${baseUrl}insights`}
                className="border border-gray-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-primary transition-colors hover:border-secondary hover:text-secondary"
              >
                Browse all insights
              </a>
              <a
                href={`${baseUrl}practice-areas`}
                className="border border-gray-300 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-primary transition-colors hover:border-secondary hover:text-secondary"
              >
                View all practice areas
              </a>
              <a
                href={`${baseUrl}contact`}
                className="bg-primary px-6 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-secondary"
              >
                Contact the firm
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}