import { Page, expect } from "@playwright/test";
import { ParfumFilterType } from "../types/type";
import { BasePage } from "./BasePage";
import { ProductCatalogPage } from "./ProductCatalog.page";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openParfumFilter(parfumFilter: ParfumFilterType) {
    await this.page.locator("li").filter({ hasText: "PARFUM" }).hover();
    await this.page.locator("#tippy-3").getByRole("link", { name: parfumFilter }).click();

    await expect(this.page.getByRole("link", { name: "Homepage" })).toBeVisible();

    return new ProductCatalogPage(this.page);
  }

  async goto() {
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.goto("/", { waitUntil: "networkidle" });
  }
}
