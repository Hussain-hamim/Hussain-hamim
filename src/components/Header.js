import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

const Header = () => {
  const headerRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Color values that match your dark theme
  const bgColor = useColorModeValue(
    'rgba(26, 26, 26, 0.9)',
    'rgba(17, 17, 17, 0.95)'
  );
  const menuBgColor = useColorModeValue(
    'rgba(26, 26, 26, 0.95)',
    'rgba(17, 17, 17, 0.98)'
  );
  const borderColor = useColorModeValue(
    'rgba(255, 255, 255, 0.1)',
    'rgba(255, 255, 255, 0.15)'
  );
  const highlightColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('white', 'gray.100');

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) return;

      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = 'translateY(0)';
      } else {
        headerElement.style.transform = 'translateY(-200px)';
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (anchor) => () => {
    const element = document.getElementById(`${anchor}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      ref={headerRef}
      transition='transform 0.3s ease-in-out'
      bg={bgColor}
      backdropFilter='blur(1px)'
      // borderBottom={`1px solid ${borderColor}`}
    >
      <Box maxWidth='1280px' margin='0 auto' px={{ base: 4, md: 8 }} py={3}>
        <HStack justifyContent='space-between' alignItems='center'>
          <HStack spacing={{ base: 3, md: 6 }}>
            {/* Social Links with pulse effect on hover */}
            <HStack spacing={3}>
              {socials.map(({ icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Box
                    as={FontAwesomeIcon}
                    icon={icon}
                    size='lg'
                    color='gray.300'
                    transition='all 0.3s ease'
                    _hover={{
                      color: highlightColor,
                      animation: 'pulse 0.5s ease',
                    }}
                    sx={{
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.2)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    }}
                  />
                </a>
              ))}
            </HStack>
          </HStack>

          {isMobile ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FontAwesomeIcon icon={faBars} />}
                variant='outline'
                color={textColor}
                borderColor={borderColor}
                _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                _expanded={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                aria-label='Navigation Menu'
              />
              <MenuList
                bg={menuBgColor}
                borderColor={borderColor}
                minWidth='150px'
              >
                {[
                  'skills',
                  'projects',
                  'mobile',
                  'certificates',
                  'contactme',
                ].map((item) => (
                  <MenuItem
                    bg={menuBgColor}
                    key={item}
                    onClick={handleClick(item)}
                    color={textColor}
                    _hover={{
                      bg: 'rgba(255, 255, 255, 0.05)',
                      color: highlightColor,
                    }}
                    _focus={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    {item.charAt(0).toUpperCase() +
                      item.slice(1).replace(/([A-Z])/g, ' $1')}
                  </MenuItem>
                ))}
                <MenuItem
                  bg={menuBgColor}
                  as='a'
                  href='https://github.com/Hussain-hamim/Hussain-hamim/releases/download/v1.0.0/Hussain-resume.pdf'
                  color={highlightColor}
                  _hover={{ bg: 'rgba(79, 209, 197, 0.1)' }}
                >
                  Download CV
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={4}>
              {[
                'skills',
                'projects',
                'mobile',
                'certificates',
                'contactme',
              ].map((item) => (
                <Button
                  key={item}
                  variant='ghost'
                  onClick={handleClick(item)}
                  color={textColor}
                  _hover={{
                    color: highlightColor,
                    transform: 'translateY(-2px)',
                  }}
                  transition='all 0.2s ease'
                >
                  {item.charAt(0).toUpperCase() +
                    item.slice(1).replace(/([A-Z])/g, ' $1')}
                </Button>
              ))}
              <Button
                as='a'
                href='https://github.com/Hussain-hamim/Hussain-hamim/releases/download/v1.0.0/Hussain-resume.pdf'
                colorScheme='teal'
                variant='outline'
                _hover={{ transform: 'translateY(-2px)' }}
                transition='all 0.2s ease'
              >
                Download CV
              </Button>
            </HStack>
          )}
        </HStack>
      </Box>
    </Box>
  );
};

const socials = [
  { icon: faEnvelope, url: 'mailto: mohammadhussainafghan83@gmail.com' },
  { icon: faGithub, url: 'https://github.com/Hussain-hamim' },
  { icon: faLinkedin, url: 'https://www.linkedin.com/in/hussain-hamim/' },
  { icon: faTwitter, url: 'https://twitter.com/hussainhamim_' },
  { icon: faInstagram, url: 'https://www.instagram.com/hussainhamim_' },
];

export default Header;
