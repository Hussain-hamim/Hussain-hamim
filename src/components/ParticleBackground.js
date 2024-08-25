import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    // You can do something with the container here if needed
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0d47a1", // Background color
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#ffffff", // Particle color
          },
          links: {
            color: "#ffffff", // Link color
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80, // Number of particles
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle", // Shape of particles
          },
          size: {
            value: { min: 1, max: 5 }, // Size of particles
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
