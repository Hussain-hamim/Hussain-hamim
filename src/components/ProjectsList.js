import React from "react";
import { Link } from "react-router-dom";
import { projects, mobileProjects } from "./ProjectsSection";
import { Puzzle, Globe, Smartphone } from "lucide-react";

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const ProjectsList = () => {
  return (
    <main
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
        .project-card {
          transition:
            transform 450ms cubic-bezier(0.25, 0.8, 0.4, 1),
            box-shadow 450ms cubic-bezier(0.25, 0.8, 0.4, 1);
          will-change: transform, box-shadow;
        }
        .project-card:hover {
          transform: perspective(1100px) translateY(-6px) scale(1.02) rotateZ(-0.5deg);
          box-shadow: 0 14px 24px rgba(0,0,0,0.14);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-slate-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                All Projects
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
              My Projects
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              A collection of web applications and mobile apps I've built
            </p>
          </div>
          <Link
            to="/v2"
            className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md font-medium text-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transform group-hover:-translate-x-1 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        {/* Web Projects Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Web Projects
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {projects.length} projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const slug = slugify(project.title);
              const href = `/projects/${slug}`;
              const imageSrc =
                typeof project.getImageSrc === "function"
                  ? project.getImageSrc()
                  : project.image || "";

              return (
                <Link
                  key={project.title}
                  to={href}
                  className="project-card group block rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
                        No image
                      </div>
                    )}
                    {/* Link icon on hover */}
                    <div className="pointer-events-none absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition duration-200">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-sm border border-slate-200 text-slate-700">
                        <svg
                          width="18"
                          height="18"
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
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-full whitespace-nowrap">
                        Web
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] uppercase tracking-wide rounded-full bg-slate-100 border border-slate-200 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Mobile Projects Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Mobile Apps
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {mobileProjects.length} projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileProjects.map((project, index) => {
              const slug = slugify(project.title);
              const href = `/projects/${slug}`;
              const imageSrc =
                typeof project.getImageSrc === "function"
                  ? project.getImageSrc()
                  : project.image || "";

              return (
                <Link
                  key={project.title}
                  to={href}
                  className="project-card group block rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
                        No image
                      </div>
                    )}
                    {/* Link icon on hover */}
                    <div className="pointer-events-none absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition duration-200">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-sm border border-slate-200 text-slate-700">
                        <svg
                          width="18"
                          height="18"
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
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-full whitespace-nowrap">
                        Mobile
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] uppercase tracking-wide rounded-full bg-slate-100 border border-slate-200 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectsList;

