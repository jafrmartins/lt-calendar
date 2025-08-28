/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": {
          "50": "#e0f5fd",
          "100": "#b3e5f8",
          "200": "#80d4f2",
          "300": "#4db1ec",
          "400": "#269be4",
          "500": "#00a7e9",
          "600": "#0096d2",
          "700": "#0084ba",
          "800": "#006f9e",
          "900": "#005880"
        },
        "secondary": {
          "50": "#e0eff5",
          "100": "#b3d8e5",
          "200": "#80bfc2",
          "300": "#4da7ba",
          "400": "#2693ab",
          "500": "#00709c",
          "600": "#00648c",
          "700": "#005275",
          "800": "#003f5d",
          "900": "#002d45"
        }
      },
    },
  },
  plugins: [],
})

