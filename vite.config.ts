import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/memory-game/', // Path base para o GitHub Pages
  build: {
    outDir: 'dist', // Diretório de saída
    emptyOutDir: true, // Limpa o diretório de saída antes do build
    minify: 'esbuild', // Força o uso do esbuild
  },
});
