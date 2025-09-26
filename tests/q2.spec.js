const { test, expect } = require("@playwright/test");
const allure = require("allure-js-commons");
const { login, resetAppState, logout } = require("../utils/authHelper");

/** Test Case for Question 2 */
test("Q2: Standard user should place order successfully", async ({ page }) => {

  allure.label("epic", "Assignment 2");
  allure.label("feature", "User Checkout Flow for Standard User");
  allure.label("story", "Verify that a standard user can login, add mulitple product, and complete checkout process successfully");

  await page.goto("https://www.saucedemo.com/");
  await login(page, "standard_user", "secret_sauce");
  await resetAppState(page);

  /** Adding products to cart */
  await allure.step("Add products to cart", async () => {
    const productIds = [
      "#add-to-cart-sauce-labs-backpack",
      "#add-to-cart-sauce-labs-bike-light",
      "#add-to-cart-sauce-labs-bolt-t-shirt",
    ];
    for (let id of productIds) {
      await page.click(id);
    }
  });

  await page.click(".shopping_cart_link");
  await page.click("#checkout");

  /** Checkout page operation */
  await allure.step("Fill checkout form", async () => {
    await page.fill("#first-name", "Tasnima");
    await page.fill("#last-name", "Santa");
    await page.fill("#postal-code", "4700");
  });

  await page.click("#continue");

  /** Verify Products in checkout */
  await allure.step("Verify products in checkout", async () => {

    await page.waitForSelector(".inventory_item_name");

    const productNames = await page.$$eval(".inventory_item_name", (els) =>
      els.map((el) => el.textContent.trim())
    );

    await allure.attachment(
      "Products in checkout",
      JSON.stringify(productNames, null, 2),
      "application/json"
    );

    const expectedProducts = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
    ];

  
    expectedProducts.forEach(prod => {
      if (!productNames.includes(prod)) {
        throw new Error(`Expected product "${prod}" not found in checkout!`);
      }
    });

  });

  /** Verify total price in checkout */
  await allure.step("Verify total price", async () => {
    const totalPrice = await page.textContent(".summary_total_label");
    await allure.attachment("Total price", totalPrice, "text/plain");
    expect(totalPrice).toContain("$");
  });

  await page.click("#finish");

  /** Verify the successful order message */
  await allure.step("Verify order success", async () => {
    const success = await page.textContent(".complete-header");
    expect(success.trim()).toBe("Thank you for your order!");
    await allure.attachment("Success message", success, "text/plain");
  });

  await resetAppState(page);
  await logout(page);

  console.log("Question 2 executed");
});
