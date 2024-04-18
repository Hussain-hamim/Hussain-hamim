import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Card = ({ title, description, imageSrc, link }) => {
  return (
    <VStack
      color="black"
      backgroundColor="white"
      cursor="pointer"
      borderRadius="xl"
    >
      <Image h="50vh" w="100vw" borderRadius="xl" src={imageSrc} alt={title} />
      <VStack spacing={4} p={4} alignItems="flex-start">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h3" size="md">
            {title}
          </Heading>
        </HStack>
        <Text color="#64748b" fontSize="lg">
          {description}
        </Text>
        <HStack spacing={2} alignItems="center">
          <p className="mb-0 seeMore">
            <a href={link}>
              <b>See more</b>
            </a>
          </p>
          <FontAwesomeIcon icon={faGithub} size="1x" />

          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
