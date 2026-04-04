import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

console.log('%c >_  jade-francisco.dev', 'background:#0d0d14;color:#818cf8;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:6px;letter-spacing:1px;');
console.log('%cJade Camden Francisco', 'color:#e2e8f0;font-size:14px;font-weight:bold;margin-top:4px;');
console.log('%cFull Stack & Desktop Engineer', 'color:#38bdf8;font-size:12px;');
console.log('%c─────────────────────────────', 'color:#2d2d3d;');
console.log('%c👋 Hey dev, nice snooping around!\n   If you like what you see — let\'s build something together.', 'color:#94a3b8;font-size:12px;line-height:1.6;');
console.log('%c─────────────────────────────', 'color:#2d2d3d;');
console.log('%c📬  codingbrain01@gmail.com', 'color:#818cf8;font-size:12px;');
console.log('%c🐙  github.com/codingbrain01', 'color:#818cf8;font-size:12px;');
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
