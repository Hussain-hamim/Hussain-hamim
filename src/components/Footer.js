import React from "react";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo/Name */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-sans1 text-white tracking-tight">
            HSN
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400 text-sm font-mono">
            © {currentYear} All Rights Reserved
          </span>
        </div>

        {/* Made with Love */}
        <motion.div 
          className="flex items-center gap-2 text-sm text-gray-400"
          whileHover={{ scale: 1.05 }}
        >
          <span>Made with</span>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaHeart className="text-red-500 text-xs" />
          </motion.div>
          <span>by Hussain Hamim</span>
        </motion.div>

        {/* Tech Stack Tags - Optional decoration */}
        <div className="hidden md:flex items-center gap-3">
          {["React", "Tailwind", "Framer"].map((tech, index) => (
            <span 
              key={index}
              className="text-[10px] font-mono uppercase tracking-wider text-gray-600 border border-white/5 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
