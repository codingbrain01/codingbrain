const callbackLabels: Record<string, string> = {
  email:    '📧 Email',
  telegram: '✈️ Telegram',
  viber:    '📱 Viber',
  whatsapp: '💬 WhatsApp',
  phone:    '📞 Phone',
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { name, email, callbackType, callbackValue, message } = req.body ?? {};

  if (!name || !email || !callbackType || !callbackValue || !message) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  const label = callbackLabels[callbackType] ?? '📲 Callback';

  const text = [
    '🔔 <b>New Portfolio Message</b>',
    '',
    `👤 <b>${name}</b>`,
    `📧 ${email}`,
    `${label}: <code>${callbackValue}</code>`,
    '',
    '💬 <b>Message:</b>',
    message,
  ].join('\n');

  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });

    if (!tgRes.ok) {
      const err = await tgRes.json();
      console.error('Telegram error:', err);
      res.status(500).json({ error: 'Telegram error' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
}
