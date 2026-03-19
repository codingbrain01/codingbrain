import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, BadgeCheck } from 'lucide-react';

const cert = {
  title: 'Vite for Developers',
  subtitle: 'Build and bundle web apps the modern way with Vite',
  issuer: 'Udemy',
  category: 'Web Development · Vite',
  year: '2026',
  skills: ['Vite', 'HMR', 'Code Splitting', 'React', 'Build Optimization'],
  image: '/UC-11c40174-c357-4621-9694-cf1530cb055f.jpg',
  credentialId: 'UC-11c40174-c357-4621-9694-cf1530cb055f',
};

export default function Certifications() {
  const [lightbox, setLightbox] = useState(false);

  return (
    <section id="certifications" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 dark:text-indigo-400 mb-2">
            Credentials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Certifications
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 shadow-lg"
        >
          {/* Thumbnail */}
          <button
            onClick={() => setLightbox(true)}
            className="relative w-full sm:w-64 shrink-0 overflow-hidden group cursor-zoom-in bg-slate-100 dark:bg-slate-900"
            aria-label="View certificate"
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-44 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
            </div>
          </button>

          {/* Details */}
          <div className="flex flex-col justify-center gap-4 p-7">
            {/* Issuer badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300">
                <BadgeCheck size={13} />
                {cert.issuer}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{cert.category}</span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {cert.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {cert.subtitle}
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {cert.skills.map(s => (
                <span
                  key={s}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Issued {cert.year} · ID: {cert.credentialId.slice(0, 8)}…
              </span>
              <button
                onClick={() => setLightbox(true)}
                className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors flex items-center gap-1"
              >
                View Certificate <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full rounded-xl shadow-2xl"
              />
              <button
                onClick={() => setLightbox(false)}
                className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-lg text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
