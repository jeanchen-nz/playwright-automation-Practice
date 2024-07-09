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

test('Child window handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
    context.waitForEvent('page'),//listeen for any new page
    documentLink.click(),
    ]);//new page is oppened
    
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
   
    console.log(await page.locator("#username").textContent());


});

test.only('Client App Login', async({page})=>
    {
        const productName = 'Zara Coat 4';
        const products = page.locator(".card-body");
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("snowmoomo@gmail.com");
        await page.locator("#userPassword").fill("jEANCHEN@123")
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
        const count = await products.count();
        for(let i=0; i<count; ++i)
        {
            if(await products.nth(i).locator("b").textContent() === productName)
            {
                //add to cart
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        };
    
    });