import { Page, expect } from "@playwright/test";
import { ParfumFilterType } from "../types/type";
import { BasePage } from "./BasePage";
import { ProductCatalogPage } from "./ProductCatalog.page";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openParfumFilter(parfumFilter: ParfumFilterType) {
    const parfumLocator = this.page.locator("li").filter({ hasText: "PARFUM" });
    const menuLocator = this.page.locator("#tippy-3").getByRole("link", { name: parfumFilter });
    await parfumLocator.hover();
    if (await parfumLocator.isHidden()) {
      await parfumLocator.hover();
    }
    await menuLocator.click();

    await expect(this.page.getByRole("link", { name: "Homepage" })).toBeVisible();

    return new ProductCatalogPage(this.page);
  }

  async goto() {
    await this.page.goto("/", { waitUntil: "networkidle" });
  }
}
