import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Card = ({ title, description, imageSrc, link }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <div>
      <HStack spacing={3}>
        <Box
          backgroundColor="white"
          textColor="black"
          rounded="3xl"
          paddingBottom={5}
        >
          <VStack spacing={3}>
            <Image src={imageSrc} alt={title} rounded="3xl" />
            <Box paddingX={4}>
              <Heading paddingY={3} size="md">
                {title}
              </Heading>
              <Text>{description}</Text>
              <HStack spacing={2}>
                <Text marginBottom={0} fontWeight="bold">
                  <a className="seeMore" href={link}>
                    See More On
                  </a>
                </Text>
                <FontAwesomeIcon icon={faGithub} size="1x" />
                <FontAwesomeIcon icon={faArrowRight} size="1x" />
              </HStack>
            </Box>
          </VStack>
        </Box>
      </HStack>
    </div>
  );
};

export default Card;
