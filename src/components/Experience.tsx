import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experience } from '../data/resume';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-28 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-indigo-400 text-sm">03.</span>
          <h2 className="text-3xl font-bold text-white">Experience</h2>
          <div className="flex-1 h-px bg-[#2a2a38] ml-4" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-[#2a2a38] to-transparent" />

          <div className="flex flex-col gap-10">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full border border-[#2a2a38] bg-[#111118] flex items-center justify-center">
                  <Briefcase size={16} className="text-indigo-400" />
                </div>

                {/* Card */}
                <div className="p-6 rounded-xl border border-[#2a2a38] bg-[#111118] hover:border-indigo-500/25 transition-all duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-base">{job.role}</h3>
                      {job.type && (
                        <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                          {job.type}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-500 shrink-0 mt-1">{job.period}</span>
                  </div>

                  <ul className="space-y-2">
                    {job.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                        <span className="text-indigo-500 mt-1.5 shrink-0">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
