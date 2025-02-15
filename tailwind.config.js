module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        'half-border': 'halfBorder 2s linear infinite',
      },
      keyframes: {
      halfBorder: {
          '0%': { width: '0%', height: '0%' },
          '50%': { width: '100%', height: '0%' },
          '100%': { width: '100%', height: '100%' },
        },
      },
     spacing: {
        '100px': '100px',
        '44%': '44%',
      },
      translate: {
        '44%': '44%',
      },
      maxWidth: {
        '434px': '434px',
      },
      maxHeight: {
        '620px': '620px',
      }
    },
  },
  plugins: [],
};
