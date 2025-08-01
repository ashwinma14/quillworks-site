# spec/replace-substack-iframe-with-native-form_2025-08-01.md

## Goal
Remove the Substack iframe embed and replace it with a natively styled HTML form that posts directly to Substack. The new form should visually match the rest of the Quillworks hero section, using Tailwind utilities.

## Implementation

### 1. Create SubstackForm.tsx

```tsx
// src/components/SubstackForm.tsx
export default function SubstackForm() {
  return (
    <form
      action="https://quillworks.substack.com/subscribe"
      method="POST"
      target="_blank"
      className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
    >
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        className="w-full sm:w-auto max-w-xs rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#67705D]"
      />
      <button
        type="submit"
        className="bg-[#67705D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#55614F] transition"
      >
        Subscribe
      </button>
    </form>
  );
}

2. Replace SubstackEmbed in Hero.tsx

import SubstackForm from "./SubstackForm";
// ...
<SubstackForm />

3. Remove SubstackEmbed.tsx

Fully delete the SubstackEmbed.tsx component and its references. The native form replaces its functionality completely.

⸻

Testing & Review
	•	✅ Focusable via keyboard
	•	✅ Submits to substack.com/subscribe in new tab
	•	✅ Styled with Tailwind; matches color palette & rhythm
	•	✅ Works without JavaScript
	•	✅ No iframe = no visual diff risk
	•	✅ Text input scales properly on mobile

⸻

Commit message suggestion

feat(hero): replace Substack iframe with native form

- Removed iframe-based SubstackEmbed
- Added SubstackForm component with Tailwind styling
- Preserves layout while improving visual cohesion
