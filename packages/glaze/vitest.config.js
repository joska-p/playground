import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        browser: {
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            headless: true
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html']
        }
    }
});
