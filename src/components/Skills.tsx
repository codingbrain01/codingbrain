import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { skills } from '../data/resume';
import { SectionHeader, SectionShell } from './ui/Section';

const categoryColors: Record<string, string> = {
  Frontend:                 'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20',
  Desktop:                  'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'Backend & Integration':  'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20',
  'Infrastructure / DevOps':'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Tools:                    'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
};

const tagColors: Record<string, string> = {
  Frontend:                 'bg-violet-500/8 border-violet-500/20 text-violet-700 dark:text-violet-300',
  Desktop:                  'bg-indigo-500/8 border-indigo-500/20 text-indigo-700 dark:text-indigo-300',
  'Backend & Integration':  'bg-sky-500/8 border-sky-500/20 text-sky-700 dark:text-sky-300',
  'Infrastructure / DevOps':'bg-emerald-500/8 border-emerald-500/20 text-emerald-700 dark:text-emerald-300',
  Tools:                    'bg-amber-500/8 border-amber-500/20 text-amber-700 dark:text-amber-300',
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionShell id="skills" muted refProp={ref}>
        <SectionHeader
          index="02."
          title="Technical Skills"
          inView={inView}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-xl border border-(--border) bg-(--surface) hover:border-indigo-500/25 transition-colors duration-200"
            >
              <span
                className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${
                  categoryColors[group.category] ?? 'text-slate-600 dark:text-slate-400 bg-slate-500/10 border-slate-500/20'
                }`}
              >
                {group.category}
              </span>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors ${
                      tagColors[group.category] ?? 'bg-slate-500/8 border-slate-500/20 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
    </SectionShell>
  );
}
