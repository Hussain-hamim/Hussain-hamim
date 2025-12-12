import React, { useState } from "react";
import erenImg from "../asset/eren.jpg";
import photo1 from "../images/photo1.jpg";
import photo2 from "../images/photo2.jpg";
import photo3 from "../images/photo3.jpg";
import photo4 from "../images/photo4.jpg";
import Text3DScene from "./Text3DScene";
import { projects, mobileProjects } from "./ProjectsSection";

const V2 = () => {
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const thumbPhotos = [photo1, photo2, photo3, photo4];
  const projectTitles = [
    "Project One",
    "Project Two",
    "Project Three",
    "Project Four",
  ];

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
                  Hey,
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
                className="absolute top-2 right-2 z-10"
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
        <section id="photos" className="pt-6 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">🧩</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
              Projects
            </span>
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

        {/* Currently Listening + Blog */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-white card-hover">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🎧</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                Currently Listening
              </span>
            </div>
            <p className="text-sm text-slate-800 font-semibold">
              Getting Killed – Gesese
            </p>
            <p className="text-xs text-slate-500 mt-1">
              On repeat while building cool stuff.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-white card-hover">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">📝</span>
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

        {/* Chat + Tools */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-white card-hover">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">💬</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                Chat
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 mb-3 text-sm text-slate-700">
              Type a message to say hi 👋
            </div>
            <form
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                placeholder="Type a message"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="rounded-lg bg-purple-600 text-white px-4 py-2 text-sm shadow-md hover:bg-purple-700 transition w-full sm:w-auto"
              >
                Send
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-white card-hover">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm">🛠️</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                Tools I use
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Figma",
                "VSCode",
                "Adobe Suite",
                "React",
                "Chakra UI",
                "Tailwind",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs border border-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Map / Weather / GitHub / Fitness */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8">
          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-gradient-to-br from-sky-50 via-white to-indigo-50 card-hover">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🗺️</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                Map
              </span>
            </div>
            <div className="h-40 rounded-xl bg-slate-200/70 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 mix-blend-multiply" />
              <div className="absolute inset-4 rounded-lg border border-white/60 bg-white/70 shadow-inner flex items-center justify-center text-xs text-slate-600">
                Map placeholder (embed ready)
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3">
              Drop in an embed or static map when ready.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-gradient-to-br from-amber-50 via-white to-orange-50 card-hover">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🌦️</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                Weather
              </span>
            </div>
            <div className="rounded-xl bg-white/80 border border-amber-100 p-4 shadow-inner space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span>London</span>
                <span className="font-semibold">18°C</span>
              </div>
              <div className="text-xs text-slate-500">
                Partly cloudy · Light breeze
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3">
              Hook up to a weather API later.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-gradient-to-br from-slate-50 via-white to-slate-100 card-hover">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🐙</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                GitHub
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 bg-white/80 shadow-inner space-y-2 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Latest repo</span>
                <span className="font-semibold">portfolio-v2</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Updated</span>
                <span>today</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3">
              Swap in live GitHub data when wired.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 shadow-sm p-5 bg-gradient-to-br from-emerald-50 via-white to-teal-50 card-hover">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">🏃‍♂️</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                Fitness
              </span>
            </div>
            <div className="rounded-xl border border-emerald-100 p-4 bg-white/80 shadow-inner space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span>Steps</span>
                <span className="font-semibold">8,420</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span>Workout</span>
                <span className="font-semibold">Leg day</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3">
              Ready for real fitness API integration.
            </p>
          </div>
        </section>

        {/* 3D Text Scene */}
        <section className="py-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">✨</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
              3D Text Scene
            </span>
          </div>
          <div
            className="relative w-full"
            style={{ aspectRatio: "16/9", minHeight: "500px" }}
          >
            <Text3DScene initialText="HUSSAIN" />
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Type to enter new text, drag to spin the text
          </p>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t border-slate-100">
          <p className="text-center text-slate-500 text-xs sm:text-sm">
            © 2024 Hussain Hamim. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default V2;
