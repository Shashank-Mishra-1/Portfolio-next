"use client";

import { motion } from "framer-motion";
import {
  personalInfo,
  experiences,
  education,
  skills,
  certifications,
} from "@/data/portfolio";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ResumeSection() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      {/* Bio */}
      <motion.div variants={item}>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex items-center justify-center w-6 h-6">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </div>
          <h2 className="font-[family-name:var(--font-space)] text-lg font-bold text-white tracking-[0.2em] uppercase">
            Resume
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <p className="text-white/70 text-sm leading-relaxed">
          {personalInfo.bio}
        </p>
      </motion.div>

      {/* Experience */}
      <motion.div variants={item}>
        <h3 className="font-[family-name:var(--font-space)] text-base font-semibold text-white/90 mb-4 tracking-wide border-b border-white/10 pb-2">
          Experience
        </h3>
        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="relative pl-5 border-l-2 border-purple-500/30"
            >
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-purple-500" />
              <div className="mb-1">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {exp.period}
                </span>
              </div>
              <h4 className="font-[family-name:var(--font-space)] text-white/90 font-medium text-sm">
                {exp.role}
              </h4>
              <p className="text-xs text-white/40 mb-1">
                {exp.company}
              </p>
              <p className="text-[11px] text-white/60 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div variants={item}>
        <h3 className="font-[family-name:var(--font-space)] text-base font-semibold text-white/90 mb-4 tracking-wide border-b border-white/10 pb-2">
          Education
        </h3>
        {education.map((edu, i) => (
          <div key={i} className="pl-5 border-l-2 border-cyan-500/30 relative">
            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-cyan-500" />
            <div className="mb-1">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {edu.period}
              </span>
            </div>
            <h4 className="font-[family-name:var(--font-space)] text-white/90 font-medium text-sm">
              {edu.degree}
            </h4>
            <p className="text-xs text-white/40">
              {edu.institution} — {edu.grade}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Skills */}
      <motion.div variants={item}>
        <h3 className="font-[family-name:var(--font-space)] text-base font-semibold text-white/90 mb-4 tracking-wide border-b border-white/10 pb-2">
          Skills
        </h3>
        <div className="space-y-3">
          {skills.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-white/70">{skill.name}</span>
                <span className="text-[10px] text-white/40">{skill.level}%</span>
              </div>
              <div className="skill-bar-bg h-1.5">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div variants={item}>
        <h3 className="font-[family-name:var(--font-space)] text-base font-semibold text-white/90 mb-3 tracking-wide border-b border-white/10 pb-2">
          Certifications
        </h3>
        <ul className="space-y-2">
          {certifications.map((cert, i) => (
            <li key={i} className="text-xs text-white/60 leading-relaxed flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
