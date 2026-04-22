"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type ProjectCategory } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";

const filters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "ai", label: "AI" },
  { id: "hackathon", label: "Hackathon" },
];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex items-center justify-center w-6 h-6">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          </div>
          <h2 className="font-[family-name:var(--font-space)] text-lg font-bold text-white tracking-[0.2em] uppercase">
            Portfolio
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <div className="flex gap-2 flex-wrap pb-2 border-b border-white/10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`nav-tab px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase transition-all duration-300 border ${
                activeFilter === f.id
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/40 text-white"
                  : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid - 1 column for narrow book page layout */}
      <motion.div
        layout
        className="flex flex-col gap-5"
      >
        {filtered.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
