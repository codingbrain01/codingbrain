import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
};

export type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  end: () => void;
  setHeader: (name: string, value: string) => void;
};

export const CSRF_HEADER = 'x-csrf-token';

const CSRF_TTL_MS = 10 * 60 * 1_000;
const usedCsrfSignatures = new Map<string, number>();

const defaultAllowedOrigins = [
  'https://codingbrain.dev',
  'https://www.codingbrain.dev',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

export function setSecurityHeaders(res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
}

export function getHeader(req: ApiRequest, name: string) {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

export function getClientIp(req: ApiRequest) {
  const forwarded = getHeader(req, 'x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = getHeader(req, 'x-real-ip')?.trim();
  return forwarded || realIp || req.socket?.remoteAddress || 'unknown';
}

export function allowedOrigins() {
  const fromEnv = process.env.CONTACT_ALLOWED_ORIGINS?.split(',')
    .map(origin => origin.trim())
    .filter(Boolean) ?? [];
  const vercelUrl = process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : [];
  return new Set([...defaultAllowedOrigins, ...fromEnv, ...vercelUrl]);
}

export function requestOrigin(req: ApiRequest) {
  const origin = getHeader(req, 'origin');
  if (origin) return origin;

  const referer = getHeader(req, 'referer');
  if (!referer) return null;

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function isAllowedOrigin(req: ApiRequest, options: { requireOrigin: boolean }) {
  const origin = requestOrigin(req);
  if (!origin) return !options.requireOrigin;
  return allowedOrigins().has(origin);
}

export function isCrossSiteFetch(req: ApiRequest) {
  return getHeader(req, 'sec-fetch-site') === 'cross-site';
}

export function readRequiredEnv(name: string, pattern?: RegExp) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  if (pattern && !pattern.test(value)) {
    throw new Error(`Invalid environment variable format: ${name}`);
  }
  return value;
}

function hmac(secret: string, value: string) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function createCsrfToken(secret: string, issuedAt = Date.now()) {
  const nonce = randomBytes(24).toString('base64url');
  const payload = `${issuedAt}.${nonce}`;
  return `${payload}.${hmac(secret, payload)}`;
}

function timingSafeStringEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function clearExpiredCsrfSignatures(now: number) {
  for (const [signature, expiresAt] of usedCsrfSignatures) {
    if (expiresAt <= now) usedCsrfSignatures.delete(signature);
  }
}

export function verifyCsrfToken(token: string | undefined, secret: string, now = Date.now()) {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [issuedAtRaw, nonce, signature] = parts;
  if (!/^\d{13}$/.test(issuedAtRaw) || !/^[A-Za-z0-9_-]{20,}$/.test(nonce)) return false;

  const issuedAt = Number(issuedAtRaw);
  if (!Number.isSafeInteger(issuedAt)) return false;
  if (issuedAt > now + 5_000 || now - issuedAt > CSRF_TTL_MS) return false;

  const payload = `${issuedAtRaw}.${nonce}`;
  const expected = hmac(secret, payload);
  if (!timingSafeStringEqual(signature, expected)) return false;

  clearExpiredCsrfSignatures(now);
  if (usedCsrfSignatures.has(signature)) return false;
  usedCsrfSignatures.set(signature, now + CSRF_TTL_MS);

  return true;
}

export function escapeTelegramHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}
