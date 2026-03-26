import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Code2, Server } from 'lucide-react';
import { personal, education } from '../data/resume';

const stats = [
  {
    icon: <Code2 size={20} />,
    value: '13+',
    label: 'Landing Pages Shipped',
    disclaimer: 'Projects are under NDA and cannot be publicly shared per client contract agreements.',
  },
  { icon: <Briefcase size={20} />, value: '5+', label: 'Years of Experience' },
  { icon: <Server size={20} />, value: '99.9%', label: 'System Uptime Maintained' },
  { icon: <GraduationCap size={20} />, value: '2023', label: 'B.S. CompE Graduate' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-indigo-500 dark:text-indigo-400 text-sm">01.</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">About Me</h2>
          <div className="flex-1 h-px bg-(--border) ml-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
              {personal.summary}
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              I bridge the gap between polished, pixel-perfect frontends and the deeper infrastructure that keeps them
              running — from Vite-optimized React apps to locked-down Electron kiosk environments and event-driven
              Telegram pipelines.
            </p>

            {/* Education card */}
            <div className="p-5 rounded-xl border border-(--border) bg-(--surface)">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <GraduationCap size={20} className="text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-semibold text-sm">{education.degree}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">{education.specialization}</p>
                  <p className="text-indigo-500 dark:text-indigo-400 text-xs font-mono mt-1">
                    {education.school} · Graduated {education.graduated}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ icon, value, label, disclaimer }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="p-6 rounded-xl border border-(--border) bg-(--surface) hover:border-indigo-500/30 transition-colors group flex flex-col"
              >
                <div className="text-indigo-500 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform w-fit">
                  {icon}
                </div>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{value}</p>
                <p className="text-slate-500 text-xs leading-tight">{label}</p>
                {disclaimer && (
                  <p className="mt-3 text-[11px] leading-snug text-slate-500 dark:text-slate-400 italic border-t border-(--border) pt-3">
                    {disclaimer}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
