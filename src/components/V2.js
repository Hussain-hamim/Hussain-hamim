import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import erenImg from "../asset/eren.jpg";
import Text3DScene from "./Text3DScene";
import { projects, mobileProjects } from "./ProjectsSection";
import LocationMap from "./LocationMap";
import GitHubContributions from "./GitHubContributions";
import { FaBook, FaPuzzlePiece } from "react-icons/fa";
import { generateAIResponse } from "../services/ai-agent";

const V2 = () => {
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Hello! I'm HSN AI, your personal assistant. I can answer questions about Hussain Hamim, his skills, projects, experience, and more. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef(null);
  const [contextMenu, setContextMenu] = useState(null);
  const longPressTimerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive (only within chat container)
  useEffect(() => {
    if (messagesContainerRef.current) {
      // Scroll the container itself, not the page
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenu && !event.target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [contextMenu]);

  // Handle long press and right-click for context menu
  const handleMessageContext = (e, message, index) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      x: e.clientX || rect.left + rect.width / 2,
      y: e.clientY || rect.top + rect.height / 2,
      message,
      index,
    });
  };

  // Handle long press (touch devices)
  const handleTouchStart = (e, message, index) => {
    longPressTimerRef.current = setTimeout(() => {
      handleMessageContext(e, message, index);
    }, 500); // 500ms for long press
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleTouchMove = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // Context menu actions
  const copyMessage = async () => {
    if (contextMenu?.message) {
      try {
        await navigator.clipboard.writeText(contextMenu.message.content);
        setContextMenu(null);
        // Show a brief feedback (you could add a toast notification here)
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const shareMessage = async () => {
    if (contextMenu?.message) {
      const shareData = {
        title: "Chat Message",
        text: contextMenu.message.content,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          // Fallback: copy to clipboard
          await navigator.clipboard.writeText(contextMenu.message.content);
          alert("Message copied to clipboard!");
        }
        setContextMenu(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to share:", err);
        }
      }
    }
  };

  const deleteMessage = () => {
    if (contextMenu?.index !== undefined) {
      setMessages((prev) => prev.filter((_, idx) => idx !== contextMenu.index));
      setContextMenu(null);
    }
  };

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const topWebProjects = projects.slice(0, 2);
  const topMobileProjects = mobileProjects.slice(0, 2);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Call the real AI agent
      const aiResponse = await generateAIResponse(userMessage);
      setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "I apologize, but I'm experiencing some technical difficulties. Please make sure the Groq API key (REACT_APP_GROQ_API_KEY) is configured correctly in your .env file.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      className="min-h-screen text-slate-800"
      style={{
        backgroundColor: "#f9fafb",
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0",
        backgroundRepeat: "repeat",
        fontFamily: "'Space Grotesk', 'Space Mono', sans-serif",
      }}
    >
      <style>{`
        .slider-card {
          transition:
            transform 450ms cubic-bezier(0.25, 0.8, 0.4, 1),
            box-shadow 450ms cubic-bezier(0.25, 0.8, 0.4, 1);
          will-change: transform, box-shadow;
        }
        .slider-card:hover {
          transform: perspective(1100px) translateY(-6px) scale(1.04) rotateZ(-0.8deg) rotateY(-1.4deg);
          box-shadow: 0 14px 24px rgba(0,0,0,0.14);
        }
        .card-hover {
          transition:
            transform 450ms cubic-bezier(0.25, 0.8, 0.4, 1),
            box-shadow 450ms cubic-bezier(0.25, 0.8, 0.4, 1);
          will-change: transform, box-shadow;
        }
        .card-hover:hover {
          transform: perspective(1100px) translateY(-6px) scale(1.04) rotateZ(-0.8deg) rotateY(-1.4deg);
          box-shadow: 0 14px 24px rgba(0,0,0,0.14);
        }
        .avatar-hover {
          transition:
            transform 450ms cubic-bezier(0.25, 0.8, 0.4, 1),
            box-shadow 450ms cubic-bezier(0.25, 0.8, 0.4, 1);
          will-change: transform, box-shadow;
        }
        .avatar-hover:hover {
          transform: perspective(1100px) translateY(-6px) scale(1.04) rotateZ(0.8deg) rotateY(1.4deg);
          box-shadow: none;
        }
      `}</style>
      <div className="max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{
              fontFamily: "'Daisyogre','Space Grotesk',sans-serif",
              color: "#0ea5e9",
            }}
          >
            HSN.{" "}
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="/" className="text-slate-700 hover:text-slate-900">
              Projects
            </a>
            <a href="/#blog" className="text-slate-700 hover:text-slate-900">
              Blog
            </a>
            <a href="/#photos" className="text-slate-700 hover:text-slate-900">
              Photos
            </a>
          </nav>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-600">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
              aria-label="Twitter"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
              aria-label="Discord"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="/Hussain-resume3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
              aria-label="Resume"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </a>
          </div>
        </header>

        {/* Hero area */}
        <main className="py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* About card */}
            <div className="space-y-5">
              <div className="avatar-hover relative w-44 h-44 sm:w-48 sm:h-48">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500 blur-2xl opacity-80" />
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl ring-1 ring-white/40">
                  <img
                    src={erenImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-slate-800 text-base sm:text-lg leading-snug">
                  Hey, i'm
                </p>
                <p className="text-gray-400 font-sans3 text-md leading-relaxed max-w-lg">
                  Forging digital experiences with Code & Creativity
                  Specializing in Full-Stack & Mobile Development.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <ul className="space-y-1.5 text-slate-700 text-sm list-none pl-0">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>Passionate about coding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>Love building web applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>Always learning new technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>Enjoy solving complex problems</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3D Text Scene */}
            <div className="flex items-start justify-center md:items-center md:justify-end relative">
              {/* Info Icon - Outside the card */}
              <div
                className="absolute top-2 right-2 z-10 hidden md:block"
                onMouseEnter={() => setShowInfoTooltip(true)}
                onMouseLeave={() => setShowInfoTooltip(false)}
              >
                <button
                  className="w-6 h-6 rounded-full bg-slate-200/80 hover:bg-slate-300/90 flex items-center justify-center transition-colors"
                  aria-label="3D Text Features"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </button>

                {/* Tooltip */}
                <div
                  className={`absolute top-8 right-0 w-48 bg-white rounded-lg shadow-lg border border-slate-200 p-3 transition-all duration-200 pointer-events-none ${
                    showInfoTooltip
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div className="text-xs text-slate-700 space-y-1.5">
                    <div className="font-semibold text-slate-900 mb-2">
                      3D Text Features:
                    </div>
                    <div className="flex items-start gap-2">
                      <span>🖱️</span>
                      <span>Drag to spin the text</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>⌨️</span>
                      <span>Type to write anything</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>🔄</span>
                      <span>Text cycles every 30s</span>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-white border-l border-t border-slate-200 transform rotate-45"></div>
                </div>
              </div>

              <div className="relative w-full max-w-lg md:max-w-xl mt-6 md:mt-10 overflow-hidden avatar-hover">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4/3", minHeight: "400px" }}
                >
                  <Text3DScene texts={["Hussain", "Hamim", "Engineer"]} />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Projects grid (real projects) */}
        <section id="photos" className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FaPuzzlePiece className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                I'm Building
              </span>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-slate-700 transition-all hover:shadow-sm font-medium"
            >
              <span className="text-slate-400">View all projects</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transform group-hover:translate-x-0.5 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...topWebProjects, ...topMobileProjects].map((project, i) => {
              const slug = slugify(project.title);
              const href = `/projects/${slug}`;
              const imageSrc =
                typeof project.getImageSrc === "function"
                  ? project.getImageSrc()
                  : project.image || "";

              return (
                <a
                  key={`${project.title}-${i}`}
                  href={href}
                  className="group block space-y-3 card-hover rounded-xl bg-slate-100 p-3 transition transform hover:-translate-y-1 relative"
                >
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-slate-500">
                        No image
                      </div>
                    )}
                  </div>
                  {/* Link icon on hover */}
                  <div className="pointer-events-none absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition duration-200">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90 shadow-sm border border-slate-200 text-slate-700">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l1.83-1.83a5 5 0 0 0-7.07-7.07l-1.06 1.06" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-1.83 1.83a5 5 0 0 0 7.07 7.07l1.06-1.06" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-slate-800 font-semibold">
                      {project.title}
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">
                      {i < 2 ? "Web" : "Mobile"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {project.description}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        {/* Map Card with Weather */}
        <section className="pt-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Map Card - Full width on mobile, 2/3 on desktop */}
            <div className="col-span-1 md:col-span-2">
              <div
                className="rounded-2xl border border-slate-100 shadow-sm bg-gradient-to-br from-sky-50 via-white to-indigo-50 overflow-hidden relative card-hover"
                style={{ minHeight: "240px" }}
              >
                <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-5 pb-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🗺️</span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                      Map
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 w-full h-full">
                  <LocationMap />
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-5 pt-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 inline-flex items-center gap-2 border border-white/60 shadow-sm">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-blue-500"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <p className="text-xs text-slate-700 font-medium">
                      Khost, Afghanistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Card - Full width on mobile, 1/3 on desktop */}
            <div className="col-span-1 flex flex-col gap-4 md:gap-6">
              <div
                className="rounded-2xl border border-slate-100 shadow-sm p-4 md:p-5 card-hover overflow-hidden relative"
                style={{
                  height: "160px",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
                }}
              >
                {/* Cloud-like background effect */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-200 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full blur-xl"></div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-400"
                    >
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                    </svg>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                      Weather
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-bold text-slate-900">
                      13.4°C
                    </p>
                    <p className="text-xs md:text-sm text-slate-500">
                      Partly cloudy
                    </p>
                  </div>
                </div>
              </div>
              {/* Placeholder for future small card */}
            </div>
          </div>
        </section>

        {/* What I Use + GitHub */}
        <section className="grid grid-cols-5 gap-6 py-4">
          {/* What I Use Card - 60% (3 columns) */}
          <div className="col-span-5 md:col-span-3 rounded-2xl border border-slate-100 shadow-sm p-4 bg-white card-hover">
            <div className="flex items-center gap-2 mb-3">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-700"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span className="text-[10px] uppercase tracking-wider text-slate-700 font-semibold">
                What I Use
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Hardware Section */}
              <div>
                <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
                  Hardware
                </h3>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-600"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M6 8h12" />
                    </svg>
                    <span className="text-xs text-slate-700">
                      MacBook Air
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-600"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <path d="M12 18h.01" />
                    </svg>
                    <span className="text-xs text-slate-700">
                      iPhone 14 Pro Max
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-600"
                    >
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <path d="M6 10h12" />
                      <path d="M8 14h8" />
                    </svg>
                    <span className="text-xs text-slate-700">
                      Dell Precision 5540
                    </span>
                  </div>
                </div>
              </div>

              {/* Software Section */}
              <div>
                <h3 className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
                  Software
                </h3>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-600"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 9h6v6H9z" />
                    </svg>
                    <span className="text-xs text-slate-700">Cursor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-600"
                    >
                      <path d="M9 9h6v6H9z" />
                      <path d="M9 3v6h6V3" />
                      <path d="M9 15v6h6v-6" />
                    </svg>
                    <span className="text-xs text-slate-700">Figma</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-600"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span className="text-xs text-slate-700">Xcode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Card - 40% (2 columns) */}
          <div className="col-span-5 md:col-span-2 rounded-2xl border border-slate-100 shadow-sm p-4 bg-white card-hover">
            <div className="flex items-center gap-2 mb-3">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-slate-700"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-[10px] uppercase tracking-wider text-slate-700 font-semibold">
                GitHub
              </span>
            </div>

            {/* Contribution calendar grid */}
            <div className="mb-2">
              <GitHubContributions username="Hussain-hamim" />
            </div>
            <p className="text-[10px] text-slate-400">Contribution activity</p>
          </div>
        </section>

        {/* HSN AI - Full Width */}
        <section className="py-4">
          <div
            className="rounded-2xl border border-slate-100 shadow-sm bg-white overflow-hidden"
            style={{
              minHeight: "500px",
              maxHeight: "600px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 p-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">HSN</span>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">HSN AI</h3>
                <p className="text-[9px] text-slate-500">
                  My personal AI agent
                </p>
              </div>
            </div>

            {/* Messages Container */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
              style={{ maxHeight: "calc(600px - 140px)" }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 cursor-pointer select-text ${
                      msg.role === "user"
                        ? "bg-slate-200 text-slate-700"
                        : "bg-slate-50/80 text-slate-400"
                    }`}
                    onContextMenu={(e) => handleMessageContext(e, msg, idx)}
                    onTouchStart={(e) => handleTouchStart(e, msg, idx)}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-slate-100 bg-white"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about Hussain..."
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isTyping}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="rounded-lg bg-slate-700 text-white px-6 py-2.5 text-sm font-medium shadow-md hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Context Menu */}
        {contextMenu && (
          <div
            className="context-menu fixed z-50 bg-white rounded-lg shadow-xl border border-slate-200 py-1 min-w-[160px]"
            style={{
              left: `${Math.min(contextMenu.x, window.innerWidth - 180)}px`,
              top: `${Math.min(contextMenu.y, window.innerHeight - 200)}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={copyMessage}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </button>
            <button
              onClick={shareMessage}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
            {contextMenu.index > 0 && (
              <button
                onClick={deleteMessage}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete
              </button>
            )}
          </div>
        )}

        {/* Currently Listening + Blog */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-white card-hover">
            <div className="flex items-center gap-2 mb-3">
              <FaBook className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                Blog
              </span>
            </div>
            <p className="text-sm text-slate-800 font-semibold mb-1">
              New Website
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              A refreshed look while keeping the playful vibe. Exploring design,
              engineering, and everything in between.
            </p>
          </div>
        </section>

        {/* 3D Text Scene
        <section className='py-4'>
          <div
            className='relative w-full'
            style={{ aspectRatio: '16/9', minHeight: '300px', height: '300px' }}
          >
            <Text3DScene initialText='' />
          </div>
          <p className='text-xs text-slate-500 mt-3 text-center'>
            Just try typing something, then drag to spin the text
          </p>
        </section>
        */}

        {/* Footer */}
        <footer className="py-6 border-t border-slate-100">
          <p className="text-center text-slate-500 text-xs sm:text-sm">
            © 2001 Hussain Hamim. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default V2;
