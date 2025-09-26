const { test, expect } = require("@playwright/test");
const allure = require("allure-js-commons");
const { login, resetAppState, logout } = require("../utils/authHelper");

/** Test Case for Question 3 */
test("Q3: Performance glitch user sort and checkout", async ({ page }) => {

  allure.label("epic", "Assignment 3");
  allure.label("feature", "User Checkout Flow for Performance Glitch User");
  allure.label("story", "Verify product sorting, adding to cart, and completing checkout process to works correctly for performance glitch user");

  await page.goto("https://www.saucedemo.com/");
  await login(page, "performance_glitch_user", "secret_sauce");
  await resetAppState(page);

  /** Shorting Products to (Z to A) from dropdown */
  await allure.step("Sort products by Name (Z to A)", async () => {
    const sortDropdown = page.locator(".product_sort_container");
    await sortDropdown.click();
    await page.selectOption(".product_sort_container", {
      label: "Name (Z to A)",
    });
  });

  /** Process to add first product after shorting (Z to A) */
  const firstItem = (await page.$$(".inventory_item"))[0];
  const firstName = await firstItem.$eval(".inventory_item_name", (el) => el.textContent.trim());
  await allure.attachment("First product after sort", firstName, "text/plain");

  await allure.step("Add first product to cart", async () => {
    const addButton = await firstItem.$("button");
    await addButton.click();
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
    const names = await page.$$eval(".inventory_item_name", (els) =>
      els.map((el) => el.textContent.trim())
    );
    await allure.attachment(
      "Products in checkout",
      JSON.stringify(names, null, 2),
      "application/json"
    );
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

  console.log("Question 3 executed");
});
