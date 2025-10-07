import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useAlertContext } from '../context/alertContext';
import useSubmit from '../hooks/useSubmit';
import FullScreenSection from './FullScreenSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { keyframes, css } from '@emotion/react';

// Floating animation
const float = keyframes`
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
`;

// Ripple animation
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

const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

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

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: 'hireMe',
      comment: '',
    },
    onSubmit: (values) => {
      submit('https://hussain.com/contactme', values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      comment: Yup.string()
        .min(5, 'Must be at least 5 characters')
        .required('Required'),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === 'success') {
        formik.resetForm();
      }
    }
  }, [formik, onOpen, response]);

  return (
    <Box as='section' position='relative' overflow='hidden' py={16}>
      {/* Animated gradient background elements */}

      <FullScreenSection spacing={8} position='relative' zIndex={1}>
        <MotionVStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          width='90vw'
          alignItems='flex-start'
        >
          <HStack spacing={3}>
            <MotionHeading
              as='h1'
              id='contactme-section'
              marginRight={5}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              color={textColor}
            >
              Contact me
            </MotionHeading>
            {socials.map(({ icon, url }, index) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <a href={url} target='_blank' rel='noopener noreferrer'>
                  <FontAwesomeIcon size={'2x'} icon={icon} key={url} />
                </a>
              </motion.div>
            ))}
          </HStack>

          <Box
            p={8}
            rounded='xl'
            w='100%'
            bg={cardBg}
            border='1px solid'
            borderColor={cardBorder}
            backdropFilter='blur(5px)'
            boxShadow={`0 4px 30px ${orchidColor}20`}
            _hover={{
              boxShadow: `0 8px 40px ${orchidColor}40`,
            }}
            transition='all 0.3s ease'
          >
            <form
              action='https://formsubmit.co/mohammadhussainafghan83@gmail.com'
              method='POST'
            >
              <VStack spacing={6}>
                <FormControl
                  isInvalid={
                    !!formik.errors.firstName && formik.touched.firstName
                  }
                >
                  <FormLabel htmlFor='firstName' color={textColor}>
                    Name
                  </FormLabel>
                  <Input
                    id='firstName'
                    name='firstName'
                    required
                    bg='rgba(255, 255, 255, 0.1)'
                    borderColor='rgba(255, 255, 255, 0.2)'
                    color={textColor}
                    _hover={{
                      borderColor: orchidColor,
                    }}
                    _focus={{
                      borderColor: orchidColor,
                      boxShadow: `0 0 0 1px ${orchidColor}`,
                    }}
                    {...formik.getFieldProps('firstName')}
                  />
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!formik.errors.email && formik.touched.email}
                >
                  <FormLabel htmlFor='email' color={textColor}>
                    Your Email
                  </FormLabel>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    required
                    bg='rgba(255, 255, 255, 0.1)'
                    borderColor='rgba(255, 255, 255, 0.2)'
                    color={textColor}
                    _hover={{
                      borderColor: orchidColor,
                    }}
                    _focus={{
                      borderColor: orchidColor,
                      boxShadow: `0 0 0 1px ${orchidColor}`,
                    }}
                    {...formik.getFieldProps('email')}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='type' color={textColor}>
                    Select the type of request (Optional)
                  </FormLabel>
                  <Select
                    id='type'
                    name='type'
                    bg='rgba(255, 255, 255, 0.1)'
                    borderColor='rgba(255, 255, 255, 0.2)'
                    color={textColor}
                    _hover={{
                      borderColor: orchidColor,
                    }}
                    _focus={{
                      borderColor: orchidColor,
                      boxShadow: `0 0 0 1px ${orchidColor}`,
                    }}
                    {...formik.getFieldProps('type')}
                  >
                    <option
                      value='collaboration'
                      style={{ background: '#1a1a1a' }}
                    >
                      Collaboration on a project
                    </option>
                    <option value='hireMe' style={{ background: '#1a1a1a' }}>
                      Freelance project proposal
                    </option>
                    <option
                      value='openSource'
                      style={{ background: '#1a1a1a' }}
                    >
                      Open source consultancy session
                    </option>
                    <option value='jobOffer' style={{ background: '#1a1a1a' }}>
                      Job opportunity or interview request
                    </option>
                    <option
                      value='featureRequest'
                      style={{ background: '#1a1a1a' }}
                    >
                      Feature request for an app
                    </option>
                    <option value='bugFix' style={{ background: '#1a1a1a' }}>
                      Help fixing an issue
                    </option>
                    <option
                      value='mentorship'
                      style={{ background: '#1a1a1a' }}
                    >
                      Mentorship or tech guidance
                    </option>
                    <option value='other' style={{ background: '#1a1a1a' }}>
                      Other
                    </option>
                  </Select>
                </FormControl>
                <FormControl
                  isInvalid={!!formik.errors.comment && formik.touched.comment}
                >
                  <FormLabel htmlFor='comment' color={textColor}>
                    Your message
                  </FormLabel>
                  <Textarea
                    id='comment'
                    name='comment'
                    required
                    height={150}
                    bg='rgba(255, 255, 255, 0.1)'
                    borderColor='rgba(255, 255, 255, 0.2)'
                    color={textColor}
                    _hover={{
                      borderColor: orchidColor,
                    }}
                    _focus={{
                      borderColor: orchidColor,
                      boxShadow: `0 0 0 1px ${orchidColor}`,
                    }}
                    {...formik.getFieldProps('comment')}
                  />
                  <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                </FormControl>

                {/* Optional: disable CAPTCHA */}
                <input type='hidden' name='_captcha' value='false' />

                <Button
                  type='button'
                  width='full'
                  isLoading={isLoading}
                  bg='white'
                  color='black'
                  px={6}
                  py={4}
                  borderRadius='md'
                  variant='solid'
                  _hover={{
                    textDecoration: 'underline',
                    bg: 'white',
                  }}
          
                  size='lg'
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </MotionVStack>
      </FullScreenSection>
    </Box>
  );
};

export default ContactMeSection;

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
];
