import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "Hamimfy",
    description:
      "Hamimfy is a responsive website design to showcase various features and techniques in modern web development. It specifically focuces on cloud hosting services.",
    getImageSrc: () => require("../images/photo11.jpg"),
    link: "https://github.com/Hussain-hamim/hamimfy",
  },
  {
    title: "Todo List",
    description:
      "This is a simple React-based web application for managing a to-do list. The application allows users to add, remove, and mark tasks as completed.🔥️",
    getImageSrc: () => require("../images/photo22.jpg"),
    link: "https://github.com/Hussain-hamim/My-Todo-list",
  },
  {
    title: "Expense Tracker",
    description:
      "This is a simple expense tracker app built with React. It allows users to manage their expenses by adding, deleting, and filtering based on categories.",
    getImageSrc: () => require("../images/photo33.jpg"),
    link: "https://github.com/Hussain-hamim/Expense-Tracker",
  },
  {
    title: "Contact Display",
    description:
      "This application allow you to add, display and delete contact with ease and smoothly",
    getImageSrc: () => require("../images/photo44.jpg"),
    link: "https://github.com/Hussain-hamim/Contact-Display",
  },
];

const ProjectsSection = () => {
  return (
    <FullScreenSection
      backgroundColor="#529bace0"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        Featured Projects
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2,minmax(0,1fr))"
        gridGap={8}
      >
        {projects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            description={project.description}
            imageSrc={project.getImageSrc()}
            link={project.link}
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
