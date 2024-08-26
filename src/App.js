import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";
import { useRef, useEffect, useState } from "react";
// import ParticleBackground from "./components/ParticleBackground";
// import AnimatedBackground from "./components/AnimatedBackground";
// import "./AnimatedBackground.css"; // You should define styles for the 'particle' class here.

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // const bgRef = useRef(null);
  // const particleCount = 50;

  // useEffect(() => {
  //   const bg = bgRef.current;

  //   for (let i = 0; i < particleCount; i++) {
  //     createParticle(bg);
  //   }
  // }, []);

  // function createParticle() {
  //   const particle = document.createElement("div");
  //   particle.classList.add("particle");

  //   const size = Math.random() * 5 + 1;
  //   particle.style.width = `${size}px`;
  //   particle.style.height = `${size}px`;

  //   const startPositionX = Math.random() * window.innerWidth;
  //   const startPositionY = Math.random() * window.innerHeight;
  //   particle.style.left = `${startPositionX}px`;
  //   particle.style.top = `${startPositionY}px`;

  //   bgRef.current.appendChild(particle);
  //   console.log(bgRef.current);

  //   animateParticle(particle);
  // }

  // function animateParticle(particle) {
  //   const duration = Math.random() * 3 + 2;
  //   const angle = Math.random() * 360;
  //   const distance = Math.random() * 100 + 50;

  //   particle.animate(
  //     [
  //       { transform: "translate(0, 0)" },
  //       {
  //         transform: `translate(${Math.cos(angle) * distance}px, ${
  //           Math.sin(angle) * distance
  //         }px)`,
  //       },
  //     ],
  //     {
  //       duration: duration * 1000,
  //       iterations: Infinity,
  //       direction: "alternate",
  //       easing: "ease-in-out",
  //     }
  //   );
  // }
  // <div id="animated-bg" ref={bgRef}></div>

  return (
    <ChakraProvider>
      <AlertProvider>
        {/* <ParticleBackground /> */}
        {/* <AnimatedBackground /> */}
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
