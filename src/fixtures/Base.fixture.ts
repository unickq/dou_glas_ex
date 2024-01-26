import { test as base } from "@playwright/test";
import { HomePage } from "../pages/Home.page";
import { ProductCatalogPage } from "../pages/ProductCatalog.page";

type MyFixtures = {
  homePage: HomePage;
  productCatalogPage: ProductCatalogPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const todoPage = new HomePage(page);
    await todoPage.goto();

    await use(todoPage);
  },

  productCatalogPage: async ({ page }, use) => {
    await use(new ProductCatalogPage(page));
  },
});
export { expect } from "@playwright/test";
