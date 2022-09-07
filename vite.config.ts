/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        //host: '0.0.0.0',
        port: 3102,
    },
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
    },
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
})
