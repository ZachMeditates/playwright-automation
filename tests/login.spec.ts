import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';
import { testData } from '../config/test-data';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;
    let securePage: SecurePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        securePage = new SecurePage(page);
        await loginPage.goto();
    });

    test('successful login', async () => {
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        const message = await loginPage.getFlashMessage();
        expect(message).toContain('You logged into a secure area');
    });

    test('failed login', async () => {
        await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
        const message = await loginPage.getFlashMessage();
        expect(message).toContain('Your username is invalid');
    });

    test('password validation tests', async () => {
        const testCases = [
            { password: '', expectedError: 'Your password is invalid!' },
            { password: '123', expectedError: 'Your password is invalid!' },
            { password: 'invalidPass', expectedError: 'Your password is invalid!' },
            { password: 'password123', expectedError: 'Your password is invalid!' }
        ];

        for (const testCase of testCases) {
            await loginPage.login(testData.validUser.username, testCase.password);
            const message = await loginPage.getFlashMessage();
            expect(message).toContain(testCase.expectedError);
            
            // Clear fields for next iteration
            await loginPage.goto();
        }

        // Test max length
        const longPassword = 'A'.repeat(51);
        await loginPage.login(testData.validUser.username, longPassword);
        const message = await loginPage.getFlashMessage();
        expect(message).toContain('Your password is invalid!');
    });
});