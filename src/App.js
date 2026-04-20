import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import Alert from './components/Alert';
import ContactFooterWrap from './components/ContactFooterWrap';
import ContactMeSection from './components/ContactMeSection';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import ProjectsSection from './components/ProjectsSection';
import { AlertProvider } from './context/alertContext';
import PsEducationSection from './components/PsEducationSection';
import V2 from './components/V2';
import ProjectDetails from './components/ProjectDetails';
import ProjectsList from './components/ProjectsList';
import AllProjectsPage from './components/AllProjectsPage';
import ProposalDeckAgentPage from './components/ProposalDeckAgentPage';
import CaseStudyPage from './components/CaseStudyPage';
import starsAnimation from './assets/Stars.json';

function PortfolioPage({ locale }) {
  const isPashto = locale === 'ps';

  useEffect(() => {
    document.documentElement.lang = isPashto ? 'ps' : 'en';
    document.documentElement.dir = isPashto ? 'rtl' : 'ltr';
  }, [isPashto]);

  return (
    <main dir={isPashto ? 'rtl' : 'ltr'}>
      {/* Single Lottie for header + hero (upside down, clouds at top) */}
      <div className="fixed top-0 left-0 right-0 h-screen min-h-screen z-0 pointer-events-none">
        <div style={{ transform: 'scaleY(-1)', width: '100%', height: '100%' }}>
          <Lottie
            animationData={starsAnimation}
            loop
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            style={{ width: '100%', height: '100%', minHeight: '100%' }}
          />
        </div>
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>

      <Header locale={locale} />
      <LandingSection locale={locale} />
      <ProjectsSection locale={locale} />
      {isPashto && <PsEducationSection />}
      <ContactFooterWrap>
        <ContactMeSection locale={locale} />
        <Footer locale={locale} />
      </ContactFooterWrap>
      <Alert />
    </main>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AlertProvider>
          <Routes>
            <Route 
              path="/v2" 
              element={<V2 />} 
            />
            <Route
              path="/projects"
              element={<AllProjectsPage />}
            />
            <Route
              path="/projects-legacy"
              element={<ProjectsList />}
            />
            <Route
              path="/projects/:slug"
              element={<ProjectDetails />}
            />
            <Route
              path="/proposal/muse-ai-deck-agent"
              element={<ProposalDeckAgentPage />}
            />
            <Route
              path="/case-study/:slug"
              element={<CaseStudyPage />}
            />
            <Route
              path="/ps"
              element={<PortfolioPage locale="ps" />}
            />
            <Route 
              path="/*" 
              element={<PortfolioPage locale="en" />} 
            />
          </Routes>
        </AlertProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
