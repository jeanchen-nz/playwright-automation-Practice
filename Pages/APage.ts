import { Page } from "@playwright/test";

export class APage {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
}