export const CONTACT_CALLBACK_OPTIONS = [
  { value: 'email', label: 'Email', placeholder: 'e.g. you@email.com' },
  { value: 'telegram', label: 'Telegram', placeholder: 'e.g. @yourusername' },
  { value: 'viber', label: 'Viber', placeholder: 'e.g. +63 912 345 6789' },
  { value: 'whatsapp', label: 'WhatsApp', placeholder: 'e.g. +63 912 345 6789' },
  { value: 'phone', label: 'Phone', placeholder: 'e.g. +63 912 345 6789' },
] as const;

export type CallbackType = (typeof CONTACT_CALLBACK_OPTIONS)[number]['value'];

export const CONTACT_CALLBACK_LABELS: Record<CallbackType, string> = {
  email: 'Email',
  telegram: 'Telegram',
  viber: 'Viber',
  whatsapp: 'WhatsApp',
  phone: 'Phone',
};

export const CONTACT_LIMITS = {
  maxBodyBytes: 4_096,
  maxName: 80,
  maxEmail: 120,
  maxCallbackValue: 120,
  maxMessage: 1_200,
  minSubmitMs: 2_500,
  maxSubmitAgeMs: 2 * 60 * 60 * 1_000,
} as const;

export function isCallbackType(value: unknown): value is CallbackType {
  return (
    typeof value === 'string' &&
    CONTACT_CALLBACK_OPTIONS.some(option => option.value === value)
  );
}
