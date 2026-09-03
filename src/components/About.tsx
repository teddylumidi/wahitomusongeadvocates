export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-serif text-secondary mb-8 leading-[1.2] uppercase">
              WELCOME TO WAHITO MUSONGE & COMPANY ADVOCATES LLP
            </h2>
            <p className="text-[15px] text-primary leading-[1.8] font-sans mb-5">
              Wahito Musonge &amp; Company Advocates LLP is a full-service law firm committed to providing strategic, commercially focused legal solutions to individuals, businesses, institutions, and public sector entities. We combine technical excellence with practical insight to help our clients navigate complex legal and regulatory landscapes with confidence.
            </p>
            <p className="text-[15px] text-primary leading-[1.8] font-sans mb-5">
              Every engagement is approached with professionalism, integrity, and meticulous attention to detail, ensuring that our clients receive advice that is both legally sound and commercially practical.
            </p>
            <p className="text-[15px] text-primary leading-[1.8] font-sans mb-8">
              We believe exceptional legal representation extends beyond resolving disputes. It is about anticipating risk, protecting our clients’ interests, and creating lasting value through trusted legal partnerships.
            </p>
            <a
              href="#contact"
              className="inline-block bg-primary text-white px-8 py-4 text-[13px] hover:bg-primary/90 transition-colors"
            >
              Book an Appointment Today!
            </a>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-[520px] overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}images/black-woman-in-office.webp`}
                alt="Legal professional working with a client by phone"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-secondary" />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center border-t border-gray-300 pt-24">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-secondary">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Meet our team</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-16 items-start max-w-5xl mx-auto mt-16">
          <a href={`${import.meta.env.BASE_URL}mary-njogu-wahito`} className="group block md:mt-10">
            <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 shadow-[0_18px_45px_rgba(0,0,0,0.13)]">
              <img
                src={`${import.meta.env.BASE_URL}images/mary-wahito-njogu.jpeg`}
                alt="Mary Wahito Njogu"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-6 pb-7 pt-24 text-left">
                <span className="mb-3 block h-px w-12 bg-secondary transition-all duration-300 group-hover:w-20" />
                <h3 className="text-3xl font-serif text-white">Mary Wahito Njogu</h3>
                <p className="mt-2 text-[10px] font-medium tracking-[0.16em] text-white/75 uppercase">Founding Partner</p>
                <span className="mt-5 inline-block text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
                  View Profile →
                </span>
              </div>
            </div>
          </a>

          <a href={`${import.meta.env.BASE_URL}managing-partner`} className="group block">
            <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 shadow-[0_18px_45px_rgba(0,0,0,0.13)]">
              <img
                src={`${import.meta.env.BASE_URL}images/nerima-musonge.jpeg`}
                alt="Nerima Musonge"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-6 pb-7 pt-24 text-left">
                <span className="mb-3 block h-px w-12 bg-secondary transition-all duration-300 group-hover:w-20" />
                <h3 className="text-3xl font-serif text-white">Nerima Musonge</h3>
                <p className="mt-2 text-[10px] font-medium tracking-[0.16em] text-white/75 uppercase">Managing Partner</p>
                <span className="mt-5 inline-block text-[10px] font-semibold tracking-[0.14em] text-secondary uppercase">
                  View Profile →
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
