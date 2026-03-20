/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8CC63F',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#14B0AC',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#F47A20',
          foreground: '#ffffff',
        },
        foreground: '#231F20',
        background: '#ffffff',
        muted: {
          DEFAULT: '#F7F7F7',
          foreground: '#6B7280',
        },
        border: '#E5E7EB',
        input: '#E5E7EB',
        ring: '#8CC63F',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#231F20',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Libre Baskerville', 'serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
