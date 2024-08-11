const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('./utils/APiUtils');
const loginPayload = { userEmail: "snowmoomo@gmail.com", userPassword: "jEANCHEN@123" };
const orderPayload = { orders: [{ country: "New Zealand", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let token;
let orderId;
let response;

//login API

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test('Place the order', async ({ page }) => {
    // const aPIUtils = new APiUtils(apiContext,loginPayload)
    // const orderId = await aPIUtils.createOrder(orderPayload);
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,

                }
            )
            //intercepting response-API response-(playwright fake response)-browser -render data on front end
        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForRequest("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
    // await page.pause();

    // await page.locator("tbody").waitFor();
    // const rows = await page.locator("tbody tr");


});
