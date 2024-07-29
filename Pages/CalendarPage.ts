import { Page } from "@playwright/test";

export class CalendarPage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickDeliveryDate(): Promise<void> {
        const deliveryDateLocator = await this.page.locator(".react-date-picker__inputGroup");
        await deliveryDateLocator.click();
    }
    async clickXXLabel(): Promise<void> {
        await this.page.locator(".react-calendar__navigation__label").click()
    }

}