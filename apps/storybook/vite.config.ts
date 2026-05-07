import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
    tailwindcss(),
  ],
  build: {
    // Use Rolldown chunk groups to avoid oversized vendor chunks.
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20_000,
          maxSize: 250_000,
          groups: [
            {
              name: "react",
              test: /node_modules[\\/]react(-dom)?[\\/]/,
              priority: 20,
              maxSize: 220_000,
            },
            {
              name: "storybook",
              test: /node_modules[\\/]@storybook[\\/]|node_modules[\\/]storybook[\\/]/,
              priority: 15,
              maxSize: 260_000,
            },
            {
              name: "vendor",
              test: /node_modules/,
              priority: 10,
              maxSize: 250_000,
            },
            {
              name: "common",
              minShareCount: 2,
              minSize: 10_000,
              priority: 5,
            },
          ],
        },
      },
    },
  },
});
