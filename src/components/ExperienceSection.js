import React from "react";
import { motion } from "framer-motion";
import ExperienceBackground from "./ExperienceBackground";

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      role: "Software Engineer",
      company: "EvolvFit",
      duration: "Aug 2025 - Oct 2025",
      description: "Developing mobile apps with React Native & Node.js backend.",
      tech: ["React Native", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      role: "Mobile App Developer",
      company: "Himalbyte",
      duration: "May 2025 - Jul 2025",
      description: "Cross-platform mobile development focused on performance.",
      tech: ["React Native", "Supabase", "TypeScript"],
    },
    {
      id: 3,
      role: "Software Engineer",
      company: "zappstudios",
      duration: "Sept 2025 - Present",
      description: "Full-stack web applications using Next.js & Supabase.",
      tech: ["Next.js", "Supabase", "Stripe"],
    },
  ];

  return (
    <section
      id="experience-section"
      className="relative py-32 px-4 md:px-8 lg:px-16 bg-black overflow-hidden min-h-screen flex items-center"
    >
      <ExperienceBackground />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-sans1 text-white mb-4 tracking-tight">
            EXPERIENCE
          </h2>
          <div className="w-24 h-1 bg-[#D7FF00] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-[#D7FF00] rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative h-full bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-2xl hover:shadow-[0_0_40px_rgba(215,255,0,0.2)] transition-all duration-300 flex flex-col">
                <div className="text-[#D7FF00] font-mono text-sm mb-4">{exp.duration}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                <div className="text-gray-400 font-medium mb-4">{exp.company}</div>
                <p className="text-gray-300 mb-6 flex-grow">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono text-teal-400 bg-teal-400/10 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
