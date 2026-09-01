export function PracticeAreas() {
  return (
    <section id="practice-areas" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-secondary mb-5">How we work</p>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Three-Step Service Delivery</h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-primary/70 leading-relaxed">
              We provide seamless communication and prioritize understanding clients’ needs, tailoring legal strategies to your unique circumstances.
            </p>
        </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
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
            ].map((step) => (
              <div key={step.num} className="relative z-10 text-center">
                <div className="w-24 h-24 bg-primary border-2 border-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif text-secondary shadow-sm">
                  {step.num}
                </div>
                <h4 className="text-sm tracking-[0.12em] font-semibold text-primary mb-3">{step.title}</h4>
                <p className="text-primary/70 text-sm px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
