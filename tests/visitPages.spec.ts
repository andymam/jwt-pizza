import { test, expect } from 'playwright-test-coverage';

test('peep franchise page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
    await expect(page.getByRole('alert')).toContainText('If you are already a franchisee, pleaseloginusing your franchise account');
    await expect(page.locator('thead')).toContainText('Franchise Fee');
    await expect(page.getByRole('contentinfo')).toContainText('Franchise');
});