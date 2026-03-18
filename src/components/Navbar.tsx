import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { openMailPicker } from '../utils/mailPicker';

const links = [
  { label: 'About',      to: '/about' },
  { label: 'Skills',     to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects',   to: '/projects' },
  { label: 'Contact',    to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-md border-b border-(--border)'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-mono text-sm font-medium text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors">
          <span className="text-slate-400 dark:text-slate-500">~/</span>camden-francisco
        </Link>

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
                <Link
                  to={link.to}
                  className={`text-sm transition-colors relative group ${
                    active
                      ? 'text-indigo-500 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-indigo-500 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-400/40 transition-all"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={openMailPicker}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/40 text-indigo-500 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-500/10 hover:border-indigo-400 transition-all"
          >
            Hire me
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-(--border) flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-all"
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
            className="md:hidden bg-white/95 dark:bg-[#111118]/95 backdrop-blur-md border-b border-(--border) overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`text-sm transition-colors ${
                      pathname === link.to
                        ? 'text-indigo-500 dark:text-indigo-400 font-medium'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={openMailPicker}
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
