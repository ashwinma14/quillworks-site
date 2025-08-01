import React, { useState } from 'react';

const EmailCaptureForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/mvgqbovv', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col items-start justify-start gap-3 sm:mt-6 sm:flex-row"
    >
      {/* Honeypot */}
      <input type="text" name="_gotcha" className="hidden" aria-hidden="true" />

      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        autoComplete="email"
        className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#67705D] sm:w-auto"
      />

      <button
        type="submit"
        className="rounded-md bg-[#67705D] px-4 py-2 text-sm text-white transition hover:bg-[#55614F]"
      >
        Stay in the Loop
      </button>

      {status === 'success' && (
        <span className="ml-2 text-sm text-[#67705D]" aria-live="polite">
          ✓ Check your inbox!
        </span>
      )}
      {status === 'error' && (
        <span className="ml-2 text-sm text-red-600" aria-live="polite">
          Something went wrong.
        </span>
      )}
    </form>
  );
};

export default EmailCaptureForm;
