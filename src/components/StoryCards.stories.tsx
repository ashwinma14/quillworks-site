import type { Meta, StoryObj } from '@storybook/react';

import StoryCards from './StoryCards';

const meta: Meta<typeof StoryCards> = {
  title: 'Components/StoryCards',
  component: StoryCards,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "A responsive grid of story cards explaining Quillworks' approach. Features parallax scrolling effects, subtle shadows, and the signature card design with icons and typography.",
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
            id: 'scrollable-region-focusable',
            enabled: false, // Parallax effects may trigger this
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // StoryCards doesn't accept props, but we can create variants
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
          'The complete StoryCards section with all three cards: The Problem, Our Approach, and The Shift.',
      },
    },
  },
};

// Individual card preview (mock single card)
export const SingleCard: Story = {
  render: () => {
    // Extract single card logic for demonstration
    const card = {
      title: 'Our Approach',
      body: 'Let digital come to you —\nnot as noise, but as a quiet layer that tracks, shares,\nand preserves what already moves you.',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="stroke-primary/80"
        >
          <polyline points="12,2 12,6"></polyline>
          <path d="m15.4,17.4l3.6-3.6"></path>
          <circle cx="12" cy="12" r="3"></circle>
          <polyline points="12,16.5 12,19"></polyline>
          <path d="M5.6,17.4 2,21"></path>
          <polyline points="2,12.5 6,12.5"></polyline>
          <path d="m5.6,6.6l3.6,3.6"></path>
          <polyline points="18.5,12 22,12"></polyline>
          <path d="m15.4,6.6l3.6-3.6"></path>
        </svg>
      ),
    };

    return (
      <section className="bg-paper py-16">
        <div className="mx-auto flex max-w-[1200px] justify-center px-[6vw]">
          <div className="flex w-[300px] flex-col gap-6 rounded-[16px] border border-[#E4E5E2] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(103,112,93,0.08)]">
            <div className="flex size-14 items-center justify-center rounded-full bg-[#F0F1ED]/90">
              {card.icon}
            </div>
            <h2 className="text-[20px] font-semibold tracking-tight text-charcoal">
              {card.title}
            </h2>
            <p className="max-w-[220px] text-[16px] leading-[1.55]">
              {card.body.split('\n').map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line}
                  {lineIndex < card.body.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A single story card isolated for detailed design inspection and component testing.',
      },
    },
  },
};

// Grid layout only (no parallax effects for testing)
export const StaticGrid: Story = {
  render: () => {
    const cards = [
      {
        title: 'The Problem',
        body: 'Digital tools pull us away from natural rhythms —\nreplacing flow with friction.',
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="stroke-primary/80"
          >
            <path d="M14.7,6.3a1,1,0,0,0,0,1.4L16.6,9.6a1,1,0,0,0,1.4,0,1,1,0,0,0,0-1.4L16.1,6.3A1,1,0,0,0,14.7,6.3Z"></path>
            <path d="M6.3,14.7a1,1,0,0,0,0,1.4L8.2,18a1,1,0,0,0,1.4,0,1,1,0,0,0,0-1.4L7.7,14.7A1,1,0,0,0,6.3,14.7Z"></path>
            <path d="M6.3,9.3A1,1,0,0,0,7.7,7.9L5.8,6a1,1,0,0,0-1.4,0,1,1,0,0,0,0,1.4Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12,1V5a1,1,0,0,0,2,0V1A1,1,0,0,0,12,1Z"></path>
            <path d="M12,19v4a1,1,0,0,0,2,0V19A1,1,0,0,0,12,19Z"></path>
            <path d="M4.2,10H1a1,1,0,0,0,0,2H4.2A1,1,0,0,0,4.2,10Z"></path>
            <path d="M23,10H19.8a1,1,0,0,0,0,2H23A1,1,0,0,0,23,10Z"></path>
          </svg>
        ),
      },
      {
        title: 'Our Approach',
        body: 'Let digital come to you —\nnot as noise, but as a quiet layer that tracks, shares,\nand preserves what already moves you.',
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="stroke-primary/80"
          >
            <polyline points="12,2 12,6"></polyline>
            <path d="m15.4,17.4l3.6-3.6"></path>
            <circle cx="12" cy="12" r="3"></circle>
            <polyline points="12,16.5 12,19"></polyline>
            <path d="M5.6,17.4 2,21"></path>
            <polyline points="2,12.5 6,12.5"></polyline>
            <path d="m5.6,6.6l3.6,3.6"></path>
            <polyline points="18.5,12 22,12"></polyline>
            <path d="m15.4,6.6l3.6-3.6"></path>
          </svg>
        ),
      },
      {
        title: 'The Shift',
        body: "We're entering a new era —\nwhere tools no longer demand attention,\nbut quietly earn their place.\nA world where technology whispers,\nand analog ways lead the way.",
        icon: (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="stroke-primary/80"
          >
            <path d="M20.2,3.8c.4.4.4,1,0,1.4L7.4,18c-.4.4-1,.4-1.4,0s-.4-1,0-1.4L18.8,3.8C19.2,3.4,19.8,3.4,20.2,3.8Z"></path>
            <path d="M6.5,6.5l12,12"></path>
            <path d="M12.5,6.5l6,6"></path>
          </svg>
        ),
      },
    ];

    return (
      <section className="bg-paper pb-32">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-8 px-[6vw] pb-24 pt-[96px]">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex w-[300px] flex-col gap-6 rounded-[16px] border border-[#E4E5E2] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(103,112,93,0.08)]"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-[#F0F1ED]/90">
                {card.icon}
              </div>
              <h2 className="text-[20px] font-semibold tracking-tight text-charcoal">
                {card.title}
              </h2>
              <p className="max-w-[220px] text-[16px] leading-[1.55]">
                {card.body.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < card.body.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Story cards grid without parallax effects or animations, useful for static design review.',
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
          'StoryCards section displayed in mobile viewport showing responsive card stacking.',
      },
    },
  },
};

// Tablet view
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story:
          'StoryCards section displayed in tablet viewport showing intermediate responsive behavior.',
      },
    },
  },
};
