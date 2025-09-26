const allure = require("allure-js-commons");

/** Reusable function for Login User */
async function login(page, username, password) {
  await allure.step(`Login as ${username}`, async () => {
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
  });
}

/** Reusable function for Reset App State from Drawer Menu */
async function resetAppState(page) {
  await allure.step('Reset app state', async () => {
    await page.click('#react-burger-menu-btn');
    await page.click('#reset_sidebar_link');
    await page.click('#react-burger-cross-btn');
  });
}

/** Reusable function for Logout User from Drawer Menu */
async function logout(page) {
  await allure.step('Logout user', async () => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
  });
}

module.exports = { login, resetAppState, logout };
