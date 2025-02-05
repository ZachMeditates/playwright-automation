import { type Page, type Locator } from '@playwright/test';

export class SecurePage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly flashMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.locator('a.button');
        this.flashMessage = page.locator('#flash');
    }

    async logout() {
        await this.logoutButton.click();
    }
}