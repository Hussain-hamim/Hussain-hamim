import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
const AllBlogsPage = lazy(() => import('./components/AllBlogsPage'));
const ProposalDeckAgentPage = lazy(() =>
  import('./components/ProposalDeckAgentPage')
);
const CaseStudyPage = lazy(() => import('./components/CaseStudyPage'));
const NewPortfolioPage = lazy(() => import('./new-portfolio/NewPortfolioPage'));
const SpacePortfolioPage = lazy(() =>
  import('./space-portfolio/SpacePortfolioPage')
);
const VortxPortfolioPage = lazy(() =>
  import('./vortx-portfolio/VortxPortfolioPage')
);
const StudioPortfolioPage = lazy(() =>
  import('./studio-portfolio/StudioPortfolioPage')
);
const TouchSomeGrassPage = lazy(() =>
  import('./touch-some-grass/TouchSomeGrassPage')
);

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

function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    const id = hash.replace(/^#/, '');
    if (!id) return undefined;

    let cancelled = false;
    let attempts = 0;

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 80) {
        window.setTimeout(tryScroll, 50);
      }
    };

    tryScroll();
    return () => {
      cancelled = true;
    };
  }, [hash]);
}

function PortfolioPage({ locale }) {
  const isPashto = locale === 'ps';
  useScrollToHash();

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
              <Route path='/touch-some-grass' element={<TouchSomeGrassPage />} />
              <Route path='/projects' element={<AllProjectsPage />} />
              <Route path='/blogs' element={<AllBlogsPage />} />
              <Route path='/projects-legacy' element={<ProjectsList />} />
              <Route path='/projects/:slug' element={<ProjectDetails />} />
              <Route
                path='/proposal/muse-ai-deck-agent'
                element={<ProposalDeckAgentPage />}
              />
              <Route path='/case-study/:slug' element={<CaseStudyPage />} />
              <Route path='/ps' element={<PortfolioPage locale='ps' />} />
              <Route path='/new' element={<NewPortfolioPage />} />
              <Route path='/new2' element={<SpacePortfolioPage />} />
              <Route path='/new3' element={<VortxPortfolioPage />} />
              <Route path='/new4' element={<StudioPortfolioPage />} />
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
