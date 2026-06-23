"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, brand } from "@/lib/data";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowUp } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { icon: Github, label: "GitHub", href: brand.github },
  { icon: Linkedin, label: "LinkedIn", href: brand.linkedin },
  { icon: Twitter, label: "Twitter", href: brand.twitter },
  { icon: Mail, label: "Email", href: `mailto:${brand.email}` },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_16px_rgba(168,85,247,0.3)]">
                {brand.initials}
              </div>
              <span className="font-syne font-semibold text-white/90">
                {brand.name}
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {brand.description}
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social + contact */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Connect
            </p>
            <ul className="space-y-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-white/50 hover:text-purple-400 transition-colors duration-200 group"
                  >
                    <s.icon
                      size={14}
                      className="text-white/30 group-hover:text-purple-400 transition-colors duration-200"
                    />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5"
        >
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} {brand.name}. Crafted with care.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/70 transition-colors duration-200 group"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <div className="w-6 h-6 rounded-full border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-colors duration-200">
              <ArrowUp size={10} />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}