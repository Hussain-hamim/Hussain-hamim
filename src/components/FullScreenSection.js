import * as React from "react";
import { useRef, useEffect } from "react";
import { VStack } from "@chakra-ui/react";

import "./animatedBackground.css"; // You should define styles for the 'particle' class here.

const FullScreenSection = ({ children, isDarkBackground, ...boxProps }) => {
  const bgRef = useRef(null);
  const particleCount = 50;

  useEffect(() => {
    const bg = bgRef.current;

    for (let i = 0; i < particleCount; i++) {
      createParticle(bg);
    }
  }, []);

  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const startPositionX = Math.random() * window.innerWidth;
    const startPositionY = Math.random() * window.innerHeight;
    particle.style.left = `${startPositionX}px`;
    particle.style.top = `${startPositionY}px`;

    bgRef.current.appendChild(particle);
    console.log(bgRef.current);

    animateParticle(particle);
  }

  function animateParticle(particle) {
    const duration = Math.random() * 3 + 2;
    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 50;

    particle.animate(
      [
        { transform: "translate(0, 0)" },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${
            Math.sin(angle) * distance
          }px)`,
        },
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );
  }

  return (
    <VStack
      backgroundColor={"rgba(46, 66, 78, 0.1)"}
      color={isDarkBackground ? "black" : "white"}
    >
      <div id="animated-bg" ref={bgRef}></div>
      <VStack maxWidth="1280px" minHeight="100vh" w="100vw" {...boxProps}>
        {children}
      </VStack>
    </VStack>
  );
};

export default FullScreenSection;
