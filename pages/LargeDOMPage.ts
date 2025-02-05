import { type Page, type Locator } from '@playwright/test';

export class LargeDOMPage {
    readonly page: Page;
    readonly tableRows: Locator;
    readonly siblingElements: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tableRows = page.locator('#large-table tr');
        // Targets nested sibling elements for deep DOM testing
        this.siblingElements = page.locator('#large-table tr');
    }

    async goto() {
        await this.page.goto('/large');
    }

    async getRowCount(): Promise<number> {
        return await this.tableRows.count();
    }

    async getRowText(rowIndex: number): Promise<string | null> {
        return await this.tableRows.nth(rowIndex).textContent();
    }

    async getSiblingCount(): Promise<number> {
        return await this.siblingElements.count();
    }
}