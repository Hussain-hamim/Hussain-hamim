import React, { useEffect, useRef } from "react";

import { Avatar, Heading, VStack, HStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import hamim from "../asset/hhamim3.jpg";
import "./styles.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCss3,
  faFigma,
  faGit,
  faGithub,
  faHtml5,
  faIntercom,
  faJs,
  faNodeJs,
  faPerbyte,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCloud,
  faDatabase,
  faLaptopCode,
  faMobile,
  faServer,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { keyframes } from "framer-motion";
// import ParticleBackground from "./ParticleBackground";

// const greeting = "Hello, I am <span class="hussain">Hussain!</span>";
const bio1 = "A Full-stack And";
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
              Mobile <span className="react">Developer</span>
            </Heading>
          </VStack>

          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#0dcaf0",
              backgroundColor: "rgba(26, 26, 26, 0.8)",
              // opacity: 0.8,
              margin: "20px",
              borderRadius: "5px",
              // fontSize: "24px",
              fontFamily: "monospace",
            }}
          >
            My name is Hussain Hamim, a Computer Science student at Sheikh Zayed University. I have worked on numerous projects and have a strong grasp of frontend, backend (Full-Stack/MERN), and mobile development with React Native. My journey is driven by a passion for crafting seamless user experiences through innovative and pixel-perfect design.
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{ display: "flex", gap: 26, paddingBottom: 20 }}
              className="marquee marqueePC"
            >
              <FontAwesomeIcon icon={faLaptopCode} size="2x" color="green" />
              <FontAwesomeIcon icon={faJs} size="2x" color="tomato" />
              <FontAwesomeIcon icon={faReact} size="2x" color="lightblue" />
              <FontAwesomeIcon icon={faNodeJs} size="2x" color="green" />
              <FontAwesomeIcon icon={faServer} size="2x" color="lightblue" />
              <FontAwesomeIcon icon={faTools} size="2x" color="gray" />
              <FontAwesomeIcon icon={faGithub} size="2x" color="gray" />
            </div>
            <Heading as="h4" size="1x" fontFamily="serif">
              Skills
            </Heading>
            <div
              style={{ display: "flex", gap: 29 }}
              className="marquee marqueePC"
            >
              <FontAwesomeIcon icon={faHtml5} size="2x" color="tomato" />
              <FontAwesomeIcon icon={faCss3} size="2x" color="tomato" />
              <FontAwesomeIcon icon={faDatabase} size="2x" color="lightblue" />
              <FontAwesomeIcon icon={faGit} size="2x" color="tomato" />
              <FontAwesomeIcon icon={faMobile} size="2x" color="gray" />
              <FontAwesomeIcon icon={faFigma} size="2x" color="orchid" />
              <FontAwesomeIcon icon={faCloud} size="2x" color="orchid" />
            </div>
          </div>
        </VStack>
      </FullScreenSection>
    </div>
  );
};

export default LandingSection;
