import React from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  HStack,
  Icon,
  Image,
  VStack,
  Button,
} from '@chakra-ui/react';
import { css } from '@emotion/react';

// Enhanced Card component
const Card = ({ title, description, imageSrc, link, live, _hover }) => {
  const orchidColor = useColorModeValue('gray', 'orchid.300');
  const textColor = useColorModeValue('white', 'white');
  const cardBg = useColorModeValue('white', 'gray.800');

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
      // bg={cardBg}
      color={textColor}
      transition='all 0.3s ease'
      boxShadow='md'
      height='100%'
      display='flex'
      flexDirection='column'
      cursor='pointer'
      position='relative'
      zIndex={1}
      // {..._hover}
      css={css`
        &:hover {
          box-shadow: 0 10px 25px -5px rgba(218, 112, 214, 0.4);
        }
      `}
    >
      <Box flex='1' display='flex' flexDirection='column'>
        <Image
          src={imageSrc}
          alt={title}
          w='100%'
          h='240px'
          objectFit='cover'
          borderTopRadius='xl'
        />
        <VStack spacing={4} p={6} alignItems='flex-start' flex='1'>
          <HStack justifyContent='space-between' width='100%'>
            <Heading
              as='h3'
              size='md'
              fontWeight='semibold'
              letterSpacing='tight'
              color={textColor}
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
              _hover={{ color: tagInfo.text, bg: tagInfo.bg }}
            >
              {tagText}
            </Button>
          </HStack>

          <Text
            color={useColorModeValue('white', 'gray.300')}
            fontSize='md'
            lineHeight='tall'
          >
            {description}
          </Text>

          <HStack mt='auto' pt={2} spacing={4}>
            <Button
              as='a'
              href={link}
              target='_blank'
              variant='outline'
              size='sm'
              colorScheme='purple'
              onClick={(e) => e.stopPropagation()}
            >
              View Code
            </Button>
            {live && (
              <Button
                as='a'
                href={live}
                target='_blank'
                variant='outline'
                size='sm'
                colorScheme='blue'
                onClick={(e) => e.stopPropagation()}
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
