/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        terraloom: {
          "primary": "#2D4F1E",    
          "secondary": "#C0573E",  
          "accent": "#E9B44C",     
          "neutral": "#3D4451",    
          "base-100": "#FBFBF2",   
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
          "base-content": "#1f2937", 
        },
      },
      "dark",
    ],
  },
};