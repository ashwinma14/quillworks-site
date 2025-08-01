import type { Meta, StoryObj } from '@storybook/react';

import SubstackEmbed from './SubstackEmbed';

const meta: Meta<typeof SubstackEmbed> = {
  title: 'Components/SubstackEmbed',
  component: SubstackEmbed,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Email subscription embed for Quillworks Substack newsletter. Provides a responsive iframe that integrates with Substack for user signups.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The Substack embed URL',
      defaultValue: 'https://quillworks.substack.com/embed',
    },
    height: {
      control: 'number',
      description: 'Height of the iframe in pixels',
      defaultValue: 150,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default Substack embed with Quillworks subscription form.',
      },
    },
  },
};

// Custom height
export const TallerEmbed: Story = {
  args: {
    height: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Substack embed with increased height for better visibility.',
      },
    },
  },
};

// Mobile view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story:
          'Substack embed displayed in mobile viewport showing responsive behavior.',
      },
    },
  },
};

// On paper background
export const OnPaperBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-paper p-8">
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
          'Substack embed on the standard Quillworks paper background to show integration with site design.',
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
          'Substack embed in wide desktop viewport showing the max-width constraint.',
      },
    },
  },
};
