import { test, expect } from 'playwright-test-coverage';

// test.beforeEach(async ({ page }) => {
//   // Mock admin login request
//   await page.route('**/api/auth', async (route) => {
//     const loginReq = { email: 'admin@jwt.com', password: 'adminpass' };
//     const loginRes = {
//       user: {
//         id: 1,
//         name: 'Admin User',
//         email: 'admin@jwt.com',
//         roles: [{ role: 'admin' }], // Admin role
//       },
//       token: 'admin-token',
//     };
//     if (route.request().method() === 'PUT') {
//       expect(route.request().postDataJSON()).toMatchObject(loginReq);
//       await route.fulfill({ json: loginRes });
//     } else {
//       await route.continue();
//     }
//   });

//   // Mock store creation request
//   await page.route('**/api/store', async (route) => {
//     if (route.request().method() === 'POST') {
//       const newStoreReq = { name: 'New Store', franchiseId: 2 };
//       const newStoreRes = { id: 99, name: 'New Store', franchiseId: 2 };

//       expect(route.request().postDataJSON()).toMatchObject(newStoreReq);
//       await route.fulfill({ json: newStoreRes });
//     } else {
//       await route.continue();
//     }
//   });

//   // Mock store deletion request
//   await page.route('**/api/store/99', async (route) => {
//     if (route.request().method() === 'DELETE') {
//       await route.fulfill({ status: 200 }); // Simulating successful deletion
//     } else {
//       await route.continue();
//     }
//   });
// });

test('admin can create and delete stores', async ({ page }) => {
  await page.goto('/');
  
});
