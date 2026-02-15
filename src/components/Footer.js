import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = ({ locale = "en" }) => {
  const isPashto = locale === "ps";
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
            © {currentYear} {isPashto ? "ټول حقونه خوندي دي" : "All Rights Reserved"}
          </span>
        </div>

        {/* Made with Love */}
        <motion.div
          className="flex items-center gap-2 text-sm text-gray-400"
          whileHover={{ scale: 1.05 }}
        >
          <span>{isPashto ? "په مينه جوړ شوی" : "Made with"}</span>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="text-red-500 text-xs" size={18} />
          </motion.div>
          <span>{isPashto ? "جوړوونکی: Hussain Hamim" : "by Hussain Hamim"}</span>
        </motion.div>

        {/* Tech Stack Tags - Optional decoration */}
        <div className="hidden md:flex items-center gap-3">
          {["React", "Tailwind", "Framer", "Three.js"].map((tech, index) => (
            <span
              key={index}
              className="text-[10px] font-mono uppercase tracking-wider text-gray-600  px-2 py-1 rounded-full"
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
