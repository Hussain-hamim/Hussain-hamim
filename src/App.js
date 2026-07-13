import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Alert from './components/Alert';
import ContactFooterWrap from './components/ContactFooterWrap';
import ContactMeSection from './components/ContactMeSection';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import ProjectsSection from './components/ProjectsSection';
import { AlertProvider } from './context/alertContext';
import { ThemeProvider } from './context/themeContext';
import PsEducationSection from './components/PsEducationSection';

const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const ProjectsList = lazy(() => import('./components/ProjectsList'));
const AllProjectsPage = lazy(() => import('./components/AllProjectsPage'));
const ProposalDeckAgentPage = lazy(() =>
  import('./components/ProposalDeckAgentPage')
);
const CaseStudyPage = lazy(() => import('./components/CaseStudyPage'));

const RouteFallback = () => (
  <div className='min-h-screen bg-[#0a0a0a]' aria-hidden />
);

function PortfolioPage({ locale }) {
  const isPashto = locale === 'ps';

  useEffect(() => {
    document.documentElement.lang = isPashto ? 'ps' : 'en';
    document.documentElement.dir = isPashto ? 'rtl' : 'ltr';
  }, [isPashto]);

  return (
    <main dir={isPashto ? 'rtl' : 'ltr'}>
      <Header locale={locale} />
      <LandingSection locale={locale} />
      <ProjectsSection locale={locale} />
      {isPashto && <PsEducationSection />}
      <ContactFooterWrap>
        <ContactMeSection locale={locale} />
        <Footer />
      </ContactFooterWrap>
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
              <Route path="/projects" element={<AllProjectsPage />} />
              <Route path="/projects-legacy" element={<ProjectsList />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route
                path="/proposal/muse-ai-deck-agent"
                element={<ProposalDeckAgentPage />}
              />
              <Route path="/case-study/:slug" element={<CaseStudyPage />} />
              <Route path="/ps" element={<PortfolioPage locale="ps" />} />
              <Route path="/*" element={<PortfolioPage locale="en" />} />
            </Routes>
          </Suspense>
          <Alert />
        </AlertProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
