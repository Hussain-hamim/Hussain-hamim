import {
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const Card = ({ title, description, imageSrc, link, live }) => {
  const getTagColor = () => {
    if (title.toLowerCase().includes('mobile')) {
      return { bg: 'rgba(147, 51, 234, 0.3)', text: 'purple.200' };
    }
    if (description.toLowerCase().includes('certificate')) {
      return { bg: 'rgba(234, 179, 8, 0.3)', text: 'yellow.200' };
    }
    if (
      description.toLowerCase().includes('backend') ||
      description.toLowerCase().includes('full-stack') ||
      description.toLowerCase().includes('login') ||
      description.toLowerCase().includes('api')
    ) {
      return { bg: 'rgba(59, 130, 246, 0.3)', text: 'blue.200' };
    }
    return { bg: 'rgba(34, 197, 94, 0.3)', text: 'green.200' };
  };

  const tagInfo = getTagColor();
  const tagText = description.toLowerCase().includes('mobile')
    ? 'Mobile'
    : description.toLowerCase().includes('certificate')
    ? 'Certificate'
    : description.toLowerCase().includes('backend') ||
      description.toLowerCase().includes('full-stack') ||
      description.toLowerCase().includes('login') ||
      description.toLowerCase().includes('api')
    ? 'Full Stack'
    : 'Frontend';

  return (
    <Box
      as='article'
      borderRadius='xl'
      overflow='hidden'
      bg='rgba(26, 26, 26, 0.8)'
      color='white'
      transition='all 0.3s ease'
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 8px rgba(108, 116, 52, 0.3)',
      }}
      boxShadow='md'
      height='100%'
      display='flex'
      flexDirection='column'
      cursor='pointer'
    >
      <Box flex='1' display='flex' flexDirection='column'>
        <Image
          src={imageSrc}
          alt={title}
          w='100%'
          borderRadius='xl'
          objectFit='cover'
          opacity={0.8}
        />
        <VStack spacing={4} p={6} alignItems='flex-start' flex='1'>
          <HStack justifyContent='space-between' width='100%'>
            <Heading
              as='h3'
              size='md'
              fontWeight='semibold'
              letterSpacing='tight'
            >
              {title}
            </Heading>
            <Button
              size='sm'
              variant='ghost'
              borderRadius='full'
              px={3}
              bg={tagInfo.bg}
              color={tagInfo.text}
              fontSize='xs'
              fontWeight='bold'
            >
              {tagText}
            </Button>
          </HStack>

          <Text color='gray.300' fontSize='md' lineHeight='tall'>
            {description}
          </Text>

          <HStack mt='auto' pt={2} spacing={4}>
            <Button
              as='a'
              href={link}
              variant='outline'
              size='sm'
              rightIcon={<FontAwesomeIcon icon={faGithub} />}
              colorScheme='blue'
              onClick={(e) => e.stopPropagation()}
            >
              Code
            </Button>
            {live && (
              <Button
                as='a'
                href={live}
                variant='outline'
                size='sm'
                rightIcon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                colorScheme='blue'
              >
                Live Demo
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Card;
