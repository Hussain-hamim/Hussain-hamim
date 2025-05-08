import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faNavicon } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
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
} from '@chakra-ui/react';

const Header = () => {
  const headerRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) {
        return;
      }
      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = 'translateY(0)';
      } else {
        headerElement.style.transform = 'translateY(-200px)';
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty='transform'
      transitionDuration='.3s'
      transitionTimingFunction='ease-in-out'
      backgroundColor='rgba(26, 26, 26, 0.8)'
      ref={headerRef}
      color='white'
      textColor='white'
      zIndex={1000}
    >
      <Box maxWidth='1280px' margin='0 auto'>
        <HStack
          px='15px'
          py={5}
          justifyContent='space-between'
          alignItems='center'
        >
          <nav>
            <HStack spacing={3}>
              {socials.map(({ icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon
                    size={'2x'}
                    color='lightgray'
                    icon={icon}
                    key={url}
                  />
                </a>
              ))}
            </HStack>
          </nav>

          {isMobile ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FontAwesomeIcon size={'2x'} icon={faNavicon} />}
                variant='outline'
                color='gray.200'
                bg='rgba(17, 17, 17, 0.95)'
                border='1px solid rgba(255, 255, 255, 0.1)'
                _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                _active={{ bg: 'rgba(255, 255, 255, 0.08)' }}
              />
              <MenuList
                bg='rgba(17, 17, 17, 0.95)'
                border='1px solid rgba(255, 255, 255, 0.1)'
                backdropFilter='blur(10px)'
                boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
              >
                <MenuItem
                  onClick={handleClick('skills')}
                  backgroundColor={'rgba(17, 17, 17, 0.95)'}
                  color={'ButtonFace'}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                >
                  Skills
                </MenuItem>
                <MenuItem
                  color={'ButtonFace'}
                  onClick={handleClick('projects')}
                  backgroundColor={'rgba(17, 17, 17, 0.95)'}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                >
                  Projects
                </MenuItem>
                <MenuItem
                  color={'ButtonFace'}
                  onClick={handleClick('mobile')}
                  backgroundColor={'rgba(17, 17, 17, 0.95)'}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                >
                  Mobile Projects
                </MenuItem>

                <MenuItem
                  onClick={handleClick('certificates')}
                  backgroundColor={'rgba(17, 17, 17, 0.95)'}
                  color={'ButtonFace'}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                >
                  Certificates
                </MenuItem>
                <MenuItem
                  onClick={handleClick('contactme')}
                  backgroundColor={'rgba(17, 17, 17, 0.95)'}
                  color={'ButtonFace'}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                >
                  Contact Me
                </MenuItem>

                <MenuItem
                  // onClick={handleClick('contactme')}
                  backgroundColor={'rgba(17, 17, 17, 0.95)'}
                  color={'ButtonFace'}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                  _focus={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                  style={{
                    padding: '4px 8px',
                    margin: '0px 10px',
                    borderRadius: 4,
                    maxWidth: '200px',
                    background: 'rgba(155, 60, 133, 0.84)',
                    color: 'lightblue',
                  }}
                >
                  <a href='https://github.com/Hussain-hamim/Hussain-hamim/releases/download/v1.0.0/Hussain-resume.pdf'>
                    Download CV
                  </a>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <nav>
              <HStack spacing={3} paddingRight={3}>
                <Button as='button' variant='link'>
                  <a href='#skills' onClick={handleClick('skills')}>
                    Skills
                  </a>
                </Button>
                <Button as='button' variant='link'>
                  <a href='#projects' onClick={handleClick('projects')}>
                    Projects
                  </a>
                </Button>
                <Button as='button' variant='link'>
                  <a href='#mobile' onClick={handleClick('mobile')}>
                    Mobile Projects
                  </a>
                </Button>
                <Button as='button' variant='link'>
                  <a href='#certificates' onClick={handleClick('certificates')}>
                    Certificates
                  </a>
                </Button>
                <Button as='button' variant='link'>
                  <a href='#contactme' onClick={handleClick('contactme')}>
                    Contact Me
                  </a>
                </Button>
                <Button
                  as='button'
                  variant='link'
                  style={{
                    padding: '5px 14px',
                    background: 'rgba(155, 60, 133, 0.84)',
                    color: 'lightblue',
                  }}
                >
                  <a
                    href='https://github.com/Hussain-hamim/Hussain-hamim/releases/download/v1.0.0/Hussain-resume.pdf'
                    // onClick={handleClick('#')}
                  >
                    Download CV
                  </a>
                </Button>
              </HStack>
            </nav>
          )}
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;

const socials = [
  {
    icon: faEnvelope,
    url: 'mailto: mohammadhussainafghan83@gmail.com',
  },
  {
    icon: faGithub,
    url: 'https://github.com/Hussain-hamim',
  },
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/hussain-hamim/',
  },
  {
    icon: faTwitter,
    url: 'https://twitter.com/hussainhamim_',
  },
  {
    icon: faInstagram,
    url: 'https://www.instagram.com/hussainhamim_',
  },
];
