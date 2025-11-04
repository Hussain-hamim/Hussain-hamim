import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const experiences = [
    {
      id: 1,
      role: "Software Engineer",
      company: "EvolvFit",
      duration: "Aug 2025 - Oct 2025",
      description:
        "Primarily focused on developing and maintaining mobile applications using React Native, while also working on the backend with Express/Node.js and building web interfaces with React.",
      highlights: [
        "Built and enhanced mobile features and UI with React Native",
        "Developed RESTful APIs and backend logic using Express and Node.js",
        "Implemented and maintained web components with React",
      ],
      tech: ["React Native", "Express", "Node.js", "React", "MongoDB", "Expo"],
    },
    {
      id: 2,
      role: "Mobile App Developer",
      company: "Himalbyte",
      duration: "May 2025 - Jul 2025",
      description:
        "Developed cross-platform mobile applications using React Native with a focus on performance optimization and superior user experience.",
      highlights: [
        "Implemented client and admin panels with real-time updates",
        "Integrated Supabase for backend services and authentication",
        "Implemented push notifications and offline capabilities",
      ],
      tech: ["React Native", "Supabase", "TypeScript", "Expo"],
    },
    {
      id: 3,
      role: "Software Engineer",
      company: "zappstudios",
      duration: "Sept 2025 - Present",
      description:
        "Working on projects to develop web applications for clients using Next.js, TailwindCSS, Supabase, Stripe, Angular, and Python.",
      highlights: [
        "Developed full-stack web apps using Next.js and Supabase for various client needs",
        "Integrated payments and authentication features with Stripe and secure flows",
        "Worked with Angular and Python to deliver robust admin tools and dashboards",
      ],
      tech: [
        "Next.js",
        "TailwindCSS",
        "Supabase",
        "Stripe",
        "Angular",
        "Python",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 px-4 md:px-10 lg:px-20 bg-[#0a0a0a]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-white"></div>
        </motion.div>

        {/* Experience List */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-l-2 border-gray-700 pl-8 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-white rounded-full"></div>

              {/* Content */}
              <div>
                {/* Header - Clickable */}
                <div
                  className="mb-2 cursor-pointer flex items-start justify-between group"
                  onClick={() =>
                    setExpandedCard(expandedCard === exp.id ? null : exp.id)
                  }
                >
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-1 group-hover:text-gray-200 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-gray-400">
                      <span className="font-medium">{exp.company}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                  </div>
                  {/* Chevron Icon */}
                  <motion.div
                    animate={{ rotate: expandedCard === exp.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-1"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-400"
                    >
                      <path d="M6 9L12 15L18 9" />
                    </svg>
                  </motion.div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-1">
                  {exp.description}
                </p>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedCard === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="text-gray-400 text-sm flex items-start"
                          >
                            <span className="mr-2 text-white">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
