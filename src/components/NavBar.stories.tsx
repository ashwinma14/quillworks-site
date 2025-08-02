import type { Meta, StoryObj } from '@storybook/react';

import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The main navigation header for Quillworks featuring the brand name. Clean, minimal design with Quillworks typography and color scheme.',
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
          {
            id: 'link-in-text-block',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // NavBar doesn't accept props currently
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default navigation bar with Quillworks branding.',
      },
    },
  },
};

// Navigation with different background for contrast testing
export const OnWhiteBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'white',
    },
    docs: {
      description: {
        story:
          'Navigation bar displayed on a pure white background to test contrast and visibility.',
      },
    },
  },
};

// Navigation with paper background (default site background)
export const OnPaperBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-paper">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'quillworks-paper',
    },
    docs: {
      description: {
        story:
          'Navigation bar on the standard Quillworks paper background color.',
      },
    },
  },
};

// Mobile responsive view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story:
          'Navigation bar displayed in mobile viewport showing responsive behavior and touch targets.',
      },
    },
  },
};

// Focus state demonstration
export const WithFocusState: Story = {
  render: () => (
    <header
      className="mx-auto flex h-16 max-w-[1100px] items-center justify-start px-[6vw] shadow-[0_4px_40px_rgba(0,0,0,0.02)]"
      data-animate=""
    >
      <span className="font-serif text-[22px] font-bold tracking-[0.01em] text-charcoal">
        Quillworks
      </span>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation bar demonstrating the clean layout and typography.',
      },
    },
  },
};

// Hover state simulation
export const WithHoverState: Story = {
  render: () => (
    <header
      className="mx-auto flex h-16 max-w-[1100px] items-center justify-start px-[6vw] shadow-[0_4px_40px_rgba(0,0,0,0.02)]"
      data-animate=""
    >
      <span className="font-serif text-[22px] font-bold tracking-[0.01em] text-charcoal">
        Quillworks
      </span>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation bar with minimal, clean styling.',
      },
    },
  },
};

// Wide desktop view
export const DesktopWide: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'wide',
    },
    docs: {
      description: {
        story:
          'Navigation bar displayed in wide desktop viewport showing maximum container width.',
      },
    },
  },
};

// Alternative brand name for testing
export const AlternativeBrandName: Story = {
  render: () => (
    <header
      className="mx-auto flex h-16 max-w-[1100px] items-center justify-start px-[6vw] shadow-[0_4px_40px_rgba(0,0,0,0.02)]"
      data-animate=""
    >
      <span className="font-serif text-[22px] font-bold tracking-[0.01em] text-charcoal">
        Quillworks Studio
      </span>
      <a
        href="#"
        className="inline-flex items-center rounded-full border border-primary px-5 py-2 text-[14px] font-semibold text-primary
                transition-colors hover:bg-[#F7F8F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        Join waitlist
      </a>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Navigation bar with an alternative brand name to test typography and spacing with longer text.',
      },
    },
  },
};
