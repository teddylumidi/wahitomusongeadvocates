export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="w-32">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Wahito Musonge & Company Advocates LLP" 
              className="w-full h-auto object-contain"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href={`${import.meta.env.BASE_URL}#home`} className="text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors uppercase">HOME</a>
            <a href={`${import.meta.env.BASE_URL}about-me`} className="text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors uppercase">ABOUT</a>
            <a href={`${import.meta.env.BASE_URL}practice-areas`} className="text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors uppercase">PRACTICE AREAS</a>
            <a href={`${import.meta.env.BASE_URL}insights`} className="text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors uppercase">INSIGHTS</a>
            <a href={`${import.meta.env.BASE_URL}contact`} className="text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors uppercase">CONTACT</a>
          </div>
        </div>

        <address className="mb-10 border-t border-gray-200 pt-8 text-center text-[13px] not-italic leading-relaxed text-primary/70">
          <span className="font-semibold uppercase tracking-[0.1em] text-primary">Location:</span>{' '}
          9th Floor, Room 912, Unga House, Muthithi Road, Westlands, next to Sarit Center, Nairobi
        </address>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-primary/70 font-sans">
          <p>© {currentYear} Wahito Musonge & Company Advocates LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <a href={`${import.meta.env.BASE_URL}privacy-policy`} className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href={`${import.meta.env.BASE_URL}terms-and-conditions`} className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href={`${import.meta.env.BASE_URL}website-disclaimer`} className="hover:text-secondary transition-colors">Website Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
