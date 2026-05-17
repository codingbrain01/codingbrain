import { motion } from 'framer-motion';

type SectionShellProps = {
  id: string;
  children: React.ReactNode;
  muted?: boolean;
  innerClassName?: string;
  refProp?: React.Ref<HTMLElement>;
};

type SectionHeaderProps = {
  index: string;
  title: string;
  eyebrow?: string;
  description?: string;
  inView: boolean;
};

export function SectionShell({ id, children, muted = false, innerClassName = '', refProp }: SectionShellProps) {
  return (
    <section
      id={id}
      ref={refProp}
      className={`content-section py-28 px-6 ${muted ? 'bg-(--bg-alt)' : ''}`}
    >
      <div className={`max-w-6xl mx-auto ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ index, title, eyebrow, description, inView }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-indigo-500 dark:text-indigo-400 text-sm">{index}</span>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <div className="flex-1 h-px bg-(--border) ml-4" />
      </div>

      {(eyebrow || description) && (
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-mono uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
              {eyebrow}
            </p>
          )}
          {description && (
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function Tag({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-md border text-xs font-mono"
      style={accent ? {
        background: `${accent}0a`,
        borderColor: `${accent}30`,
        color: accent,
      } : undefined}
    >
      {children}
    </span>
  );
}
