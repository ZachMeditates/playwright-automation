import { test, expect } from '@playwright/test';
import { LargeDOMPage } from '../pages/LargeDOMPage';

test.describe('Large & Deep DOM Tests', () => {
    let largeDOMPage: LargeDOMPage;

    test.beforeEach(async ({ page }) => {
        largeDOMPage = new LargeDOMPage(page);
        await largeDOMPage.goto();
    });

    test('verify large table structure', async () => {
        const rowCount = await largeDOMPage.getRowCount();
        expect(rowCount).toBeGreaterThan(50);

        // Check content of specific rows
        const firstRowText = await largeDOMPage.getRowText(0);
        expect(firstRowText).toBeTruthy();
        
        const middleRowText = await largeDOMPage.getRowText(25);
        expect(middleRowText).toBeTruthy();
    });

    test('handle deep DOM siblings', async () => {
        // Tests ability to handle deeply nested elements
        const siblingCount = await largeDOMPage.getSiblingCount();
        expect(siblingCount).toBeGreaterThan(40);
    });
});