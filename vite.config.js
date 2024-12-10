import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "jwt-decode", replacement: "jwt-decode/build/jwt-decode.esm.js" },
    ],
  },
});
