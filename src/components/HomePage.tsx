import HeroSection from './HeroSection';
import HardwareSection from './HardwareSection';
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
      <FinalCTASection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
