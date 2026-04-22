"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / rect.width) * 15;
    const rotateX = (y / rect.height) * -15;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (el) {
      el.style.transition = "transform 0.5s ease";
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
      // Remove transition after animation completes
      setTimeout(() => {
        if (el) el.style.transition = "transform 0.1s ease-out";
      }, 500);
    }
  }, []);

  const categoryColors: Record<string, string> = {
    web: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ai: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    hackathon: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="project-card"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-card overflow-hidden group"
        style={{ transition: "transform 0.1s ease-out", transformStyle: "preserve-3d" }}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-[family-name:var(--font-space)] text-white font-semibold text-sm">
              {project.title}
            </h4>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${
                categoryColors[project.category] || ""
              }`}
            >
              {project.category}
            </span>
          </div>
          <p className="text-xs text-white/40">{project.tagline}</p>
        </div>
      </div>
    </motion.div>
  );
}
