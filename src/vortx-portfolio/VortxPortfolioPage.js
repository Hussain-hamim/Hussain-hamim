import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import './VortxPortfolio.css';

export default function VortxPortfolioPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Hussain Hamim — Portfolio';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className='vortx-portfolio'>
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
