import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useAlertContext } from "../context/alertContext";
import useSubmit from "../hooks/useSubmit";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: (values) => {
      submit("https://hussain.com/contactme", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      comment: Yup.string()
        .min(5, "Must be at least 5 characters")
        .required("Required"),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
    }
  }, [response, onOpen, formik]);

  return (
    <section
      id="contactme-section"
      className="relative py-32 bg-[#0f0f0f] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D7FF00]/5 rounded-full blur-[120px] transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold font-sans1 text-white mb-8 tracking-tight">
              LET'S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7FF00] to-teal-400">
                CONNECT
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-sans3 max-w-md">
              Have a project in mind or just want to chat? Feel free to reach
              out. I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>

            <div className="space-y-6">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-300 hover:text-[#D7FF00] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D7FF00]/10 transition-colors border border-white/10 group-hover:border-[#D7FF00]/30">
                    <social.icon className="text-xl" />
                  </div>
                  <span className="font-mono text-sm tracking-wider">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D7FF00] to-teal-400"></div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
                  >
                    Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Ahmad"
                    {...formik.getFieldProps("firstName")}
                    className={`w-full bg-white/5 border ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "border-red-500"
                        : "border-white/10"
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D7FF00] transition-colors placeholder-gray-600`}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 font-mono">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ahmad@example.com"
                    {...formik.getFieldProps("email")}
                    className={`w-full bg-white/5 border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-white/10"
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D7FF00] transition-colors placeholder-gray-600`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-xs mt-1 font-mono">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
                  >
                    Type of Inquiry
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      {...formik.getFieldProps("type")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D7FF00] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="hireMe" className="bg-[#1a1a1a]">
                        Freelance project proposal
                      </option>
                      <option value="collaboration" className="bg-[#1a1a1a]">
                        Collaboration on a project
                      </option>
                      <option value="openSource" className="bg-[#1a1a1a]">
                        Open source consultancy
                      </option>
                      <option value="jobOffer" className="bg-[#1a1a1a]">
                        Job opportunity
                      </option>
                      <option value="other" className="bg-[#1a1a1a]">
                        Other
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    placeholder="Tell me about your project..."
                    {...formik.getFieldProps("comment")}
                    className={`w-full bg-white/5 border ${
                      formik.touched.comment && formik.errors.comment
                        ? "border-red-500"
                        : "border-white/10"
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D7FF00] transition-colors placeholder-gray-600 resize-none`}
                  />
                  {formik.touched.comment && formik.errors.comment && (
                    <p className="text-red-500 text-xs mt-1 font-mono">
                      {formik.errors.comment}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#D7FF00] text-black font-bold py-4 rounded-xl hover:bg-[#b8da00] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const socials = [
  {
    icon: FaEnvelope,
    url: "mailto:mohammadhussainafghan83@gmail.com",
    label: "Email Me",
  },
  {
    icon: FaGithub,
    url: "https://github.com/Hussain-hamim",
    label: "github.com/Hussain-hamim",
  },
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/hussain-hamim/",
    label: "linkedin.com/in/hussain-hamim",
  },
];

export default ContactMeSection;
