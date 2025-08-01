export default function SubstackForm() {
  return (
    <form
      action="https://quillworks.substack.com/subscribe"
      method="POST"
      target="_blank"
      aria-label="Subscribe to Quillworks"
      className="mt-4 flex flex-col items-start justify-start gap-3 sm:mt-6 sm:flex-row"
    >
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        autoComplete="email"
        className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#67705D] sm:w-auto"
      />
      <button
        type="submit"
        className="rounded-md bg-[#67705D] px-4 py-2 text-sm text-white transition hover:bg-[#55614F]"
      >
        Stay in the Loop
      </button>
    </form>
  );
}
