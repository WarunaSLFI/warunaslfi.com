import { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Waruna Bandara Rathnamalala",
  title: "Full-Stack Developer",
  description:
    "Software Engineering student at TAMK & Full-Stack Developer intern at Beecommerce. I build accessible, performant web applications with React, Angular, TypeScript, and Node.js.",
  url: "https://www.warunaslfi.com",
  email: "waruna@warunaslfi.com",
  location: "Tampere, Finland",
  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/WarunaSLFI",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/warunasLFI",
      icon: "linkedin",
    },
  ],
};
