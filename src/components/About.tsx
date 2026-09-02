export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-secondary mb-5">Why Choose Us?</p>
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Practical, client-centered representation</h2>
          <div className="w-16 h-0.5 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-primary/70 leading-relaxed">
            Whether you’re a business navigating compliance or an individual facing a complex legal dispute, we provide practical client-centered legal advice and strategic representation tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start mb-24">
          <div className="bg-white p-8 md:p-10 border border-gray-100">
            <h3 className="text-2xl font-serif text-primary mb-6">Why Choose Us?</h3>
            <ul className="space-y-4 text-primary/75 leading-relaxed">
              {[
                'Experienced Litigation Advocates',
                'Client- Focused Representation',
                'Serving Clients Across Kenya and Beyond',
                'Broad-based Client Advice',
                'Compliance of Client Deadlines',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-secondary text-lg leading-none mt-0.5" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-block mt-8 bg-primary text-white px-7 py-4 text-xs font-semibold tracking-widest hover:bg-secondary transition-colors"
            >
              BOOK A CONSULTATION TODAY!
            </a>
          </div>

          <div className="bg-primary p-8 md:p-10 text-white">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-secondary mb-5">Our people</p>
            <h3 className="text-2xl font-serif text-white mb-5">Trusted counsel for complex moments</h3>
            <p className="text-white/75 leading-relaxed">
              Our multidisciplinary practice enables us to deliver integrated legal solutions across a wide range of contentious and non-contentious matters.
            </p>
            <a
              href="#practice-areas"
              className="inline-block mt-8 border border-white/70 text-white px-7 py-4 text-xs font-semibold tracking-widest hover:bg-white hover:text-primary transition-colors"
            >
              OUR SERVICES
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Partner 1 */}
          <div className="group">
            <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-200">
              <img 
                src={`${import.meta.env.BASE_URL}images/nerima-musonge.jpeg`}
                alt="Nerima Musonge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
              />
            </div>
            <h3 className="text-2xl font-serif text-primary mb-2">Nerima Musonge</h3>
            <p className="text-sm font-semibold tracking-widest text-secondary mb-4 uppercase">Managing Partner</p>
            <p className="text-primary/70 leading-relaxed text-sm">
              Nerima Musonge is the Managing Partner of Wahito Musonge & Company Advocates LLP, an Advocate of the High Court of Kenya, and Commissioner for Oaths.
            </p>
            <a href={`${import.meta.env.BASE_URL}managing-partner`} className="inline-block mt-5 text-xs font-semibold tracking-widest text-secondary hover:text-primary transition-colors">SEE MORE</a>
          </div>

          {/* Partner 2 */}
          <div className="group">
            <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-200">
              <img 
                src={`${import.meta.env.BASE_URL}images/mary-wahito-njogu.jpeg`}
                alt="Mary Wahito Njogu"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
              />
            </div>
            <h3 className="text-2xl font-serif text-primary mb-2">Mary Wahito Njogu</h3>
            <p className="text-sm font-semibold tracking-widest text-secondary mb-4 uppercase">Founding Partner</p>
            <p className="text-primary/70 leading-relaxed text-sm">
              Mary Wahito Njogu is the Founding Partner of Wahito Musonge & Company Advocates LLP, an Advocate of the High Court of Kenya, Commissioner for Oaths, and Notary Public.
            </p>
            <a href={`${import.meta.env.BASE_URL}mary-njogu-wahito`} className="inline-block mt-5 text-xs font-semibold tracking-widest text-secondary hover:text-primary transition-colors">SEE MORE</a>
          </div>
        </div>
      </div>
    </section>
  );
}
