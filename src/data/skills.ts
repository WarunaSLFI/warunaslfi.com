import { Skill } from "@/lib/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", proficiency: "proficient" },
  { name: "Angular", category: "frontend", proficiency: "comfortable" },
  { name: "Next.js", category: "frontend", proficiency: "comfortable" },
  { name: "TypeScript", category: "frontend", proficiency: "proficient" },
  { name: "Tailwind CSS", category: "frontend", proficiency: "proficient" },
  { name: "HTML/CSS", category: "frontend", proficiency: "proficient" },
  { name: "Jetpack Compose", category: "frontend", proficiency: "learning" },

  // Backend
  { name: "Node.js", category: "backend", proficiency: "proficient" },
  { name: "Express.js", category: "backend", proficiency: "proficient" },

  // DevOps
  { name: "Linux (Ubuntu)", category: "devops", proficiency: "comfortable" },
  { name: "Apache", category: "devops", proficiency: "comfortable" },
  { name: "DNS", category: "devops", proficiency: "comfortable" },
  { name: "HTTPS", category: "devops", proficiency: "comfortable" },
  { name: "Docker", category: "devops", proficiency: "learning" },
  { name: "Git", category: "devops", proficiency: "proficient" },
  { name: "SSH", category: "devops", proficiency: "comfortable" },

  // Tools
  { name: "VS Code", category: "tools", proficiency: "proficient" },
  { name: "Claude Code", category: "tools", proficiency: "proficient" },
  { name: "Jira", category: "tools", proficiency: "comfortable" },
  { name: "Figma", category: "tools", proficiency: "comfortable" },

  // Languages
  { name: "JavaScript", category: "languages", proficiency: "proficient" },
  { name: "TypeScript", category: "languages", proficiency: "proficient" },
  { name: "Python", category: "languages", proficiency: "comfortable" },
  { name: "Java", category: "languages", proficiency: "comfortable" },
  { name: "Kotlin", category: "languages", proficiency: "learning" },
  { name: "Dart/Flutter", category: "languages", proficiency: "learning" },
];
