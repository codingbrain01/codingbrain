type NavigateFn = (path: string) => void;
let _navigate: NavigateFn | null = null;

export function setNavigate(fn: NavigateFn) {
  _navigate = fn;
}

export function openMailPicker() {
  if (window.location.pathname !== '/contact') {
    _navigate?.('/contact');
  }
  setTimeout(() => window.dispatchEvent(new CustomEvent('openMailPicker')), 350);
}
