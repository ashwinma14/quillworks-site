import type { Preview } from '@storybook/nextjs';
import '../src/styles/global.css';
import React from 'react';

// Quillworks Global Decorator
const withQuillworksTheme = (Story) => {
  return React.createElement(
    'div',
    {
      className: 'font-sans',
      style: {
        fontFamily: 'Inter, sans-serif',
        '--font-inter': 'Inter',
        '--font-merri': 'Merriweather',
      },
    },
    React.createElement(
      'div',
      { className: 'min-h-screen bg-paper relative' },
      React.createElement('div', {
        className:
          "fixed inset-0 bg-[url('/images/noise.png')] opacity-[6%] pointer-events-none",
      }),
      React.createElement('style', {
        dangerouslySetInnerHTML: {
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@300;400;700;900&display=swap');
            
            :root {
              --font-inter: 'Inter', sans-serif;
              --font-merri: 'Merriweather', serif;
            }
          `,
        },
      }),
      React.createElement(
        'div',
        { className: 'relative p-8' },
        React.createElement(Story)
      )
    )
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'quillworks-paper',
      values: [
        {
          name: 'quillworks-paper',
          value: '#FAFAF7',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'charcoal',
          value: '#353535',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    docs: {
      theme: {
        base: 'light',
        colorPrimary: '#67705D',
        colorSecondary: '#4A5139',
        appBg: '#FAFAF7',
        appContentBg: '#ffffff',
        appBorderColor: '#E4E5E2',
        textColor: '#353535',
        barTextColor: '#4A5139',
        barSelectedColor: '#67705D',
        inputBg: '#ffffff',
        inputBorder: '#E4E5E2',
        inputTextColor: '#353535',
        inputBorderRadius: 8,
      },
    },
    options: {
      storySort: {
        order: [
          'Documentation',
          ['Analog-First'],
          'Components',
          ['Hero', 'StoryCards', 'NavBar'],
        ],
      },
    },
  },
  decorators: [withQuillworksTheme],
  tags: ['autodocs'],
};

export default preview;
