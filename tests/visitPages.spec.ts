import { test, expect } from 'playwright-test-coverage';

test('peep franchise page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
    await expect(page.getByRole('alert')).toContainText('If you are already a franchisee, pleaseloginusing your franchise account');
    await expect(page.locator('thead')).toContainText('Franchise Fee');
    await expect(page.getByRole('contentinfo')).toContainText('Franchise');
});

test('peep diner dashboard', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 1, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

      await page.route('*/**/api/order', async (route) => {
        const loginRes = {
            "dinerId": 1,
            "orders": [
              {
                "id": 1,
                "franchiseId": 1,
                "storeId": 1,
                "date": "2025-01-12T01:00:00.000Z",
                "items": [
                  {
                    "id": 1,
                    "menuId": 2,
                    "description": "Pepperoni",
                    "price": 0.0042
                  },
                  {
                    "id": 2,
                    "menuId": 2,
                    "description": "Pepperoni",
                    "price": 0.0042
                  }
                ]
              }
            ],
            "page": 1
          }
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: loginRes });
      });

    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('textbox', { name: 'Password' }).press('Tab');
    await page.getByRole('button').filter({ hasText: /^$/ }).press('Tab');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: '常' }).click();
    await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Employee stock photo' })).toBeVisible();
    await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');

});