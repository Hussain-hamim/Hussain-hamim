import React, { lazy } from "react";
import OnDemandSticker from './OnDemandSticker';
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { PEEL_VARIATIONS } from "./peelDirections";
import Button from "./Button";
import AiChatBar from "./AiChatBar";

import LazyWhenVisible from './LazyWhenVisible';
import { ContactFormPlaceholder } from './ContactFormView';
const ContactForm = lazy(() => import('./ContactForm'));


/** Default 30 min Cal.com booking — override with REACT_APP_BOOKING_URL if needed */
const DEFAULT_CAL_BOOKING_URL = "https://cal.com/hussain-hamim-fp9qc6/30min";
const WHATSAPP_URL = "https://wa.me/93780338261";

const ContactMeSection = ({ locale = "en" }) => {
  const isPashto = locale === "ps";
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();

  const socials = [
    {
      img: require("../images/socials/email.webp"),
      url: "mailto:mohammadhussainafghan83@gmail.com",
      label: isPashto ? "ايمېل راولېږئ" : "Email me",
    },
    {
      img: require("../images/socials/github.webp"),
      url: "https://github.com/Hussain-hamim",
      label: "GitHub",
    },
    {
      img: require("../images/socials/linkedin.webp"),
      url: "https://www.linkedin.com/in/hussain-hamim/",
      label: "LinkedIn",
    },
    {
      img: require("../images/socials/twitter.webp"),
      url: "https://x.com/erencode",
      label: "Twitter",
    },
    {
      img: require("../images/socials/whatsapp.webp"),
      url: WHATSAPP_URL,
      label: "WhatsApp",
    },
    {
      img: require("../images/socials/instagram.webp"),
      url: "https://www.instagram.com/hussainhamim_/",
      label: "Instagram",
    },
  ];

  const bookLabel = isPashto ? "د لیدنې وخت وټاکئ" : "Let's find a time";

  return (
    <section
      id="contactme-section"
      className="relative px-4 pt-20 md:px-8 md:pt-24 pb-36 md:pb-44 overflow-hidden"
    >
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold font-sans1 text-white mb-8 tracking-tight">
              {isPashto ? "ښکلی ایدیا لرئ؟" : "Got something in mind?"} <br />
              {isPashto ? "راځئ یې جوړ کړو." : "I'd love to hear it."}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-sans3 max-w-md">
              {isPashto
                ? "که کومه پروژه لرئ، يا يوازې خبرې کول غواړئ، له ما سره اړيکه ونيسئ. زه تل د نوو پروژو، نوښتګرو مفکورو او ګټورو همکاريو ته چمتو يم."
                : "A project, a half-formed idea, or just a hello — all of those are welcome. Tell me what you're thinking, and I'll write back."}
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {socials.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#D7FF00] transition-colors duration-300 group"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg opacity-90 transition-[filter,opacity,color] duration-300 group-hover:opacity-100 [filter:grayscale(1)_brightness(1.15)] group-hover:[filter:grayscale(1)_brightness(1.35)]">
                    <OnDemandSticker
                      image={social.img}
                      imageWidth={28}
                      imageHeight={28}
                      hoverPeel={48}
                      pressPeel={70}
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

            <AiChatBar className="mt-8" />
          </motion.div>

          <LazyWhenVisible className="min-w-0" fallback={<ContactFormPlaceholder locale={locale} />}>
            <ContactForm locale={locale} />
          </LazyWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default ContactMeSection;
