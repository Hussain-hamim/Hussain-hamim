import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faCalendar } from "@fortawesome/free-solid-svg-icons";
import ShinyPill from "./ShinyPill";

const DEFAULT_CAL_BOOKING_URL = "https://cal.com/hussain-hamim-fp9qc6/30min";

const socials = [
  { img: require("../images/socials/github.png"), url: "https://github.com/Hussain-hamim" },
  { img: require("../images/socials/linkedin.png"), url: "https://www.linkedin.com/in/hussain-hamim/" },
  { img: require("../images/socials/twitter.png"), url: "https://x.com/hussainim_" },
  { img: require("../images/socials/instagram.png"), url: "https://www.instagram.com/hussainhamim_" },
  { img: require("../images/socials/email.png"), url: "mailto:mohammadhussainafghan83@gmail.com" },
];

const Header = ({ locale = "en" }) => {
  const isPashto = locale === "ps";
  const bookingUrl = (
    process.env.REACT_APP_BOOKING_URL || DEFAULT_CAL_BOOKING_URL
  ).trim();
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll direction + scrolled state (hide on scroll down, show on scroll up)
  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (!headerElement) return;

      setScrolled(currentScrollPos > 50);

      if (prevScrollPos > currentScrollPos) {
        headerElement.style.transform = "translateY(0)";
      } else if (currentScrollPos > 100) {
        headerElement.style.transform = "translateY(-100%)";
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is in view for active nav underline (home page only)
  useEffect(() => {
    const onHome =
      window.location.pathname === "/" || window.location.pathname === "/ps";
    if (!onHome) return;

    const ids = ["experience", "projects", "tools", "contactme"];
    const nodes = ids
      .map((id) => document.getElementById(`${id}-section`))
      .filter(Boolean);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id.replace("-section", "");
          setActiveSection(id);
        }
      },
      {
        // Trigger when section is roughly centered
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const handleScrollClick = (anchor) => () => {
    const onHome =
      window.location.pathname === "/" || window.location.pathname === "/ps";
    if (!onHome) {
      window.location.href = `${isPashto ? "/ps" : "/"}#${anchor}-section`;
      setIsMenuOpen(false);
      return;
    }
    const element = document.getElementById(`${anchor}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    const onHome =
      window.location.pathname === "/" || window.location.pathname === "/ps";
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "projects", label: isPashto ? "زما کار" : "see my work", type: "scroll" },
    { id: "tools", label: isPashto ? "وسايل" : "tools", type: "scroll" },
    { id: "all-projects", label: isPashto ? "ټولې پروژې" : "projects", type: "link", href: "/projects" },
    { id: "contactme", label: isPashto ? "اړيکه" : "contact", type: "scroll" },
  ];

  const isActive = (item) => {
    if (item.type === "link") {
      return window.location.pathname.startsWith(item.href);
    }
    return activeSection === item.id;
  };

  /** Solid bar when scrolled or mobile drawer open — matches panel below */
  const headerBarSolid = scrolled || isMenuOpen;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${
          isMenuOpen
            ? "bg-black backdrop-blur-xl border-b border-white/10"
            : scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto py-3.5 sm:py-3 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:pl-6 sm:pr-6 md:px-8">
        <div className="flex justify-between items-center gap-3 min-h-[44px]">
          {/* Logo */}
          <a
            href={isPashto ? "/ps" : "/"}
            onClick={handleLogoClick}
            className={`text-lg sm:text-xl font-bold font-sans1 tracking-tight transition-all duration-300 relative group min-w-0 shrink ${
              headerBarSolid
                ? "text-[#D7FF00] hover:text-white"
                : "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] hover:text-white/85"
            }`}
          >
            <span className="relative z-10">Hussain Hamim.</span>
            <span
              className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                headerBarSolid ? "bg-[#D7FF00]" : "bg-white"
              }`}
            ></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item);
              const cls = `relative px-3 py-1.5 text-sm font-medium transition-all duration-300 uppercase tracking-wider group ${
                headerBarSolid
                  ? active
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                  : active
                  ? "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
                  : "text-white/80 hover:text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
              }`;
              const inner = (
                <>
                  <span className="relative z-10">{item.label}</span>
                  <span
                    className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      headerBarSolid ? "bg-white/5" : "bg-white/10"
                    }`}
                  ></span>
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] transition-all duration-300 ${
                      headerBarSolid ? "bg-[#D7FF00]" : "bg-white"
                    } ${active ? "w-3/4" : "w-0 group-hover:w-3/4"}`}
                  ></span>
                </>
              );
              return item.type === "link" ? (
                <a key={item.id} href={item.href} className={cls}>
                  {inner}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={handleScrollClick(item.id)}
                  className={cls}
                >
                  {inner}
                </button>
              );
            })}

            {/* Book a call — outline, keeps hero CTA as primary */}
            <ShinyPill
              as="a"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              shineColor="#C1E311"
              speed={1.8}
              className={`ml-4 inline-flex items-center gap-1.5 rounded-full border-[0.5px] px-4 py-1.5 text-xs font-semibold transition-all ${
                headerBarSolid
                  ? "border-[#D7FF00]/50 text-[#D7FF00] hover:border-[#D7FF00] hover:bg-[#D7FF00]/10 hover:shadow-lg hover:shadow-[#D7FF00]/20"
                  : "border-white/35 text-white hover:border-white/60 hover:bg-white/10"
              }`}
            >
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-[11px] opacity-90"
                aria-hidden
              />
              {isPashto ? "د لیدنې وخت وټاکئ" : "Book a call"}
            </ShinyPill>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden -mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors relative z-50 ${
              headerBarSolid
                ? "text-gray-400 hover:text-white"
                : "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] hover:text-white/85"
            }`}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 
          transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item);
              const cls = `relative flex w-full items-center ${
                isPashto ? "justify-end" : "justify-start"
              } text-lg font-medium py-3 px-2 rounded-lg transition-all duration-300 ${
                active
                  ? "text-[#D7FF00] bg-[#D7FF00]/5"
                  : "text-gray-300 hover:text-[#D7FF00] hover:bg-white/[0.03]"
              }`;
              const content = (
                <>
                  {active && (
                    <span
                      aria-hidden
                      className={`absolute top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-[#D7FF00] ${
                        isPashto ? "right-0" : "left-0"
                      }`}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </>
              );
              return item.type === "link" ? (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cls}
                >
                  {content}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={handleScrollClick(item.id)}
                  className={cls}
                >
                  {content}
                </button>
              );
            })}
          </nav>

          <div className="pt-6 mt-4 border-t border-white/10">
            {/* Primary CTA on mobile — filled lime */}
            <ShinyPill
              as="a"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              shineColor="#FFFFFF"
              shineOpacity={0.55}
              speed={1.8}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D7FF00] px-6 py-3 text-center text-sm font-semibold text-black transition-all hover:bg-[#c4ec00] hover:shadow-lg hover:shadow-[#D7FF00]/30"
            >
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-sm opacity-90"
                aria-hidden
              />
              {isPashto ? "د لیدنې وخت وټاکئ" : "Book a call"}
            </ShinyPill>

            <div className="mt-6 flex items-center justify-center gap-6">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#D7FF00] transition-colors duration-300"
                >
                  {social.img ? (
                    <img
                      src={social.img}
                      alt=""
                      className="h-7 w-7 rounded-lg object-contain"
                    />
                  ) : (
                    <FontAwesomeIcon icon={social.icon} size="lg" />
                  )}
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
