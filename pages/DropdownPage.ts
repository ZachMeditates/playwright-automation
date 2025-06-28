import { type Page, type Locator } from '@playwright/test';

export class DropdownPage {
    readonly page: Page;
    readonly dropdown: Locator;
    readonly selectedOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('#dropdown');
        this.selectedOption = page.locator('#dropdown option:checked');
    }

    async goto() {
        await this.page.goto('/dropdown');
    }

    async selectOption(optionText: string) {
        await this.dropdown.selectOption(optionText);
    }

    async selectOptionByValue(value: string) {
        await this.dropdown.selectOption({ value });
    }

    async selectOptionByIndex(index: number) {
        await this.dropdown.selectOption({ index });
    }

    async getSelectedOptionText() {
        return this.selectedOption.textContent();
    }

    async getSelectedOptionValue() {
        return this.selectedOption.getAttribute('value');
    }

    async getAllOptions() {
        const options = await this.dropdown.locator('option').all();
        return Promise.all(options.map(async (option) => ({
            text: await option.textContent(),
            value: await option.getAttribute('value'),
            selected: await option.getAttribute('selected') !== null
        })));
    }

    async isOptionSelected(optionText: string) {
        const selectedText = await this.getSelectedOptionText();
        return selectedText?.trim() === optionText;
    }

    async getDropdownText() {
        return this.dropdown.textContent();
    }
} 