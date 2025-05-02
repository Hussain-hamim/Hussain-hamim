import { Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Card = ({ title, description, imageSrc, link, live }) => {
  return (
    <VStack
      color="black"
      backgroundColor="rgba(26, 26, 26, 0.8)"
      cursor="pointer"
      borderRadius="xl"
      transition="all 0.3s"
      _hover={{
        filter: "blur(1px)",
        transform: "scale(1.02)",
      }}
    >
      <a href={live}>
        <Image w="100vw" borderRadius="xl" src={imageSrc} alt={title} />
        <VStack spacing={4} p={4} alignItems="flex-start">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading className="react" as="h4" size="lg">
              <a href={link}>{title}</a>
            </Heading>
          </HStack>
          <Text color="#ffffff" fontSize="lg">
            {description}...
            <a href={link}>
              <Button variant="link" size={"lg"} color={"lightblue"}>
                View on
              </Button>
              <FontAwesomeIcon
                style={{ marginLeft: 5 }}
                color="white"
                icon={faGithub}
                size={"1x"}
              />
            </a>
          </Text>
        </VStack>
      </a>
    </VStack>
  );
};

export default Card;
