import { test, expect } from 'playwright-test-coverage';

test.beforeEach(async ({ page }) => {
    //  admin login 
    await page.route('**/api/auth', async (route) => {
      if (route.request().method() === 'PUT') {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = {
          user: {
            id: 1,
            name: '常用名字',
            email: 'a@jwt.com',
            roles: [{ role: 'admin' }],
          },
          token: 'admin-token',
        };
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      } else {
        await route.continue();
      }
    });
  
    //  GET and POST requests for franchises
    let franchiseResponses = [
      {
        id: 112,
        name: "0itrn8hpn5",
        admins: [{ id: 380, name: "0itrn8hpn5", email: "0itrn8hpn5@admin.com" }],
        stores: [{ id: 201, name: "Store A", franchiseId: 112 }]
      },
      {
        id: 99,
        name: "17vtqpjz6s",
        admins: [{ id: 3, name: "pizza franchisee", email: "f@jwt.com" }],
        stores: []
      }
    ];
  
    await page.route('**/api/franchise', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({ json: franchiseResponses });
      } else if (route.request().method() === 'POST') {
        const createfranchiseReq = {
          stores: [],
          id: "",
          name: "test1",
          admins: [{ email: "t@jwt.com" }]
        };
  
        expect(route.request().postDataJSON()).toMatchObject(createfranchiseReq);
  
        const createfranchiseRes = {
          stores: [],
          id: 126,
          name: "test1",
          admins: [{ email: "t@jwt.com", id: 8, name: "testFranchisee" }]
        };
  
        franchiseResponses.push(createfranchiseRes);
        await route.fulfill({ json: createfranchiseRes });
      } else {
        await route.continue();
      }
    });
  
    // DELETE request for franchise 
    await page.route('**/api/franchise/126', async (route) => {
      if (route.request().method() === 'DELETE') {
        franchiseResponses = franchiseResponses.filter(f => f.id !== 126);
        await route.fulfill({ json: { success: true, message: "Franchise deleted" } });
      } else {
        await route.continue();
      }
    });
  });
  

  test('admin can create and delete stores', async ({ page }) => {
    await page.goto('/');
  
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading')).toContainText("Mama Ricci's kitchen");
  
    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).fill('test1');
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('t@jwt.com');
    await page.getByRole('button', { name: 'Create' }).click();
  
    await expect(page.getByRole('row', { name: 'test1 testFranchisee Close' })).toBeVisible();
  
    await page.getByRole('row', { name: 'test1 testFranchisee Close' }).getByRole('button').click();
    await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
    
    await page.getByRole('button', { name: 'Close' }).click();
  });
  
// fran
// franchisee@gmail.com
// fran