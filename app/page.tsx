import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ServicesPreview from '@/components/ServicesPreview';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import CEOSection from '@/components/CEOSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Features />
        <ServicesPreview />
        <CEOSection />
        <Testimonials />
        <CTA />
      </main>
    </div>
  );
}

