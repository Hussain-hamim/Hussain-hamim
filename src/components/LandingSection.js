import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SpaceGame from "./SpaceGame";

const LandingSection = () => {
  const socialLinks = [
    {
      icon: FaGithub,
      url: "https://github.com/Hussain-hamim",
      color: "hover:text-white",
    },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/hussain-hamim/",
      color: "hover:text-blue-400",
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/hussainhamim_",
      color: "hover:text-pink-500",
    },
    {
      icon: FaXTwitter,
      url: "https://x.com/erencodes",
      color: "hover:text-gray-400",
    },
    {
      icon: FaEnvelope,
      url: "mailto:mohammadhussainafghan83@gmail.com",
      color: "hover:text-red-400",
    },
    {
      icon: FaWhatsapp,
      url: "https://wa.me/93780338261",
      color: "hover:text-green-400",
    },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0f0f0f]">
      {/* 3D Game Background */}
      <SpaceGame />

      {/* Overlay Content */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pointer-events-none pt-28"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}
      >
        <div className="pointer-events-auto max-w-4xl">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-teal-400 font-mono text-xs md:text-sm mb-1 pt-20"
          >
            hey i'm
          </motion.p>

          {/* Name Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold font-sans1 text-white leading-tight tracking-tighter"
          >
            HUSSAIN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7FF00] to-teal-400">
              HAMIM
            </span>
          </motion.h1>

          {/* Role & Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 md:mt-12 inline-flex flex-col border-l-2 border-white/10 pl-6"
          >
            <p className="text-gray-400 font-sans3 text-lg leading-relaxed max-w-lg">
              Forging digital experiences with{" "}
              <span className="text-white">Code</span> &{" "}
              <span className="text-white">Creativity</span>. Specializing in
              Full-Stack & Mobile Development.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex items-center gap-8 mb-12"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 transition-all duration-300 hover:-translate-y-1 ${social.color}`}
              >
                <social.icon size={24} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-teal-400 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default LandingSection;
