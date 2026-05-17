import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experience } from '../data/resume';
import { SectionHeader, SectionShell } from './ui/Section';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionShell id="experience" refProp={ref}>
        <SectionHeader
          index="03."
          title="Experience"
          inView={inView}
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-linear-to-b from-indigo-500/40 dark:via-[#2a2a38] via-slate-300 to-transparent" />

          <div className="flex flex-col gap-10">
            {experience.map((job, i) => (
              <div
                key={i}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full border border-(--border) bg-(--surface) flex items-center justify-center">
                  <Briefcase size={16} className="text-indigo-500 dark:text-indigo-400" />
                </div>

                {/* Card */}
                <div className="p-6 rounded-xl border border-(--border) bg-(--surface) hover:border-indigo-500/25 transition-colors duration-200">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-semibold text-base">{job.role}</h3>
                      {job.type && (
                        <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                          {job.type}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0 mt-1">{job.period}</span>
                  </div>

                  <ul className="space-y-2">
                    {job.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        <span className="text-indigo-500 mt-1.5 shrink-0">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
    </SectionShell>
  );
}
