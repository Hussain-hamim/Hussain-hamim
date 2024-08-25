import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
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

const ProjectsSection = ({ darkMode }) => {
  return (
    <FullScreenSection
      backgroundColor={darkMode ? "#CBD5E0" : "#212529"}
      isDarkBackground={darkMode}
      p={8}
      mb="35px"
      mt="35px"
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        Featured Projects
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
  );
};

export default ProjectsSection;
