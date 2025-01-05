import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "Ocean Of Games",
    description:
      "A game platform which is a clone of popular RAWG website and also powered by rawg api. browse, select, and search from a tons of games.🚀",
    getImageSrc: () => require("../images/header.jpg"),
    link: "https://github.com/Hussain-hamim/ocean-of-games",
  },

  {
    title: "Book Ocean",
    description:
      "in this book platform after login you can discover, add up book to reading list, add book to fished list, give note, give stars to the book and you can search in a whole lots of books",
    getImageSrc: () => require("../images/bookocean.png"),
    link: "https://book-ocean.vercel.app/discover",
  },
  {
    title: "Hamimfy",
    description:
      "Hamimfy is a responsive website design to showcase various features and techniques in modern web development. It specifically focuces on cloud hosting services.🚀",
    getImageSrc: () => require("../images/photo1.jpg"),
    link: "https://github.com/Hussain-hamim/hamimfy",
  },
  {
    title: "Todo List",
    description:
      "This is a simple React-based web application for managing a to-do list. The application allows users to add, remove, and mark tasks as completed.🔥️",
    getImageSrc: () => require("../images/photo2.jpg"),
    link: "https://github.com/Hussain-hamim/My-Todo-list",
  },
  {
    title: "Expense Tracker",
    description:
      "This is a simple expense tracker app built with React. It allows users to manage their expenses by adding, deleting, and filtering based on categories.📉",
    getImageSrc: () => require("../images/photo3.jpg"),
    link: "https://github.com/Hussain-hamim/Expense-Tracker",
  },
  {
    title: "Contact Display",
    description:
      "This application allow you to add, display and delete contact with ease and smoothly",
    getImageSrc: () => require("../images/photo4.jpg"),
    link: "https://github.com/Hussain-hamim/Contact-Display",
  },
];

const mobileProjects = [
  {
    title: "Done With It",
    description:
      "Sell what you do not need on this mobile app platform, working based on node api. 📱",
    getImageSrc: () => require("../images/donewithit.png"),
    link: "https://github.com/Hussain-hamim/ocean-of-games",
  },
  {
    title: "Plantly",
    description:
      "Kepp your plants healthy and hydrated with this mobile app. 📱🌿 ",
    getImageSrc: () => require("../images/plantly.png"),
    link: "https://github.com/Hussain-hamim/ocean-of-games",
  },
  {
    title: "Camera-app",
    description:
      "A gallery app that used to take photos, record short videos and save it as native",
    getImageSrc: () => require("../images/camera-app.png"),
    link: "https://github.com/Hussain-hamim/ocean-of-games",
  },
  {
    title: "ChatGPT clone app",
    description: "coming soon...",
    getImageSrc: () => require("../images/header.jpg"),
    link: "https://github.com/Hussain-hamim/ocean-of-games",
  },
];

const ProjectsSection = ({ darkMode }) => {
  return (
    <>
      <FullScreenSection
        // backgroundColor={darkMode ? "#CBD5E0" : "#212529"}
        isDarkBackground={darkMode}
        // p={{ lg: "50px", sm: "15px", md: "15px" }}
        p="20px"
        mb="35px"
        mt="35px"
        alignItems="flex-start"
        spacing={8}
      >
        <Heading as="h1" id="projects-section">
          Web Featured Projects
        </Heading>
        <Box className="gridBox">
          {projects.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              link={project.link}
              imageSrc={project.getImageSrc()}
            />
          ))}
        </Box>
      </FullScreenSection>
      <FullScreenSection
        // backgroundColor={darkMode ? "#CBD5E0" : "#212529"}
        isDarkBackground={darkMode}
        // p={{ lg: "50px", sm: "15px", md: "15px" }}
        p="20px"
        mb="35px"
        mt="35px"
        alignItems="flex-start"
        spacing={8}
      >
        <Heading as="h1" id="projects-section">
          Mobile Featured Projects
        </Heading>
        <Box className="gridBox">
          {mobileProjects.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              link={project.link}
              imageSrc={project.getImageSrc()}
            />
          ))}
        </Box>
      </FullScreenSection>
    </>
  );
};

export default ProjectsSection;
