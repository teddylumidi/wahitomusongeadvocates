export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] w-full flex flex-col md:flex-row bg-white pt-[72px] md:pt-[88px]">
      {/* Left side: Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative order-2 md:order-1">
        <div className="absolute inset-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/nairobi-skyline.png`} 
            alt="Nairobi Skyline"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
      
      {/* Right side: Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 order-1 md:order-2">
        <div className="max-w-xl text-center md:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-secondary italic mb-8">
            Practical Legal Solutions for Businesses and Individuals
          </h1>
          <p className="text-base md:text-lg text-primary/80 leading-relaxed font-sans">
            Whether you're a business navigating compliance or an individual facing a complex legal dispute, we provide practical client-centered legal advice and strategic representation tailored to your needs.
          </p>
          <div className="mt-10">
            <a 
              href="#contact" 
              className="inline-block bg-primary text-white px-8 py-4 text-sm font-semibold tracking-widest hover:bg-secondary transition-colors duration-300"
            >
              SCHEDULE A CONSULTATION
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
