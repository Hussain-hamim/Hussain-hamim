import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box backgroundColor="rgba(26, 26, 26, 0.8)">
      <footer>
        <Flex
          margin="0 auto"
          px={12}
          color="white"
          justifyContent="center"
          alignItems="center"
          maxWidth="1024px"
          height={16}
        >
          <p>
            Made with 💖 by <span className="react">Hussain </span> • 2025
          </p>
        </Flex>
      </footer>
    </Box>
  );
};

export default Footer;
