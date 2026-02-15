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
    <section className="relative bg-[#0f0f0f] py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#D7FF00]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-teal-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaGraduationCap className="text-3xl text-[#D7FF00]" />
            <h2 className="text-4xl md:text-5xl font-bold font-sans1 text-white tracking-tight">
              زده کړې
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D7FF00] to-teal-400 rounded-full"></div>
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
              <div className="absolute inset-0 bg-[#D7FF00] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative bg-[#111] rounded-2xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(215,255,0,0.1)] transition-all duration-300 h-full">
                <p className="text-xs uppercase tracking-wider text-[#D7FF00] font-semibold mb-3">
                  {entry.duration}
                </p>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {entry.institution}
                </h3>
                <p className="text-gray-300 leading-relaxed">
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
