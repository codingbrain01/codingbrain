import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { setNavigate } from './utils/mailPicker';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

// Stores the router's navigate fn so the mailPicker utility can use it
function NavigateSetter() {
  const navigate = useNavigate();
  useEffect(() => { setNavigate(navigate); }, [navigate]);
  return null;
}

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-(--bg) text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <NavigateSetter />
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"           element={<Page><Hero /></Page>} />
            <Route path="/about"      element={<Page><About /></Page>} />
            <Route path="/skills"     element={<Page><Skills /></Page>} />
            <Route path="/experience" element={<Page><Experience /></Page>} />
            <Route path="/projects"   element={<Page><Projects /></Page>} />
            <Route path="/contact"    element={<Page><Contact /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
