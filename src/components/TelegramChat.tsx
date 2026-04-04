import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const callbackOptions = [
  { value: 'email',    label: 'Email',    placeholder: 'e.g. you@email.com'      },
  { value: 'telegram', label: 'Telegram', placeholder: 'e.g. @yourusername'      },
  { value: 'viber',    label: 'Viber',    placeholder: 'e.g. +63 912 345 6789'   },
  { value: 'whatsapp', label: 'WhatsApp', placeholder: 'e.g. +63 912 345 6789'   },
  { value: 'phone',    label: 'Phone',    placeholder: 'e.g. +63 912 345 6789'   },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

const baseClass =
  'px-3 py-2 rounded-lg text-sm border border-(--border) bg-(--bg) ' +
  'text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 ' +
  'focus:outline-none focus:border-[#229ED9] transition-colors';

const inputClass  = `w-full ${baseClass}`;
const selectClass = `w-auto shrink-0 ${baseClass}`;

export default function TelegramChat() {
  const [open, setOpen]               = useState(false);
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [callbackType, setCallbackType] = useState('email');
  const [callbackValue, setCallbackValue] = useState('');
  const [message, setMessage]         = useState('');
  const [status, setStatus]           = useState<Status>('idle');

  const selectedCallback = callbackOptions.find(o => o.value === callbackType)!;

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setStatus('idle');
      setName('');
      setEmail('');
      setCallbackType('email');
      setCallbackValue('');
      setMessage('');
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, callbackType, callbackValue, message }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">

      {/* Chat box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="w-[320px] sm:w-90 rounded-2xl overflow-hidden shadow-2xl border border-(--border) bg-(--surface)"
          >
            {/* Header */}
            <div className="bg-[#229ED9] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
                CF
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Camden Francisco</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
                  <p className="text-white/75 text-xs">Usually replies within 24h</p>
                </div>
              </div>
              <button onClick={handleClose} className="text-white/70 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              {status === 'sent' ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#229ED9]/10 flex items-center justify-center mx-auto">
                    <Send size={20} className="text-[#229ED9]" />
                  </div>
                  <p className="text-slate-900 dark:text-white font-semibold">Message sent!</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    I'll get back to you via {selectedCallback.label}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Leave your details and I'll reach out via your preferred channel.
                  </p>

                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Your email address"
                    className={inputClass}
                  />

                  {/* Preferred callback */}
                  <div className="flex gap-2">
                    <select
                      value={callbackType}
                      onChange={e => { setCallbackType(e.target.value); setCallbackValue(''); }}
                      className={selectClass}
                    >
                      {callbackOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <input
                      value={callbackValue}
                      onChange={e => setCallbackValue(e.target.value)}
                      required
                      placeholder={selectedCallback.placeholder}
                      className={`${inputClass} flex-1 min-w-0`}
                    />
                  </div>

                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    rows={3}
                    placeholder="Describe your query or project briefly..."
                    className={`${inputClass} resize-none`}
                  />

                  {status === 'error' && (
                    <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#229ED9] hover:bg-[#1a8bc2] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
                  >
                    {status === 'sending' ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => open ? handleClose() : setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#229ED9] text-white shadow-lg shadow-[#229ED9]/40 flex items-center justify-center"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="tg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <TelegramIcon />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Ping ring — only when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#229ED9] animate-ping opacity-30" />
        )}
      </motion.button>
    </div>
  );
}
