import type { ApiRequest, ApiResponse } from './_security';
import {
  createCsrfToken,
  getClientIp,
  isAllowedOrigin,
  isCrossSiteFetch,
  readRequiredEnv,
  setSecurityHeaders,
} from './_security';

const RATE_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT = 30;
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

export default function handler(req: ApiRequest, res: ApiResponse) {
  setSecurityHeaders(res);

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (isCrossSiteFetch(req) || !isAllowedOrigin(req, { requireOrigin: false })) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }

  try {
    const secret = readRequiredEnv('CONTACT_CSRF_SECRET', /^.{32,}$/);
    res.status(200).json({ csrfToken: createCsrfToken(secret) });
  } catch (err) {
    console.error('CSRF handler configuration error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
}
