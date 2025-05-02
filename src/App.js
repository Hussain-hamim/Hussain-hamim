import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import Alert from "./components/Alert";
import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import ProjectsSection from "./components/ProjectsSection";
import { AlertProvider } from "./context/alertContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ChakraProvider>
      <AlertProvider>
        <main>
          <Header
            darkMode={darkMode}
            isDarkMode={(darkMode) => setDarkMode(darkMode)}
          />
          <LandingSection darkMode={darkMode} />
          <ProjectsSection darkMode={darkMode} />
          <ContactMeSection darkMode={darkMode} />
          <Footer />
          <Alert />
        </main>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
