import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/resume';

const categoryColors: Record<string, string> = {
  Frontend: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Desktop: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'Backend & Integration': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  'Infrastructure / DevOps': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Tools: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

const tagColors: Record<string, string> = {
  Frontend: 'bg-violet-500/8 border-violet-500/20 text-violet-300',
  Desktop: 'bg-indigo-500/8 border-indigo-500/20 text-indigo-300',
  'Backend & Integration': 'bg-sky-500/8 border-sky-500/20 text-sky-300',
  'Infrastructure / DevOps': 'bg-emerald-500/8 border-emerald-500/20 text-emerald-300',
  Tools: 'bg-amber-500/8 border-amber-500/20 text-amber-300',
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-28 px-6 bg-[#0d0d14]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-indigo-400 text-sm">02.</span>
          <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
          <div className="flex-1 h-px bg-[#2a2a38] ml-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="p-6 rounded-xl border border-[#2a2a38] bg-[#111118] hover:border-indigo-500/25 transition-all duration-300 group"
            >
              <span
                className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${
                  categoryColors[group.category] ?? 'text-slate-400 bg-slate-500/10 border-slate-500/20'
                }`}
              >
                {group.category}
              </span>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors ${
                      tagColors[group.category] ??
                      'bg-slate-500/8 border-slate-500/20 text-slate-300'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
