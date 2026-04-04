import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const i = 'color:#818cf8;font-weight:bold;';
const d = 'color:#38bdf8;font-weight:bold;';
const m = 'color:#94a3b8;';
const f = 'color:#e2e8f0;';

console.log('%c >_%c  jade-francisco.dev', `background:#0d0d14;${i}font-size:18px;padding:6px 4px;`, `background:#0d0d14;${d}font-size:18px;padding:6px 8px 6px 0;`);
console.log('%c ┌─────────────────────────────────────────┐', m);
console.log('%c │  %cJade Camden Francisco                  %c│', m, f, m);
console.log('%c │  %cFull Stack & Desktop Engineer           %c│', m, d, m);
console.log('%c ├─────────────────────────────────────────┤', m);
console.log('%c │  %c👋 Hey dev, nice snooping around!      %c│', m, f, m);
console.log('%c │  %c   If you like what you see, let\'s    %c│', m, f, m);
console.log('%c │  %c   build something together.           %c│', m, f, m);
console.log('%c ├─────────────────────────────────────────┤', m);
console.log('%c │  %c📬 %ccodingbrain01@gmail.com            %c│', m, f, i, m);
console.log('%c │  %c🐙 %cgithub.com/codingbrain01           %c│', m, f, i, m);
console.log('%c └─────────────────────────────────────────┘', m);
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
