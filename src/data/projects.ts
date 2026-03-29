import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    title: "RPS Analytics Dashboard",
    description:
      "Real-time Rock Paper Scissors analytics with live SSE feed, interactive charts, and comprehensive game statistics.",
    longDescription:
      "Built for the Reaktor Summer Developer 2026 application. Features a React + TypeScript + Vite frontend with a Node/Express + TypeScript backend. Includes 104 Jest tests, Server-Sent Events for live game updates, and Railway deployment.",
    techStack: ["React", "TypeScript", "Vite", "Node.js", "Express", "Jest", "SSE"],
    githubUrl: "https://github.com/WarunaSLFI",
    featured: true,
    year: 2025,
  },
  {
    title: "cPouta Cloud Server",
    description:
      "Full Linux server infrastructure on CSC cPouta cloud with Apache, DNS, HTTPS, firewall, and monitoring.",
    longDescription:
      "Complete server setup including Apache web server, DNS configuration, HTTPS with Certbot, UFW firewall rules, user management, Centreon monitoring, and SSH multi-hop access.",
    techStack: ["Linux", "Apache", "DNS", "HTTPS", "UFW", "Certbot", "Centreon", "SSH"],
    liveUrl: "https://waruna.ilab.fi",
    featured: true,
    year: 2025,
  },
  {
    title: "Nimbus Weather Engine",
    description:
      "Weather dashboard with live data fetching, location search, and responsive design.",
    longDescription:
      "Built for TAMK Basics of Web Development course. Features real-time weather data, interactive location search, and a clean responsive UI.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://25-bowd-60.course.tamk.cloud",
    featured: true,
    year: 2025,
  },
  {
    title: "Study Planner SaaS",
    description:
      "Study planning application concept for organizing courses, assignments, and schedules.",
    techStack: ["React", "TypeScript", "Node.js"],
    featured: false,
    year: 2024,
  },
];
