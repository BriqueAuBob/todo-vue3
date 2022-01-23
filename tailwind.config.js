module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|text)-(\w+)-(500)/
    }
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
}
