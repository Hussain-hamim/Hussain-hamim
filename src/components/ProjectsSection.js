import React from 'react';
import FullScreenSection from './FullScreenSection';
import { Box, Heading } from '@chakra-ui/react';
import Card from './Card';

const ProjectsSection = () => {
  return (
    <>
      <FullScreenSection
        p='20px'
        mb='35px'
        mt='35px'
        alignItems='flex-start'
        spacing={8}
      >
        <Heading as='h1' id='projects-section'>
          Web Featured Projects
        </Heading>
        <Box className='gridBox'>
          {projects.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              link={project.link}
              imageSrc={project.getImageSrc()}
              live={project.live}
            />
          ))}
        </Box>
      </FullScreenSection>
      <FullScreenSection
        p='20px'
        mb='35px'
        mt='35px'
        alignItems='flex-start'
        spacing={8}
      >
        <Heading as='h1' id='mobile-section'>
          Mobile Featured Projects
        </Heading>
        <Box className='gridBox'>
          {mobileProjects.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              link={project.link}
              imageSrc={project.getImageSrc()}
            />
          ))}
        </Box>
      </FullScreenSection>

      <FullScreenSection
        p='20px'
        mb='35px'
        mt='35px'
        alignItems='flex-start'
        spacing={8}
      >
        <Heading as='h1' id='certificates-section'>
          Certificates & Awards
        </Heading>
        <Box className='gridBox'>
          {certificates.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              link={project.link}
              imageSrc={project.getImageSrc()}
            />
          ))}
        </Box>
      </FullScreenSection>
    </>
  );
};
export default ProjectsSection;

const projects = [
  {
    title: 'DevSync- Developers Collab Platform',
    description:
      'DevSync is a collaborative platform designed for developers to connect, share knowledge, and collaborate on projects. It features user profiles, project listings, and a real-time chat system, all built with Next.js and Tailwind CSS. and supabase for database and auth, its a full-stack application that showcases modern web development practices.',
    getImageSrc: () => require('../images/devsync.png'),
    link: 'https://github.com/Hussain-hamim/DevSync',
    live: '...',
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
      'Issue Tracker is a full-stack project built with Next.js, inspired by the Next.js Acme project. It allows users to create, assign, and manage issues efficiently. The app features modern UI/UX, authentication, role-based access, and database integration—showcasing scalable architecture and production-ready best practices.',

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
    title: 'Done With It',
    description:
      'Sell what you do not need on this mobile app platform, working based on node api',
    getImageSrc: () => require('../images/donewithit.png'),
    link: 'https://github.com/Hussain-hamim/donewithit',
  },
  {
    title: 'Shan-AI',
    description: 'Ask ShanAI anything, a cross platform mobile app',
    getImageSrc: () => require('../images/shanai.png'),
    link: 'https://github.com/Hussain-hamim',
  },
  {
    title: 'Threads',
    description:
      'Threads clone, a mobile app that exactly mimic Threads app, A full-stack cross-platform app with convex as db, and clerk for auth',
    getImageSrc: () => require('../images/threads.png'),
    link: 'https://github.com/Hussain-hamim/threads',
  },
  {
    title: 'SnapDish',
    description:
      'A Food ordering mobile app, that handle both admin and user side, user give orders and admin update user about the order, with push notification and Stripe payment integration',
    getImageSrc: () => require('../images/snapdish.png'),
    link: 'https://github.com/Hussain-hamim/plantly',
  },
  {
    title: 'Plantly',
    description: 'Kepp your plants healthy and hydrated with this mobile app ',
    getImageSrc: () => require('../images/plantly.png'),
    link: 'https://github.com/Hussain-hamim/plantly',
  },
  {
    title: 'Brick Blitz Game',
    description:
      'A cross-platform mobile game built with React Native, featuring a classic brick-breaker gameplay with modern twists and engaging graphics.',
    getImageSrc: () => require('../images/blitz.png'),
    link: 'https://github.com/Hussain-hamim/brick-blitz-game',
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
