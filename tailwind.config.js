// tailwind.config.js
module.exports = {
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#0056B3",
          "secondary": "#FFA500",
          "accent": "#3ABFF8",
          "neutral": "#1B262C",
          "base-100": "#F8FAFC",
          "base-content": "#0F172A",
        },
        dark: {
          "primary": "#FF8C00",
          "secondary": "#3ABFF8",
          "accent": "#F28500",
          "neutral": "#0F172A",
          "base-100": "#1B262C",
          "base-content": "#E2E8F0",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}