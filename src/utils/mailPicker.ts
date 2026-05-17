type NavigateFn = (path: string, opts?: { replace?: boolean }) => void;
type OpenPickerFn = () => void;

let _navigate: NavigateFn | null = null;
let _openPicker: OpenPickerFn | null = null;
let _fallbackTimer: number | null = null;
let _settleTimer: number | null = null;

export function setNavigate(fn: NavigateFn) {
  _navigate = fn;
}

export function registerPickerOpener(fn: OpenPickerFn) {
  _openPicker = fn;
}

export function openMailPicker() {
  const contact = document.getElementById('contact');
  contact?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  _navigate?.('/contact', { replace: true });

  if (_fallbackTimer) window.clearTimeout(_fallbackTimer);
  if (_settleTimer) window.clearTimeout(_settleTimer);

  let settled = false;
  const open = () => {
    if (settled) return;
    settled = true;
    window.removeEventListener('scrollend', open);
    if (_fallbackTimer) window.clearTimeout(_fallbackTimer);
    if (_settleTimer) window.clearTimeout(_settleTimer);
    _openPicker?.();
  };

  const waitForStableScroll = (lastY = window.scrollY, stableFrames = 0) => {
    _settleTimer = window.setTimeout(() => {
      const nextY = window.scrollY;
      const nextStableFrames = Math.abs(nextY - lastY) < 1 ? stableFrames + 1 : 0;

      if (nextStableFrames >= 3) {
        open();
        return;
      }

      waitForStableScroll(nextY, nextStableFrames);
    }, 80);
  };

  window.addEventListener('scrollend', open, { once: true });
  waitForStableScroll();
  _fallbackTimer = window.setTimeout(open, 1800);
}
