import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Send, Layout, CheckCircle2, ExternalLink, Bot } from 'lucide-react';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
import { projects } from '../data/resume';

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={24} />,
  send:    <Send size={24} />,
  layout:  <Layout size={24} />,
  bot:     <Bot size={24} />,
};

function FeaturedProject({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[number];
  index: number;
  inView: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative rounded-2xl border border-(--border) bg-(--surface) overflow-hidden group hover:border-indigo-500/30 transition-all duration-500"
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}88, ${project.accentColor}22)` }}
      />

      <div className={`p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center ${isEven ? '' : 'md:[direction:rtl]'}`}>
        {/* Content */}
        <div className={isEven ? '' : '[direction:ltr]'}>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="p-3 rounded-xl"
              style={{ background: `${project.accentColor}18`, color: project.accentColor }}
            >
              {iconMap[project.icon]}
            </div>
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: `${project.accentColor}18`, color: project.accentColor }}
            >
              {project.badge}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
          <p className="font-mono text-xs mb-4" style={{ color: project.accentColor }}>
            {project.tagline}
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md border text-xs font-mono"
                style={{
                  background: `${project.accentColor}0a`,
                  borderColor: `${project.accentColor}30`,
                  color: project.accentColor,
                  opacity: 0.9,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.url || project.github) && (
            <div className="flex items-center gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors"
                  style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}
                >
                  <ExternalLink size={12} /> Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-(--border) text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                >
                  <GitHubIcon /> Source
                </a>
              )}
            </div>
          )}
        </div>

        {/* Highlights */}
        <div className={isEven ? '' : '[direction:ltr]'}>
          <div className="p-6 rounded-xl border bg-(--bg)" style={{ borderColor: `${project.accentColor}22` }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">Key Features</p>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: project.accentColor }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ambient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(600px at 50% 0%, ${project.accentColor}06, transparent 70%)` }}
      />
    </motion.div>
  );
}

function SmallProject({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[number];
  index: number;
  inView: boolean;
}) {
  const link = project.url ?? project.github;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.4 + index * 0.1 }}
      className="p-6 rounded-xl border border-(--border) bg-(--surface) hover:border-emerald-500/30 transition-all duration-300 group flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg" style={{ background: `${project.accentColor}18`, color: project.accentColor }}>
          {iconMap[project.icon]}
        </div>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
            <ExternalLink size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors" />
          </a>
        ) : (
          <ExternalLink size={16} className="text-slate-400 dark:text-slate-500 transition-colors" />
        )}
      </div>
      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{project.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono bg-(--surface-2) border border-(--border) text-slate-600 dark:text-slate-400">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28 px-6 bg-(--bg-alt)" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-indigo-500 dark:text-indigo-400 text-sm">04.</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h2>
          <div className="flex-1 h-px bg-(--border) ml-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 text-sm mb-3"
        >
          Highlighted builds — from native kiosk environments to automated messaging pipelines.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-500 dark:text-slate-400 text-xs italic mb-12"
        >
          Note: Additional client work (13+ landing pages) is not publicly listed in accordance with company privacy and contractual confidentiality agreements.
        </motion.p>

        <div className="flex flex-col gap-8 mb-16">
          {featured.map((project, i) => (
            <FeaturedProject key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {others.length > 0 && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-widest mb-6"
            >
              Other notable work
            </motion.p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((project, i) => (
                <SmallProject key={project.id} project={project} index={i} inView={inView} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
