module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-[url("/images/noise.png")]',
    'pb-24',
    'pt-[96px]',
    'w-[300px]',
    'opacity-0',
    'translate-y-8',
    'blur-sm',
    'opacity-100',
    'translate-y-0',
    'blur-0',
    'tracking-tight',
    'tracking-tightest',
    'tracking-baseline-tight',
    'font-instrument',
    'font-inter',
    'tracking-[0.01em]',
    'tracking-[1.1px]',
    'tracking-[-0.01em]',
    'leading-tight',
    'leading-relaxed',
    'leading-[1.15]',
    'max-w-[960px]',
    'font-400',
    'font-500',
    'icon',
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        primary: '#67705D', // Exact match to baseline
        paper: '#FAFAF7', // Exact match to baseline bg-[#FAFAF7]
        charcoal: '#353535', // Exact match to baseline text-[#353535]
        'text-primary': '#4A5139', // 4.7:1 contrast on paper background
        'text-muted': '#4A5568', // 5.9:1 contrast on paper background
        'bg-surface': '#F7F6F2',
        accent: '#A4B6B8',
        border: '#B5B9AA',
        surface: {
          100: '#F7F6F2',
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
      },
      fontFamily: {
        instrument: ['"Instrument Serif"', 'Georgia', 'serif'],
        inter: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        400: '400',
        500: '500',
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      letterSpacing: {
        tightest: '-0.5px', // Custom tracking for baseline-specific values
        'baseline-tight': '1.1px', // For uppercase text in baseline
        tight: '-0.01em', // Refined tracking for headlines
      },
      lineHeight: {
        hero: '4.5rem',
        tight: '1.15', // Precise line height for headlines
        relaxed: '1.625', // Consistent baseline for body text
      },
    },
  },
  plugins: [],
};
