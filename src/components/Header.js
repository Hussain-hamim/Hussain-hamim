import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Switch } from "@chakra-ui/react";

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

/**
 * This component illustrates the use of both the useRef hook and useEffect hook.
 * The useRef hook is used to create a reference to a DOM element, in order to tweak the header styles and run a transition animation.
 * The useEffect hook is used to perform a subscription when the component is mounted and to unsubscribe when the component is unmounted.
 * Additionally, it showcases a neat implementation to smoothly navigate to different sections of the page when clicking on the header elements.
 */
const Header = ({ isDarkMode, darkMode }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) {
        return;
      }
      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = "translateY(0)";
      } else {
        headerElement.style.transform = "translateY(-200px)";
      }
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      ref={headerRef}
      color="white"
      textColor="white"
    >
      <Box maxWidth="1280px" margin="0 auto">
        <HStack
          px="15px"
          py={8}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={3}>
              {socials.map(({ icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    className="seeMore"
                    icon={icon}
                    size="1x"
                    key={url}
                  />
                </a>
              ))}
            </HStack>
          </nav>

          <nav>
            <HStack spacing={4}>
              <a
                className="seeMore"
                href="#projects"
                onClick={handleClick("projects")}
              >
                Projects
              </a>
              <a
                className="seeMore"
                href="#contactme"
                onClick={handleClick("contactme")}
              >
                Contact Me
              </a>
              <Switch onChange={() => isDarkMode(!darkMode)} />
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
