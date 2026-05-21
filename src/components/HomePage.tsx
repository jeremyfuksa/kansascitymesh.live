import HeroSection from './HeroSection';
import HardwareSection from './HardwareSection';
import ResourcesSection from './ResourcesSection';
import HostInfrastructureCTA from './HostInfrastructureCTA';
import DroneFlyCTA from './DroneFlyCTA';
import FinalCTASection from './FinalCTASection';
import Footer from './Footer';
import Nav from './Nav';

interface HomePageProps {
  onNavigate: (target: 'home' | 'get-started' | 'host' | 'steal') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <Nav onNavigate={onNavigate} currentPage="home" />
      <HeroSection />
      <HardwareSection />
      <ResourcesSection />
      <HostInfrastructureCTA onNavigate={onNavigate} />
      <DroneFlyCTA />
      <FinalCTASection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
