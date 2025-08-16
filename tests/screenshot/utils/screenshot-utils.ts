import { Page, Locator, expect } from '@playwright/test';

export class ScreenshotUtils {
    /**
     * Ждет стабилизации UI перед скриншотом
     */
    static async waitForUISettling(page: Page, timeout = 1000): Promise<void> {
        // Ждем завершения анимаций
        await page.waitForTimeout(timeout);

        // Ждем завершения сетевых запросов
        await page.waitForLoadState('networkidle');

        // Дополнительная проверка на завершение анимаций CSS
        await page.evaluate(() => {
            return new Promise<void>((resolve) => {
                const checkAnimations = () => {
                    const animations = document.querySelectorAll('*');
                    let hasAnimations = false;

                    animations.forEach(el => {
                        const style = window.getComputedStyle(el);
                        if (style.animationDuration !== '0s' || style.transitionDuration !== '0s') {
                            hasAnimations = true;
                        }
                    });

                    if (!hasAnimations) {
                        resolve();
                    } else {
                        setTimeout(checkAnimations, 100);
                    }
                };

                checkAnimations();
            });
        });
    }

    /**
     * Делает скриншот с ожиданием стабилизации
     */
    static async takeStableScreenshot(page: Page, name: string, timeout = 1000): Promise<void> {
        await this.waitForUISettling(page, timeout);
        await expect(page).toHaveScreenshot(name);
    }

    /**
     * Делает скриншот элемента с ожиданием стабилизации
     */
    static async takeElementScreenshot(locator: Locator, name: string, timeout = 1000): Promise<void> {
        const page = locator.page();
        await this.waitForUISettling(page, timeout);
        await expect(locator).toHaveScreenshot(name);
    }

    /**
     * Делает скриншот с определенным размером viewport
     */
    static async takeScreenshotWithViewport(
        page: Page,
        name: string,
        width: number,
        height: number,
        timeout = 1000
    ): Promise<void> {
        await page.setViewportSize({ width, height });
        await page.waitForLoadState('networkidle');
        await this.waitForUISettling(page, timeout);
        await expect(page).toHaveScreenshot(name);
    }

    /**
     * Делает скриншот с прокруткой до элемента
     */
    static async takeScreenshotWithScroll(
        page: Page,
        name: string,
        targetLocator: Locator,
        timeout = 1000
    ): Promise<void> {
        await targetLocator.scrollIntoViewIfNeeded();
        await this.waitForUISettling(page, timeout);
        await expect(page).toHaveScreenshot(name);
    }

    /**
     * Делает скриншот с скрытием динамических элементов
     */
    static async takeScreenshotWithoutDynamicElements(
        page: Page,
        name: string,
        selectorsToHide: string[] = [],
        timeout = 1000
    ): Promise<void> {
        // Скрываем динамические элементы
        await page.evaluate((selectors) => {
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    (el as HTMLElement).style.visibility = 'hidden';
                });
            });
        }, selectorsToHide);

        await this.waitForUISettling(page, timeout);
        await expect(page).toHaveScreenshot(name);

        // Восстанавливаем видимость
        await page.evaluate((selectors) => {
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    (el as HTMLElement).style.visibility = 'visible';
                });
            });
        }, selectorsToHide);
    }

    /**
     * Делает скриншот с определенным состоянием данных
     */
    static async takeScreenshotWithDataState(
        page: Page,
        name: string,
        dataState: 'loading' | 'empty' | 'error' | 'populated',
        timeout = 1000
    ): Promise<void> {
        // Ждем определенного состояния данных
        switch (dataState) {
            case 'loading':
                // Ждем появления индикатора загрузки
                await page.waitForSelector('.loading, .spinner, [data-testid="loading"]', { timeout: 5000 });
                break;
            case 'empty':
                // Ждем появления сообщения об отсутствии данных
                await page.waitForSelector('.empty-state, .no-data, [data-testid="empty"]', { timeout: 5000 });
                break;
            case 'error':
                // Ждем появления сообщения об ошибке
                await page.waitForSelector('.error, .alert-error, [data-testid="error"]', { timeout: 5000 });
                break;
            case 'populated':
                // Ждем появления данных
                await page.waitForSelector('.data-item, .list-item, [data-testid="item"]', { timeout: 5000 });
                break;
        }

        await this.waitForUISettling(page, timeout);
        await expect(page).toHaveScreenshot(name);
    }

    /**
     * Делает скриншот с определенной темой
     */
    static async takeScreenshotWithTheme(
        page: Page,
        name: string,
        theme: 'light' | 'dark',
        timeout = 1000
    ): Promise<void> {
        // Переключаем тему если есть такая возможность
        try {
            const themeToggle = page.locator('[data-testid="theme-toggle"], .theme-toggle, button:has-text("Тема")').first();
            if (await themeToggle.isVisible()) {
                await themeToggle.click();
                await page.waitForTimeout(500);
            }
        } catch (e) {
            // Переключатель темы может отсутствовать
        }

        await this.waitForUISettling(page, timeout);
        await expect(page).toHaveScreenshot(name);
    }
}
