/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        'font-first': '#009373',
        'font-second': '#FFFFFF',
        'bg-white': '#FFFFFF',
        'bg-gray': '#E8EBEA',
      },
      fontSize: {
        '7xl': '5.4rem',
      },
    },
  },
  plugins: [],
};
