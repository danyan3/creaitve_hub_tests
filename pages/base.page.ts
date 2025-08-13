import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(urlOrPath: string): Promise<void> {
    await this.page.goto(urlOrPath);
  }

  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
} 