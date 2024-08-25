import React, { useEffect, useRef } from "react";

import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import hamim from "../asset/hhamim.jpg";
import "./styles.css";
import "../App.css";

// const greeting = "Hello, I am <span class="hussain">Hussain!</span>";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

const LandingSection = ({ darkMode }) => {
  // particles:

  // // typewriter:
  // function typeWriter(element, text, i = 0) {
  //   if (i < text.length) {
  //     element.innerHTML += text.charAt(i);
  //     i++;
  //     setTimeout(() => typeWriter(element, text, i), 20);
  //   }
  // }

  // const aboutSection = document.querySelector("div");
  // console.log(aboutSection);
  // const originalText = aboutSection.innerText;
  // aboutSection.innerText = "";
  // setTimeout(() => typeWriter(aboutSection, originalText), 1500);

  return (
    <FullScreenSection
      justifyContent="center"
      alignItems="center"
      backgroundColor={darkMode ? "#CBD5E0" : "#212529"}
      isDarkBackground={darkMode}
      className="newBg"
    >
      <VStack pt={32} mb={32} spacing={16}>
        <VStack spacing={4} alignItems="center">
          <Avatar className="prof" src={hamim} size="2xl" name="HHamim" />
          <Heading as="h5" size="sm" noOfLines={1}>
            <div class="typewriter-container">
              <h1 class="typewriter typewriter-container">
                Hello, I am
                <span className="hussain">Hussain</span>!
              </h1>
            </div>
          </Heading>
        </VStack>
        <VStack spacing={6}>
          <Heading as="h3" size="2xl" noOfLines={1}>
            {bio1}
          </Heading>
          <Heading as="h3" size="2xl" noOfLines={1}>
            {bio2}
          </Heading>
        </VStack>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
