# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      |             home.tsx       |          None         |       None       |
| Register new user<br/>(t@jwt.com, pw: test)         |          register.tsx          |       [POST] /api/auth            |       'INSERT INTO user (name, email, password) VALUES (?, ?, ?)', 'INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)', `INSERT INTO auth (token, userId) VALUES (?, ?)`       |
| Login new user<br/>(t@jwt.com, pw: test)            |         login.tsx           |        [PUT] /api/auth           |      `SELECT * FROM user WHERE email=?`, `SELECT * FROM userRole WHERE userId=?`        |
| Order pizza                                         |         payment.tsx           |        [POST] /api/order           |       `INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date) VALUES (?, ?, ?, now())`, `INSERT INTO orderItem (orderId, menuId, description, price) VALUES (?, ?, ?, ?)`       |
| Verify pizza                                        |          delivery.tsx          |        [POST] /api/order/verify           |       None       |
| View profile page                                   |         dinerDashboard.tsx           |        None           |      `SELECT id, franchiseId, storeId, date FROM dinerOrder WHERE dinerId=? LIMIT ${offset},${config.db.listPerPage}`, `SELECT id, menuId, description, price FROM orderItem WHERE orderId=?`        |
| View franchise<br/>(as diner)                       |        franchiseDashboard.tsx            |        [GET] /api/franchise/4           |      `SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?`,         |
| Logout                                              |        logout.tsx            |        [DELETE] /api/auth           |       `DELETE FROM auth WHERE token=?`       |
| View About page                                     |         about.tsx           |         None          |      None        |
| View History page                                   |         history.tsx           |         None          |      None        |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |         login.tsx           |        [PUT] /api/auth           |      `SELECT * FROM user WHERE email=?`, `SELECT * FROM userRole WHERE userId=?`        |
| View franchise<br/>(as franchisee)                  |         franchiseDashboard.tsx           |         [GET] /api/franchise/3          |      `SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?`,   `SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})`      |
| Create a store                                      |                    |                   |              |
| Close a store                                       |                    |                   |              |
| Login as admin<br/>(a@jwt.com, pw: admin)           |                    |                   |              |
| View Admin page                                     |                    |                   |              |
| Create a franchise for t@jwt.com                    |                    |                   |              |
| Close the franchise for t@jwt.com                   |                    |                   |              |
