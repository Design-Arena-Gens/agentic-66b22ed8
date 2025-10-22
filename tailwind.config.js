/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005A9C',
        secondary: '#4CAF50',
        accent: '#FF9800',
        error: '#D32F2F',
        'bg-light': '#F4F7FA',
        'bg-white': '#FFFFFF',
        'text-primary': '#212121',
      },
    },
  },
  plugins: [],
}
