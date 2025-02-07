import { test, expect } from 'playwright-test-coverage';

test('register then logout', async ({ page }) => {
    await page.route('**/api/auth', async (route) => {
        if (route.request().method() === 'POST') {
            const registerReq = {
                "name": "diddy",
                "email": "did@dy.com",
                "password": "diddydoit"
            };
            const registerRes = {
                "user": {
                    "name": "diddy",
                    "email": "did@dy.com",
                    "roles": [{ "role": "diner" }],
                    "id": 397
                },
                "token": "reg-token"
            };
            expect(route.request().postDataJSON()).toMatchObject(registerReq);
            await route.fulfill({ json: registerRes });
        } else if (route.request().method() === 'DELETE') {
            const logoutRes = { "message": "logout successful" };
            await route.fulfill({ json: logoutRes });
        } else {
            await route.continue();
        }
    });

    await page.goto('/');

    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).fill('diddy');

    await page.getByRole('textbox', { name: 'Email address' }).fill('did@dy.com');

    await page.getByRole('textbox', { name: 'Password' }).fill('diddydoit');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
    await expect(page.getByRole('button')).toContainText('Order now');
    await expect(page.getByRole('link', { name: 'd', exact: true })).toBeVisible();

    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.locator('#navbar-dark')).toContainText('Login');

});