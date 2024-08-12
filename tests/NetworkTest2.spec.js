const { test,expect } = require("@playwright/test");



test("Security test request intercept", async ({ page }) => {
    //login and reach orders page

    const email = "snowmoomo@gmail.com"
    const products = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("jEANCHEN@123")
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await products.first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=66b8b452ae2afd4c0b45567df' }));
    await page.locator("button:has-text('view')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");



});