import {
  CONTACT_CALLBACK_LABELS,
  CONTACT_LIMITS,
  type CallbackType,
  isCallbackType,
} from '../src/shared/contact';
import type { ApiRequest, ApiResponse } from './_security';
import {
  CSRF_HEADER,
  escapeTelegramHtml,
  fetchWithTimeout,
  getClientIp,
  getHeader,
  isAllowedOrigin,
  isCrossSiteFetch,
  readRequiredEnv,
  setSecurityHeaders,
  verifyCsrfToken,
} from './_security';

type ContactPayload = {
  name: string;
  email: string;
  callbackType: CallbackType;
  callbackValue: string;
  message: string;
  submittedAt: number;
};

const RATE_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT = 3;
const TELEGRAM_TIMEOUT_MS = 8_000;
const rateBuckets = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (rateBuckets.get(key) ?? []).filter(time => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    rateBuckets.set(key, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(key, recent);
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cleanSingleLine(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

function cleanMessage(value: unknown) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (!normalized || normalized.length > CONTACT_LIMITS.maxMessage) return null;
  return normalized;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

function isValidCallbackValue(type: CallbackType, value: string) {
  if (type === 'email') return isValidEmail(value);
  if (type === 'telegram') return /^@?[A-Za-z0-9_]{5,32}$/.test(value);
  if (type === 'phone' || type === 'viber' || type === 'whatsapp') {
    return /^\+?[0-9 ()-]{7,24}$/.test(value);
  }
  return false;
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!isRecord(body)) return null;
  if (JSON.stringify(body).length > CONTACT_LIMITS.maxBodyBytes) return null;
  if (typeof body.website === 'string' && body.website.trim()) return null;

  const name = cleanSingleLine(body.name, CONTACT_LIMITS.maxName);
  const email = cleanSingleLine(body.email, CONTACT_LIMITS.maxEmail);
  const callbackValue = cleanSingleLine(body.callbackValue, CONTACT_LIMITS.maxCallbackValue);
  const message = cleanMessage(body.message);

  if (!name || !email || !callbackValue || !message) return null;
  if (!isValidEmail(email)) return null;
  if (!isCallbackType(body.callbackType)) return null;
  if (!isValidCallbackValue(body.callbackType, callbackValue)) return null;

  if (typeof body.submittedAt !== 'number') return null;
  const age = Date.now() - body.submittedAt;
  if (age < CONTACT_LIMITS.minSubmitMs || age > CONTACT_LIMITS.maxSubmitAgeMs) return null;

  return { name, email, callbackType: body.callbackType, callbackValue, message, submittedAt: body.submittedAt };
}

function getTelegramEnv() {
  return {
    token: readRequiredEnv('TELEGRAM_BOT_TOKEN', /^\d+:[A-Za-z0-9_-]{20,}$/),
    chatId: readRequiredEnv('TELEGRAM_CHAT_ID'),
  };
}

async function sendTelegramMessage(text: string) {
  const { token, chatId } = getTelegramEnv();
  const tgRes = await fetchWithTimeout(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  }, TELEGRAM_TIMEOUT_MS);

  if (!tgRes.ok) {
    throw new Error(`Telegram responded with ${tgRes.status}`);
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  setSecurityHeaders(res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (isCrossSiteFetch(req) || !isAllowedOrigin(req, { requireOrigin: true })) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const contentType = getHeader(req, 'content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    res.status(415).json({ error: 'Unsupported media type' });
    return;
  }

  let csrfSecret: string;
  try {
    csrfSecret = readRequiredEnv('CONTACT_CSRF_SECRET', /^.{32,}$/);
  } catch (err) {
    console.error('Contact handler configuration error:', err);
    res.status(500).json({ error: 'Internal error' });
    return;
  }

  if (!verifyCsrfToken(getHeader(req, CSRF_HEADER), csrfSecret)) {
    res.status(403).json({ error: 'Invalid CSRF token' });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }

  const payload = parsePayload(req.body);
  if (!payload) {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  const text = [
    '<b>New Portfolio Message</b>',
    '',
    `<b>Name:</b> ${escapeTelegramHtml(payload.name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(payload.email)}`,
    `<b>${CONTACT_CALLBACK_LABELS[payload.callbackType]}:</b> <code>${escapeTelegramHtml(payload.callbackValue)}</code>`,
    '',
    '<b>Message:</b>',
    escapeTelegramHtml(payload.message),
  ].join('\n');

  try {
    await sendTelegramMessage(text);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
}
