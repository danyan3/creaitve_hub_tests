import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    testDir: path.join(__dirname, 'tests', 'e2e'),
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 2,
    workers: process.env.CI ? 1 : 2,
    reporter: 'allure-playwright',
    use: {
        baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
        actionTimeout: 15000,
        navigationTimeout: 30000,
        acceptDownloads: true,
    },
    expect: {
        timeout: 15000,
    },
    projects: [
        {
            name: 'smoke',
            testMatch: '**/*.spec.ts',
            grep: /@smoke/,
            use: { ...devices['Desktop Chrome'] },
            retries: process.env.CI ? 1 : 0,
            workers: process.env.CI ? 1 : 1,
        },
        {
            name: 'e2e',
            testMatch: '**/*.spec.ts',
            use: { ...devices['Desktop Chrome'] },
            retries: process.env.CI ? 1 : 0,
            workers: process.env.CI ? 1 : 2,
        },
    ],
}); 