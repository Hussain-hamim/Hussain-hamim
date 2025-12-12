import React from "react";
import { useParams, Link } from "react-router-dom";
import { projects, mobileProjects } from "./ProjectsSection";

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const ProjectDetails = () => {
  const { slug } = useParams();
  const allProjects = [...projects, ...mobileProjects];
  const project = allProjects.find((p) => slugify(p.title) === slug);
  const category = projects.includes(project) ? "Web" : "Mobile";
  const categoryEmoji = category === "Web" ? "🌐" : "📱";

  if (!project) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-4 text-slate-800"
        style={{
          backgroundColor: "#f9fafb",
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-900">
            Project not found
          </h1>
          <p className="text-slate-600">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/v2"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  const imageSrc =
    typeof project.getImageSrc === "function"
      ? project.getImageSrc()
      : project.image || "";

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
        .card-hover {
          transition:
            transform 450ms cubic-bezier(0.25, 0.8, 0.4, 1),
            box-shadow 450ms cubic-bezier(0.25, 0.8, 0.4, 1);
          will-change: transform, box-shadow;
        }
        .card-hover:hover {
          transform: perspective(1100px) translateY(-6px) scale(1.02) rotateZ(-0.5deg);
          box-shadow: 0 14px 24px rgba(0,0,0,0.14);
        }
        .link-card {
          transition: all 300ms cubic-bezier(0.25, 0.8, 0.4, 1);
        }
        .link-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.12);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">🧩</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Project Details
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-3">
                {project.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-sm text-xs font-semibold text-blue-700">
                <span className="text-base">{categoryEmoji}</span>
                <span className="uppercase tracking-wide">
                  {category} Project
                </span>
              </div>
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs uppercase tracking-wide rounded-full bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition shadow-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
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

        {/* Hero Image */}
        {imageSrc && (
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 bg-white relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent z-10" />
            <img
              src={imageSrc}
              alt={project.title}
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
            />
          </div>
        )}

        {/* Overview Section */}
        <section className="card-hover rounded-2xl border border-slate-100 shadow-sm bg-gradient-to-br from-white via-slate-50/50 to-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Overview
            </h2>
          </div>
          <div className="pl-14">
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              {project.description}
            </p>
          </div>
        </section>

        {/* Links Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card group rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-sm p-6 flex items-center justify-between hover:border-slate-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-700"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  View Code
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  GitHub Repository
                </p>
              </div>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card group rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm p-6 flex items-center justify-between hover:border-blue-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-700"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Live Demo
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Visit Website</p>
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </section>

        {/* Mobile Back Button */}
        <div className="sm:hidden pt-4">
          <Link
            to="/v2"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition-all shadow-lg font-medium"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
