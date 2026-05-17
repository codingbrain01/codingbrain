import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { BadgeCheck, ExternalLink, X } from 'lucide-react';
import { SectionHeader, SectionShell, Tag } from './ui/Section';

const cert = {
  title: 'Vite for Developers',
  subtitle: 'Build and bundle web apps the modern way with Vite',
  issuer: 'Udemy',
  category: 'Web Development · Vite',
  year: '2026',
  skills: ['Vite', 'HMR', 'Code Splitting', 'React', 'Build Optimization'],
  image: '/UC-11c40174-c357-4621-9694-cf1530cb055f.jpg',
  credentialId: 'UC-11c40174-c357-4621-9694-cf1530cb055f',
  verifyUrl: 'https://ude.my/UC-11c40174-c357-4621-9694-cf1530cb055f/',
};

export default function Certifications() {
  const [lightbox, setLightbox] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <>
      <SectionShell id="certifications" refProp={ref}>
        <SectionHeader
          index="05."
          title="Certifications"
          inView={inView}
        />

        <motion.article
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid md:grid-cols-[18rem_1fr] overflow-hidden rounded-2xl border border-(--border) bg-(--surface)"
        >
          <button
            onClick={() => setLightbox(true)}
            className="relative min-h-56 overflow-hidden bg-(--bg-alt) group cursor-zoom-in"
            aria-label="View certificate"
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
            </div>
          </button>

          <div className="p-7 md:p-8 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-300">
                <BadgeCheck size={13} />
                {cert.issuer}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{cert.category}</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">{cert.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-5">{cert.subtitle}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {cert.skills.map(skill => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-(--border-subtle) pt-5">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Issued {cert.year} · ID: {cert.credentialId.slice(0, 8)}...
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  Verify <ExternalLink size={12} />
                </a>
                <button
                  onClick={() => setLightbox(true)}
                  className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                >
                  View <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      </SectionShell>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full"
              onClick={event => event.stopPropagation()}
            >
              <img src={cert.image} alt={cert.title} className="w-full rounded-xl shadow-2xl" />
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
    </>
  );
}
