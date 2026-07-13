import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Alert from './components/Alert';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import { AlertProvider } from './context/alertContext';
import { ThemeProvider } from './context/themeContext';

const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ContactFooterWrap = lazy(() => import('./components/ContactFooterWrap'));
const ContactMeSection = lazy(() => import('./components/ContactMeSection'));
const Footer = lazy(() => import('./components/Footer'));
const PsEducationSection = lazy(() => import('./components/PsEducationSection'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const ProjectsList = lazy(() => import('./components/ProjectsList'));
const AllProjectsPage = lazy(() => import('./components/AllProjectsPage'));
const ProposalDeckAgentPage = lazy(() =>
  import('./components/ProposalDeckAgentPage')
);
const CaseStudyPage = lazy(() => import('./components/CaseStudyPage'));

const RouteFallback = () => (
  <div className='min-h-screen bg-surface' aria-hidden />
);

const SectionFallback = ({ minHeight = '40vh' }) => (
  <div
    className='w-full bg-surface-alt'
    style={{ minHeight }}
    aria-hidden
  />
);

function PortfolioPage({ locale }) {
  const isPashto = locale === 'ps';

  useEffect(() => {
    document.documentElement.lang = isPashto ? 'ps' : 'en';
    document.documentElement.dir = isPashto ? 'rtl' : 'ltr';
  }, [isPashto]);

  // Warm the below-the-fold chunks after first paint so scroll feels instant
  useEffect(() => {
    const warm = () => {
      import('./components/ProjectsSection');
      import('./components/ContactFooterWrap');
      import('./components/ContactMeSection');
      import('./components/Footer');
    };
    let idleId;
    let timeoutId;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(warm, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(warm, 1200);
    }
    return () => {
      if (idleId != null && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main dir={isPashto ? 'rtl' : 'ltr'}>
      <Header locale={locale} />
      <LandingSection locale={locale} />
      <Suspense fallback={<SectionFallback minHeight='80vh' />}>
        <ProjectsSection locale={locale} />
      </Suspense>
      {isPashto ? (
        <Suspense fallback={<SectionFallback minHeight='40vh' />}>
          <PsEducationSection />
        </Suspense>
      ) : null}
      <Suspense fallback={<SectionFallback minHeight='60vh' />}>
        <ContactFooterWrap>
          <ContactMeSection locale={locale} />
          <Footer />
        </ContactFooterWrap>
      </Suspense>
    </main>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AlertProvider>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path='/projects' element={<AllProjectsPage />} />
              <Route path='/projects-legacy' element={<ProjectsList />} />
              <Route path='/projects/:slug' element={<ProjectDetails />} />
              <Route
                path='/proposal/muse-ai-deck-agent'
                element={<ProposalDeckAgentPage />}
              />
              <Route path='/case-study/:slug' element={<CaseStudyPage />} />
              <Route path='/ps' element={<PortfolioPage locale='ps' />} />
              <Route path='/*' element={<PortfolioPage locale='en' />} />
            </Routes>
          </Suspense>
          <Alert />
        </AlertProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
