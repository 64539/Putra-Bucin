/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          950: '#0d0510',
          900: '#170a1e',
          850: '#1f0c29',
          800: '#2a1035',
          700: '#3c184c',
          600: '#532168',
        },
        romantic: {
          dark: '#0e0612',
          card: 'rgba(37, 15, 48, 0.75)',
          border: 'rgba(244, 63, 94, 0.25)',
          rose: '#e11d48',
          deepRose: '#881337',
          softPink: '#fda4af',
          blush: '#fff1f2',
          glow: 'rgba(225, 29, 72, 0.45)',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        script: ['var(--font-dancing)', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
