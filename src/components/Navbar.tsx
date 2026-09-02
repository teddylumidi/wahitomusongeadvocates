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
    { name: 'ABOUT', href: `${import.meta.env.BASE_URL}#about` },
    { name: 'SERVICES', href: `${import.meta.env.BASE_URL}#practice-areas` },
    { name: 'INSIGHTS', href: `${import.meta.env.BASE_URL}#insights` },
    { name: 'CONTACT', href: `${import.meta.env.BASE_URL}#contact` },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
        <a href="#home" className="flex items-center gap-5 group">
          <img 
            src={`${import.meta.env.BASE_URL}images/logo.png`} 
            alt="Wahito Musonge & Company Advocates LLP" 
            className="h-16 md:h-20 object-contain"
          />
          <span className="hidden lg:block text-lg font-semibold text-primary whitespace-nowrap">
            Wahito Musonge &amp; Company Advocates LLP
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs font-semibold tracking-widest text-primary hover:text-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 border-t border-gray-100 flex flex-col">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-3 text-sm font-semibold tracking-widest text-primary border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
