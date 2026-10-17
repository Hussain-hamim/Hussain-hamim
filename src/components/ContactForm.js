import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAlertContext } from '../context/alertContext';
import useSubmit from '../hooks/useSubmit';
import ContactFormView from './ContactFormView';

export default function ContactForm({ locale = 'en' }) {
  const isPashto = locale === 'ps';
  const { isLoading, response, submit, clearResponse } = useSubmit();
  const { onOpen } = useAlertContext();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: (values) => {
      submit(null, values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(isPashto ? "اړين دی" : "Required"),
      email: Yup.string()
        .email(isPashto ? "د ايمېل پته ناسمه ده" : "Invalid email address")
        .required(isPashto ? "اړين دی" : "Required"),
      comment: Yup.string()
        .min(5, isPashto ? "لږ تر لږه ۵ توري" : "Must be at least 5 characters")
        .required(isPashto ? "اړين دی" : "Required"),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
      // Clear the response after showing the alert to prevent reopening
      clearResponse();
    }
  }, [response, onOpen, formik, clearResponse]);

  return <ContactFormView formik={formik} isLoading={isLoading} isPashto={isPashto} />;
}
