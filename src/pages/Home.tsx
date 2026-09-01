import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { PracticeAreas } from '@/components/PracticeAreas';
import { Insights } from '@/components/Insights';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
