import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { cpSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPages = [
  'index.html',
  'backend-explorer.html',
  'categories.html',
  'customers.html',
  'dashboard.html',
  'expiry.html',
  'inventory.html',
  'login.html',
  'medicines.html',
  'purchases.html',
  'reports.html',
  'sales.html',
  'settings.html',
  'suppliers.html',
  'users.html'
];

function copyBrowserScripts() {
  return {
    name: 'copy-browser-scripts',
    apply: 'build' as const,
    closeBundle() {
      cpSync(path.resolve(__dirname, 'js'), path.resolve(__dirname, 'dist', 'js'), { recursive: true });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), copyBrowserScripts()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: Object.fromEntries(
          htmlPages.map(page => [page.replace(/\.html$/, ''), path.resolve(__dirname, page)])
        )
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
