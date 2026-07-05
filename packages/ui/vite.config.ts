import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.md'],
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    tsconfigPaths: true
  },
  build: { sourcemap: true },
  server: {
    host: true, // or '0.0.0.0'
    port: 5173, // explicit is good
    strictPort: true
    // Try this if HMR / file changes are flaky:
    // watch: {
    //   usePolling: true
    // }
  }
});
