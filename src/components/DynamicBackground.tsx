"use client";

import { useEffect, useRef } from "react";

export function DynamicBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 50;
    let currentY = 50;
    let targetX = 50;
    let targetY = 50;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      // Smooth easing for the mouse follow effect
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (bgRef.current) {
        bgRef.current.style.setProperty("--mouse-x", `${currentX}%`);
        bgRef.current.style.setProperty("--mouse-y", `${currentY}%`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0a0f]">
      {/* Interactive ambient glow that smoothly follows the cursor */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(
              circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), 
              rgba(59, 130, 246, 0.15), 
              rgba(139, 92, 246, 0.05), 
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Slow pulsing gradients in the corners for depth */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Subtle grid pattern overlay for a tech aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />
    </div>
  );
}
