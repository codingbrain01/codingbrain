type NavigateFn = (path: string, opts?: { replace?: boolean }) => void;
type OpenPickerFn = () => void;

let _navigate: NavigateFn | null = null;
let _openPicker: OpenPickerFn | null = null;

export function setNavigate(fn: NavigateFn) {
  _navigate = fn;
}

export function registerPickerOpener(fn: OpenPickerFn) {
  _openPicker = fn;
}

export function openMailPicker() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  _navigate?.('/contact', { replace: true });

  // Use scrollend event (modern browsers) — fires exactly when scroll stops
  // Fallback: 1500ms timeout for older browsers
  let settled = false;
  const open = () => {
    if (settled) return;
    settled = true;
    window.removeEventListener('scrollend', open);
    _openPicker?.();
  };

  window.addEventListener('scrollend', open, { once: true });
  setTimeout(open, 1500);
}
