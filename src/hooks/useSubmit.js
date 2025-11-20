import { useState } from "react";
import emailjs from "@emailjs/browser";

// EmailJS Configuration
// Get these values from https://www.emailjs.com/
// 1. Create an account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}, {{type}}
// 4. Get your Public Key from Account > API Keys
//
// You can set these as environment variables (REACT_APP_EMAILJS_SERVICE_ID, etc.)
// or replace the values directly below
const EMAILJS_SERVICE_ID =
  process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_ss0hm67";
const EMAILJS_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_mj8xd5r";
const EMAILJS_PUBLIC_KEY =
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "kU-ZU6I-1S1TrxaTd";

/**
 * Custom hook to submit a form using EmailJS
 */
const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const clearResponse = () => {
    setResponse(null);
  };

  const submit = async (url, data) => {
    setLoading(true);
    try {
      // Prepare template parameters
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });

      const templateParams = {
        from_name: data.firstName,
        from_email: data.email,
        message: data.comment,
        type: data.type,
        to_name: "Hussain", // Your name
        time: timeString,
        // Also include 'name' for backward compatibility with template
        name: data.firstName,
      };

      // Send email using EmailJS
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Send email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setResponse({
        type: "success",
        message: `Thanks for your submission ${data.firstName}, we will get back to you shortly!`,
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setResponse({
        type: "error",
        message: "Something went wrong, please try again later!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, submit, clearResponse };
};

export default useSubmit;
