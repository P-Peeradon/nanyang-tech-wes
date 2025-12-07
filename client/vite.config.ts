import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools(), tailwindcss()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    define: {
    // Standard Node.js environment variable for compatibility
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),

    // Optional: for general compatibility with packages that check for 'process' existence
    'process.env': JSON.stringify(process.env) // Creates an empty object to avoid 'process is not defined'
  },
    server: {
        proxy: {
            // Any request starting with /api will be sent to the Express server
            '/api': {
                target: 'http://localhost:3000', // Express server URL
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
