/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors — sourced from the GeoAxis logo
        primary:    '#F26522',   // accent orange (was #d90429 red)
        secondary:  '#1E2530',   // charcoal dark  (was #111111)
        accent:     '#6c757d',   // neutral grey — unchanged
        background: '#ffffff',   // unchanged
        light:      '#F8F9FA',   // new — soft off-white for section backgrounds

        // Optional alias group for future use — lets you write
        // `bg-geoaxis-orange`, `text-geoaxis-dark`, etc.
        geoaxis: {
          dark:   '#1E2530',
          orange: '#F26522',
          light:  '#F8F9FA',
          grey:   '#6c757d',
          white:  '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in':     'fadeIn 0.5s ease-in-out',
        'slide-up':    'slideUp 0.6s ease-out',
        'slide-down':  'slideDown 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)',  opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};