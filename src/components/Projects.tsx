import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useInView } from 'framer-motion';
import {
  Bot,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Filter,
  Layout,
  Monitor,
  Send,
  ShieldCheck,
  Vote,
  Wrench,
} from 'lucide-react';
import { projects } from '../data/resume';
import { SectionHeader, SectionShell, Tag } from './ui/Section';

type Project = (typeof projects)[number];
type ProjectKind = 'All' | 'Automation' | 'Products' | 'Desktop' | 'Client Work';

const iconMap: Record<string, ReactNode> = {
  monitor: <Monitor size={24} />,
  send: <Send size={24} />,
  layout: <Layout size={24} />,
  bot: <Bot size={24} />,
  clipboardList: <ClipboardList size={24} />,
  wrench: <Wrench size={24} />,
  vote: <Vote size={24} />,
};

const filters: ProjectKind[] = ['All', 'Automation', 'Products', 'Desktop', 'Client Work'];

const projectMeta: Record<string, { kind: Exclude<ProjectKind, 'All'>; year: string; signal: string }> = {
  utilityhub: {
    kind: 'Products',
    year: '2026',
    signal: 'Client-side utility suite',
  },
  'attendance-tracker': {
    kind: 'Products',
    year: '2026',
    signal: 'Role-based workflow app',
  },
  crockoncrockai: {
    kind: 'Products',
    year: '2026',
    signal: 'Streaming AI assistant',
  },
  'voting-system': {
    kind: 'Desktop',
    year: '2025',
    signal: 'Fullscreen election kiosk',
  },
  kiosk: {
    kind: 'Desktop',
    year: '2026',
    signal: 'Locked-down Windows environment',
  },
  telegram: {
    kind: 'Automation',
    year: '2026',
    signal: 'Form-to-chat routing',
  },
  'google-sheets-form-pipeline': {
    kind: 'Automation',
    year: '2026',
    signal: 'Form-to-sheet lead capture',
  },
  'sisig-republic': {
    kind: 'Client Work',
    year: '2025',
    signal: 'Food brand web app',
  },
  'landing-pages-2': {
    kind: 'Client Work',
    year: '2026',
    signal: 'Landing page delivery',
  },
  'landing-pages': {
    kind: 'Client Work',
    year: '2026',
    signal: 'High-volume page fleet',
  },
};

function getMeta(project: Project) {
  return projectMeta[project.id] ?? {
    kind: project.featured ? 'Products' : 'Client Work',
    year: '2026',
    signal: project.badge || 'Selected build',
  };
}

function matchesFilter(project: Project, active: ProjectKind) {
  return active === 'All' || getMeta(project).kind === active;
}

function ProjectStatStrip({ visibleProjects }: { visibleProjects: Project[] }) {
  const featuredCount = visibleProjects.filter(project => project.featured).length;
  const liveCount = visibleProjects.filter(project => project.url).length;
  const automationCount = visibleProjects.filter(project => getMeta(project).kind === 'Automation').length;

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {[
        { label: 'Featured', value: featuredCount },
        { label: 'Live demos', value: liveCount },
        { label: 'Automations', value: automationCount },
      ].map(stat => (
        <div key={stat.label} className="rounded-lg border border-(--border) bg-(--surface) px-4 py-3">
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none">{stat.value}</p>
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-2">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const meta = getMeta(project);
  const link = project.url ?? project.github;

  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-(--border) bg-(--surface) group transition-colors duration-200 hover:border-indigo-500/35"
      style={{ '--accent': project.accentColor } as CSSProperties}
    >
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}22)` }} />

      <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 p-6 md:p-8 lg:p-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="p-3 rounded-xl" style={{ background: `${project.accentColor}18`, color: project.accentColor }}>
              {iconMap[project.icon] ?? <Layout size={24} />}
            </div>
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: `${project.accentColor}18`, color: project.accentColor }}
            >
              {meta.kind}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{meta.year}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
          <p className="font-mono text-xs mb-4" style={{ color: project.accentColor }}>
            {project.tagline}
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <Tag key={tag} accent={project.accentColor}>{tag}</Tag>
            ))}
          </div>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full text-white shadow-lg transition-[filter,transform] duration-200 hover:scale-105 hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}cc)`,
                boxShadow: `0 0 16px ${project.accentColor}44, 0 4px 12px ${project.accentColor}24`,
              }}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>

        <div className="rounded-xl border bg-(--bg) p-5 md:p-6" style={{ borderColor: `${project.accentColor}24` }}>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} style={{ color: project.accentColor }} />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
              {meta.signal}
            </p>
          </div>
          <ul className="space-y-3">
            {project.highlights.map(highlight => (
              <li key={highlight} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: project.accentColor }} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(700px at 50% 0%, ${project.accentColor}08, transparent 70%)` }}
      />
    </article>
  );
}

function ArchiveProject({ project }: { project: Project }) {
  const meta = getMeta(project);
  const link = project.url ?? project.github;

  return (
    <article
      className="rounded-xl border border-(--border) bg-(--surface) p-5 transition-colors duration-200 hover:border-indigo-500/30"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="p-2.5 rounded-lg" style={{ background: `${project.accentColor}18`, color: project.accentColor }}>
          {iconMap[project.icon] ?? <Layout size={22} />}
        </div>
        <div className="text-right">
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">{meta.kind}</p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{meta.year}</p>
        </div>
      </div>

      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{project.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono bg-(--surface-2) border border-(--border) text-slate-600 dark:text-slate-400">
            {tag}
          </span>
        ))}
      </div>

      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-400">
          Open project <ExternalLink size={12} />
        </a>
      )}
    </article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState<ProjectKind>('All');

  const visibleProjects = useMemo(
    () => projects.filter(project => matchesFilter(project, activeFilter)),
    [activeFilter]
  );

  const featured = visibleProjects.filter(project => project.featured);
  const archive = visibleProjects.filter(project => !project.featured);

  return (
    <SectionShell id="projects" muted refProp={ref}>
      <SectionHeader
        index="04."
        title="Projects"
        inView={inView}
      />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
          <Filter size={14} />
          Project type
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                  active
                    ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'border-(--border) bg-(--surface) text-slate-600 dark:text-slate-300 hover:border-indigo-500/40'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <ProjectStatStrip visibleProjects={visibleProjects} />

      <div className="flex flex-col gap-6 mb-14">
        {featured.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}
      </div>

      {archive.length > 0 && (
        <>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-widest mb-6">
            Additional selected work
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {archive.map((project) => (
              <ArchiveProject key={project.id} project={project} />
            ))}
          </div>
        </>
      )}

      <p className="text-slate-500 dark:text-slate-400 text-xs italic mt-10">
        Some client work is summarized at a systems level to respect company privacy and confidentiality agreements.
      </p>
    </SectionShell>
  );
}
