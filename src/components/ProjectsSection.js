import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaGlobe,
  FaAward,
} from "react-icons/fa";

const projects = [
  {
    title: "Aegnis AI",
    description:
      "Aegnis is your AI Chief of Staff, an AI-powered productivity platform that doesn't just show you your life, it manages it for you. From a to-do list to a done list.",
    getImageSrc: () => require("../images/aegnisai.png"),
    link: "https://github.com/Hussain-hamim",
    live: "https://x.com/AegnisAI",
    tags: ["AI", "Productivity", "Full-stack"],
  },
  {
    title: "DevSync",
    description:
      "DevSync is a collaborative platform designed for developers to connect and collaborate on projects. Features user profiles, project listings, and a real-time chat system.",
    getImageSrc: () => require("../images/devsync.png"),
    link: "https://github.com/Hussain-hamim/DevSync",
    live: "https://devsync.codes/",
    tags: ["Next.js", "Tailwind", "Supabase"],
  },
  {
    title: "Premium Shop",
    description:
      "A full-stack (MERN stack) e-commerce platform built with React.js, MongoDB, Node.js and Stripe. Features user authentication, product listings, and a shopping cart.",
    getImageSrc: () => require("../images/premium-shop.png"),
    link: "https://github.com/Hussain-hamim/PremiumShop",
    live: "https://premium-shop-teal.vercel.app",
    tags: ["MERN", "E-commerce", "Stripe"],
  },
  {
    title: "Ocean Of Games",
    description:
      "A game platform which is a clone of popular RAWG website and also powered by rawg api. browse, select, and search from a tons of games.",
    getImageSrc: () => require("../images/oceanofgames.png"),
    link: "https://github.com/Hussain-hamim/ocean-of-games",
    live: "https://ocean-of-games.vercel.app/",
    tags: ["React", "API", "Clone"],
  },
  {
    title: "Book Ocean",
    description:
      "In this book platform after login you can discover, add up book to reading list, add book to finished list, give note, give stars to the book.",
    getImageSrc: () => require("../images/bookocean.png"),
    link: "https://github.com/Hussain-hamim/book-ocean",
    live: "https://book-ocean.vercel.app/discover",
    tags: ["React", "Firebase", "Books"],
  },
  {
    title: "Nature Quest",
    description:
      "A dynamic tour booking platform that allows users to explore amazing travel destinations. Custom-built backend with real-time tour data.",
    getImageSrc: () => require("../images/naturequest.png"),
    link: "https://github.com/Hussain-hamim/NatureQuest",
    live: "https://nature-quest-gamma.vercel.app/",
    tags: ["Travel", "Backend", "UI/UX"],
  },
  {
    title: "Issue Tracker",
    description:
      "Issue Tracker is a full-stack project built with Next.js. It allows users to create, assign, and manage issues efficiently.",
    getImageSrc: () => require("../images/issuetracker.png"),
    link: "https://github.com/Hussain-hamim/issue-tracker",
    live: "https://issue-tracker-tan-eta.vercel.app/",
    tags: ["Next.js", "Management", "Full-stack"],
  },
  {
    title: "TaskList",
    description:
      "This is a web application for managing your tasks. The application allows users to add, remove, and mark tasks as completed.",
    getImageSrc: () => require("../images/tasklist.png"),
    link: "https://github.com/Hussain-hamim/my-tasklist",
    live: "https://my-tasklist-gamma.vercel.app/",
    tags: ["React", "Productivity", "CRUD"],
  },
  {
    title: "Hamimfy",
    description:
      "Hamimfy is a responsive website design to showcase various features and techniques in modern web development. Focuses on cloud hosting.",
    getImageSrc: () => require("../images/hamimfy.png"),
    link: "https://github.com/Hussain-hamim/hamimfy",
    live: "https://hamimfy.vercel.app/",
    tags: ["Design", "Responsive", "Cloud"],
  },
];

const mobileProjects = [
  {
    title: "Shan-AI",
    description:
      "Ask ShanAI anything: A cross platform AI-powered mobile assistant that combines conversational AI, image generation and analysis using OpenAI, Gemini, and Stability APIs.",
    getImageSrc: () => require("../images/shanai2.png"),
    link: "https://github.com/Hussain-hamim",
    live: "https://github.com/Hussain-hamim/ShanAI/releases/download/my-tag/ShanAI_1.0.0.apk",
    tags: ["React Native", "AI", "Expo"],
  },
  {
    title: "EaseShop",
    description:
      "A feature-rich mobile e-commerce app built with React Native + Expo, powered by AI voice agents (Vapi) for hands-free shopping.",
    getImageSrc: () => require("../images/easeshop.png"),
    link: "https://github.com/Hussain-hamim/easeshop-mobile",
    live: "https://drive.google.com/file/d/1xZ0jOSVEwuIGFCz0AHVnBIzJmRLtmusc/view?usp=drive_link",
    tags: ["E-commerce", "AI Voice", "Mobile"],
  },
  {
    title: "Threads",
    description:
      "Threads Clone: A cross-platform mobile app that recreates the Threads experience. Built with Convex for real-time updates and Clerk for auth.",
    getImageSrc: () => require("../images/threads2.png"),
    link: "https://github.com/Hussain-hamim/threads",
    tags: ["Clone", "Real-time", "Social"],
  },
  {
    title: "Himal Beauty",
    description:
      "Barber Booking App: A full-stack mobile app with separate admin and client panels. Built with Supabase and Expo.",
    getImageSrc: () => require("../images/himal-beauty.png"),
    link: "https://github.com/Hussain-hamim/barber-app",
    live: "https://drive.google.com/file/d/1uk3aGfYUKCDck4uJFPJ0PtQJTrXe6YKS/view?usp=drive_link",
    tags: ["Booking", "Supabase", "Mobile"],
  },
  {
    title: "Brick Blitz",
    description:
      "Brick Breaker Game: A cross-platform mobile game built with React Native and Reanimated for smooth animations.",
    getImageSrc: () => require("../images/blitz.png"),
    link: "https://github.com/Hussain-hamim",
    tags: ["Game", "Animation", "React Native"],
  },
  {
    title: "Airbnb Clone",
    description:
      "Airbnb UI Clone: A cross-platform mobile app primarily focused on replicating Airbnb’s sleek user interface and navigation.",
    getImageSrc: () => require("../images/airbnb-clone .jpg"),
    link: "https://github.com/Hussain-hamim/airbnb-clone",
    tags: ["UI/UX", "Clone", "Maps"],
  },
  {
    title: "SnapDish",
    description:
      "Food Ordering App: A mobile app with separate admin and user panels. Features push notifications and Stripe integration.",
    getImageSrc: () => require("../images/snapdish2.png"),
    link: "https://github.com/Hussain-hamim/SnapDish",
    tags: ["Food", "Stripe", "Admin"],
  },
  {
    title: "Done With It",
    description:
      "Sell what you do not need on this mobile app platform, working based on node api.",
    getImageSrc: () => require("../images/donewithit2.png"),
    link: "https://github.com/Hussain-hamim/donewithit",
    tags: ["Marketplace", "Node.js", "Mobile"],
  },
  {
    title: "Plantly",
    description: "Keep your plants healthy and hydrated with this mobile app.",
    getImageSrc: () => require("../images/plantly.png"),
    link: "https://github.com/Hussain-hamim/plantly",
    tags: ["Utility", "Tracking", "Mobile"],
  },
];

const certificates = [
  {
    title: "Meta Front-End Developer",
    description:
      "Meta Front-End Developer Specialization include 9 courses, took approximately 7 months to get this certificate.",
    getImageSrc: () => require("../images/meta-cert.jpeg"),
    link: "https://www.coursera.org/account/accomplishments/specialization/CMEZCDWLG4AG",
    live: "https://www.coursera.org/account/accomplishments/specialization/CMEZCDWLG4AG",
    tags: ["Certificate", "Meta", "Frontend"],
  },
];

const SectionHeader = ({ title, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="flex flex-col items-center mb-16"
  >
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-3xl text-[#D7FF00]" />
      <h2 className="text-4xl md:text-5xl font-bold font-sans1 text-white tracking-tight">
        {title}
      </h2>
    </div>
    <div className="w-24 h-1 bg-gradient-to-r from-[#D7FF00] to-teal-400 rounded-full"></div>
  </motion.div>
);

const ProjectCard = ({ project, index }) => {
  const tags = project.tags || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D7FF00] to-teal-400 rounded-2xl opacity-0 group-hover:opacity-30 transition duration-500 blur-xl"></div>

      <div className="relative h-full bg-[#111] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-[#D7FF00]/10 hover:ring-[#D7FF00]/50">
        {/* Image Container */}
        <div className="relative h-60 overflow-hidden bg-[#1a1a1a]">
          <img
            src={project.getImageSrc()}
            alt={project.title}
            className="w-full h-full object-contain transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative z-20">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-[#D7FF00]/10 text-[#D7FF00] rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold font-sans3 text-white mb-3 group-hover:text-[#D7FF00] transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow font-sans3">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="text-lg" />
              <span>Code</span>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D7FF00] hover:text-[#D7FF00]/80 transition-colors ml-auto"
              >
                <span>Live Demo</span>
                <FaExternalLinkAlt className="text-sm" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects-section"
      className="relative bg-[#0f0f0f] py-32 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#D7FF00]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-teal-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Web Projects */}
        <div className="mb-32">
          <SectionHeader title="WEB PROJECTS" icon={FaGlobe} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile Projects */}
        <div id="mobileapps-section" className="mb-32">
          <SectionHeader title="MOBILE APPS" icon={FaMobileAlt} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <SectionHeader title="CERTIFICATES" icon={FaAward} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
