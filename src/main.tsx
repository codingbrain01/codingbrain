import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

console.log(
  '%c >_  camden-francisco.dev\n' +
  '%cJade Camden Francisco\n' +
  '%cFull Stack & Desktop Engineer\n' +
  '%c─────────────────────────────\n' +
  '%c👋 Hey dev, nice snooping around!\n   If you like what you see — let\'s build something together.\n' +
  '%c─────────────────────────────\n' +
  '%c📬  codingbrain01@gmail.com\n' +
  '%c🐙  github.com/codingbrain01',
  'background:#0d0d14;color:#818cf8;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:6px;letter-spacing:1px;',
  `color:${dark ? '#e2e8f0' : '#1e293b'};font-size:14px;font-weight:bold;`,
  `color:${dark ? '#38bdf8' : '#0369a1'};font-size:12px;`,
  `color:${dark ? '#2d2d3d' : '#cbd5e1'};`,
  `color:${dark ? '#94a3b8' : '#475569'};font-size:12px;line-height:1.6;`,
  `color:${dark ? '#2d2d3d' : '#cbd5e1'};`,
  `color:${dark ? '#818cf8' : '#6366f1'};font-size:12px;`,
  `color:${dark ? '#818cf8' : '#6366f1'};font-size:12px;`
);
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
