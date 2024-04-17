import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: mohammadhussainafghan83@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/Hussain-hamim",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/hussain-hamim/",
  },
  {
    icon: faTwitter,
    url: "https://twitter.com/hussainhamim_",
  },
  {
    icon: faInstagram,
    url: "https://www.instagram.com/hussainhamim_",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    function handleScroll() {
      const currScrollPos = window.scrollY;
      const currHeaderElement = headerRef.current;

      if (!currHeaderElement) {
        return;
      }
      if (prevScrollPos > currScrollPos) {
        currHeaderElement.style.transform = "translateY(0)";
      } else {
        currHeaderElement.style.transform = "translateY(-200)";
        prevScrollPos = currScrollPos;
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          w="100%"
          px={10}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={5}>
              {socials.map((social) => (
                <a key={social.url} href={social.url}>
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={5}>
              <a
                className="seeMore"
                href="/#projects-section"
                onClick={() => handleClick("projects")}
              >
                My Projects
              </a>
              <a
                className="seeMore"
                href="/#contactme-section"
                onClick={() => handleClick("contactme")}
              >
                Contact Me
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
