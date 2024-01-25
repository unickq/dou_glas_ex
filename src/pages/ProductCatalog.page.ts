import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductFilter } from "../types/type";

export class ProductCatalogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectFilters(productFilters: ProductFilter[]) {
    for (const productFilter of productFilters) {
      await this.page.getByTestId("grid").getByText(productFilter.filterType).click();

      for (const filter of productFilter.filterValue) {
        let locator;
        if (typeof filter === "string") {
          locator = this.page.getByRole("checkbox", { name: filter });
        }
        if (typeof filter === "number") {
          locator = this.page.getByRole("checkbox").nth(filter);
        }
        await expect(locator, `Cannot find ${productFilter.filterType} - ${filter}`).toBeVisible({ timeout: 3_000 });
        await locator.click();
        await expect(locator, `Cannot select ${productFilter.filterType} - ${filter}`).toBeChecked();
      }
    }
  }

  async shouldHaveResultsCount(resultsCount: number) {
    await expect(this.page.getByTestId("product-tile")).toHaveCount(resultsCount);
  }
}
