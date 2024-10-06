import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const pathSrc = path.resolve(__dirname, "./src");

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        additionalData: `@import "${pathSrc}/variables.scss";\n`,
      },
    },
  },
  plugins: [react()],
});
