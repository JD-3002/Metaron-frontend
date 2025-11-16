import type { Config } from "tailwindcss";

const config = {
  // Scan your app/components for class usage
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        accent: "#1e40af",
        background: "#f8fafc",
        text: "#0f172a",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
