"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ResumeSection } from "@/components/ResumeSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  return (
    <main className="relative min-h-screen pt-20 pb-32 px-4 md:px-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center mb-24 pointer-events-none"
      >
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-full" />
          <h1 className="glitch-hover font-[family-name:var(--font-space)] text-5xl md:text-8xl font-bold text-white tracking-[8px] leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            SHASHANK
            <br />
            MISHRA
          </h1>
        </div>
        <p className="text-blue-400 font-[family-name:var(--font-space)] text-lg md:text-2xl tracking-[4px] uppercase opacity-80">
          AI Engineer & Full-Stack Developer
        </p>
      </motion.div>

      {/* Main Content Sections */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto space-y-12"
      >
        {/* Resume Section */}
        <motion.section variants={sectionVariants} className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <h2 className="text-9xl font-bold tracking-tighter uppercase select-none">RESUME</h2>
          </div>
          <ResumeSection />
        </motion.section>

        {/* Portfolio Section */}
        <motion.section variants={sectionVariants} className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 p-8 opacity-5">
            <h2 className="text-9xl font-bold tracking-tighter uppercase select-none">WORK</h2>
          </div>
          <PortfolioSection />
        </motion.section>

        {/* Contact Section */}
        <motion.section variants={sectionVariants} className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <h2 className="text-9xl font-bold tracking-tighter uppercase select-none">INFO</h2>
          </div>
          <ContactSection />
        </motion.section>
      </motion.div>

      {/* Footer Branding */}
      <footer className="mt-32 text-center text-white/20 font-[family-name:var(--font-space)] tracking-widest text-xs uppercase">
        Built with Radium Tech &copy; 2024 Shashank Mishra
      </footer>
    </main>
  );
}
