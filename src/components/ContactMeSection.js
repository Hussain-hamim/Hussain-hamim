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

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

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
    <FullScreenSection py={16} spacing={8}>
      <VStack style={{ width: '90vw' }} alignItems='flex-start'>
        <HStack spacing={3}>
          <Heading as='h1' id='contactme-section' marginRight={5}>
            Contact me
          </Heading>
          {socials.map(({ icon, url }) => (
            <a key={url} href={url} target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon
                size={'2x'}
                color='lightgray'
                icon={icon}
                key={url}
              />
            </a>
          ))}
        </HStack>

        <Box p={6} rounded='md' w='100%'>
          <form
            // onSubmit={formik.handleSubmit}
            action='https://formsubmit.co/mohammadhussainafghan83@gmail.com'
            method='POST'
          >
            <VStack spacing={4}>
              <FormControl
                isInvalid={
                  !!formik.errors.firstName && formik.touched.firstName
                }
              >
                <FormLabel htmlFor='firstName'>Name</FormLabel>
                <Input
                  id='firstName'
                  name='firstName'
                  required
                  {...formik.getFieldProps('firstName')}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor='email'>Your Email</FormLabel>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  required
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='type'>Type of enquiry</FormLabel>
                <Select
                  color='gray'
                  id='type'
                  name='type'
                  {...formik.getFieldProps('type')}
                >
                  <option value='hireMe'>Freelance project proposal</option>
                  <option value='openSource'>
                    Open source consultancy session
                  </option>
                  <option value='other'>Other</option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={!!formik.errors.comment && formik.touched.comment}
              >
                <FormLabel htmlFor='comment'>Your message</FormLabel>
                <Textarea
                  id='comment'
                  name='comment'
                  required
                  height={150}
                  {...formik.getFieldProps('comment')}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>

              {/* Optional: disable CAPTCHA */}
              <input type='hidden' name='_captcha' value='false' />

              <Button
                type='submit'
                style={{ backgroundColor: '#2c9bd2' }}
                // variant="link"
                width='full'
                isLoading={isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
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
