// import React from "react";
// import { Avatar, Heading, VStack, chakra } from "@chakra-ui/react";
// import FullScreenSection from "./FullScreenSection";

// // Implement the UI for the LandingSection component according to the instructions.
// // Use a combination of Avatar, Heading and VStack components.
// const LandingSection = () => (
//   <FullScreenSection
//     justifyContent="center"
//     alignItems="center"
//     isDarkBackground
//     backgroundColor="#2A4365"
//   >
//     <VStack paddingTop={32}>
//       <Avatar name="Hussain" src={hamim} size="2xl"></Avatar>
//       <Heading size="md">{greeting}</Heading>
//     </VStack>

//     <VStack paddingBottom={32}>
//       <Heading size="2xl">{bio1}</Heading>
//       <Heading size="2xl">{bio2}</Heading>
//     </VStack>
//   </FullScreenSection>
// );

// export default LandingSection;

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
    <VStack spacing={16}>
      <VStack spacing={4} alignItems="center">
        <Avatar src={hamim} size="2xl" name="HHamim" />
        <Heading as="h4" size="md" noOfLines={1}>
          {greeting}
        </Heading>
      </VStack>
      <VStack spacing={6}>
        <Heading as="h1" size="3xl" noOfLines={1}>
          {bio1}
        </Heading>
        <Heading as="h1" size="3xl" noOfLines={1}>
          {bio2}
        </Heading>
      </VStack>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;
