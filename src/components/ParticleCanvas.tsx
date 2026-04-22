"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  decay: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const throttle = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true }); // alpha true for performance
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["rgba(139, 92, 246, 0.6)", "rgba(59, 130, 246, 0.5)", "rgba(255, 255, 255, 0.3)"];

    const spawnParticle = (x: number, y: number) => {
      throttle.current++;
      if (throttle.current % 3 !== 0) return;
      if (particles.current.length > 40) return; // Reduced max particles for performance

      particles.current.push({
        x,
        y,
        size: Math.random() * 3 + 1.5,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5 - 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      spawnParticle(e.clientX, e.clientY);
    };
    document.addEventListener("mousemove", onMouseMove);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = particles.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= p.decay;
        p.size *= 0.98;

        if (p.life <= 0 || p.size < 0.5) {
          arr.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        // Removed ctx.shadowBlur because it destroys frame rates on large displays!
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" className="pointer-events-none fixed inset-0 z-0" />;
}
