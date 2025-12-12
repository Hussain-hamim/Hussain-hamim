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
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-slate-800">
            Project not found.
          </p>
          <Link
            to="/v2"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition"
          >
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
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-1">
                Project
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {project.title}
              </h1>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
              <span className="text-sm">{categoryEmoji}</span>
              <span className="uppercase tracking-wide">
                {category} Project
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] uppercase tracking-wide rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link
            to="/v2"
            className="hidden sm:inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition shadow-sm"
          >
            ← Back
          </Link>
        </div>

        {imageSrc && (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white relative">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-slate-900/10" />
            <img
              src={imageSrc}
              alt={project.title}
              className="w-full h-[320px] sm:h-[420px] object-cover"
            />
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {project.description}
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-slate-200 bg-white shadow-sm p-4 flex items-center justify-between hover:border-slate-300 hover:shadow-md transition transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 text-slate-800">
              <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-slate-100 text-xs">
                🛠️
              </span>
              <span className="text-sm font-semibold">Code</span>
            </div>
            <span className="text-xs text-slate-500 group-hover:text-slate-700">
              GitHub →
            </span>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-200 bg-white shadow-sm p-4 flex items-center justify-between hover:border-slate-300 hover:shadow-md transition transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 text-slate-800">
                <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-slate-100 text-xs">
                  🚀
                </span>
                <span className="text-sm font-semibold">Live Demo</span>
              </div>
              <span className="text-xs text-slate-500 group-hover:text-slate-700">
                Open →
              </span>
            </a>
          )}
        </section>

        <div className="sm:hidden">
          <Link
            to="/v2"
            className="inline-flex items-center justify-center px-4 py-2 text-sm rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
