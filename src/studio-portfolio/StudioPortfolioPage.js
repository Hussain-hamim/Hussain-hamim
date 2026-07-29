import { useCallback, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import WorksSection from './components/WorksSection';
import JournalSection from './components/JournalSection';
import ExplorationsSection from './components/ExplorationsSection';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';
import './StudioPortfolio.css';

export default function StudioPortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);

  const onComplete = useCallback(() => {
    setIsLoading(false);
    document.title = 'Hussain Hamim — Collection ’26';
  }, []);

  return (
    <div className='studio-portfolio'>
      {isLoading ? <LoadingScreen onComplete={onComplete} /> : null}
      {!isLoading ? (
        <>
          <HeroSection />
          <WorksSection />
          <JournalSection />
          <ExplorationsSection />
          <StatsSection />
          <ContactSection />
        </>
      ) : null}
    </div>
  );
}
