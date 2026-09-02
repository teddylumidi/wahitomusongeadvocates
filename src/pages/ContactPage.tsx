import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Wahito Musonge & Company Advocates LLP';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="pt-28">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}