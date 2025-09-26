const { test, expect } = require("@playwright/test");
const allure = require("allure-js-commons");
const { login } = require("../utils/authHelper");

/** Test Case for Question 1 */
test("Q1: Locked out user should see error", async ({ page }) => {

  allure.label("epic", "Assignment 1");
  allure.label("feature", "User Login to indentify error Locked Out User");
  allure.label("story", "Verify that a locked out user cannot log in");

  await page.goto("https://www.saucedemo.com/");
  await login(page, "locked_out_user", "secret_sauce");

  /** Verify the error message */
  await allure.step("Verify error message", async () => {
    const error = await page.textContent("h3[data-test='error']");
    expect(error).toContain("locked out");
    await allure.attachment("Error message", error, "text/plain");
  });

  console.log("Question 1 executed");
  
});
