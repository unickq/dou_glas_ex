import { expect, test } from "../src/fixtures/Base.fixture";
import { ITest } from "../src/types/type";

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

test.describe.parallel("Douglas - test example", () => {
  test.use({ storageState: ".storage/no_cookie_banner.json" });

  testData.forEach((testData, index) => {
    test(`#${index} - ${testData.name}`, async ({ homePage }) => {
      test.info().annotations.push(
        {
          type: "issue",
          description: `https://github.com/unickq/dou_glas_ex/issues/#${index}`,
        },
        { type: "author", description: "unickq" },
      );

      try {
        const productPage = await test.step("Open menu filter", async () => {
          return await homePage.openParfumFilter(testData.parfumFilter);
        });

        await test.step("Select product filters", async () => {
          await productPage.selectFilters(testData.productFilters);
        });

        if (testData.resultsCount) {
          await test.step("Validate results", async () => {
            await productPage.shouldHaveResultsCount(testData.resultsCount!);
          });
        }
      } catch (error) {
        if (testData.error) {
          await test.step("Validate error message", async () => {
            expect(error.message).toContain(testData.error);
          });
        }
      }
    });
  });
});
