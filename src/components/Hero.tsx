export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] w-full flex flex-col md:flex-row bg-white pt-[90px]">
      {/* Left side: Image */}
      <div className="w-full md:w-[50%] h-[50vh] md:h-auto relative order-2 md:order-1 flex-shrink-0">
        <div className="absolute inset-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/nairobi-skyline.png`} 
            alt="Nairobi Skyline"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
      
      {/* Right side: Content */}
      <div className="w-full md:w-[50%] flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 order-1 md:order-2 bg-white flex-shrink-0">
        <div className="max-w-[520px] text-center animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif leading-[1.1] text-secondary italic mb-8">
            Practical Legal Solutions<br />for Businesses and<br />Individuals
          </h1>
          <p className="text-base md:text-lg text-primary leading-relaxed font-serif mb-9">
            Whether you're a business navigating compliance or an individual facing a
            complex legal dispute, we provide practical client-centered legal advice and
            strategic representation tailored to your needs.
          </p>
          <div className="mx-auto max-w-[390px] border-y border-gray-200 py-7 text-left">
            <h2 className="mb-5 text-center font-serif text-2xl text-primary">Why Choose Us?</h2>
            <ul className="space-y-3 text-[14px] leading-relaxed text-primary">
              {[
                'Experienced Litigation Advocates',
                'Client-Focused Representation',
                'Serving Clients Across Kenya and Beyond',
                'Broad-based Client Advice',
                'Compliance with Client Deadlines',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 font-semibold text-secondary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            href={`${import.meta.env.BASE_URL}contact`}
            className="mt-8 inline-block bg-primary px-8 py-4 text-[12px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-secondary"
          >
            Book a Consultation Today!
          </a>
        </div>
      </div>
    </section>
  );
}
