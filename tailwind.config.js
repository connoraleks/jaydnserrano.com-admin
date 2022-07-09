module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          '0%': { transform: 'translateX(-100vw)' },
          '100%': { transform: 'translateX(0)' },
        },
        "slide-out": {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100vw)' },
        },
        "slide-down": {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(0)' },
        },
        "slide-up": {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100vh)' },
        },
      },
      animation: {
        horizontalentrance: 'slide-in 1s ease-in-out',
        horizontalexit: 'slide-out 1s ease-in-out',
        verticalentrance: 'slide-down 0.4s',
        verticalexit: 'slide-up 1s',
      },
      boxShadow: {
        'md': '0px 0px 1rem rgba(0, 0, 0,0.3)',
      }
    },
  },
  plugins: [],
}