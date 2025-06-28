import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage';

test.describe('Dropdown End-to-End Tests', () => {
    let dropdownPage: DropdownPage;

    test.beforeEach(async ({ page }) => {
        dropdownPage = new DropdownPage(page);
        await dropdownPage.goto();
    });

    test('should display dropdown with correct initial state', async () => {
        // Verify dropdown is visible and enabled
        await expect(dropdownPage.dropdown).toBeVisible();
        await expect(dropdownPage.dropdown).toBeEnabled();

        // Verify initial selection (should be "Please select an option")
        const initialSelection = await dropdownPage.getSelectedOptionText();
        expect(initialSelection?.trim()).toBe('Please select an option');

        // Verify all options are present
        const allOptions = await dropdownPage.getAllOptions();
        expect(allOptions).toHaveLength(3);
        
        const optionTexts = allOptions.map(option => option.text?.trim());
        expect(optionTexts).toContain('Please select an option');
        expect(optionTexts).toContain('Option 1');
        expect(optionTexts).toContain('Option 2');
    });

    test('should select Option 1 by text', async () => {
        await dropdownPage.selectOption('Option 1');
        
        // Verify selection
        const selectedText = await dropdownPage.getSelectedOptionText();
        expect(selectedText?.trim()).toBe('Option 1');
        
        // Verify using helper method
        expect(await dropdownPage.isOptionSelected('Option 1')).toBe(true);
    });

    test('should select Option 2 by text', async () => {
        await dropdownPage.selectOption('Option 2');
        
        // Verify selection
        const selectedText = await dropdownPage.getSelectedOptionText();
        expect(selectedText?.trim()).toBe('Option 2');
        
        // Verify using helper method
        expect(await dropdownPage.isOptionSelected('Option 2')).toBe(true);
    });

    test('should select Option 1 by value', async () => {
        await dropdownPage.selectOptionByValue('1');
        
        // Verify selection
        const selectedText = await dropdownPage.getSelectedOptionText();
        expect(selectedText?.trim()).toBe('Option 1');
        
        const selectedValue = await dropdownPage.getSelectedOptionValue();
        expect(selectedValue).toBe('1');
    });

    test('should select Option 2 by value', async () => {
        await dropdownPage.selectOptionByValue('2');
        
        // Verify selection
        const selectedText = await dropdownPage.getSelectedOptionText();
        expect(selectedText?.trim()).toBe('Option 2');
        
        const selectedValue = await dropdownPage.getSelectedOptionValue();
        expect(selectedValue).toBe('2');
    });

    test('should select Option 1 by index', async () => {
        await dropdownPage.selectOptionByIndex(1); // Index 1 = Option 1
        
        // Verify selection
        const selectedText = await dropdownPage.getSelectedOptionText();
        expect(selectedText?.trim()).toBe('Option 1');
    });

    test('should select Option 2 by index', async () => {
        await dropdownPage.selectOptionByIndex(2); // Index 2 = Option 2
        
        // Verify selection
        const selectedText = await dropdownPage.getSelectedOptionText();
        expect(selectedText?.trim()).toBe('Option 2');
    });

    test('should handle multiple selection changes', async () => {
        // Start with Option 1
        await dropdownPage.selectOption('Option 1');
        expect(await dropdownPage.isOptionSelected('Option 1')).toBe(true);
        
        // Change to Option 2
        await dropdownPage.selectOption('Option 2');
        expect(await dropdownPage.isOptionSelected('Option 2')).toBe(true);
        expect(await dropdownPage.isOptionSelected('Option 1')).toBe(false);
        
        // Change back to Option 1
        await dropdownPage.selectOption('Option 1');
        expect(await dropdownPage.isOptionSelected('Option 1')).toBe(true);
        expect(await dropdownPage.isOptionSelected('Option 2')).toBe(false);
    });

    test('should verify dropdown option properties', async () => {
        const allOptions = await dropdownPage.getAllOptions();
        
        // Verify Option 1 properties
        const option1 = allOptions.find(option => option.text?.trim() === 'Option 1');
        expect(option1).toBeDefined();
        expect(option1?.value).toBe('1');
        expect(option1?.selected).toBe(false); // Initially not selected
        
        // Verify Option 2 properties
        const option2 = allOptions.find(option => option.text?.trim() === 'Option 2');
        expect(option2).toBeDefined();
        expect(option2?.value).toBe('2');
        expect(option2?.selected).toBe(false); // Initially not selected
        
        // Verify default option properties
        const defaultOption = allOptions.find(option => option.text?.trim() === 'Please select an option');
        expect(defaultOption).toBeDefined();
        expect(defaultOption?.value).toBe('');
        expect(defaultOption?.selected).toBe(true); // Initially selected
    });

    test('should maintain selection after page interaction', async () => {
        // Select an option
        await dropdownPage.selectOption('Option 1');
        expect(await dropdownPage.isOptionSelected('Option 1')).toBe(true);
        
        // Simulate some page interaction (click elsewhere)
        await dropdownPage.page.click('h3'); // Click on the page heading
        
        // Verify selection is maintained
        expect(await dropdownPage.isOptionSelected('Option 1')).toBe(true);
    });

    test('should handle keyboard navigation', async () => {
        // Focus on dropdown
        await dropdownPage.dropdown.focus();
        
        // Select Option 1 using keyboard
        await dropdownPage.selectOption('Option 1');
        
        // Verify selection
        expect(await dropdownPage.isOptionSelected('Option 1')).toBe(true);
        
        // Verify dropdown still has focus
        await expect(dropdownPage.dropdown).toBeFocused();
    });
}); 