import { services } from '@/data/services';

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
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="mx-auto mb-20 text-center max-w-4xl">
          <h2 className="mb-8 font-serif text-3xl md:text-[40px] text-primary">
            Our Services
          </h2>
          <p className="text-[15px] leading-[1.8] text-primary mb-6">
            Legal challenges rarely exist in isolation. They require strategic
            advice informed by legal expertise, commercial awareness, and a
            thorough understanding of each client’s objectives.
          </p>
          <p className="text-[15px] leading-[1.8] text-primary">
            Our multidisciplinary practice enables us to deliver integrated
            legal solutions across a wide range of contentious and
            non-contentious matters. We are committed to providing responsive,
            practical, and results-driven counsel that protects our clients’
            interests and supports informed decision-making at every stage.
          </p>
          <div className="mx-auto mt-12 mb-16 h-px w-24 bg-gray-300" />
        </div>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <a
              href={`${import.meta.env.BASE_URL}services/${service.slug}`}
              key={service.slug}
              className="group flex flex-col"
            >
              <h3 className="mb-6 font-serif text-[22px] text-secondary transition-colors group-hover:text-primary">
                {service.overviewTitle ?? service.title}
              </h3>
              <div className="mb-6 overflow-hidden aspect-[4/3] bg-gray-100">
                <img
                  src={`${import.meta.env.BASE_URL}images/service-${service.slug}.jpeg`}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback just in case the jpg extension is different, though instruction said .jpeg
                    (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/nairobi-skyline.png`;
                  }}
                />
              </div>
              <p className="text-[14px] leading-[1.8] text-primary">
                {service.description.substring(0, 160)}...
              </p>
            </a>
          ))}
        </div>

        <div className="mt-32 pt-24 border-t border-gray-200">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-8 font-serif text-3xl text-primary md:text-[40px]">
              Three-Step Service Delivery
            </h2>
            <p className="text-[15px] leading-[1.8] text-primary">
              We provide seamless communication and prioritize understanding
              clients’ needs, tailoring legal strategies to your unique
              circumstances.
            </p>
          </div>

          <div className="relative grid gap-12 md:grid-cols-3">
            <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-gray-200 md:block" />
            {deliverySteps.map((step) => (
              <div key={step.num} className="relative z-10 text-center bg-white px-4">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white border border-gray-200 text-xl font-serif text-secondary shadow-sm">
                  {step.num}
                </div>
                <h4 className="mb-4 text-[11px] font-medium tracking-[0.1em] text-primary uppercase">
                  {step.title}
                </h4>
                <p className="text-[14px] leading-[1.8] text-primary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}