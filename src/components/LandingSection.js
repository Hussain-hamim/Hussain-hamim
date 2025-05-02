import React from "react";
import { Avatar, Heading, HStack, VStack } from "@chakra-ui/react";
import "../App.css";
import hamim from "../asset/hhamim3.jpg";
import FullScreenSection from "./FullScreenSection";
import "./styles.css";

const LandingSection = () => {
  return (
    <div>
      <FullScreenSection justifyContent="center" alignItems="center">
        <VStack pt={32} mb={32} spacing={16}>
          <VStack spacing={4} alignItems="center">
            <Avatar className="prof" src={hamim} size="2xl" name="HHamim" />
            <Heading as="h5" size="sm" noOfLines={1}>
              <div class="typewriter-container">
                <h1 class="typewriter typewriter-container">
                  Hey!, I am
                  <span className="hussain">Hussain</span>
                </h1>
              </div>
            </Heading>
          </VStack>
          <VStack spacing={6}>
            <Heading as="h3" size="1xl" noOfLines={1}>
              A <span className="react">Full-Stack</span> Web &
            </Heading>
            <Heading as="h3" size="1xl" noOfLines={1}>
              <span className="react">Mobile </span>
              App Developer
            </Heading>
          </VStack>

          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#0dcaf0",
              backgroundColor: "rgba(26, 26, 26, 0.8)",
              margin: "20px",
              borderRadius: "5px",
              fontFamily: "monospace",
            }}
          >
            I focus on building modern, user-friendly digital experiences with
            clean code and pixel-perfect design. With expertise in JavaScript,
            TypeScript, React, Next.js, MongoDB, Node.js, and react-native for
            mobile app.
          </div>

          <Skills />
        </VStack>
      </FullScreenSection>
    </div>
  );
};

export default LandingSection;

const Skills = () => {
  return (
    <div style={{ textAlign: "center" }} id="skills-section">
      <Heading as="h4" size="1x" fontFamily="serif">
        Skills
      </Heading>

      <HStack
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          marginRight: 10,
          marginLeft: 10,
          transition: "all 0.4s ease-in-out",
        }}
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: "lg",
        }}
        _active={{
          transform: "scale(0.98)",
        }}
        animation="float 3s ease-in-out infinite"
        sx={{
          "@keyframes float": {
            "0%": {
              transform: "translateY(0px)",
            },
            "50%": {
              transform: "translateY(-10px)",
            },
            "100%": {
              transform: "translateY(0px)",
            },
          },
        }}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
          width="60"
          height="60"
          alt=""
          class="rounded  shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          width="62"
          height="62"
          alt=""
          class="rounded shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />

        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
          width="60"
          height="60"
          alt=""
          class=" rounded	  hover:shadow-xl transform hover:scale-105 transition duration-300"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
          width="65"
          height="65"
          alt=""
          class="rounded shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
          width="60"
          height="60"
          alt=""
          class="rounded shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
          width="65"
          height="65"
          alt=""
          class="rounded shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"
          width="65"
          height="65"
          alt=""
          class="rounded shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />
        <img
          src="https://images.credly.com/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png"
          width="65"
          height="65"
          alt=""
          class="rounded shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg"
          width="65"
          height="65"
          alt=""
          class="rounded shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png"
          width="65"
          height="65"
          alt=""
          class="rounded shadow hover:shadow-xl transform hover:scale-105 transition duration-300"
        />
      </HStack>
    </div>
  );
};
