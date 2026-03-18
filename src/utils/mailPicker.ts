type NavigateFn = (path: string, opts?: { replace?: boolean }) => void;
let _navigate: NavigateFn | null = null;

export function setNavigate(fn: NavigateFn) {
  _navigate = fn;
}

export function openMailPicker() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  _navigate?.('/contact', { replace: true });
  setTimeout(() => window.dispatchEvent(new CustomEvent('openMailPicker')), 350);
}
