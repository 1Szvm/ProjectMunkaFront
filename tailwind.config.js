/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      animation: {
        'shadow-pulse': 'shadowPulse 2.0s ease-in-out infinite', // Add your custom animation
      },
      keyframes: {
        shadowPulse: {
          '0%, 100%': {
            boxShadow: '0px 4px 10px 2px rgba(100, 255, 200, 0.7)', // Initial and final shadow size
          },
          '50%': {
            boxShadow: '0px 6px 12px 5px rgba(100, 255, 200, 0.5)', // Larger shadow at the middle of the animation
          },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


