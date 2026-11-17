import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' permite que el build funcione tanto en Vercel como dentro del contenedor de Capacitor
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  },
});
