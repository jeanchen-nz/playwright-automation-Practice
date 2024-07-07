const {test, expect} = require('@playwright/test');


test('Browser Context-Validating Error login', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("snowmoomo@gmail.com");
    await page.locator("#userPassword").fill("jEANCHEN@123")
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    //await consol.log(await cardTitles.nth(1).textContent());
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});

test('UI Controls', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //await page.locator("#userName").fill("rahulshettyacademy");
    //await page.locator("[type='password']").fill("learning")
    //await page.locator("#signInBtn").click();
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    //assertion
    //await page.pause();

});

test.only('Child window handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const page2 = context.waitForEvent('page');
    documentLink.click();
    

    


});
