"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo, volunteerWork } from "@/data/portfolio";
import { FaLinkedinIn, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: FaLinkedinIn, href: personalInfo.linkedin, label: "LinkedIn", color: "hover:bg-blue-600" },
  { icon: FaGithub, href: personalInfo.github, label: "GitHub", color: "hover:bg-[#24292e]" },
  { icon: FaXTwitter, href: personalInfo.twitter, label: "Twitter", color: "hover:bg-black" },
  { icon: FaInstagram, href: personalInfo.instagram, label: "Instagram", color: "hover:bg-gradient-to-tr hover:from-amber-400 hover:via-pink-500 hover:to-purple-600" },
  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: "Email", color: "hover:bg-red-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function MagneticIcon({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px) scale(1)";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="social-icon w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all duration-300 flex-shrink-0"
      style={{ transition: "transform 0.2s ease, background 0.3s ease, color 0.3s ease" }}
    >
      {children}
    </a>
  );
}

export function ContactSection() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      {/* Contact Info */}
      <motion.div variants={item}>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex items-center justify-center w-6 h-6">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          </div>
          <h2 className="font-[family-name:var(--font-space)] text-lg font-bold text-white tracking-[0.2em] uppercase">
            Contact
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <p className="text-white/60 text-sm mb-5 leading-relaxed">
          Feel free to reach out for collaborations, freelance work, or just to say hello.
        </p>

        {/* Socials */}
        <h3 className="font-[family-name:var(--font-space)] text-xs font-semibold text-white/80 tracking-wider uppercase mb-3">
          Let&apos;s Connect
        </h3>
        <div className="flex gap-2 mb-6 flex-wrap">
          {socials.map((s) => (
            <MagneticIcon key={s.label} href={s.href} label={s.label}>
              <s.icon size={16} />
            </MagneticIcon>
          ))}
        </div>

        {/* Contact Card */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
            <Image src="/images/stamp-image.png" alt="stamp" width={80} height={80} className="object-cover" />
          </div>
          <div className="mb-3">
            <Image src="/images/signature.png" alt="Signature" width={100} height={35} className="opacity-80 invert" />
          </div>
          <h4 className="font-[family-name:var(--font-space)] text-white font-semibold text-base">
            {personalInfo.name.split(" ").map(w => w[0] + w.slice(1).toLowerCase()).join(" ")}
          </h4>
          <p className="text-xs text-blue-400 mt-1">{personalInfo.email}</p>
          <p className="text-xs text-white/40 mt-0.5">{personalInfo.phone}</p>
          <p className="text-xs text-white/30 mt-0.5">— {personalInfo.location}</p>
        </div>
      </motion.div>

      {/* Volunteer */}
      <motion.div variants={item}>
        <h3 className="font-[family-name:var(--font-space)] text-base font-semibold text-white/90 tracking-wide mb-4 border-b border-white/10 pb-2">
          Volunteer Work
        </h3>
        <div className="space-y-5">
          {volunteerWork.map((v, i) => (
            <div key={i} className="pl-4 border-l-2 border-green-500/30 relative">
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-green-500" />
              <h4 className="font-[family-name:var(--font-space)] text-white font-semibold text-sm">
                {v.role}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed mt-1">
                {v.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fun stat block */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { num: "8+", label: "Projects" },
            { num: "4+", label: "Internships" },
            { num: "3+", label: "Countries" },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-white/[0.02] rounded-lg p-3 border border-white/[0.06]">
              <div className="font-[family-name:var(--font-space)] text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.num}
              </div>
              <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
