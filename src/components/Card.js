import { Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Card = ({ title, description, imageSrc, link }) => {
  return (
    <VStack
      color="black"
      backgroundColor="rgba(26, 26, 26, 0.8)"
      cursor="pointer"
      borderRadius="xl"
    >
      <Image w="100vw" borderRadius="xl" src={imageSrc} alt={title} />
      <VStack spacing={4} p={4} alignItems="flex-start">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading color="#00ffff" as="h3" size="md">
            <a href={link}>{title}</a>
          </Heading>
        </HStack>
        <Text color="#ffffff" fontSize="lg">
          {description}
        </Text>
        <HStack spacing={2} alignItems="center" fontSize="sm">
          <p className="mb-0 seeMore">
            <a href={link}>
              <Button variant="link">See more on</Button>
            </a>{" "}
            <FontAwesomeIcon color="white" icon={faGithub} size="1x" />{" "}
            <FontAwesomeIcon color="white" icon={faArrowRight} size="1x" />
          </p>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
