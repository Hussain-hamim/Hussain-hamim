import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import hamim from "../asset/hhamim.jpg";

const greeting = "Hello, I am Hussain!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack pt={32} mb={32} spacing={16}>
      <VStack spacing={4} alignItems="center">
        <Avatar src={hamim} size="2xl" name="HHamim" />
        <Heading as="h5" size="sm" noOfLines={1}>
          {greeting}
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

export default LandingSection;
