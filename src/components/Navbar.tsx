import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/theme';
import { openMailPicker } from '../utils/mailPicker';

const links = [
  { label: 'About',           to: '/about',           id: 'about' },
  { label: 'Skills',          to: '/skills',           id: 'skills' },
  { label: 'Experience',      to: '/experience',       id: 'experience' },
  { label: 'Projects',        to: '/projects',         id: 'projects' },
  { label: 'Certifications',  to: '/certifications',   id: 'certifications' },
  { label: 'Contact',         to: '/contact',          id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const scrollFrame = useRef(0);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateScrolled = () => {
      scrollFrame.current = 0;
      const nextScrolled = window.scrollY > 40;
      if (nextScrolled === scrolledRef.current) return;
      scrolledRef.current = nextScrolled;
      setScrolled(nextScrolled);
    };

    const onScroll = () => {
      if (scrollFrame.current) return;
      scrollFrame.current = window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  function scrollTo(id: string, path: string) {
    if (open) {
      setOpen(false);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        navigate(path, { replace: true });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      navigate(path, { replace: true });
    }
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-150 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#080809]/95 border-b border-(--border)'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero', '/')}
          className="font-mono text-sm font-medium text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
        >
          <span className="text-slate-400 dark:text-slate-500">~/</span>camden-francisco
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link, i) => {
            const active = pathname === link.to;
            return (
              <motion.li
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <button
                  onClick={() => scrollTo(link.id, link.to)}
                  className={`text-sm transition-colors relative group ${
                    active
                      ? 'text-indigo-500 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-indigo-500 transition-[width] duration-200 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              </motion.li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-400/40 transition-colors"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={openMailPicker}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/40 text-indigo-500 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-500/10 hover:border-indigo-400 transition-colors"
          >
            Hire me
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white dark:bg-[#111118] border-b border-(--border) overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <li key={link.to}>
                  <button
                    onClick={() => scrollTo(link.id, link.to)}
                    className={`text-sm transition-colors ${
                      pathname === link.to
                        ? 'text-indigo-500 dark:text-indigo-400 font-medium'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { setOpen(false); setTimeout(openMailPicker, 300); }}
                  className="text-indigo-500 dark:text-indigo-400 text-sm font-medium"
                >
                  Hire me →
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
