module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['bg-[url("/images/noise.png")]', '-mt-40', 'pb-32'],
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
        primary: '#67705D',
        paper: '#FAFAF7',
        charcoal: '#353535',
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
        serif: ['var(--font-merri)'],
        sans: ['var(--font-inter)'],
        heading: ['Merriweather', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      lineHeight: {
        hero: '4.5rem',
      },
    },
  },
  plugins: [],
};
