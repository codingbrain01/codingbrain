export function openMailPicker() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  // Small delay so the scroll starts before the picker pops open
  setTimeout(() => window.dispatchEvent(new CustomEvent('openMailPicker')), 200);
}
