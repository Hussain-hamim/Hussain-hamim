import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import './NewPortfolio.css';

export default function NewPortfolioPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Hussain -- Creator';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className='new-portfolio'>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
