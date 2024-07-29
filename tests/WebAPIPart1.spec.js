const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: "snowmoomo@gmail.com", userPassword: "jEANCHEN@123" };
const orderPayload = {orders:[{country: "New Zealand", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}
let token;
let orderId;


//login API

test.beforeAll( async () => 
    {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    //create order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

    {
    data : orderPayload,
    headers:{
        'Authorization' : token,
        'Conten-Type' : 'application/json'
    }, 
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson)
    orderId = orderResponseJson.orders[0]
});

test.beforeEach(() => {

});

//test 1, test 2, test 3

test('Place the order', async ({ page }) => {

    page.addInitScript(value =>{
        window.localStorage.setItem('token', value)
    }, token);


    
    
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});