export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="w-48">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Wahito Musonge & Company Advocates LLP" 
              className="w-full h-auto object-contain mix-blend-multiply"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href={`${import.meta.env.BASE_URL}#home`} className="text-xs font-semibold tracking-widest text-primary hover:text-secondary transition-colors">HOME</a>
            <a href={`${import.meta.env.BASE_URL}about-me`} className="text-xs font-semibold tracking-widest text-primary hover:text-secondary transition-colors">ABOUT</a>
            <a href={`${import.meta.env.BASE_URL}practice-areas`} className="text-xs font-semibold tracking-widest text-primary hover:text-secondary transition-colors">PRACTICE AREAS</a>
            <a href={`${import.meta.env.BASE_URL}insights`} className="text-xs font-semibold tracking-widest text-primary hover:text-secondary transition-colors">INSIGHTS</a>
            <a href={`${import.meta.env.BASE_URL}contact`} className="text-xs font-semibold tracking-widest text-primary hover:text-secondary transition-colors">CONTACT</a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary/60">
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
