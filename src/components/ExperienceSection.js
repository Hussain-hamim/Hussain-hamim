import React, { useEffect } from 'react';
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
  IconButton,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaServer, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { keyframes } from '@emotion/react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionFlex = motion(Flex);

// Water wave animation
const waterWave = keyframes`
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 0.8;
  }
  33% {
    transform: scale(1.1) translate(10%, 5%);
    opacity: 0.6;
  }
  66% {
    transform: scale(1.05) translate(-5%, 10%);
    opacity: 0.7;
  }
  100% {
    transform: scale(1) translate(0, 0);
    opacity: 0.8;
  }
`;

const ExperienceSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [expandedCard, setExpandedCard] = React.useState(null);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const orchidColor = useColorModeValue('orchid', 'orchid.300');
  const textColor = useColorModeValue('white', 'gray.200');
  const secondaryTextColor = useColorModeValue(
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)'
  );

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const experiences = [
    {
      id: 1,
      role: 'Mobile Developer',
      company: 'Himalbyte',
      duration: '2025 Jun - present',
      description:
        'Developed cross-platform mobile applications using React Native with a focus on performance optimization and superior user experience.',
      icon: FaCode,
      highlights: [
        'Implemented client and admin panels with real-time updates',
        'Integrated Supabase for backend services and authentication',
        'Optimized app performance and reduced load times by 40%',
        'Implemented push notifications and offline capabilities',
      ],
      tech: ['React Native', 'Supabase', 'TypeScript', 'Expo'],
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Muslim Commune',
      duration: '2025 Jun - present',
      description:
        'Led development of a full-stack community platform with payment integration and premium features.',
      icon: FaServer,
      highlights: [
        'Built with Next.js, TailwindCSS and Supabase',
        'Implemented Stripe payment integration',
        'Developed admin dashboard with analytics',
        'Achieved 95% Lighthouse performance score',
      ],
      tech: ['Next.js', 'TailwindCSS', 'Supabase', 'Stripe'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <Box
      id='experience'
      py={20}
      px={{ base: 5, md: 10, lg: 20 }}
      position='relative'
      overflow='hidden'
      // bg='rgba(15, 15, 15, 0.95)'
    >
      {/* Animated Water Wave Gradients */}
      <Box
        position='absolute'
        top='-50%'
        left='-10%'
        w='80%'
        h='150%'
        bgGradient='radial(ellipse at center, rgba(218, 112, 214, 0.15) 0%, transparent 70%)'
        filter='blur(60px)'
        zIndex={0}
        opacity={0.8}
        animation={`${waterWave} 15s ease-in-out infinite`}
      />
      <Box
        position='absolute'
        bottom='-30%'
        right='-10%'
        w='60%'
        h='100%'
        bgGradient='radial(ellipse at center, rgba(255, 0, 128, 0.1) 0%, transparent 70%)'
        filter='blur(80px)'
        zIndex={0}
        opacity={0.6}
        animation={`${waterWave} 20s ease-in-out infinite reverse`}
      />
      <Box
        position='absolute'
        top='20%'
        right='20%'
        w='40%'
        h='80%'
        bgGradient='radial(ellipse at center, rgba(100, 200, 255, 0.05) 0%, transparent 70%)'
        filter='blur(40px)'
        zIndex={0}
        opacity={0.4}
        animation={`${waterWave} 25s ease-in-out infinite 2s`}
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
              transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              },
            },
          }}
          textAlign='center'
        >
          <Heading
            as='h2'
            size='2xl'
            mb={4}
            bgGradient={`linear(to-r, ${orchidColor}, #FF0080)`}
            bgClip='text'
          >
            Work Experience
          </Heading>
          <Text color={secondaryTextColor} maxW='600px' mx='auto' fontSize='lg'>
            My professional journey through innovative companies and exciting
            projects
          </Text>
        </MotionBox>

        <MotionVStack
          spacing={6}
          align='stretch'
          width='100%'
          variants={containerVariants}
          initial='hidden'
          animate={controls}
        >
          {experiences.map((exp, index) => (
            <MotionBox
              key={exp.id}
              variants={itemVariants}
              custom={index}
              position='relative'
            >
              <MotionFlex
                direction='column'
                p={6}
                borderRadius='xl'
                bg='rgba(255, 255, 255, 0.03)'
                border='1px solid'
                borderColor='rgba(255, 255, 255, 0.05)'
                backdropFilter='blur(10px)'
                boxShadow='0 8px 32px rgba(0, 0, 0, 0.2)'
                _hover={{
                  borderColor: orchidColor,
                  boxShadow: `0 8px 32px ${orchidColor}30`,
                }}
                transition='all 0.3s ease'
                initial={{ height: 'auto' }}
                animate={{
                  height: expandedCard === exp.id ? 'auto' : 'auto',
                }}
              >
                {/* Header */}
                <Flex
                  justify='space-between'
                  align='center'
                  mb={expandedCard === exp.id ? 4 : 0}
                >
                  <HStack spacing={4}>
                    <Box
                      w='50px'
                      h='50px'
                      borderRadius='12px'
                      bgGradient={`linear(to-br, ${orchidColor}, #FF0080)`}
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      flexShrink={0}
                    >
                      <Icon as={exp.icon} color='white' boxSize={5} />
                    </Box>
                    <Box>
                      <Heading as='h3' size='lg' color={textColor}>
                        {exp.role}
                      </Heading>
                      <Text color={orchidColor} fontSize='sm'>
                        {exp.company} • {exp.duration}
                      </Text>
                    </Box>
                  </HStack>
                  <IconButton
                    aria-label={expandedCard === exp.id ? 'Collapse' : 'Expand'}
                    icon={
                      expandedCard === exp.id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )
                    }
                    variant='ghost'
                    color={textColor}
                    onClick={() => toggleExpand(exp.id)}
                    _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                  />
                </Flex>

                {/* Expanded Content */}
                {expandedCard === exp.id && (
                  <MotionBox
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    overflow='hidden'
                  >
                    <VStack spacing={4} align='start' pt={4}>
                      <Text color={textColor} lineHeight='tall'>
                        {exp.description}
                      </Text>

                      <Box width='100%'>
                        <Text fontWeight='bold' color={orchidColor} mb={2}>
                          Key Contributions:
                        </Text>
                        <VStack spacing={2} align='start'>
                          {exp.highlights.map((highlight, i) => (
                            <HStack key={i} spacing={3} alignItems='flex-start'>
                              <Box
                                w='8px'
                                h='8px'
                                borderRadius='full'
                                bg={orchidColor}
                                flexShrink={0}
                                mt='8px'
                              />
                              <Text color={textColor}>{highlight}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>

                      <Box width='100%'>
                        <Text fontWeight='bold' color={orchidColor} mb={2}>
                          Technologies Used:
                        </Text>
                        <Flex wrap='wrap' gap={2}>
                          {exp.tech.map((tech, i) => (
                            <Box
                              key={i}
                              px={3}
                              py={1}
                              borderRadius='full'
                              bg='rgba(218, 112, 214, 0.1)'
                              border='1px solid'
                              borderColor='rgba(218, 112, 214, 0.3)'
                            >
                              <Text color={orchidColor} fontSize='sm'>
                                {tech}
                              </Text>
                            </Box>
                          ))}
                        </Flex>
                      </Box>
                    </VStack>
                  </MotionBox>
                )}
              </MotionFlex>
            </MotionBox>
          ))}
        </MotionVStack>
      </VStack>
    </Box>
  );
};

export default ExperienceSection;
