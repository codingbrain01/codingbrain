import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setNavigate } from './utils/mailPicker';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import TelegramChat from './components/TelegramChat';

const sections = [
  { id: 'hero',             path: '/' },
  { id: 'about',            path: '/about' },
  { id: 'skills',           path: '/skills' },
  { id: 'experience',       path: '/experience' },
  { id: 'projects',         path: '/projects' },
  { id: 'certifications',   path: '/certifications' },
  { id: 'contact',          path: '/contact' },
];

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activePathRef = useRef(pathname);

  // Store navigate fn for mailPicker utility
  useEffect(() => { setNavigate(navigate); }, [navigate]);

  useEffect(() => {
    activePathRef.current = pathname;
  }, [pathname]);

  // On first load, scroll to the section matching the URL
  useEffect(() => {
    const match = sections.find(s => s.path === pathname);
    if (match && match.id !== 'hero') {
      setTimeout(() => {
        document.getElementById(match.id)?.scrollIntoView({ behavior: 'instant' });
      }, 80);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intersection Observer — updates URL as sections scroll into view
  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (!visibleEntry) return;

        const section = sections.find(s => s.id === visibleEntry.target.id);
        if (!section || section.path === activePathRef.current) return;

        if (frame) window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => {
          activePathRef.current = section.path;
          navigate(section.path, { replace: true });
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-(--bg) text-slate-800 dark:text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <TelegramChat />
    </div>
  );
}
