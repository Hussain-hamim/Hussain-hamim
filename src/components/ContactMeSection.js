import React, { useEffect, useState, lazy, Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useAlertContext } from "../context/alertContext";
import useSubmit from "../hooks/useSubmit";
import { FaPaperPlane } from "react-icons/fa";
import { PEEL_VARIATIONS } from "./peelDirections";
import Button from "./Button";

const StickerPeeling = lazy(() => import("./StickerPeeling"));

/** Default 30 min Cal.com booking — override with REACT_APP_BOOKING_URL if needed */
const DEFAULT_CAL_BOOKING_URL = "https://cal.com/hussain-hamim-fp9qc6/30min";
const WHATSAPP_URL = "https://wa.me/93780338261";

const ContactMeSection = ({ locale = "en" }) => {
  const isPashto = locale === "ps";
  const { isLoading, response, submit, clearResponse } = useSubmit();
  const { onOpen } = useAlertContext();
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();

  const socials = [
    {
      img: require("../images/socials/email.png"),
      url: "mailto:mohammadhussainafghan83@gmail.com",
      label: isPashto ? "ايمېل راولېږئ" : "Email Me",
    },
    {
      img: require("../images/socials/github.png"),
      url: "https://github.com/Hussain-hamim",
      label: "GitHub",
    },
    {
      img: require("../images/socials/linkedin.png"),
      url: "https://www.linkedin.com/in/hussain-hamim/",
      label: "LinkedIn",
    },
    {
      img: require("../images/socials/twitter.png"),
      url: "https://x.com/erencode",
      label: "Twitter",
    },
    {
      Icon: FaWhatsapp,
      url: WHATSAPP_URL,
      label: "WhatsApp",
    },
  ];

  const bookLabel = isPashto ? "د لیدنې وخت وټاکئ" : "Book a call";

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

  return (
    <section
      id="contactme-section"
      className="relative pt-20 md:pt-24 pb-36 md:pb-44 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold font-sans1 text-white mb-8 tracking-tight">
              {isPashto ? "ښکلی ایدیا لرئ؟" : "Have a Cool Idea?"} <br />
              {isPashto ? "راځئ یې جوړ کړو." : "Let's Build It."}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-sans3 max-w-md">
              {isPashto
                ? "که کومه پروژه لرئ، يا يوازې خبرې کول غواړئ، له ما سره اړيکه ونيسئ. زه تل د نوو پروژو، نوښتګرو مفکورو او ګټورو همکاريو ته چمتو يم."
                : "Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions."}
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {socials.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D7FF00] transition-colors duration-300 group"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg opacity-90 transition-[filter,opacity,color] duration-300 group-hover:opacity-100 [filter:grayscale(1)_brightness(1.15)] group-hover:[filter:grayscale(1)_brightness(1.35)]">
                    {social.Icon ? (
                      <social.Icon
                        className="h-[22px] w-[22px] text-current sm:h-6 sm:w-6"
                        aria-hidden
                      />
                    ) : (
                      <Suspense
                        fallback={
                          <img
                            src={social.img}
                            alt=""
                            className="h-6 w-6 rounded-lg object-contain sm:h-7 sm:w-7"
                          />
                        }
                      >
                        <StickerPeeling
                          image={social.img}
                          imageWidth={28}
                          imageHeight={28}
                          hoverPeel={48}
                          pressPeel={70}
                          hovered={hoveredSocial === social.label}
                          curlRotation={
                            PEEL_VARIATIONS[index % PEEL_VARIATIONS.length]
                          }
                          backColor="#0a0a0a"
                          shadowEnabled
                          shadow={{
                            opacity: 28,
                            color: "#000000",
                            x: -220,
                            y: 120,
                          }}
                          transition={{
                            type: "tween",
                            duration: 0.28,
                            ease: "easeOut",
                          }}
                        />
                      </Suspense>
                    )}
                  </span>
                  <span className="font-mono text-sm tracking-wider">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>

            {bookingUrl ? (
              <div className="mt-8">
                <Button
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  icon={<Calendar />}
                >
                  {bookLabel}
                </Button>
              </div>
            ) : null}
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#D7FF00]/[0.05] via-white/[0.04] to-black/50 backdrop-blur-md border border-white/10 p-8 pb-12 md:p-12 md:pb-16 rounded-3xl relative overflow-hidden mb-4 md:mb-6"
          >
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider"
                  >
                    {isPashto ? "نوم" : "Name"}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={isPashto ? "ستاسو نوم" : "Your name"}
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
                    {isPashto ? "ایمېل" : "Email"}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={isPashto ? "email@example.com" : "you@company.com"}
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
                    {isPashto ? "د پوښتنې ډول" : "Type of Inquiry"}
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      {...formik.getFieldProps("type")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D7FF00] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="hireMe" className="bg-[#1a1a1a]">
                        {isPashto ? "د فريلانس پروژې وړانديز" : "Freelance project proposal"}
                      </option>
                      <option value="collaboration" className="bg-[#1a1a1a]">
                        {isPashto ? "پر پروژه ګډه همکاري" : "Collaboration on a project"}
                      </option>
                      <option value="openSource" className="bg-[#1a1a1a]">
                        {isPashto ? "د Open Source مشوره" : "Open source consultancy"}
                      </option>
                      <option value="jobOffer" className="bg-[#1a1a1a]">
                        {isPashto ? "د کار فرصت" : "Job opportunity"}
                      </option>
                      <option value="other" className="bg-[#1a1a1a]">
                        {isPashto ? "بل څه" : "Other"}
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
                    {isPashto ? "پيغام" : "Message"}
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    placeholder={isPashto ? "د خپلې پروژې په اړه راته وليکئ..." : "Tell me about your project..."}
                    {...formik.getFieldProps("comment")}
                    className={`w-full bg-white/5 border ${
                      formik.touched.comment && formik.errors.comment
                        ? "border-red-500"
                        : "border-white/10"
                    } rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#D7FF00] transition-colors placeholder-gray-600 resize-none`}
                  />
                  {formik.touched.comment && formik.errors.comment && (
                    <p className="text-red-500 text-xs mt-1 font-mono">
                      {formik.errors.comment}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
                size="md"
                icon={!isLoading ? <FaPaperPlane /> : undefined}
              >
                {isLoading
                  ? isPashto
                    ? "پيغام لېږل کېږي..."
                    : "Sending..."
                  : isPashto
                  ? "پيغام ولېږه"
                  : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMeSection;
