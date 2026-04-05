import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ArrowUpRight, ChevronDown } from 'lucide-react';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

import { personal } from '../data/resume';
import { registerPickerOpener } from '../utils/mailPicker';

const email = personal.email;

const mailApps = [
  {
    label: 'Gmail',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" fill="#EA4335" opacity=".2"/>
        <path d="M22 6L12 13 2 6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    href: `https://mail.google.com/mail/?view=cm&to=${email}`,
  },
  {
    label: 'Outlook',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#0078D4" opacity=".2"/>
        <path d="M2 8l10 7 10-7" stroke="#0078D4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}`,
  },
  {
    label: 'Yahoo Mail',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#6001D2" opacity=".2"/>
        <path d="M2 8l10 7 10-7" stroke="#6001D2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    href: `https://compose.mail.yahoo.com/?to=${email}`,
  },
  {
    label: 'Default mail app',
    icon: <Mail size={16} className="text-slate-500" />,
    href: `mailto:${email}`,
  },
];

const contactLinks = [
  { icon: <Mail size={18} />,    label: 'Email',    value: email,                                          isEmail: true  },
  { icon: <Phone size={18} />,   label: 'Phone',    value: personal.phone,  href: `tel:${personal.phone}`, isEmail: false },
  { icon: <GitHubIcon />,        label: 'GitHub',   value: 'github.com/codingbrain01',                     href: personal.github,   isEmail: false },
  { icon: <LinkedInIcon />,      label: 'LinkedIn', value: 'linkedin.com/in/camden-francisco-1615033b8',   href: personal.linkedin, isEmail: false },
];

const DROPDOWN_WIDTH = 208; // w-52 = 13rem = 208px

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [pickerOpen, setPickerOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sayHelloRef = useRef<HTMLDivElement>(null);
  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);

  // Close on outside click — checks both button and dropdown
  useEffect(() => {
    if (!pickerOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!buttonRef.current?.contains(t) && !dropdownRef.current?.contains(t)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [pickerOpen]);

  // Register opener so mailPicker utility can call it directly
  useEffect(() => {
    registerPickerOpener(() => {
      // Instant scroll ensures button is in view before measuring
      sayHelloRef.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
      if (buttonRef.current) setBtnRect(buttonRef.current.getBoundingClientRect());
      setPickerOpen(true);
    });
  }, []);

  function handleToggle() {
    if (!pickerOpen && buttonRef.current) {
      setBtnRect(buttonRef.current.getBoundingClientRect());
    }
    setPickerOpen(v => !v);
  }

  function openPicker() {
    sayHelloRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      if (buttonRef.current) setBtnRect(buttonRef.current.getBoundingClientRect());
      setPickerOpen(true);
    }, 400);
  }

  // Desktop: position dropdown below the button using viewport coords (fixed)
  // Mobile: CSS handles it as a bottom sheet
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;
  const dropdownStyle: React.CSSProperties | undefined =
    isDesktop && btnRect
      ? {
          position: 'fixed',
          top: btnRect.bottom + 8,
          left: Math.max(8, btnRect.left + btnRect.width / 2 - DROPDOWN_WIDTH / 2),
          width: DROPDOWN_WIDTH,
          zIndex: 9999,
        }
      : undefined;

  const dropdownContent = (
    <motion.div
      ref={dropdownRef}
      style={dropdownStyle}
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={
        dropdownStyle
          ? 'rounded-xl border border-(--border) bg-(--surface) shadow-xl shadow-black/10 dark:shadow-black/40 overflow-hidden'
          : 'fixed bottom-4 left-4 right-4 z-9999 rounded-xl border border-(--border) bg-(--surface) shadow-xl shadow-black/10 dark:shadow-black/40 overflow-hidden'
      }
    >
      <p className="text-xs text-slate-600 dark:text-slate-400 font-mono px-4 pt-3 pb-2 border-b border-(--border-subtle)">
        Open with…
      </p>
      <ul className="py-1">
        {mailApps.map((app) => (
          <li key={app.label}>
            <a
              href={app.href}
              target={app.label !== 'Default mail app' ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={() => setPickerOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {app.icon}
              {app.label}
              {app.label !== 'Default mail app' && (
                <ArrowUpRight size={12} className="ml-auto text-slate-400 dark:text-slate-600" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section id="contact" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-indigo-500 dark:text-indigo-400 text-sm">06.</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Get In Touch</h2>
          <div className="flex-1 h-px bg-(--border) ml-4" />
        </motion.div>
        <div className="max-w-3xl mx-auto text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10"
        >
          Whether you have a project in mind, want to discuss a role, or just want to connect — my inbox is always open.
        </motion.p>

        {/* Say Hello */}
        <motion.div
          ref={sayHelloRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-14 flex justify-center"
        >
          <button
            ref={buttonRef}
            onClick={handleToggle}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 glow-strong hover:scale-105"
          >
            <Mail size={18} />
            Say Hello
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${pickerOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Portal — rendered in document.body, escapes all transform ancestors */}
          {createPortal(
            <AnimatePresence>{pickerOpen && dropdownContent}</AnimatePresence>,
            document.body
          )}
        </motion.div>

        {/* Contact links grid */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {contactLinks.map((link, i) => {
            const inner = (
              <>
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-0.5">{link.label}</p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-slate-400 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
              </>
            );

            const baseClass =
              'flex items-center gap-4 p-4 rounded-xl border border-(--border) bg-(--surface) hover:border-indigo-500/30 transition-all duration-300 group text-left w-full';

            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                className="min-w-0"
              >
                {link.isEmail ? (
                  <button onClick={openPicker} className={baseClass}>
                    {inner}
                  </button>
                ) : (
                  <a href={'href' in link ? link.href : '#'} target="_blank" rel="noopener noreferrer" className={baseClass}>
                    {inner}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
