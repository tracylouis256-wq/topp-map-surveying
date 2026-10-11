/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors — sourced from the MapRivo logo
        primary:    '#16A34A',   // MapRivo emerald green
        secondary:  '#0B2D6B',   // MapRivo navy
        accent:     '#3B82F6',   // MapRivo sky blue
        background: '#FFFFFF',   // white
        light:      '#F7F8FA',   // soft off-white for section backgrounds

        // Alias group — lets you write `bg-geoaxis-orange`,
        // `text-geoaxis-dark`, etc. (key kept as `geoaxis` so existing
        // components don't need to change)
        geoaxis: {
          dark:   '#0B2D6B',   // navy  — was charcoal
          orange: '#16A34A',   // green — was orange
          blue:   '#3B82F6',   // sky   — new
          navy:   '#0B2D6B',   // navy  — new explicit alias
          light:  '#F7F8FA',
          grey:   '#5B6570',
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