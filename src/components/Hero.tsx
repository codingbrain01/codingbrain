import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { personal } from '../data/resume';
import { openMailPicker } from '../utils/mailPicker';

const easing: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: easing },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-indigo-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-75 h-75 rounded-full bg-violet-600/6 blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-mono mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for new opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none"
        >
          <span className="gradient-text">{personal.shortName}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-xl md:text-2xl text-slate-400 font-light mb-3"
        >
          {personal.title}
        </motion.p>

        {/* Specialties */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {['React & TypeScript', 'Electron Kiosk', 'Telegram Automation', 'VPS / DevOps'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-[#1a1a24] border border-[#2a2a38] text-slate-400 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 glow-strong hover:scale-105"
          >
            View My Work
          </a>
          <button
            onClick={openMailPicker}
            className="px-7 py-3 rounded-full border border-[#2a2a38] hover:border-indigo-500/50 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200 hover:scale-105 flex items-center gap-2"
          >
            <Mail size={15} />
            Get in Touch
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex justify-center gap-5"
        >
          {[
            { icon: <Mail size={18} />, onClick: openMailPicker, href: null, label: 'Email' },
            {
              icon: (
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              ),
              onClick: null, href: personal.github, label: 'GitHub',
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
              onClick: null, href: personal.linkedin, label: 'LinkedIn',
            },
          ].map(({ icon, onClick, href, label }) =>
            onClick ? (
              <button
                key={label}
                onClick={onClick}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-[#2a2a38] flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200"
              >
                {icon}
              </button>
            ) : (
              <a
                key={label}
                href={href ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-[#2a2a38] flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200"
              >
                {icon}
              </a>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
