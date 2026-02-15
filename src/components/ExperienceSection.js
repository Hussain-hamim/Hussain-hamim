import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import ExperienceBackground from "./ExperienceBackground";

const ExperienceSection = ({ locale = "en" }) => {
  const isPashto = locale === "ps";
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const experiences = [
    {
      id: 1,
      role: isPashto ? "سافټوېیر انجينر" : "Software Engineer",
      company: "EvolvFit",
      duration: "Aug 2025 - Oct 2025",
      description: isPashto
        ? "د React Native او Node.js بیکېنډ په کارولو د موبايل اپونو جوړول او پراختيا."
        : "Developing mobile apps with React Native & Node.js backend.",
      tech: ["React Native", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      role: isPashto ? "موبايل اپ پراختياکوونکی" : "Mobile App Developer",
      company: "Himalbyte",
      duration: "May 2025 - Jul 2025",
      description: isPashto
        ? "د کراس پلېټفارم موبايل اپونو پراختيا، په لوړ کارکردګۍ تمرکز سره."
        : "Cross-platform mobile development focused on performance.",
      tech: ["React Native", "Supabase", "TypeScript"],
    },
    {
      id: 3,
      role: isPashto ? "سافټوېیر انجينر" : "Software Engineer",
      company: "zappstudios",
      duration: "Sept 2025",
      description: isPashto
        ? "د Next.js او Supabase په مرسته د Full-Stack وېب اپليکېشنونو پراختيا."
        : "Full-stack web applications using Next.js & Supabase.",
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
          <h2 className="text-4xl md:text-5xl font-bold font-sans1 text-white mb-4 tracking-tight">
            {isPashto ? "تجربه" : "EXPERIENCE"}
          </h2>
          <div className="w-24 h-1 bg-[#D7FF00] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const isExpanded = expandedCards[exp.id];
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-[#D7FF00] rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className={`relative bg-black/60 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-[0_0_40px_rgba(215,255,0,0.2)] transition-all duration-300 flex flex-col overflow-hidden ${isExpanded ? 'p-8' : 'p-6'}`}>
                  {/* Header - Always Visible */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-[#D7FF00] font-mono text-sm mb-2">{exp.duration}</div>
                      <h3 className="text-lg font-bold text-white mb-1">{exp.role}</h3>
                      <div className="text-gray-400 font-medium">{exp.company}</div>
                    </div>
                    <button
                      onClick={() => toggleCard(exp.id)}
                      className="ml-4 p-2 text-[#D7FF00] hover:bg-[#D7FF00]/10 rounded-lg transition-all duration-300 flex-shrink-0"
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown size={20} />
                      </motion.div>
                    </button>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-gray-300 mb-6">{exp.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t, i) => (
                              <span key={i} className="text-xs font-mono text-teal-400 bg-teal-400/10 px-2 py-1 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
