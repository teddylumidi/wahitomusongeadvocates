import {
  BriefcaseBusiness,
  Building2,
  Gavel,
  Home,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

const services = [
  {
    title: 'Dispute Resolution',
    icon: Gavel,
    description:
      'Disputes require more than legal representation. They require strategy, sound judgment, and decisive action. Our Dispute Resolution practice provides comprehensive representation in civil, commercial, employment, tax, constitutional, and regulatory disputes before courts, specialised tribunals, and alternative dispute resolution forums. We are committed to protecting our clients’ interests through practical, efficient, and results-oriented advocacy while exploring opportunities for timely and cost-effective resolution.',
  },
  {
    title: 'Corporate & Commercial Law',
    icon: Building2,
    description:
      'Businesses operate in an increasingly complex legal and regulatory environment that demands proactive legal counsel. Our Corporate & Commercial practice advises businesses, entrepreneurs, financial institutions, investors, and public entities on commercial transactions, corporate governance, regulatory compliance, contract negotiation, banking and finance, tax, intellectual property, data protection, insurance, and mining. We work closely with our clients to manage legal risk, facilitate growth, and support informed commercial decision-making.',
  },
  {
    title: 'Employment & Labour Law',
    icon: BriefcaseBusiness,
    description:
      'The workplace continues to evolve alongside an ever-changing legal landscape. We advise employers, employees, and organisations on all aspects of employment and labour law, including workplace policies, employment contracts, disciplinary processes, restructuring, redundancy, regulatory compliance, workplace investigations, and employment litigation. Our objective is to foster legally compliant workplaces while effectively resolving employment disputes when they arise.',
  },
  {
    title: 'Family, Children, & Succession',
    icon: UsersRound,
    description:
      'Family matters often involve deeply personal and life-changing decisions that require both legal expertise and thoughtful guidance. We advise clients on divorce, matrimonial property, child custody, adoption, guardianship, maintenance, succession, probate, estate administration, wills, and estate planning. Our approach is characterised by professionalism, discretion, and a commitment to achieving solutions that safeguard our clients’ interests while promoting the welfare of their families.',
  },
  {
    title: 'Property & Real Estate',
    icon: Home,
    description:
      'Property transactions and land-related disputes require careful legal oversight to protect valuable investments. We advise individuals, developers, lenders, investors, and businesses on acquisitions, disposals, leases, conveyancing, land use, real estate development, financing, and property disputes. Through meticulous due diligence and practical legal advice, we help clients navigate property transactions with confidence and certainty.',
  },
  {
    title: 'Regulatory & Public Law',
    icon: ShieldCheck,
    description:
      'Navigating regulatory obligations is essential for both businesses and individuals operating in today’s legal environment. Our Regulatory & Public Law practice advises clients on constitutional and administrative law, tax compliance, data protection, regulatory investigations, licensing, governance, and public law matters. We assist clients in understanding their legal obligations, managing regulatory risk, and responding effectively to an evolving legislative and regulatory landscape.',
  },
];

const deliverySteps = [
  {
    num: '01',
    title: 'PRELIMINARY CLIENT MEETING',
    desc: 'We provide seamless communication and prioritize understanding clients’ needs, tailoring legal strategies to your unique circumstances. We emphasize open dialogue and offer clear explanations of legal intricacies.',
  },
  {
    num: '02',
    title: 'BILLING',
    desc: 'Our remuneration model is premised on the foundations outlined in the Advocates’ Remuneration Order [Regulations]. Therefore, our billing is favorable and tailored to suit our Clients’ needs. We also exercise utmost transparency and ensure that client funds are accounted for.',
  },
  {
    num: '03',
    title: 'SERVICE DELIVERY',
    desc: 'We appreciate the value of efficient, effective, and quality services to our Clients. When offering these services, we are guided by the core principles of professionalism, integrity, and confidentiality.',
  },
];

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-white py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
            Services
          </p>
          <h2 className="mb-6 font-serif text-3xl text-primary md:text-4xl">
            Our Services
          </h2>
          <div className="mx-auto mb-6 h-0.5 w-16 bg-secondary" />
          <p className="text-lg leading-relaxed text-primary/70">
            Legal challenges rarely exist in isolation. They require strategic
            advice informed by legal expertise, commercial awareness, and a
            thorough understanding of each client’s objectives.
          </p>
          <p className="mt-4 leading-relaxed text-primary/70">
            Our multidisciplinary practice enables us to deliver integrated
            legal solutions across a wide range of contentious and
            non-contentious matters. We are committed to providing responsive,
            practical, and results-driven counsel that protects our clients’
            interests and supports informed decision-making at every stage.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group flex h-full flex-col border border-primary/10 bg-[#faf9f6] p-8 transition-colors hover:border-secondary/60 hover:bg-white"
              >
                <div className="mb-7 flex h-12 w-12 items-center justify-center border border-secondary/60 text-secondary transition-colors group-hover:bg-primary group-hover:text-secondary">
                  <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mb-4 font-serif text-2xl text-primary">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm leading-7 text-primary/70">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="mt-7 inline-flex w-fit text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-secondary"
                >
                  Learn more
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-24 border-t border-primary/10 pt-24">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
              How we work
            </p>
            <h2 className="mb-6 font-serif text-3xl text-primary md:text-4xl">
              Three-Step Service Delivery
            </h2>
            <div className="mx-auto mb-6 h-0.5 w-16 bg-secondary" />
            <p className="text-lg leading-relaxed text-primary/70">
              We provide seamless communication and prioritize understanding
              clients’ needs, tailoring legal strategies to your unique
              circumstances.
            </p>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-secondary/30 md:block" />
            {deliverySteps.map((step) => (
              <div key={step.num} className="relative z-10 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-secondary bg-primary text-2xl font-serif text-secondary shadow-sm">
                  {step.num}
                </div>
                <h4 className="mb-3 text-sm font-semibold tracking-[0.12em] text-primary">
                  {step.title}
                </h4>
                <p className="px-4 text-sm text-primary/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}