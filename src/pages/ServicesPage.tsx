import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { PracticeAreas } from '@/components/PracticeAreas';
import { Footer } from '@/components/Footer';

export function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Wahito Musonge & Company Advocates LLP';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="pt-28">
        <PracticeAreas />
      </main>
      <Footer />
    </div>
  );
}