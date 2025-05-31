import React from 'react';
import {
  Avatar,
  Heading,
  HStack,
  VStack,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import FullScreenSection from './FullScreenSection';
import hamim from '../asset/eren.jpg';
import { keyframes } from '@emotion/react';

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
const MotionAvatar = motion(Avatar);

// Your exact pulse animation
const pulseAnimation = css`
  animation: pulse-round 2s infinite;
  @keyframes pulse-round {
    0% {
      box-shadow: 0 0 0 0 rgba(91, 243, 49, 0.943);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
    }
  }
`;

const PulsingAvatar = ({ src, name }) => {
  return (
    <Box position='relative' display='inline-block'>
      <Avatar
        src={src}
        name={name}
        size='2xl'
        // border='3px solid'
        borderColor='greenyellow'
        css={pulseAnimation}
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease',
        }}
      />
    </Box>
  );
};

const LandingSection = () => {
  return (
    <Box as='section' position='relative' overflow='hidden'>
      <FullScreenSection justifyContent='center' alignItems='center'>
        <MotionVStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          pt={{ base: 24, md: 32 }}
          mb={{ base: 20, md: 32 }}
          spacing={12}
        >
          <VStack spacing={6} alignItems='center'>
            <PulsingAvatar src={hamim} name='Hussain Hamim' />

            <VStack spacing={1}>
              <MotionHeading
                as='h1'
                size={{ base: 'xl', md: '2xl' }}
                fontWeight='bold'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                textAlign='center'
              >
                Hey, I'm{' '}
                <Box as='span' color='teal.300'>
                  Hussain Hamim
                </Box>
              </MotionHeading>

              {/* Terminal-style aka text */}
              <Text
                fontFamily='monospace'
                color='gray.400'
                fontSize='sm'
                css={fadeInAnimation}
                style={{ animationDelay: '0.5s', opacity: 0 }}
              >
                <Box as='span' color='teal.300'>
                  -
                </Box>{' '}
                aka Eren on
                <Button
                  as='a'
                  variant='ghost'
                  href='https://x.com/erencodes'
                  colorScheme='teal'
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition='all 0.2s ease'
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
            >
              <Box as='span' color='teal.300'>
                Full-Stack
              </Box>{' '}
              Web
            </Heading>
            <Heading
              as='h3'
              size={{ base: 'md', md: 'lg' }}
              textAlign='center'
              fontWeight='medium'
            >
              &{' '}
              <Box as='span' color='teal.300'>
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
            color='gray.300'
            bg='rgba(26, 26, 26, 0.7)'
            borderRadius='lg'
            borderColor='rgba(255, 255, 255, 0.1)'
            backdropFilter='blur(3px)'
            css={fadeInAnimation}
            style={{ animationDelay: '0.9s', opacity: 0 }}
          >
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              I build fast, modern digital experiences with a focus on clean
              code and intuitive design. My expertise lies in the
              JavaScript/TypeScript ecosystem, working with tools like React,
              Next.js, Node.js, MongoDB, Postgres, and{' '}
              <Box
                as='span'
                // color='teal.300'
                // fontWeight='semibold'
                position='relative'
                _after={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: '-1px',
                  width: '100%',
                  height: '1px',
                  bg: 'teal.500',
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
        _after={{
          content: '""',
          display: 'block',
          width: '60px',
          height: '2px',
          bg: 'teal.400',
          margin: '0.5rem auto 0',
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
            whileHover={{ scale: 1.1 }}
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
                transform: 'scale(1.1) translateY(-5px)',
                filter: 'drop-shadow(0 5px 10px rgba(79, 209, 197, 0.3))',
              }}
            />
          </motion.div>
        ))}
      </HStack>
    </Box>
  );
};

export default LandingSection;
