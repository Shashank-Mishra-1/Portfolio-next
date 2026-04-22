export const personalInfo = {
  name: "SHASHANK MISHRA",
  title: "AI Engineer & Full-Stack Developer",
  email: "shashankmishra2604@gmail.com",
  phone: "+91 834-977-9774",
  location: "India",
  linkedin: "https://linkedin.com/in/shashank-link",
  github: "https://github.com/Shashank-Mishra-1",
  twitter: "#",
  instagram: "https://www.instagram.com/shashank.mx/",
  bio: "I am an AI Engineer with proven experience in LLM training, fine-tuning, and prompt engineering, integrating AI/ML workflows into scalable applications.",
};

export const experiences = [
  {
    period: "Aug - Oct 2025",
    role: "Gen AI Intern",
    company: "EOTS",
    location: "Sydney, Australia (Remote)",
    description:
      "Real-time video processing pipelines, AI/ML model integration, and cloud-based workflows with AWS media services.",
  },
  {
    period: "Jul - Sep 2025",
    role: "Software Engineer Intern",
    company: "GAO Tek Inc.",
    location: "Toronto, Canada (Remote)",
    description:
      "Built client websites using WordPress, React.js, and Next.js with REST APIs and custom plugins.",
  },
  {
    period: "Dec 2024 - Jan 2025",
    role: "Full-Stack Developer Intern",
    company: "TNGS",
    location: "Spain (Remote)",
    description:
      "Built MENN stack platform with data visualizations for player management and automated reports.",
  },
  {
    period: "Jan - Aug 2024",
    role: "AI Engineer (Contract)",
    company: "Freelance",
    location: "California, USA (Remote)",
    description:
      "Prompt engineering, fine-tuning, and rubric-based evaluation with OpenAI research teams.",
  },
];

export const education = [
  {
    period: "2022 - 2026",
    degree: "B.Tech in Computer Science",
    institution: "Prestige Institute (RGPV)",
    grade: "CGPA: 7.7",
  },
];

export const skills = [
  { name: "React.js / Next.js / Node.js", level: 90 },
  { name: "Python / AI & LLMs", level: 85 },
  { name: "AWS / Docker / DevOps", level: 75 },
  { name: "MongoDB / MySQL", level: 80 },
  { name: "Prompt Engineering", level: 92 },
];

export const certifications = [
  "🏆 Certified Web Developer – Micro1 (2025)",
  "☁️ Google Cloud – Professional Cloud Architect",
  "🤖 Google Cloud Skill Boost – Gen AI & Prompt Design",
  "💻 HackerRank – SQL & C++ Proficiency",
];

export type ProjectCategory = "web" | "ai" | "hackathon";

export interface Project {
  title: string;
  category: ProjectCategory;
  tagline: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: "Urjotsav Website",
    category: "web",
    tagline: "College Fest Platform",
    image: "/images/urjotsav.png",
  },
  {
    title: "LLM Evaluation Hub",
    category: "ai",
    tagline: "Prompt Engineering & AI",
    image: "/images/ai-dashboard.png",
  },
  {
    title: "DISGPT Bot",
    category: "ai",
    tagline: "AI-Powered Discord Bot",
    image: "/images/disgpt.png",
  },
  {
    title: "Scholarship Portal",
    category: "web",
    tagline: "MERN Stack Web App",
    image: "/images/scholarship.png",
  },
  {
    title: "Vcode Winner 🏆",
    category: "hackathon",
    tagline: "Mentor-Mentee Platform",
    image: "/images/vcode.png",
  },
  {
    title: "Decathon Runner-Up",
    category: "hackathon",
    tagline: "Real Estate Portal",
    image: "/images/realestate.png",
  },
  {
    title: "Sports Analytics",
    category: "web",
    tagline: "TNGS Player Platform",
    image: "/images/sports.png",
  },
  {
    title: "EOTS Media Pipeline",
    category: "ai",
    tagline: "Real-time Video AI",
    image: "/images/01.jpg",
  },
];

export const volunteerWork = [
  {
    role: "President – Cybersecurity Club",
    description:
      "Led initiatives in ethical hacking workshops, mentored students in threat analysis & secure coding.",
  },
  {
    role: "Technical Workshop Organizer",
    description:
      "Conducted workshops on Linux, open-source development, and software packaging at college & city level.",
  },
];
