import { BasePage } from './base.page';

export class MainPage extends BasePage {
  async gotoHome(): Promise<void> {
    await this.goto('/');
  }
}
