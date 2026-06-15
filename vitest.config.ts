import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        setupFiles: ['__tests__/setup.ts'],
        environmentMatchGlobs: [
            ['__tests__/context/**', 'jsdom'],
            ['__tests__/components/**', 'jsdom'],
        ],
        environment: 'node',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        },
    },
});
