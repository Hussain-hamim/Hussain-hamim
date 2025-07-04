import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  useBreakpointValue,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCode, FaServer, FaMobileAlt } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);

const ExperienceSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Move all hook calls to the top level
  const isMobile = useBreakpointValue({ base: true, md: false });
  const orchidColor = useColorModeValue('orchid', 'orchid.300');
  const boxShadowColor = useColorModeValue(
    '0 10px 25px -5px rgba(218, 112, 214, 0.4), 0 10px 10px -5px rgba(218, 112, 214, 0.2)',
    '0 10px 25px -5px rgba(218, 112, 214, 0.6), 0 10px 10px -5px rgba(218, 112, 214, 0.4)'
  );
  const textColor = useColorModeValue('white', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.700');
  const highlightTextColor = useColorModeValue('white', 'gray.200');

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const experiences = [
    // {
    //   id: 1,
    //   role: 'Fronted developer',
    //   company: 'LinkedTrust',
    //   duration: '2025 Jan - 2025 Mar',
    //   description:
    //     'Developed and maintained responsive web applications using React and Next.js. Collaborated with UX designers to implement pixel-perfect interfaces.',

    //   icon: FaBriefcase,
    //   highlights: [
    //     'Built and maintain fullstack reactjs website',
    //     'Developed a responsive and user-friendly interface',
    //     'ux/ui design collaboration',
    //   ],
    // },
    {
      id: 1,
      role: 'Mobile Developer',
      company: 'Himalbyte',
      duration: '2025 Jun  - present',
      description:
        'Developed cross-platform mobile applications using React Native. Focused on performance optimization and user experience enhancements.',
      icon: FaCode,
      highlights: [
        'Implement both client and admin panel for the app',
        'push notifications and real-time updates',
        'Supabase integration for backend services',
        'authentication and user management',
      ],
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Muslim Commune',
      duration: '2025 Jun - present',
      description:
        'Designed and developed a full-stack web application using NextJS, TailwindCSS and Supabase for backend, including payment integration. Implemented authentication and user management features.',
      icon: FaServer,
      highlights: [
        'Developed a full-stack web application using NextJS and Supabase',
        'Implemented payment integration for premium features',
        'Created a user-friendly interface with TailwindCSS',
        'Ensured secure authentication and user management',
      ],
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Box
      id='experience'
      py={20}
      px={{ base: 5, md: 10, lg: 20 }}
      position='relative'
      overflow='hidden'
    >
      {/* Decorative elements */}
      <Box
        position='absolute'
        top='-100px'
        right='-100px'
        w='300px'
        h='300px'
        borderRadius='full'
        bg={`linear-gradient(135deg, ${orchidColor} 0%, rgba(218, 112, 214, 0.1) 70%)`}
        filter='blur(60px)'
        opacity={0.6}
        zIndex={0}
      />
      <Box
        position='absolute'
        bottom='-150px'
        left='-150px'
        w='400px'
        h='400px'
        borderRadius='full'
        bg={`linear-gradient(45deg, ${orchidColor} 0%, rgba(218, 112, 214, 0.1) 70%)`}
        filter='blur(80px)'
        opacity={0.4}
        zIndex={0}
      />

      <VStack
        spacing={12}
        maxW='1200px'
        mx='auto'
        position='relative'
        zIndex={1}
        ref={ref}
      >
        <MotionBox
          initial='hidden'
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' },
            },
          }}
        >
          <Heading
            as='h2'
            size='2xl'
            textAlign='center'
            mb={4}
            position='relative'
            textColor={'white'}
            _after={{
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              bg: orchidColor,
              margin: '1rem auto 0',
              borderRadius: 'full',
            }}
          >
            Professional Journey
          </Heading>
          <Text textAlign='center' maxW='600px' mx='auto' color={textColor}>
            My career path and the valuable experiences I've gained along the
            way
          </Text>
        </MotionBox>

        <VStack spacing={0} align='stretch' position='relative' width='100%'>
          {/* Timeline line */}
          {!isMobile && (
            <MotionBox
              position='absolute'
              left='50px'
              top='0'
              bottom='0'
              width='4px'
              bg={`linear-gradient(to bottom, ${orchidColor}, purple.500)`}
              borderRadius='full'
              variants={lineVariants}
              initial='hidden'
              animate={controls}
            />
          )}

          {experiences.map((exp, index) => (
            <MotionBox
              key={exp.id}
              custom={index}
              initial='hidden'
              animate={controls}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: false, margin: '0px 0px -100px 0px' }}
            >
              <Flex
                direction={{ base: 'column', md: 'row' }}
                p={6}
                my={4}
                borderRadius='xl'
                // bg={cardBg}
                boxShadow='md'
                _hover={{
                  boxShadow: boxShadowColor,
                  borderLeft: { md: `4px solid ${orchidColor}` },
                }}
                transition='all 0.3s ease'
                position='relative'
                overflow='hidden'
              >
                {/* Hover effect overlay */}
                <Box
                  position='absolute'
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg={`linear-gradient(135deg, rgba(218, 112, 214, 0.05) 0%, rgba(218, 112, 214, 0.01) 100%)`}
                  opacity={0}
                  _hover={{ opacity: 1 }}
                  transition='opacity 0.3s ease'
                  zIndex={0}
                />

                {/* Timeline dot for desktop */}
                {!isMobile && (
                  <Box
                    position='absolute'
                    left='38px'
                    top='50%'
                    transform='translateY(-50%)'
                    w='24px'
                    h='24px'
                    borderRadius='full'
                    bg={orchidColor}
                    boxShadow={`0 0 0 4px ${cardBg}, 0 0 0 6px ${orchidColor}`}
                    zIndex={2}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Icon as={exp.icon} color='white' boxSize={3} />
                  </Box>
                )}

                {/* Mobile icon */}
                {isMobile && (
                  <Box
                    mb={4}
                    w='50px'
                    h='50px'
                    borderRadius='full'
                    bg={`linear-gradient(135deg, ${orchidColor}, purple.500)`}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    boxShadow='md'
                  >
                    <Icon as={exp.icon} color='white' boxSize={5} />
                  </Box>
                )}

                <Box
                  flex={1}
                  pl={{ base: 0, md: '80px' }}
                  position='relative'
                  zIndex={1}
                >
                  <HStack spacing={2} align='baseline' mb={2}>
                    <Heading as='h3' size='lg' color={orchidColor}>
                      {exp.role}
                    </Heading>
                    <Text fontSize='sm' color={textColor}>
                      @ {exp.company}
                    </Text>
                  </HStack>

                  <Text color={textColor} mb={4} fontStyle='italic'>
                    {exp.duration}
                  </Text>

                  <Text mb={4} color={highlightTextColor}>
                    {exp.description}
                  </Text>

                  <VStack align='start' spacing={2} mb={4}>
                    {exp.highlights.map((highlight, i) => (
                      <HStack key={i} spacing={3}>
                        <Box
                          w='8px'
                          h='8px'
                          borderRadius='full'
                          bg={orchidColor}
                          flexShrink={0}
                          mt='5px'
                        />
                        <Text color={textColor}>{highlight}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </Flex>
            </MotionBox>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default ExperienceSection;
