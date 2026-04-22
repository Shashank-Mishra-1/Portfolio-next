import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { Background3D } from "@/components/Background3D";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shashank Mishra | AI Engineer & Full-Stack Developer Portfolio",
  description:
    "AI Engineer and Full-Stack Developer specializing in LLMs, Prompt Engineering, React.js, and Cloud Solutions.",
  keywords:
    "Shashank Mishra, AI Engineer, Full Stack Developer, LLM, Portfolio",
  authors: [{ name: "Shashank Mishra" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="font-[family-name:var(--font-inter)] antialiased bg-[#0a0a0f] text-white">
        <Background3D />
        <CustomCursor />
        <ParticleCanvas />
        {children}
      </body>
    </html>
  );
}
