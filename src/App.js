import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from './components/Alert';
import ContactMeSection from './components/ContactMeSection';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingSection from './components/LandingSection';
import ProjectsSection from './components/ProjectsSection';
import { AlertProvider } from './context/alertContext';
import ExperienceSection from './components/ExperienceSection';
import V2 from './components/V2';
import ProjectDetails from './components/ProjectDetails';
import ProjectsList from './components/ProjectsList';

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
      <ExperienceSection locale={locale} />
      <ProjectsSection locale={locale} />
      <ContactMeSection locale={locale} />
      <Footer locale={locale} />
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
              element={<ProjectsList />}
            />
            <Route
              path="/projects/:slug"
              element={<ProjectDetails />}
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
