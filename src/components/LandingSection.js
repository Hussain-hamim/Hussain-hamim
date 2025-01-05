import React, { useEffect, useRef } from "react";

import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import hamim from "../asset/hhamim3.jpg";
import "./styles.css";
import "../App.css";
// import ParticleBackground from "./ParticleBackground";

// const greeting = "Hello, I am <span class="hussain">Hussain!</span>";
const bio1 = "A Full-stack developer";
// const bio2 = "Specialized in React";

const LandingSection = ({ darkMode }) => {
  // particle:

  return (
    <div>
      {/* <ParticleBackground></ParticleBackground> */}

      <FullScreenSection
        justifyContent="center"
        alignItems="center"
        // backgroundColor={darkMode ? "#CBD5E0" : "#212529"}
        isDarkBackground={darkMode}
        className="newBg"
      >
        {/* <AnimatedBackground></AnimatedBackground> */}
        <VStack pt={32} mb={32} spacing={16}>
          <VStack spacing={4} alignItems="center">
            <Avatar className="prof" src={hamim} size="2xl" name="HHamim" />
            <Heading as="h5" size="sm" noOfLines={1}>
              <div class="typewriter-container">
                <h1 class="typewriter typewriter-container">
                  Hello, I am
                  <span className="hussain">Hussain</span>
                </h1>
              </div>
            </Heading>
          </VStack>
          <VStack spacing={6}>
            <Heading as="h3" size="1xl" noOfLines={1}>
              {bio1}
            </Heading>
            <Heading as="h3" size="1xl" noOfLines={1}>
              {/* {bio2} */}
              And Mobile <span className="react">Developer</span>
            </Heading>
          </VStack>

          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "gray",
              opacity: 0.8,
            }}
          >
            My name is Hussain Hamim, I am studying computer science at Sheikh
            zayed university. I have worked on many projects and have solid
            understanding in Frontend, Backend (Full-stack / MERN stack) and
            mobile development with react-native skills. my journey involves
            crafting delightful user experience through innovative and pixel
            perfect design.
          </div>
        </VStack>
      </FullScreenSection>
    </div>
  );
};

export default LandingSection;
