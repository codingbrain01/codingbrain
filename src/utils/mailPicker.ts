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
  setTimeout(() => _openPicker?.(), 1200);
}
