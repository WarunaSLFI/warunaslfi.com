export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
  year: number;
}

export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  description: string;
  techStack: string[];
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: "learning" | "comfortable" | "proficient";
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "tools"
  | "languages";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  location: string;
  navItems: NavItem[];
  socialLinks: SocialLink[];
}
