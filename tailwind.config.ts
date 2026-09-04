import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] }, boxShadow: { glow: "0 0 50px rgba(168,85,247,.18)" } } }, plugins: [] };
export default config;