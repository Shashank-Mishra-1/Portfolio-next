"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import Image from "next/image";
import { ResumeSection } from "./ResumeSection";
import { PortfolioSection } from "./PortfolioSection";
import { ContactSection } from "./ContactSection";

export function TriFoldBook() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // 3D Tilt for closed state
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isOpen) return;
      const el = containerRef.current;
      const spot = spotlightRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Reduced tilt for stability
      const rotateX = ((e.clientY - centerY) / rect.height) * -6;
      const rotateY = ((e.clientX - centerX) / rect.width) * 6;

      el.style.transition = "transform 0.1s ease-out";
      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Spotlight
      if (spot) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spot.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.9) 100%)`;
      }
    },
    [isOpen]
  );

  const handleMouseLeave = useCallback(() => {
    if (isOpen) return;
    const el = containerRef.current;
    const spot = spotlightRef.current;
    if (el) {
      el.style.transition = "transform 0.6s ease";
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
    if (spot) {
      spot.style.background =
        "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.1) 35%, transparent 50%, rgba(10,10,10,0.5) 85%, rgba(10,10,10,0.8) 100%)";
    }
  }, [isOpen]);

  // Smooth, slow, premium tween with zero bounce to prevent clipping
  const springConfig: Transition = { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 1.4 };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-12">
      <div className="perspective-[2500px] w-full max-w-[380px]">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ scale: isOpen ? 0.85 : 1 }}
          transition={springConfig}
          className="relative w-full h-[80vh] min-h-[600px] max-h-[800px] preserve-3d"
        >
        {/* ==========================================
            RIGHT FOLD (Contact / Back Cover)
            ========================================== */}
        <motion.div
          className="absolute inset-0 origin-right preserve-3d"
          initial={false}
          animate={{ rotateY: isOpen ? 180 : 0, z: -10 }}
          transition={springConfig}
        >
          {/* Front Face (Outside Back Cover - Hidden when closed, but here for physical realism) */}
          <div className="absolute inset-0 bg-black/80 border border-white/5 rounded-2xl shadow-2xl" style={{ transform: "translateZ(1px)" }} />

          {/* Back Face (Contact - Visible when open) */}
          <div className="absolute inset-0 glass-card shadow-2xl rounded-2xl" style={{ transform: "rotateY(180deg) translateZ(1px)" }}>
            <div className="scroll-pane p-6 text-[var(--color-text)]">
              <ContactSection />
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            CENTER SPINE (Portfolio)
            ========================================== */}
        <motion.div 
          className="absolute inset-0 glass-card shadow-2xl rounded-2xl"
          animate={{ z: 0 }}
        >
          <div className="scroll-pane p-6 text-[var(--color-text)]">
            <PortfolioSection />
          </div>
        </motion.div>

        {/* ==========================================
            LEFT FOLD (Main Cover / Resume)
            ========================================== */}
        <motion.div
          className="absolute inset-0 origin-left preserve-3d"
          initial={false}
          animate={{ rotateY: isOpen ? -180 : 0, z: 10 }}
          transition={springConfig}
        >
          {/* Front Face (Main Cover - Visible when closed) */}
          <div className="absolute inset-0 bg-[#0a0a0f] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" style={{ transform: "translateZ(1px)" }}>
            <Image
              src="/images/Real_asset.png"
              alt="Cover"
              fill
              className="object-cover rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 420px"
            />
            <div
              ref={spotlightRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.1) 35%, transparent 50%, rgba(10,10,10,0.5) 85%, rgba(10,10,10,0.8) 100%)",
                transition: "background 0.1s ease",
              }}
            />
            
            {/* Cover Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-12 px-6 pointer-events-none">
              <div className="text-center mt-4">
                <h1 className="glitch-hover font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold text-white tracking-[3px] leading-tight drop-shadow-xl">
                  SHASHANK
                  <br />
                  MISHRA
                </h1>
                <p className="mt-4 text-white/80 text-sm md:text-base tracking-[2px]">
                  AI Engineer & Full-Stack Developer
                </p>
              </div>

              <motion.button
                onClick={() => setIsOpen(true)}
                className="pointer-events-auto px-12 py-3 rounded-full font-[family-name:var(--font-space)] font-bold text-sm tracking-[2px] text-white shadow-lg relative overflow-hidden group"
                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">OPEN</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>

          {/* Back Face (Resume - Visible when open) */}
          <div className="absolute inset-0 glass-card shadow-2xl rounded-2xl" style={{ transform: "rotateY(180deg) translateZ(1px)" }}>
            <div className="scroll-pane p-6 text-[var(--color-text)]">
              <ResumeSection />
            </div>
          </div>
        </motion.div>

          {/* ==========================================
              CLOSE BUTTON
              ========================================== */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-50"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-2 rounded-full glass-card text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-[family-name:var(--font-space)] tracking-widest text-sm hover:bg-[var(--color-border)] transition-colors"
                >
                  CLOSE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
