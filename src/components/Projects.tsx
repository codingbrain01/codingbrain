import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Send, Layout, CheckCircle2, ExternalLink, Bot, ClipboardList, Wrench, Vote } from 'lucide-react';
import { projects } from '../data/resume';

const iconMap: Record<string, React.ReactNode> = {
  monitor:       <Monitor size={24} />,
  send:          <Send size={24} />,
  layout:        <Layout size={24} />,
  bot:           <Bot size={24} />,
  clipboardList: <ClipboardList size={24} />,
  wrench:        <Wrench size={24} />,
  vote:          <Vote size={24} />,
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

          {project.url && (
            <div className="flex items-center gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full text-white shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}cc)`,
                  boxShadow: `0 0 16px ${project.accentColor}55, 0 4px 12px ${project.accentColor}33`,
                }}
              >
                <span className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ background: project.accentColor }} />
                <ExternalLink size={14} /> Live Demo
              </a>
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
          Note: Some client work, including additional landing page suites, is not publicly listed in accordance with company privacy and contractual confidentiality agreements.
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
