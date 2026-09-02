export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-serif text-secondary mb-8 leading-[1.2] uppercase">
              WELCOME TO WAHITO MUSONGE & COMPANY ADVOCATES LLP
            </h2>
            <p className="text-[15px] text-primary leading-[1.8] font-sans mb-8">
              We believe effective legal representation requires more than legal knowledge. It requires understanding our clients' objectives and delivering practical solutions. We partner with businesses and individuals across Kenya to resolve disputes, manage legal risk, and protect their interests with professionalism and integrity.
            </p>
            <a
              href="#contact"
              className="inline-block bg-primary text-white px-8 py-4 text-[13px] hover:bg-primary/90 transition-colors"
            >
              Book an Appointment Today!
            </a>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[400px] aspect-square bg-[#1a1f33] flex items-center justify-center p-12">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Wahito Musonge & Company Law Firm"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center border-t border-gray-300 pt-24">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Meet our team</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start max-w-4xl mx-auto mt-16">
          {/* Partner 1 */}
          <div className="group text-center">
            <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
              <img
                src={`${import.meta.env.BASE_URL}images/mary-wahito-njogu.jpeg`}
                alt="Mary Wahito Njogu"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
              />
            </div>
            <h3 className="text-2xl font-serif text-primary mb-2">Mary Wahito Njogu</h3>
            <p className="text-[11px] font-medium tracking-[0.1em] text-secondary mb-4 uppercase">Founding Partner</p>
            <a href={`${import.meta.env.BASE_URL}mary-njogu-wahito`} className="inline-block mt-2 text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors underline underline-offset-4">READ MORE</a>
          </div>

          {/* Partner 2 */}
          <div className="group text-center">
            <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
              <img
                src={`${import.meta.env.BASE_URL}images/nerima-musonge.jpeg`}
                alt="Nerima Musonge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
              />
            </div>
            <h3 className="text-2xl font-serif text-primary mb-2">Nerima Musonge</h3>
            <p className="text-[11px] font-medium tracking-[0.1em] text-secondary mb-4 uppercase">Managing Partner</p>
            <a href={`${import.meta.env.BASE_URL}managing-partner`} className="inline-block mt-2 text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors underline underline-offset-4">READ MORE</a>
          </div>
        </div>
      </div>
    </section>
  );
}
