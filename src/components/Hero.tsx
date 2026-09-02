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
      <div className="w-full md:w-[50%] flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 order-1 md:order-2 bg-white flex-shrink-0">
        <div className="max-w-[500px] text-center animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif leading-[1.1] text-secondary italic mb-8">
            Practical Legal Solutions<br />for Businesses and<br />Individuals
          </h1>
          <p className="text-base md:text-lg text-primary leading-relaxed font-serif">
            Whether you're a business navigating compliance or an individual facing a
            complex legal dispute, we provide practical client-centered legal advice and
            strategic representation tailored to your needs.
          </p>
        </div>
      </div>
    </section>
  );
}
