import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const contactApi = readFileSync('api/contact.ts', 'utf8');
const csrfApi = readFileSync('api/csrf.ts', 'utf8');
const securityApi = readFileSync('api/_security.ts', 'utf8');
const telegramChat = readFileSync('src/components/TelegramChat.tsx', 'utf8');

test('contact endpoint enforces signed CSRF token validation', () => {
  assert.match(contactApi, /CSRF_HEADER/);
  assert.match(contactApi, /verifyCsrfToken/);
  assert.match(contactApi, /Invalid CSRF token/);
  assert.match(telegramChat, /\/api\/csrf/);
  assert.match(telegramChat, /X-CSRF-Token/);
});

test('contact endpoint and frontend share callback validation source', () => {
  assert.match(contactApi, /CONTACT_CALLBACK_LABELS/);
  assert.match(contactApi, /isCallbackType/);
  assert.match(telegramChat, /CONTACT_CALLBACK_OPTIONS/);
});

test('Telegram HTML output is escaped before parse_mode HTML is used', () => {
  assert.match(securityApi, /escapeTelegramHtml/);
  assert.ok(securityApi.includes(".replace(/&/g, '&amp;')"));
  assert.ok(securityApi.includes(".replace(/</g, '&lt;')"));
  assert.ok(securityApi.includes(".replace(/>/g, '&gt;')"));
  assert.match(contactApi, /escapeTelegramHtml\(payload\.name\)/);
  assert.match(contactApi, /escapeTelegramHtml\(payload\.email\)/);
  assert.match(contactApi, /escapeTelegramHtml\(payload\.callbackValue\)/);
  assert.match(contactApi, /escapeTelegramHtml\(payload\.message\)/);
});

test('external and form fetches use explicit timeouts', () => {
  assert.match(securityApi, /fetchWithTimeout/);
  assert.match(contactApi, /TELEGRAM_TIMEOUT_MS/);
  assert.match(telegramChat, /fetchWithTimeout/);
  assert.match(telegramChat, /10_000/);
});

test('environment variables are validated before use', () => {
  assert.match(contactApi, /readRequiredEnv\('TELEGRAM_BOT_TOKEN'/);
  assert.match(contactApi, /readRequiredEnv\('TELEGRAM_CHAT_ID'/);
  assert.match(contactApi, /readRequiredEnv\('CONTACT_CSRF_SECRET'/);
  assert.match(csrfApi, /readRequiredEnv\('CONTACT_CSRF_SECRET'/);
});
