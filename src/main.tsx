import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { playClick } from './utils/clickSound'

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.closest('button, a, [role="button"]')) playClick();
}, { passive: true });
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const c = {
  header:  'background:#0d0d14;color:#818cf8;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:6px;letter-spacing:1px;',
  name:    `color:${dark ? 'e2e8f0' : '1e293b'};font-size:14px;font-weight:bold;`.replace(/color:/, 'color:#'),
  role:    `color:${dark ? '38bdf8' : '0369a1'};font-size:12px;`.replace(/color:/, 'color:#'),
  divider: `color:${dark ? '2d2d3d' : 'cbd5e1'};`.replace(/color:/, 'color:#'),
  body:    `color:${dark ? '94a3b8' : '475569'};font-size:12px;line-height:1.6;`.replace(/color:/, 'color:#'),
  link:    `color:${dark ? '818cf8' : '6366f1'};font-size:12px;`.replace(/color:/, 'color:#'),
};

console.log(
  '%c >_  camden-francisco.dev\n' +
  '%c\n' +
  '%cJade Camden Francisco\n' +
  '%cFull Stack & Desktop Engineer\n' +
  '%c─────────────────────────────\n' +
  '%c👋 Hey dev, nice snooping around!\n   If you like what you see — let\'s build something together.\n' +
  '%c─────────────────────────────\n' +
  '%c📬  codingbrain01@gmail.com\n' +
  '%c🐙  github.com/codingbrain01',
  c.header, '', c.name, c.role, c.divider, c.body, c.divider, c.link, c.link
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
