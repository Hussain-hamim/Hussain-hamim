import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  { icon: faGithub, url: "https://github.com/Hussain-hamim" },
  { icon: faLinkedin, url: "https://www.linkedin.com/in/hussain-hamim/" },
  { icon: faTwitter, url: "https://twitter.com/hussainhamim_" },
  { icon: faInstagram, url: "https://www.instagram.com/hussainhamim_" },
  { icon: faEnvelope, url: "mailto: mohammadhussainafghan83@gmail.com" },
];

const Header = () => {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) return;

      setScrolled(currentScrollPos > 50);

      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = "translateY(0)";
      } else {
        if (currentScrollPos > 100) {
          headerElement.style.transform = "translateY(-100%)";
        }
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (anchor) => () => {
    const element = document.getElementById(`${anchor}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    "experience",
    "projects",
    "mobileapps",
    "tools",
    "contactme",
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-bold font-sans1 tracking-tight text-[#D7FF00] hover:text-white transition-all duration-300 relative group"
          >
            <span className="relative z-10">HSN.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D7FF00] group-hover:w-full transition-all duration-300"></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={handleClick(item)}
                className="relative px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-wider group"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 bg-white/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-[#D7FF00] group-hover:w-3/4 transition-all duration-300"></span>
              </button>
            ))}

            <a
              href="/Hussain-resume3.pdf"
              download="Hussain-resume3.pdf"
              className="ml-4 px-4 py-1.5 text-xs font-semibold text-[#D7FF00] rounded-full transition-all hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20"
              style={{
                borderWidth: '0.5px',
                borderColor: 'rgba(215, 255, 0, 0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 0.5)';
              }}
            >
              Resume
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2 transition-colors relative z-50"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 
          transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 py-8 space-y-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={handleClick(item)}
              className="block w-full text-left text-lg font-medium text-gray-300 hover:text-[#D7FF00] 
                         transition-all duration-300 py-2 border-b border-white/5 hover:border-[#D7FF00]/30"
            >
              {item.charAt(0).toUpperCase() +
                item.slice(1).replace(/([A-Z])/g, " $1")}
            </button>
          ))}

          <div className="pt-4 border-t border-white/10">
            <a
              href="/Hussain-resume3.pdf"
              download="Hussain-resume3.pdf"
              className="block w-full text-center px-6 py-3 text-sm font-semibold text-[#D7FF00] rounded-full transition-all hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20 mb-4"
              style={{
                borderWidth: '0.5px',
                borderColor: 'rgba(215, 255, 0, 0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(215, 255, 0, 0.5)';
              }}
            >
              Download Resume
            </a>

            <div className="flex items-center justify-center space-x-6 pt-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#D7FF00] transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
