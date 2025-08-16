import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
    const storageStatePath = path.join(__dirname, '..', 'storage-states', 'user.json');
    const emptyState = { cookies: [], origins: [] as Array<any> };
    fs.mkdirSync(path.dirname(storageStatePath), { recursive: true });
    fs.writeFileSync(storageStatePath, JSON.stringify(emptyState, null, 2));
}

export default globalSetup; 