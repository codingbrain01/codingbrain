import { personal } from '../data/resume';

export default function Footer() {
  return (
    <footer className="border-t border-(--border) py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-slate-400 dark:text-slate-600 text-xs font-mono">
          &copy; {new Date().getFullYear()} {personal.shortName}. Built with React + Vite + Tailwind.
        </p>
        <p className="text-slate-400 dark:text-slate-700 text-xs font-mono">
          Designed &amp; developed by{' '}
          <span className="text-indigo-500">Camden Francisco</span>
        </p>
      </div>
    </footer>
  );
}
