import React from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { keyframes, css } from '@emotion/react';
import FullScreenSection from './FullScreenSection';
import Card from './Card';
import { FaCode, FaMobile, FaAward } from 'react-icons/fa';

// Animations
const ripple = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 0.4; }
  100% { transform: scale(1); opacity: 0.6; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const pulseUnderline = keyframes`
  0% { opacity: 0.5; transform: scaleX(0.8); }
  50% { opacity: 1; transform: scaleX(1.1); }
  100% { opacity: 0.5; transform: scaleX(0.8); }
`;

const cardHover = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const ProjectsSection = () => {
  const orchidColor = useColorModeValue('orchid', 'orchid.300');
  const textColor = useColorModeValue('white', 'gray.200');
  const cardHoverShadow = useColorModeValue(
    '0 10px 25px -5px rgba(218, 112, 214, 0.4)',
    '0 10px 25px -5px rgba(218, 112, 214, 0.6)'
  );

  // Section icons
  const sectionIcons = {
    web: FaCode,
    mobile: FaMobile,
    certificates: FaAward,
  };

  return (
    <Box as='section' position='relative' overflow='hidden'>
      {/* Gradient background elements */}
      <Box
        position='absolute'
        top='-100px'
        right='-100px'
        w='450px'
        h='450px'
        borderRadius='full'
        bg={`radial-gradient(circle, ${orchidColor}, transparent 70%)`}
        filter='blur(60px)'
        opacity={0.6}
        zIndex={0}
        css={css`
          animation: ${ripple} 8s ease-in-out infinite,
            ${float} 15s ease-in-out infinite;
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
            ${float} 20s ease-in-out infinite reverse;
        `}
      />

      {/* Floating orbs */}
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
            animation: ${float} ${Math.random() * 10 + 10}s ease-in-out infinite
              ${Math.random() * 5}s;
          `}
        />
      ))}

      {/* Web Projects */}
      <FullScreenSection
        p='20px'
        mb='35px'
        mt='35px'
        alignItems='flex-start'
        spacing={8}
        position='relative'
        zIndex={1}
      >
        <MotionHeading
          as='h1'
          id='projects-section'
          size='2xl'
          mb={8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          color={textColor}
          css={css`
            display: flex;
            align-items: center;
            gap: 12px;
          `}
        >
          Web Featured Projects
        </MotionHeading>

        <MotionBox
          display='grid'
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={8}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {projects.map((project, index) => (
            <MotionBox
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
              css={css`
                &:hover {
                  animation: ${cardHover} 2s ease-in-out infinite;
                }
              `}
            >
              <Card
                title={project.title}
                description={project.description}
                link={project.link}
                imageSrc={project.getImageSrc()}
                live={project.live}
                _hover={{
                  boxShadow: cardHoverShadow,
                  borderColor: orchidColor,
                }}
              />
            </MotionBox>
          ))}
        </MotionBox>
      </FullScreenSection>

      {/* Mobile Projects */}
      <FullScreenSection
        p='20px'
        mb='35px'
        mt='35px'
        alignItems='flex-start'
        spacing={8}
        position='relative'
        zIndex={1}
      >
        <Box
          position='absolute'
          top='-130px'
          right='-100px'
          w='450px'
          h='450px'
          borderRadius='full'
          bg={`radial-gradient(circle, ${orchidColor}, transparent 70%)`}
          filter='blur(60px)'
          opacity={0.6}
          zIndex={0}
          css={css`
            animation: ${ripple} 8s ease-in-out infinite,
              ${float} 15s ease-in-out infinite;
          `}
        />

        <MotionHeading
          as='h1'
          id='mobile-projects-section'
          size='2xl'
          mb={8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          color={textColor}
          css={css`
            display: flex;
            align-items: center;
            gap: 12px;
          `}
        >
          Mobile Featured Projects
        </MotionHeading>

        <MotionBox
          display='grid'
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={8}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, staggerChildren: 0.1 }}
        >
          {mobileProjects.map((project, index) => (
            <MotionBox
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
              css={css`
                &:hover {
                  animation: ${cardHover} 2s ease-in-out infinite;
                }
              `}
            >
              <Card
                title={project.title}
                description={project.description}
                link={project.link}
                live={project.live}
                imageSrc={project.getImageSrc()}
                _hover={{
                  boxShadow: cardHoverShadow,
                  borderColor: orchidColor,
                }}
              />
            </MotionBox>
          ))}
        </MotionBox>
      </FullScreenSection>

      {/* Certificates */}
      <FullScreenSection
        p='20px'
        mb='35px'
        mt='35px'
        alignItems='flex-start'
        spacing={8}
        position='relative'
        zIndex={1}
      >
        <Box
          position='absolute'
          top='-100px'
          right='-120px'
          w='300px'
          h='300px'
          borderRadius='full'
          bg={`radial-gradient(circle, ${orchidColor}, transparent 70%)`}
          filter='blur(60px)'
          opacity={0.6}
          zIndex={0}
          css={css`
            animation: ${ripple} 8s ease-in-out infinite,
              ${float} 15s ease-in-out infinite;
          `}
        />
        <MotionHeading
          as='h1'
          id='certificates-section'
          size='2xl'
          mb={8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          color={textColor}
          css={css`
            display: flex;
            align-items: center;
            gap: 12px;
          `}
        >
          Certificates & Awards
        </MotionHeading>

        <MotionBox
          display='grid'
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={8}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, staggerChildren: 0.1 }}
        >
          {certificates.map((project, index) => (
            <MotionBox
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
              css={css`
                &:hover {
                  animation: ${cardHover} 2s ease-in-out infinite;
                }
              `}
            >
              <Card
                title={project.title}
                description={project.description}
                link={project.link}
                imageSrc={project.getImageSrc()}
                _hover={{
                  boxShadow: cardHoverShadow,
                  borderColor: orchidColor,
                }}
              />
            </MotionBox>
          ))}
        </MotionBox>
      </FullScreenSection>
    </Box>
  );
};

export default ProjectsSection;

const projects = [
  {
    title: 'DevSync- Developers Collab Platform',
    description:
      'DevSync is a collaborative platform designed for developers to connect and collaborate on projects. It features user profiles, project listings, and a real-time chat system, all built with Next.js and Tailwind CSS, Supabase DB.',
    getImageSrc: () => require('../images/devsync.png'),
    link: 'https://github.com/Hussain-hamim/DevSync',
    live: 'https://devsyncdotdev.vercel.app/',
  },
  {
    title: 'Ocean Of Games',
    description:
      'A game platform which is a clone of popular RAWG website and also powered by rawg api. browse, select, and search from a tons of games',
    getImageSrc: () => require('../images/oceanofgames.png'),
    link: 'https://github.com/Hussain-hamim/ocean-of-games',
    live: 'https://ocean-of-games.vercel.app/',
  },
  {
    title: 'Book Ocean',
    description:
      'in this book platform after login you can discover, add up book to reading list, add book to fished list, give note, give stars to the book and you can search in a whole lots of books',
    getImageSrc: () => require('../images/bookocean.png'),
    link: 'https://github.com/Hussain-hamim/book-ocean',
    live: 'https://book-ocean.vercel.app/discover',
  },
  {
    title: 'Nature Quest',
    description:
      ' A dynamic tour booking platform that allows users to explore amazing travel destinations. This app is powered by a custom-built backend with real-time tour data, authentication, and an interactive UI',
    getImageSrc: () => require('../images/naturequest.png'),
    link: 'https://github.com/Hussain-hamim/NatureQuest',
    live: 'https://nature-quest-gamma.vercel.app/',
  },
  {
    title: 'Issue Tracker',
    description:
      'Issue Tracker is a full-stack project built with Next.js, inspired by the Next.js Acme project. It allows users to create, assign, and manage issues efficiently. The app features modern UI/UX, authentication, and db integration.',

    getImageSrc: () => require('../images/issuetracker.png'),
    link: 'https://github.com/Hussain-hamim/issue-tracker',
    live: 'https://issue-tracker-tan-eta.vercel.app/',
  },
  {
    title: 'TaskList',
    description:
      'This is a web application for managing your tanks. The application allows users to add, remove, and mark tasks as completed and add different sections',
    getImageSrc: () => require('../images/tasklist.png'),
    link: 'https://github.com/Hussain-hamim/my-tasklist',
    live: 'https://my-tasklist-gamma.vercel.app/',
  },
  {
    title: 'Hamimfy',
    description:
      'Hamimfy is a responsive website design to showcase various features and techniques in modern web development. It specifically focuces on cloud hosting services',
    getImageSrc: () => require('../images/hamimfy.png'),
    link: 'https://github.com/Hussain-hamim/hamimfy',
    live: 'https://hamimfy.vercel.app/',
  },
];

const mobileProjects = [
  {
    title: 'Shan-AI',
    description: 'Ask ShanAI anything, a cross platform mobile app',
    getImageSrc: () => require('../images/shanai2.png'),
    link: 'https://github.com/Hussain-hamim',
    live: 'https://github.com/Hussain-hamim/ShanAI/releases/download/my-tag/ShanAI_1.0.0.apk',
  },
  {
    title: 'Threads',
    description:
      'Threads clone, a mobile app that exactly mimic Threads app, A full-stack cross-platform app with convex as db, and clerk for auth',
    getImageSrc: () => require('../images/threads2.png'),
    link: 'https://github.com/Hussain-hamim/threads',
  },

  {
    title: 'Himal Beauty',
    description:
      'A Barber booking mobile app, having both admin and client side panel, full stack with supabase',
    getImageSrc: () => require('../images/himal-beauty.png'),
    link: 'https://github.com/Hussain-hamim/barber-app',
  },
  {
    title: 'Brick Blitz Game',
    description:
      'A cross-platform mobile game built with React Native, featuring a classic brick-breaker gameplay with modern twists and engaging graphics.',
    getImageSrc: () => require('../images/blitz.png'),
    link: 'https://github.com/Hussain-hamim',
  },
  {
    title: 'SnapDish',
    description:
      'A Food ordering mobile app, that handle both admin and user side, user give orders and admin update user about the order, with push notification and Stripe payment integration',
    getImageSrc: () => require('../images/snapdish2.png'),
    link: 'https://github.com/Hussain-hamim/SnapDish',
  },
  {
    title: 'Done With It',
    description:
      'Sell what you do not need on this mobile app platform, working based on node api',
    getImageSrc: () => require('../images/donewithit2.png'),
    link: 'https://github.com/Hussain-hamim/donewithit',
  },
  {
    title: 'Plantly',
    description: 'Kepp your plants healthy and hydrated with this mobile app ',
    getImageSrc: () => require('../images/plantly.png'),
    link: 'https://github.com/Hussain-hamim/plantly',
  },
];

const certificates = [
  {
    title: 'Meta Front-End Developer Specialization',
    description:
      'Meta Front-End Developer Specialization include 9 courses, took approximately 7 months to get this certificate',
    getImageSrc: () => require('../images/meta-cert.jpeg'),
    link: 'https://www.coursera.org/account/accomplishments/specialization/CMEZCDWLG4AG?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n',
    live: 'https://www.coursera.org/account/accomplishments/specialization/CMEZCDWLG4AG?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n',
  },
];
