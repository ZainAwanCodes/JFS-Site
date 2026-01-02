import ServicesDetail from '@/components/ServicesDetail';
import QuoteCalculator from '@/components/QuoteCalculator';
import VehicleGallery from '@/components/VehicleGallery';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <ServicesDetail />
        <VehicleGallery />
        <QuoteCalculator />
      </main>
    </div>
  );
}

