import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import './SpacePortfolio.css';

export default function SpacePortfolioPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Hussain Hamim — Full-Stack & AI Engineer';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className='space-portfolio'>
      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
