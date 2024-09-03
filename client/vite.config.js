import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   sourcemap: "inline", // Ensure this is set to true or 'inline'
  // },
  server: {
    port: 3002,
    // proxy: {
    //   '/home': 'http://localhost:4002', // Adjust the route as needed
    // },
  },
});
