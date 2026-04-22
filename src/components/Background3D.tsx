"use client";

import { useRef, useEffect, useState } from "react";

// ==========================================
// PLAYABLE DRAWING ENGINE
// ==========================================
type Point = {
  x: number; y: number; age: number; maxAge: number;
  width?: number;
  offsetX?: number; offsetY?: number;
  vx?: number; vy?: number;
  size?: number; color?: string;
  type: "ink" | "plasma" | "web" | "ribbon";
};

function PlayableCanvas({ penStyle }: { penStyle: "ink" | "plasma" | "web" | "ribbon" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const penRef = useRef(penStyle);
  
  useEffect(() => { penRef.current = penStyle; }, [penStyle]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    
    let mouse = { x: -1000, y: -1000 };
    let points: Point[] = [];
    
    // Radium Color Palette
    // Neon Green: #39ff14
    // Toxic Yellow: #ccff00
    // Uranium Glow: #a3ff00
    // Reactor Cyan: #00ffcc
    
    const handleMouseMove = (e: MouseEvent) => {
      if (mouse.x < 0) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        return;
      }
      
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist > 1) { 
        const style = penRef.current;
        
        if (style === "ink") {
          const steps = Math.max(1, Math.floor(dist / 2));
          const brushWidth = Math.max(1.5, 12 - (dist * 0.15));
          for (let i = 1; i <= steps; i++) {
            points.push({
              type: "ink",
              x: mouse.x + (dx * (i/steps)), y: mouse.y + (dy * (i/steps)),
              age: 0, maxAge: 90, width: brushWidth
            });
          }
        } 
        else if (style === "plasma") {
          const steps = Math.max(1, Math.floor(dist / 5));
          for (let i = 0; i <= steps; i++) {
            points.push({
              type: "plasma",
              x: mouse.x + (dx * (i/steps)), y: mouse.y + (dy * (i/steps)),
              age: 0, maxAge: 40 + Math.random() * 30,
              offsetX: (Math.random() - 0.5) * 15, offsetY: (Math.random() - 0.5) * 15
            });
          }
        }
        else if (style === "web") {
          const count = Math.max(1, Math.floor(dist / 8)); // Lay points sparingly
          for (let i = 0; i < count; i++) {
            points.push({
              type: "web",
              x: e.clientX + (Math.random() - 0.5) * 20,
              y: e.clientY + (Math.random() - 0.5) * 20,
              age: 0, maxAge: 120, // Webs last longer
            });
          }
        }
        else if (style === "ribbon") {
          const steps = Math.max(1, Math.floor(dist / 2));
          for (let i = 1; i <= steps; i++) {
            points.push({
              type: "ribbon",
              x: mouse.x + (dx * (i/steps)), 
              y: mouse.y + (dy * (i/steps)),
              age: 0, maxAge: 80,
              size: Math.max(5, dist * 0.4) // Ribbon width based on speed
            });
          }
        }
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    let animationFrameId: number;
    const render = () => {
      // Global fade out to create motion blur and erase old lines
      ctx.fillStyle = 'rgba(3, 3, 5, 0.08)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      
      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        p.age++;
        const alpha = Math.max(0, 1 - (p.age / p.maxAge));
        
        if (p.type === "ink" || p.type === "plasma" || p.type === "ribbon") {
          const prev = points[i-1];
          if (prev && prev.type === p.type && prev.age < prev.maxAge) {
            const distSq = Math.pow(p.x - prev.x, 2) + Math.pow(p.y - prev.y, 2);
            if (distSq < 1000) { 
              if (p.type === "ink") {
                ctx.globalCompositeOperation = 'source-over';
                
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y); ctx.lineTo(p.x, p.y);
                ctx.strokeStyle = `rgba(0, 255, 204, ${alpha * 0.15})`; // Reactor cyan bleed
                ctx.lineWidth = (p.width || 2) + 6;
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y); ctx.lineTo(p.x, p.y);
                ctx.strokeStyle = `rgba(163, 255, 0, ${alpha * 0.9})`; // Uranium core
                ctx.lineWidth = p.width || 2;
                ctx.stroke();
              } 
              else if (p.type === "plasma") {
                ctx.globalCompositeOperation = 'lighter';
                p.offsetX = (p.offsetX || 0) + (Math.random() - 0.5) * 6;
                p.offsetY = (p.offsetY || 0) + (Math.random() - 0.5) * 6;
                
                const px = p.x + (p.offsetX || 0); const py = p.y + (p.offsetY || 0);
                const prevx = prev.x + (prev.offsetX || 0); const prevy = prev.y + (prev.offsetY || 0);
                
                ctx.beginPath(); ctx.moveTo(prevx, prevy); ctx.lineTo(px, py);
                ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.6})`; // Neon Green
                ctx.lineWidth = 6; ctx.stroke();

                ctx.beginPath(); ctx.moveTo(prevx, prevy); ctx.lineTo(px, py);
                ctx.strokeStyle = `rgba(204, 255, 0, ${alpha * 0.8})`; // Toxic Yellow
                ctx.lineWidth = 3; ctx.stroke();
                
                ctx.beginPath(); ctx.moveTo(prevx, prevy); ctx.lineTo(px, py);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 1; ctx.stroke();
              }
              else if (p.type === "ribbon") {
                ctx.globalCompositeOperation = 'lighter';
                
                // Ribbon twist effect based on age
                const twist = Math.sin(p.age * 0.2) * (p.size || 10);
                const prevTwist = Math.sin(prev.age * 0.2) * (prev.size || 10);
                
                // Top edge
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y + prevTwist);
                ctx.lineTo(p.x, p.y + twist);
                ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.8})`; 
                ctx.lineWidth = 3;
                ctx.stroke();
                
                // Core
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y + prevTwist);
                ctx.lineTo(p.x, p.y + twist);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`; 
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          }
        }
        else if (p.type === "web") {
          ctx.globalCompositeOperation = 'lighter';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 204, ${alpha})`; // Cyan nodes
          ctx.fill();
          
          // Connect to nearby points dynamically
          let connections = 0;
          for (let j = i - 1; j >= Math.max(0, i - 40); j--) {
            const other = points[j];
            if (other && other.type === "web") {
               const dist = Math.sqrt(Math.pow(p.x - other.x, 2) + Math.pow(p.y - other.y, 2));
               if (dist < 60) {
                 ctx.beginPath();
                 ctx.moveTo(p.x, p.y);
                 ctx.lineTo(other.x, other.y);
                 const lineAlpha = alpha * (1 - dist / 60);
                 ctx.strokeStyle = `rgba(57, 255, 20, ${lineAlpha * 0.6})`; // Green web lines
                 ctx.lineWidth = 1;
                 ctx.stroke();
                 connections++;
                 if (connections > 3) break; // Limit connections so it doesn't get fully opaque
               }
            }
          }
        }
      }
      
      points = points.filter(p => p.age < p.maxAge);
      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] bg-[#030305]" />;
}

// ==========================================
// MAIN COMPONENT & SWITCHER UI
// ==========================================
export function Background3D() {
  const [penStyle, setPenStyle] = useState<"ink" | "plasma" | "web" | "ribbon">("web");

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[#030305]">
        <PlayableCanvas penStyle={penStyle} />
        {/* Subtle overlay gradient to blend with UI */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f] opacity-80 pointer-events-none" />
      </div>

      {/* Background Selector UI */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end group">
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Pen Style
        </div>
        <div className="flex gap-2 bg-black/40 p-1.5 rounded-full backdrop-blur-md border border-[#39ff14]/20 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
          <button 
            onClick={() => setPenStyle("ink")}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${penStyle === 'ink' ? 'bg-[#a3ff00]/20 scale-110 shadow-[0_0_10px_rgba(163,255,0,0.5)]' : 'hover:bg-white/10'}`}
            title="Toxic Ink"
          >
            🖋️
          </button>
          <button 
            onClick={() => setPenStyle("plasma")}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${penStyle === 'plasma' ? 'bg-[#39ff14]/20 scale-110 shadow-[0_0_10px_rgba(57,255,20,0.5)]' : 'hover:bg-white/10'}`}
            title="Radium Plasma"
          >
            ⚡
          </button>
          <button 
            onClick={() => setPenStyle("web")}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${penStyle === 'web' ? 'bg-[#00ffcc]/20 scale-110 shadow-[0_0_10px_rgba(0,255,204,0.5)]' : 'hover:bg-white/10'}`}
            title="Geometric Web"
          >
            🕸️
          </button>
          <button 
            onClick={() => setPenStyle("ribbon")}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${penStyle === 'ribbon' ? 'bg-[#ccff00]/20 scale-110 shadow-[0_0_10px_rgba(204,255,0,0.5)]' : 'hover:bg-white/10'}`}
            title="DNA Ribbon"
          >
            🧬
          </button>
        </div>
      </div>
    </>
  );
}
