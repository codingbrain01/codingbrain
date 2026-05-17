import { useLayoutEffect, useRef, useState } from 'react';
import { ThemeContext, type Theme } from './theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const cleanupFrame = useRef<number | null>(null);
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggle() {
    const root = document.documentElement;
    root.classList.add('theme-switching');

    if (cleanupFrame.current) {
      window.cancelAnimationFrame(cleanupFrame.current);
    }

    setTheme(current => {
      const next = current === 'dark' ? 'light' : 'dark';
      root.classList.toggle('dark', next === 'dark');
      localStorage.setItem('theme', next);
      return next;
    });

    cleanupFrame.current = window.requestAnimationFrame(() => {
      cleanupFrame.current = window.requestAnimationFrame(() => {
        root.classList.remove('theme-switching');
        cleanupFrame.current = null;
      });
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
