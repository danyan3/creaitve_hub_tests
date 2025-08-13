import { test, expect } from '../../fixtures/test-fixtures';

test('basic navigation', async ({ appPage }) => {
  await appPage.gotoHome();
  await expect(appPage.page).toHaveTitle(/Example Domain/i);
}); 