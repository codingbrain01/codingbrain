export const personal = {
  name: 'Jade Camden R. Francisco',
  shortName: 'Camden Francisco',
  title: 'Full Stack Engineer',
  subtitle: 'B.S. Computer Engineering',
  email: 'codingbrain01@gmail.com',
  phone: '09062296205',
  location: 'Remote',
  linkedin: 'https://www.linkedin.com/in/camden-francisco-1615033b8',
  github: 'https://github.com/codingbrain01',
  summary:
    'Detail-oriented Computer Engineer specializing in the end-to-end development of high-performance web and desktop applications. Expert in React, TypeScript, and Electron, with a proven track record of architecting automated systems—from Vite-driven frontends to Telegram-integrated backend pipelines. Adept at managing full product lifecycles, including infrastructure, server deployment, and native "Kiosk Mode" desktop solutions.',
};

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    category: 'Desktop',
    items: ['Electron.js', 'Kiosk Mode', 'Native API Integration', 'Windows API'],
  },
  {
    category: 'Backend & Integration',
    items: ['Node.js', 'PHP', 'Telegram Bot API', 'REST APIs', 'Form-to-Bot Automation'],
  },
  {
    category: 'Database',
    items: ['MySQL', 'phpMyAdmin', 'Supabase', 'PostgreSQL'],
  },
  {
    category: 'Infrastructure / DevOps',
    items: ['Hostinger VPS', 'InternetBS', 'SMTP / Email Config', 'SSL Deployment', 'System Monitoring'],
  },
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'PHP', 'Java', 'C++', 'VB.NET'],
  },
  {
    category: 'Tools',
    items: ['Git', 'NPM / Yarn', 'VS Code', 'Windows Server', 'Claude Code'],
  },
];

export const experience = [
  {
    role: 'Full Stack Developer / Virtual Assistant',
    type: 'Remote',
    period: 'Feb 2026 – Present',
    bullets: [
      'Architected and deployed 13+ high-conversion, responsive landing pages using Vite and TailwindCSS, achieving 100% mobile-first compatibility and sub-2-second load times.',
      'Engineered a custom automated lead-generation pipeline using TypeScript and Telegram Bot API, increasing data-gathering efficiency through real-time team notifications.',
      'Developed a specialized Desktop Application using Electron (Kiosk Mode) for driver monitoring, featuring integrated VoIP calling and real-time status synchronization.',
      'Spearheaded the full DevOps lifecycle, managing domain portfolios on InternetBS and configuring secure, high-uptime VPS environments on Hostinger.',
      'Maintains 99.9% system uptime through proactive debugging and iterative feature deployment for a suite of mission-critical internal applications.',
    ],
  },
  {
    role: 'Web Application Developer',
    type: 'Freelance',
    period: 'Sept 2025 – Dec 2025',
    bullets: [
      'Delivered bespoke web solutions for diverse clients, focusing on SEO optimization and performance-tuned React components.',
      'Translated complex client requirements into technical roadmaps, ensuring on-time delivery of scalable web applications.',
    ],
  },
  {
    role: 'Customer Service Representative (Tech Support)',
    type: '',
    period: 'Aug 2024 – Apr 2025',
    bullets: [
      'Resolved complex hardware/software escalations for high-volume user bases, maintaining a high first-call resolution rate.',
      'Documented technical troubleshooting procedures that reduced average handling time for the support team.',
    ],
  },
  {
    role: 'IT Assistant (Technical Support)',
    type: '',
    period: 'Jul 2023 – Nov 2023',
    bullets: [
      'Optimized internal IT infrastructure by configuring employee workstations and maintaining network security protocols.',
      'Mitigated system downtime through rapid response to helpdesk tickets and proactive hardware maintenance.',
    ],
  },
  {
    role: 'Web Application Developer',
    type: 'Freelance',
    period: 'Oct 2021 – Jul 2022',
    bullets: [
      'Developed custom UI components and landing pages using modern JavaScript frameworks, focusing on cross-browser compatibility and user engagement.',
    ],
  },
];

export const projects = [
  {
    id: 'utilityhub',
    featured: true,
    badge: 'Personal Project',
    title: 'Utility Hub',
    tagline: 'React · TypeScript · Vite · Tailwind CSS · Client-Side',
    description:
      'A streamlined utility dashboard featuring five practical tools: weight conversion, a dev color picker, a quick calculator, px↔rem web unit conversion, and Base64 encoding/decoding. Fully client-side — no backend required — with dark/light mode, clipboard copying, and keyboard shortcuts throughout.',
    highlights: [
      'Weight converter with gym-preset buttons (lbs ↔ kg)',
      'Dev color picker outputting hex, RGB, HSL, and HSB formats',
      'Full-featured calculator with keyboard input and history',
      'Base64 encode/decode and px↔rem unit conversion tools',
    ],
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Client-Side'],
    accentColor: '#14b8a6',
    icon: 'wrench',
    url: 'https://utilityhubphi.vercel.app/',
    github: 'https://github.com/codingbrain01/utilityhub',
  },
  {
    id: 'attendance-tracker',
    featured: true,
    badge: 'Available for Sale',
    title: 'AttendTrack — Attendance Tracker',
    tagline: 'React · TypeScript · Vite · Tailwind CSS · Role-Based Access',
    description:
      'A fully functional, role-based attendance tracking system — no backend required. Employees clock in/out with break tracking, admins manage shifts and view metrics, and a Main Control role handles full account and log management. Built with a service-layer architecture for seamless Supabase migration when needed.',
    highlights: [
      'Three-tier RBAC: Employee, Admin, and Main Control roles',
      'Clock in/out with automatic break deduction and overtime detection',
      'Full shift management, monthly metrics, and attendance history',
      'Service-layer architecture — drop-in Supabase backend migration ready',
    ],
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Supabase-ready'],
    accentColor: '#f59e0b',
    icon: 'clipboardList',
    url: 'https://attendanctrackerphi.vercel.app',
    github: 'https://github.com/codingbrain01/attendance-tracker',
  },
  {
    id: 'crockoncrockai',
    featured: true,
    badge: 'Personal Project',
    title: 'CrockOnCrockAI',
    tagline: 'React · TypeScript · Groq · Llama 3.3 70B · Vercel',
    description:
      'A personal AI chat assistant built for programming help, powered by Llama 3.3 70B via Groq\'s ultra-fast inference platform. Features real-time token streaming, persistent conversation history, dual owner/visitor modes with rate limiting, and a clean chat UI — deployed serverlessly on Vercel.',
    highlights: [
      'Real-time streaming responses via Groq SDK (token-by-token display)',
      'Persistent conversation storage with owner and visitor session modes',
      'Daily rate limiting — 30 requests for visitors, 1,000 for owner',
      'Input sanitization, keyboard shortcuts, and serverless Vercel backend',
    ],
    tags: ['React 19', 'TypeScript', 'Groq SDK', 'Llama 3.3 70B', 'Vite', 'Tailwind CSS', 'Vercel'],
    accentColor: '#8b5cf6',
    icon: 'bot',
    url: 'https://crockoncrockai.vercel.app',
    github: 'https://github.com/codingbrain01/crockoncrockai',
  },
  {
    id: 'voting-system',
    featured: true,
    badge: 'Internal Use',
    title: 'Student Council Election — Voting System',
    tagline: 'JavaFX 21 · Maven · Java · MVC · Kiosk Mode',
    description:
      'A fullscreen kiosk-style voting application built with JavaFX 21 and Maven for Student Council elections. Supports multiple positions and party lists, features a password-protected admin panel, and uses an in-scene overlay dialog system that never interrupts fullscreen mode — no OS dialogs, no accidental exits.',
    highlights: [
      'Fullscreen kiosk lockdown — blocks accidental exits, ballot preview overlay before final submission',
      'Admin panel: add/edit/remove candidates, open/close voting, reset counts, live vote totals',
      'In-scene overlay dialogs (StackPane + fade transitions) — alerts and confirms never break fullscreen',
      'Data persistence via Java serialization (voting_data.ser) — survives app restarts',
    ],
    tags: ['JavaFX 21', 'Java', 'Maven', 'MVC', 'FXML', 'Kiosk Mode', 'Serialization'],
    accentColor: '#22c55e',
    icon: 'vote',
    url: undefined,
    github: 'https://github.com/codingbrain01/voting-system-app',
  },
  {
    id: 'kiosk',
    featured: true,
    badge: 'Featured',
    title: 'Native Kiosk Monitoring System',
    tagline: 'Electron · Kiosk Mode · Windows API · VoIP',
    description:
      'A secure, locked-down Windows environment built with Electron for driver compliance monitoring. The application runs in full-screen kiosk mode, restricting system access while enabling real-time agent communication and VoIP calling—ensuring drivers remain accountable and connected without access to the underlying OS.',
    highlights: [
      'Full kiosk lockdown — blocks Alt+F4, Win key, and taskbar access',
      'Integrated VoIP calling module for real-time agent↔driver communication',
      'Real-time status synchronization across connected sessions',
      'Native Windows API hooks for system-level event control',
    ],
    tags: ['Electron.js', 'TypeScript', 'Kiosk Mode', 'Windows API', 'VoIP', 'Node.js'],
    accentColor: '#6366f1',
    icon: 'monitor',
    url: undefined,
    github: undefined,
  },
  {
    id: 'telegram',
    featured: true,
    badge: 'Featured',
    title: 'Telegram Middleware Pipeline',
    tagline: 'Node.js · Telegram Bot API · TypeScript · Automation',
    description:
      'A custom Node.js bridge that automates data flow from static web forms to dynamic Telegram chat environments. Eliminates manual data entry overhead by instantly routing form submissions as structured messages to the appropriate team channels, enabling real-time lead-generation tracking without a traditional backend database.',
    highlights: [
      'Zero-latency form-to-chat delivery via Telegram Bot API',
      'Structured message formatting with field-level parsing',
      'Multi-channel routing — sends to correct team based on form type',
      'TypeScript-first implementation with full type safety',
    ],
    tags: ['Node.js', 'Telegram Bot API', 'TypeScript', 'REST APIs', 'Automation'],
    accentColor: '#0ea5e9',
    icon: 'send',
    url: undefined,
    github: undefined,
  },
  {
    id: 'landing-pages-2',
    featured: false,
    badge: '',
    title: 'Landing Page Suite (5+)',
    tagline: 'Vite · React · TailwindCSS · Hostinger',
    description:
      'A second fleet of 5+ responsive landing pages built and deployed for a remote client, maintaining the same standards of mobile-first compatibility and sub-2-second load times.',
    highlights: [
      'Sub-2-second load times with Vite production builds',
      '100% mobile-first responsive layouts',
      'SSL-secured deployments on Hostinger with custom domains',
      'SEO-optimized meta and structured data per page',
    ],
    tags: ['React', 'Vite', 'TailwindCSS', 'Hostinger', 'SSL', 'SEO'],
    accentColor: '#10b981',
    icon: 'layout',
    url: undefined,
    github: undefined,
  },
  {
    id: 'landing-pages',
    featured: false,
    badge: '',
    title: 'Landing Page Suite (13+)',
    tagline: 'Vite · React · TailwindCSS · Hostinger',
    description:
      'A fleet of 13+ high-conversion, responsive landing pages built and deployed for a remote client, each achieving 100% mobile-first compatibility and sub-2-second load times via Vite\'s optimized build pipeline and Hostinger VPS hosting.',
    highlights: [
      'Sub-2-second load times with Vite production builds',
      '100% mobile-first responsive layouts',
      'SSL-secured deployments on Hostinger with custom domains via InternetBS',
      'SEO-optimized meta and structured data per page',
    ],
    tags: ['React', 'Vite', 'TailwindCSS', 'Hostinger', 'SSL', 'SEO'],
    accentColor: '#10b981',
    icon: 'layout',
    url: undefined,
    github: undefined,
  },
];

export const education = {
  degree: 'Bachelor of Science in Computer Engineering',
  specialization: 'Specialization in Web Application Development',
  school: 'AMA Computer College',
  graduated: '2023',
};
