import HeroSection from './HeroSection';
import HardwareSection from './HardwareSection';
import ResourcesSection from './ResourcesSection';
import FinalCTASection from './FinalCTASection';
import Footer from './Footer';
import Nav from './Nav';

interface HomePageProps {
  onNavigate: (target: 'home' | 'get-started') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <Nav onNavigate={onNavigate} currentPage="home" />
      <HeroSection />
      <HardwareSection />
      <ResourcesSection />
      <FinalCTASection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
