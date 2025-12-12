import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
              path="/*" 
              element={
                <main>
                  <Header />
                  <LandingSection />
                  <ExperienceSection />
                  <ProjectsSection />
                  <ContactMeSection />
                  <Footer />
                  <Alert />
                </main>
              } 
            />
          </Routes>
        </AlertProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
