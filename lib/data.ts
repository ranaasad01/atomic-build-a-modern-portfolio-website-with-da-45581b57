export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const primaryCTA = {
  label: "View My Work",
  href: "#projects",
};

export const brand = {
  name: "Alex Mercer",
  initials: "AM",
  tagline: "Creative Developer",
  description:
    "Full-stack developer and creative technologist crafting immersive digital experiences.",
  email: "hello@alexmercer.dev",
  github: "https://github.com/alexmercer",
  linkedin: "https://linkedin.com/in/alexmercer",
  twitter: "https://twitter.com/alexmercer",
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export type Skill = {
  category: string;
  items: string[];
};