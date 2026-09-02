import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: `${import.meta.env.BASE_URL}#home` },
    { name: 'ABOUT', href: `${import.meta.env.BASE_URL}about-me` },
    { name: 'PRACTICE AREAS', href: `${import.meta.env.BASE_URL}practice-areas` },
    { name: 'INSIGHTS', href: `${import.meta.env.BASE_URL}insights` },
    { name: 'CONTACT', href: `${import.meta.env.BASE_URL}contact` },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300">
      <div className="mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between h-[90px]">
        <a href={`${import.meta.env.BASE_URL}#home`} className="flex items-center gap-4 group">
          <img 
            src={`${import.meta.env.BASE_URL}images/logo.png`} 
            alt="Wahito Musonge & Company Advocates LLP" 
            className="h-12 w-12 object-contain"
          />
          <span className="hidden md:block text-[15px] font-medium text-primary">
            Wahito Musonge &amp; Company Advocates LLP
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] font-medium tracking-[0.1em] text-primary hover:text-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-primary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 border-t border-gray-100 flex flex-col">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-3 text-xs font-medium tracking-[0.1em] text-primary border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
