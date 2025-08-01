import type { Meta, StoryObj } from '@storybook/react';

import Hero from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The main hero section showcasing Quillworks' analog-first philosophy. Features responsive typography, gradient background, and noise overlay texture.",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // The Hero component doesn't accept props currently,
    // but we can add variants with different content
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The default hero section with the complete Quillworks messaging and branding.',
      },
    },
  },
};

// Hero without spacer for component testing
export const WithoutSpacer: Story = {
  render: () => (
    <section className="relative isolate">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[6%]" />
      <section className="relative overflow-hidden bg-white before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/images/noise.png')] before:opacity-5 before:mix-blend-multiply">
        <div
          style={{
            background:
              'radial-gradient(ellipse at center bottom, rgba(103,112,93,0.02) 0%, rgba(103,112,93,0) 70%)',
          }}
          className="pointer-events-none absolute inset-0"
        />

        <div className="relative mx-auto max-w-[980px] px-[6vw] pt-12">
          <p className="mb-2 text-[14px] font-semibold uppercase tracking-[1.1px] text-primary/70">
            LET DIGITAL COME TO YOU
          </p>

          <h1 className="mb-6 font-serif text-[clamp(48px,8vw,88px)] font-semibold leading-[1.1] tracking-[-0.5px] text-charcoal">
            Technology should adapt to your rhythm - not the other way around.
          </h1>

          <a
            href="#"
            className="focus-visible:outline-offset-3 inline-flex items-center rounded-full px-8 py-4 text-lg font-medium text-white shadow-md transition-all duration-150 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2"
            style={{ background: 'linear-gradient(#6F7563, #646B59)' }}
          >
            Join the waitlist
          </a>
        </div>
      </section>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Hero section without the bottom spacer element, useful for component testing and layout inspection.',
      },
    },
  },
};

// Mobile variant to test responsive behavior
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story:
          'Hero section displayed in mobile viewport to demonstrate responsive typography and layout.',
      },
    },
  },
};

// Desktop wide variant
export const DesktopWide: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'wide',
    },
    docs: {
      description: {
        story:
          'Hero section displayed in wide desktop viewport showing maximum typography scale.',
      },
    },
  },
};

// Dark theme variant for testing
export const OnCharcoalBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-charcoal">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'charcoal',
    },
    docs: {
      description: {
        story:
          'Hero section displayed on a charcoal background to test color contrast and visibility.',
      },
    },
  },
};
