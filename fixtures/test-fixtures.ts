import { test as base, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';

export type Fixtures = {
  appPage: MainPage;
};

export const test = base.extend<Fixtures>({
  appPage: async ({ page }, use) => {
    const appPage = new MainPage(page);
    await use(appPage);
  },
});

export { expect }; 