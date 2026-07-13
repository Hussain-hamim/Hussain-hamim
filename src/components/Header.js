import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Calendar, Moon, Sun } from "lucide-react";
import Button from "./Button";
import { useTheme } from "../context/themeContext";
import { PEEL_VARIATIONS } from "./peelDirections";

const StickerPeeling = lazy(() => import("./StickerPeeling"));

const DEFAULT_CAL_BOOKING_URL = "https://cal.com/hussain-hamim-fp9qc6/30min";

const socials = [
  {
    img: require("../images/socials/email.png"),
    url: "mailto:mohammadhussainafghan83@gmail.com",
    label: "Email Me",
    labelPs: "ايمېل راولېږئ",
  },
  {
    img: require("../images/socials/github.png"),
    url: "https://github.com/Hussain-hamim",
    label: "GitHub",
  },
  {
    img: require("../images/socials/linkedin.png"),
    url: "https://www.linkedin.com/in/hussain-hamim/",
    label: "LinkedIn",
  },
  {
    img: require("../images/socials/twitter.png"),
    url: "https://x.com/hussainim_",
    label: "Twitter",
  },
  {
    img: require("../images/socials/instagram.png"),
    url: "https://www.instagram.com/hussainhamim_",
    label: "Instagram",
  },
];

const Header = ({ locale = "en" }) => {
  const isPashto = locale === "ps";
  const { isDark, toggleTheme } = useTheme();
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

    const ids = ["experience", "projects", "contactme"];
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
    { id: "all-projects", label: isPashto ? "ټولې پروژې" : "projects", type: "link", href: "/projects" },
    { id: "contactme", label: isPashto ? "اړيکه" : "contact", type: "scroll" },
  ];

  const isActive = (item) => {
    if (item.type === "link") {
      return window.location.pathname.startsWith(item.href);
    }
    return activeSection === item.id;
  };

  /** Solid dark bar when scrolled or mobile drawer open */
  const headerBarSolid = scrolled || isMenuOpen;
  /** Cream hero at top — dark nav text until scroll; dark theme uses light text */
  const onLightHero = !headerBarSolid && !isDark;

  const themeToggleBtn = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
        headerBarSolid
          ? "border-white/15 text-gray-300 hover:border-white/30 hover:text-white hover:bg-white/5"
          : onLightHero
          ? "border-black/15 text-[#0a0a0a] hover:border-black/30 hover:bg-black/[0.04]"
          : "border-white/25 text-white hover:border-white/45 hover:bg-white/10"
      }`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${
          isMenuOpen
            ? "border-b border-white/15 bg-black/45 backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-black/35"
            : scrolled
            ? "border-b border-white/10 bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-black/25"
            : onLightHero
            ? "border-b border-transparent bg-white/25 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/15"
            : "border-b border-transparent bg-transparent"
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
                : onLightHero
                ? "text-[#0a0a0a] hover:text-[#0a0a0a]/70"
                : "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] hover:text-white/85"
            }`}
          >
            <span className="relative z-10">HSN.</span>
            <span
              className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                headerBarSolid ? "bg-[#D7FF00]" : onLightHero ? "bg-[#0a0a0a]" : "bg-white"
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
                  : onLightHero
                  ? active
                    ? "text-[#0a0a0a]"
                    : "text-gray-600 hover:text-[#0a0a0a]"
                  : active
                  ? "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
                  : "text-white/80 hover:text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
              }`;
              const inner = (
                <>
                  <span className="relative z-10">{item.label}</span>
                  <span
                    className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      headerBarSolid
                        ? "bg-white/5"
                        : onLightHero
                        ? "bg-black/[0.04]"
                        : "bg-white/10"
                    }`}
                  ></span>
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] transition-all duration-300 ${
                      headerBarSolid
                        ? "bg-[#D7FF00]"
                        : onLightHero
                        ? "bg-[#0a0a0a]"
                        : "bg-white"
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

            <Button
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="ml-4"
              icon={<Calendar />}
            >
              {isPashto ? "د لیدنې وخت وټاکئ" : "Book a call"}
            </Button>

            <div className="ml-2">{themeToggleBtn}</div>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            {themeToggleBtn}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors relative z-50 ${
                headerBarSolid
                  ? "text-gray-400 hover:text-white"
                  : onLightHero
                  ? "text-[#0a0a0a] hover:text-[#0a0a0a]/70"
                  : "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] hover:text-white/85"
              }`}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="lg" />
            </button>
          </div>
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
            <Button
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              fullWidth
              icon={<Calendar />}
            >
              {isPashto ? "د لیدنې وخت وټاکئ" : "Book a call"}
            </Button>

            <div className="mt-6 flex items-center justify-center gap-6">
              {socials.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={social.label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg opacity-90 transition-[filter,opacity] duration-300 hover:opacity-100 [filter:grayscale(1)_brightness(1.15)] hover:[filter:grayscale(1)_brightness(1.35)]"
                >
                  <Suspense
                    fallback={
                      <img
                        src={social.img}
                        alt=""
                        className="h-6 w-6 rounded-lg object-contain sm:h-7 sm:w-7"
                      />
                    }
                  >
                    <StickerPeeling
                      image={social.img}
                      imageWidth={28}
                      imageHeight={28}
                      hoverPeel={48}
                      pressPeel={70}
                      curlRotation={
                        PEEL_VARIATIONS[index % PEEL_VARIATIONS.length]
                      }
                      backColor="#0a0a0a"
                      shadowEnabled
                      shadow={{
                        opacity: 28,
                        color: "#000000",
                        x: -220,
                        y: 120,
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.28,
                        ease: "easeOut",
                      }}
                    />
                  </Suspense>
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
