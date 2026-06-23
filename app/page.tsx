"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowRight, ExternalLink, Code2, Layers, Zap, Globe, Star, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { brand } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const projects = [
  {
    id: "p1",
    title: "Luminary Design System",
    description: "A comprehensive component library and design system built for scale. Ships with 80+ accessible components, dark mode, and full TypeScript support.",
    tags: ["React", "TypeScript", "Storybook", "Radix UI"],
    image: "https://cdn.prod.website-files.com/5e60642a30fed6e8bad55789/5f374060a5fdcb0681140afc_LDC_meta-image-2.png",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "p2",
    title: "Orbit Analytics Platform",
    description: "Real-time data visualization platform processing millions of events per day. Built with a focus on performance and developer experience.",
    tags: ["Next.js", "D3.js", "PostgreSQL", "Redis"],
    image: "https://media.licdn.com/dms/image/v2/C4D0BAQGpxO-qmVX71w/company-logo_200_200/company-logo_200_200/0/1631343009150?e=2147483647&v=beta&t=83RkzALMJjbqpSvBJ8YVr9M9rqEaXa2HUVTnwDjd9xI",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "p3",
    title: "Pulse Commerce Engine",
    description: "Headless e-commerce infrastructure powering 50+ storefronts. Handles inventory, payments, and fulfillment with a clean REST and GraphQL API.",
    tags: ["Node.js", "GraphQL", "Stripe", "Prisma"],
    image: "https://cdn.shopify.com/app-store/listing_images/3bd56304d40097dcc59e13a5be600b6a/desktop_screenshot/CJWYrrj0lu8CEAE=.png?height=720&width=1280",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: "p4",
    title: "Veil Privacy Browser",
    description: "A privacy-first browser extension with tracker blocking, fingerprint protection, and encrypted note-taking built directly into the toolbar.",
    tags: ["WebExtensions", "Rust", "Svelte", "IndexedDB"],
    image: "https://play-lh.googleusercontent.com/LDssAgUItdEerv2yhEzlOJn55xrLGMN7w1Wlm0oM3sRKedwqWMZCSLqOTqRBTtSnYmcDM8uJF9mzEkA8bSDyx1U=w240-h480-rw",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

const skills = [
  {
    category: "Frontend",
    icon: Layers,
    color: "from-purple-500/20 to-purple-500/5",
    accent: "text-purple-400",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Svelte"],
  },
  {
    category: "Backend",
    icon: Code2,
    color: "from-blue-500/20 to-blue-500/5",
    accent: "text-blue-400",
    items: ["Node.js", "Rust", "PostgreSQL", "Redis", "GraphQL", "Prisma"],
  },
  {
    category: "Infrastructure",
    icon: Globe,
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "text-emerald-400",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Terraform", "Cloudflare"],
  },
  {
    category: "Craft",
    icon: Zap,
    color: "from-amber-500/20 to-amber-500/5",
    accent: "text-amber-400",
    items: ["Design Systems", "Accessibility", "Performance", "Testing", "API Design", "DX"],
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Priya Nair",
    role: "CTO at Stackform",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote: "Alex shipped our entire design system in six weeks. The quality was exceptional and the documentation made onboarding the rest of the team effortless.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Founder at Driftly",
    avatar: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/aewahyauhdstskbbuq43",
    quote: "Working with Alex felt like having a senior engineer and a product designer in one. The attention to detail in every interaction was something else.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Sasha Korolev",
    role: "Lead Engineer at Vanta",
    avatar: "https://i.ytimg.com/vi/i_Zgzpe-I_A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB4L-LrEolj2LkLJWNWLIc61ZQhdw",
    quote: "The analytics platform Alex built handles our peak load without breaking a sweat. Clean architecture, great tests, and zero drama during the handoff.",
    stars: 5,
  },
];

const stats = [
  { value: "7+", label: "Years building" },
  { value: "40+", label: "Projects shipped" },
  { value: "12", label: "Open-source libs" },
  { value: "99%", label: "Client satisfaction" },
];

const valueProps = [
  {
    icon: Sparkles,
    title: "Pixel-perfect execution",
    description: "Every interface is crafted with obsessive attention to spacing, typography, and motion. Good enough is never the goal.",
  },
  {
    icon: Zap,
    title: "Performance by default",
    description: "Fast load times, optimized bundles, and efficient queries are baked in from day one, not bolted on at the end.",
  },
  {
    icon: Code2,
    title: "Clean, maintainable code",
    description: "Readable architecture, thorough documentation, and thoughtful abstractions that your future team will thank you for.",
  },
  {
    icon: CheckCircle,
    title: "Reliable delivery",
    description: "Transparent communication, realistic timelines, and a track record of shipping what was promised, when it was promised.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[100px]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <HeroBackground />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium tracking-wide mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Available for new projects
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-syne text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-6"
            >
              I build things{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                people love
              </span>{" "}
              to use.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: "0.1s" }}
              className="text-lg md:text-xl text-white/50 leading-relaxed max-w-xl mb-10 text-pretty"
            >
              {brand.description} I care deeply about craft, performance, and the details that make software feel alive.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: "0.2s" }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-medium transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] hover:-translate-y-0.5"
              >
                View my work
                <ArrowRight size={16} />
              </Link>
              <a
                href={`mailto:${brand.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail size={16} />
                Get in touch
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-8 mt-16 pt-12 border-t border-white/5"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp} className="flex flex-col gap-1">
                  <span className="font-syne text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                  <span className="text-sm text-white/40">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating social links */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
          >
            {[
              { icon: Github, href: brand.github, label: "GitHub" },
              { icon: Linkedin, href: brand.linkedin, label: "LinkedIn" },
              { icon: Twitter, href: brand.twitter, label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, x: -4 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-purple-400 hover:border-purple-500/40 transition-colors duration-200"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-600/6 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-[0_8px_48px_rgba(0,0,0,0.5)]">
                <img
                  src="https://www.shutterstock.com/shutterstock/videos/1104559591/thumb/2.jpg?ip=x480"
                  alt={`${brand.name} portrait`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <p className="text-xs text-white/50 mb-1">Currently based in</p>
                  <p className="text-sm font-medium text-white">San Francisco, CA</p>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border border-purple-500/20" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full border border-blue-500/10" />
            </motion.div>

            {/* Text side */}
            <motion.div {...motionProps(slideInRight)} className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">About me</p>
                <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight mb-6">
                  Turning complex problems into elegant software.
                </h2>
              </div>
              <p className="text-white/60 leading-relaxed">
                I&apos;m {brand.name}, a full-stack developer with seven years of experience building products that sit at the intersection of engineering rigor and thoughtful design. I&apos;ve worked with early-stage startups and established teams across fintech, developer tooling, and consumer software.
              </p>
              <p className="text-white/60 leading-relaxed">
                My approach is simple: understand the problem deeply before writing a single line of code, then build something that lasts. I believe the best software is invisible — it just works, and it feels right.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Open to freelance", "Remote-friendly", "Full-time available"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${brand.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200 group"
                >
                  Let&apos;s talk about your project
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0d0d0d] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...motionProps(fadeInUp)} className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Why work with me</p>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
              Built on craft, delivered with care.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {valueProps.map((vp, i) => (
              <motion.div
                key={vp.title}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mb-5">
                  <vp.icon size={18} className="text-purple-400" />
                </div>
                <h3 className="font-syne text-lg font-semibold text-white mb-2">{vp.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{vp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/6 blur-[120px] rounded-full -translate-y-1/2" />
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...motionProps(fadeInUp)} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Skills</p>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-lg">
              The tools I reach for.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.category}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="p-6 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-white/10 transition-all duration-300"
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${skill.color} border border-white/10 flex items-center justify-center mb-5`}>
                  <skill.icon size={16} className={skill.accent} />
                </div>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${skill.accent}`}>
                  {skill.category}
                </p>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 bg-[#0d0d0d] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...motionProps(fadeInUp)} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Projects</p>
              <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Selected work.
              </h2>
            </div>
            <a
              href={brand.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 group flex-shrink-0"
            >
              <Github size={15} />
              View all on GitHub
              <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>

          {/* Featured projects — large cards */}
          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          >
            {projects.filter((p) => p.featured).map((project) => (
              <motion.article
                key={project.id}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-syne text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-5">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/8 text-white/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                          className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200">
                          <Github size={13} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live site"
                          className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200">
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Non-featured — compact row */}
          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {projects.filter((p) => !p.featured).map((project) => (
              <motion.article
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-syne text-base font-semibold text-white leading-snug">{project.title}</h3>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-colors duration-200">
                        <Github size={12} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live site"
                        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-purple-400 transition-colors duration-200">
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-white/45 leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-white/5 border border-white/8 text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/6 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...motionProps(fadeInUp)} className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Testimonials</p>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
              What clients say.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300 flex flex-col gap-5"
              >
                <StarRating count={t.stars} />
                <p className="text-sm text-white/60 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 bg-[#0d0d0d] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div {...motionProps(slideInLeft)}>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Contact</p>
              <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-balance leading-tight mb-6">
                Let&apos;s build something great.
              </h2>
              <p className="text-white/50 leading-relaxed mb-10 max-w-md">
                Whether you have a project in mind, want to explore a collaboration, or just want to say hello — my inbox is always open.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
                  { icon: Github, label: "GitHub", value: "github.com/alexmercer", href: brand.github },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexmercer", href: brand.linkedin },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 mb-0.5">{label}</p>
                      <p className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">{value}</p>
                    </div>
                    <ChevronRight size={14} className="ml-auto text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div {...motionProps(slideInRight)}>
              {formSent ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="p-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="font-syne text-xl font-semibold text-white">Message sent.</h3>
                  <p className="text-sm text-white/50 max-w-xs">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-white/40 uppercase tracking-wider">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-white/40 uppercase tracking-wider">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-white/40 uppercase tracking-wider">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleFormChange}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-medium text-sm transition-all duration-300 shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_36px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
                  >
                    Send message
                    <ArrowRight size={15} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}