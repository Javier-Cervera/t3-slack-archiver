import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#03dac5",
        secondary: "#c3a3eb",
      },
    },
  },
  plugins: [],
} satisfies Config;
