import React, { useState } from 'react';

const EmailCaptureForm: React.FC = () => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return; // Guard against rapid clicks

    setStatus('loading');
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

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          aria-busy={status === 'loading'}
          className="rounded-md bg-[#67705D] px-4 py-2 text-sm text-white transition hover:bg-[#55614F] disabled:opacity-50"
        >
          {status === 'loading' ? 'Submitting…' : 'Stay in the Loop'}
        </button>

        {status === 'success' && (
          <span
            className="text-sm text-[#67705D]"
            aria-live="polite"
            role="status"
          >
            ✓ Thanks for joining the journey!
          </span>
        )}
      </div>
      {status === 'error' && (
        <span className="ml-2 text-sm text-red-600" aria-live="polite">
          Something went wrong.
        </span>
      )}
    </form>
  );
};

export default EmailCaptureForm;
