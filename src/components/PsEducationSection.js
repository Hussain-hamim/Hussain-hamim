import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const educationEntries = [
  {
    institution: "شیخ زاید پوهنتون",
    degree: "د کمپیوټر ساینس لیسانس (BCS)",
    duration: "2022 - 2025",
  },
  {
    institution: "محمد صدیق روهي لېسه",
    degree: "د دولسو کلونو ښوونیزه دوره",
    duration: "2010 - 2022",
  },
];

const PsEducationSection = () => {
  return (
    <section className="relative bg-surface-alt py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaGraduationCap className="text-3xl text-ink" />
            <h2 className="text-4xl md:text-5xl font-bold font-sans1 text-ink tracking-tight">
              زده کړې
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationEntries.map((entry) => (
            <motion.div
              key={entry.institution}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative rounded-2xl p-8 bg-panel transition-[box-shadow,background-color] duration-300 h-full group-hover:bg-panel-hover group-hover:shadow-[0_0_0_0.5px_rgba(0,0,0,0.22)]">
                <p className="text-xs uppercase tracking-wider text-gray-600 dark:text-white/55 font-semibold mb-3 font-mono">
                  {entry.duration}
                </p>
                <h3 className="text-2xl font-bold text-ink mb-3">
                  {entry.institution}
                </h3>
                <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                  {entry.degree}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PsEducationSection;
