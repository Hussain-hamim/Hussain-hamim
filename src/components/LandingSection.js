import React from 'react';
import {
  Avatar,
  Heading,
  HStack,
  VStack,
  Text,
  Box,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { keyframes, css } from '@emotion/react';
import FullScreenSection from './FullScreenSection';
import hamim from '../asset/eren.jpg';

// Water ripple animation
const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
`;

// Glitch text animation
const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
                -0.05em -0.025em 0 rgba(0,255,0,0.75),
                -0.025em 0.05em 0 rgba(0,0,255,0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
                -0.05em -0.025em 0 rgba(0,255,0,0.75),
                -0.025em 0.05em 0 rgba(0,0,255,0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75),
                 0.025em 0.025em 0 rgba(0,255,0,0.75),
                 -0.05em -0.05em 0 rgba(0,0,255,0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75),
                 0.025em 0.025em 0 rgba(0,255,0,0.75),
                 -0.05em -0.05em 0 rgba(0,0,255,0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75),
                 0.05em 0 0 rgba(0,255,0,0.75),
                 0 -0.05em 0 rgba(0,0,255,0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75),
                 0.05em 0 0 rgba(0,255,0,0.75),
                 0 -0.05em 0 rgba(0,0,255,0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255,0,0,0.75),
                 -0.025em -0.025em 0 rgba(0,255,0,0.75),
                 -0.025em -0.05em 0 rgba(0,0,255,0.75);
  }
`;

const fadeInAnimation = css`
  animation: fadeIn 1s ease-out forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);

const PulsingAvatar = ({ src, name }) => {
  const orchidColor = useColorModeValue('orchid', 'orchid.300');
  const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0 rgba(91, 243, 49, 0.943);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
    }
  `;

  return (
    <Box position='relative' display='inline-block'>
      <Avatar
        src={src}
        name={name}
        size='2xl'
        /* border='3px solid' */
        borderColor='greenyellow'
        css={css`
          animation: ${pulse} 2s infinite;
        `}
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease',
        }}
      />
      {/* Floating orb animation */}
      <Box
        position='absolute'
        top='-10px'
        right='-10px'
        w='20px'
        h='20px'
        borderRadius='full'
        bg={`radial-gradient(circle, ${orchidColor}, transparent 70%)`}
        filter='blur(2px)'
        css={css`
          animation: float 6s ease-in-out infinite;
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
          }
        `}
      />
    </Box>
  );
};

const GlitchText = ({ children }) => {
  return (
    <Box
      as='span'
      position='relative'
      display='inline-block'
      _before={{
        content: `"${children}"`,
        position: 'absolute',
        left: 0,
        color: 'white',
        textShadow: '2px 0 cyan',
        clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
        animation: `${glitch} 3s infinite alternate`,
      }}
      _after={{
        content: `"${children}"`,
        position: 'absolute',
        left: 0,
        color: 'white',
        textShadow: '-2px 0 magenta',
        clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
        animation: `${glitch} 2s infinite alternate-reverse`,
      }}
    >
      {children}
    </Box>
  );
};

const LandingSection = () => {
  const orchidColor = useColorModeValue('orchid', 'orchid.300');
  const textColor = useColorModeValue('white', 'gray.200');
  const secondaryTextColor = useColorModeValue('gray.300', 'gray.400');
  const cardBg = useColorModeValue(
    'rgba(26, 26, 26, 0.7)',
    'rgba(15, 15, 15, 0.7)'
  );
  const cardBorder = useColorModeValue(
    'rgba(255, 255, 255, 0.1)',
    'rgba(255, 255, 255, 0.05)'
  );

  return (
    <Box as='section' position='relative' overflow='hidden' minH='100vh'>
      {/* Animated gradient background elements */}
      <Box
        position='absolute'
        top='-100px'
        right='-100px'
        w='300px'
        h='300px'
        borderRadius='full'
        bg={`radial-gradient(circle, ${orchidColor}, transparent 70%)`}
        filter='blur(60px)'
        opacity={0.6}
        zIndex={0}
        css={css`
          animation: ${ripple} 8s ease-in-out infinite,
            float 15s ease-in-out infinite;
        `}
      />
      <Box
        position='absolute'
        bottom='-150px'
        left='-150px'
        w='400px'
        h='400px'
        borderRadius='full'
        bg={`radial-gradient(circle, ${orchidColor}, transparent 70%)`}
        filter='blur(80px)'
        opacity={0.4}
        zIndex={0}
        css={css`
          animation: ${ripple} 10s ease-in-out infinite reverse,
            float 20s ease-in-out infinite reverse;
        `}
      />
      {/* Additional floating orbs */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          position='absolute'
          w={`${Math.random() * 50 + 30}px`}
          h={`${Math.random() * 50 + 30}px`}
          borderRadius='full'
          bg={`radial-gradient(circle, ${orchidColor}${
            Math.floor(Math.random() * 30) + 10
          }%, transparent 70%)`}
          filter='blur(10px)'
          opacity={0.3}
          zIndex={0}
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          css={css`
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite
              ${Math.random() * 5}s;
          `}
        />
      ))}

      <FullScreenSection justifyContent='center' alignItems='center'>
        <MotionVStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          pt={{ base: 24, md: 32 }}
          mb={{ base: 20, md: 32 }}
          spacing={12}
          position='relative'
          zIndex={1}
        >
          <VStack spacing={6} alignItems='center'>
            <PulsingAvatar src={hamim} name='Hussain 2' />

            <VStack spacing={1}>
              <MotionHeading
                as='h1'
                size={{ base: 'xl', md: '2xl' }}
                fontWeight='bold'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                textAlign='center'
                color={textColor}
              >
                Hey, I'm <GlitchText>Hussain Hamim</GlitchText>
              </MotionHeading>

              <Text
                fontFamily='monospace'
                color={secondaryTextColor}
                fontSize='sm'
                css={fadeInAnimation}
                style={{ animationDelay: '0.5s', opacity: 0 }}
              >
                <Box as='span' color={orchidColor}>
                  -
                </Box>{' '}
                aka Eren on
                <Button
                  target='_blank'
                  as='a'
                  variant='ghost'
                  href='https://x.com/erencodes'
                  colorScheme='purple'
                  _hover={{
                    transform: 'translateY(-2px)',
                    bg: 'rgba(218, 112, 214, 0.1)',
                  }}
                  transition='all 0.2s ease'
                  ml={2}
                >
                  X
                </Button>
              </Text>
            </VStack>
          </VStack>

          <MotionVStack
            spacing={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Heading
              as='h2'
              size={{ base: 'lg', md: 'xl' }}
              textAlign='center'
              fontWeight='semibold'
              color={textColor}
            >
              <Box
                as='span'
                color={orchidColor}
                css={css`
                  position: relative;
                  &:after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 3px;
                    bottom: -5px;
                    left: 0;
                    background: linear-gradient(
                      90deg,
                      transparent,
                      ${orchidColor},
                      transparent
                    );
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.5s ease;
                  }
                  &:hover:after {
                    transform: scaleX(1);
                    transform-origin: left;
                  }
                `}
              >
                Full-Stack
              </Box>{' '}
              Web
            </Heading>
            <Heading
              as='h3'
              size={{ base: 'md', md: 'lg' }}
              textAlign='center'
              fontWeight='medium'
              color={textColor}
            >
              &{' '}
              <Box
                as='span'
                color={orchidColor}
                css={css`
                  position: relative;
                  &:after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 3px;
                    bottom: -5px;
                    left: 0;
                    background: linear-gradient(
                      90deg,
                      transparent,
                      ${orchidColor},
                      transparent
                    );
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.5s ease;
                  }
                  &:hover:after {
                    transform: scaleX(1);
                    transform-origin: left;
                  }
                `}
              >
                Mobile
              </Box>{' '}
              App Developer
            </Heading>
          </MotionVStack>

          <Box
            maxW='2xl'
            px={6}
            py={5}
            mx={4}
            textAlign='center'
            color={textColor}
            bg={cardBg}
            borderRadius='lg'
            border='1px solid'
            borderColor={cardBorder}
            backdropFilter='blur(5px)'
            css={fadeInAnimation}
            style={{ animationDelay: '0.9s', opacity: 0 }}
            _hover={{
              boxShadow: `0 0 20px ${orchidColor}40`,
              transform: 'translateY(-3px)',
            }}
            transition='all 0.3s ease'
          >
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              I build fast, modern digital experiences with a focus on clean
              code and intuitive design. My expertise lies in the
              JavaScript/TypeScript ecosystem, working with tools like React,
              Next.js, Node.js, MongoDB, Postgres, and{' '}
              <Box
                as='span'
                position='relative'
                _after={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: '-1px',
                  width: '100%',
                  height: '1px',
                  bg: orchidColor,
                  borderRadius: 'full',
                  animation: 'pulseUnderline 2s infinite',
                }}
              >
                React Native to build mobile applications
              </Box>
              .
            </Text>
          </Box>

          <Skills />
        </MotionVStack>
      </FullScreenSection>
    </Box>
  );
};

const Skills = () => {
  const orchidColor = useColorModeValue('orchid', 'orchid.300');
  const textColor = useColorModeValue('white', 'gray.200');

  const skills = [
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    },
    {
      name: 'React',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    },
    {
      name: 'Tailwind',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    },
    {
      name: 'Next.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
    },
    {
      name: 'Express',
      icon: 'https://images.credly.com/images/1c2c86e1-16ce-4e4d-a425-d1ac96bb026d/express.png',
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg',
    },
    {
      name: 'GitHub',
      icon: 'https://img.icons8.com/ios-filled/50/FFFFFF/github.png',
    },
  ];

  return (
    <Box id='skills-section' textAlign='center' mt={8}>
      <Heading
        as='h4'
        size='md'
        mb={8}
        position='relative'
        color={textColor}
        _after={{
          content: '""',
          display: 'block',
          width: '60px',
          height: '2px',
          bg: orchidColor,
          margin: '0.5rem auto 0',
          animation: 'pulseUnderline 2s infinite',
        }}
      >
        My Tech Stack
      </Heading>

      <HStack
        flexWrap='wrap'
        justifyContent='center'
        gap={{ base: 4, md: 6 }}
        px={{ base: 4, md: 0 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 * index,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.15,
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
          >
            <Box
              as='img'
              src={skill.icon}
              alt={skill.name}
              width={{ base: '50px', md: '60px' }}
              height={{ base: '50px', md: '60px' }}
              title={skill.name}
              cursor='pointer'
              transition='all 0.3s ease'
              _hover={{
                filter: `drop-shadow(0 0 10px ${orchidColor}80)`,
              }}
            />
          </motion.div>
        ))}
      </HStack>
    </Box>
  );
};

export default LandingSection;
