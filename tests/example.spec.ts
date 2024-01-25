import { expect, test } from "@playwright/test";
import { ITest } from "../src/types/type";
import { HomePage } from "../src/pages/Home.page";

const testData: ITest[] = [
  {
    name: "@positive - Neu - Marke[4711] - Produktart[0]",
    parfumFilter: "NEU",
    productFilters: [
      {
        filterType: "Marke",
        filterValue: ["4711"],
      },
      {
        filterType: "Produktart",
        filterValue: [0],
      },
    ],
    resultsCount: 1,
  },
  {
    name: "@positive - Neu - Marke[0,1,2]",
    parfumFilter: "NEU",
    productFilters: [
      {
        filterType: "Marke",
        filterValue: [0, 1, 2],
      },
    ],
    resultsCount: 13,
  },
  {
    name: "@positive - Neu - Marke[Acorelle] - Produktart[Parfum] - Für Wen[Unisex]",
    parfumFilter: "NEU",
    productFilters: [
      {
        filterType: "Marke",
        filterValue: ["Acorelle"],
      },
      {
        filterType: "Produktart",
        filterValue: ["Parfum"],
      },
      {
        filterType: "Für Wen",
        filterValue: ["Unisex"],
      },
    ],
    resultsCount: 13,
  },
  {
    name: "@negative - Neu - Produktart[10000]",
    parfumFilter: "NEU",
    productFilters: [
      {
        filterType: "Produktart",
        filterValue: [1000],
      },
    ],
    error: "Cannot find Produktart - 1000",
  },
  {
    name: "@negative - Sale - Für Wen[Eau de Parfumus]",
    parfumFilter: "SALE",
    productFilters: [
      {
        filterType: "Für Wen",
        filterValue: ["Eau de Parfumus"],
      },
    ],
    error: "Cannot find Für Wen - Eau de Parfumus",
  },
];

test.use({ storageState: ".storage/no_cookie.json" });

test.describe.parallel("Douglas - test example", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  testData.forEach((testData, index) => {
    test(`#${index} - ${testData.name}`, async () => {
      try {
        const productPage = await homePage.openParfumFilter(testData.parfumFilter);
        await productPage.selectFilters(testData.productFilters);
        if (testData.resultsCount) {
          await productPage.shouldHaveResultsCount(testData.resultsCount);
        }
      } catch (error) {
        if (testData.error) {
          expect(error.message).toContain(testData.error);
        }
      }
    });
  });
});
