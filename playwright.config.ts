import { devices, PlaywrightTestConfig } from "@playwright/test";
import "dotenv/config";

const config: PlaywrightTestConfig = {
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  workers: process.env.CI ? 2 : 3,
  testMatch: /.*\.spec\.ts/,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    process.env.CI ? ["github"] : ["null"],
    ["line"],
    ["html", { open: "never" }],
    ["junit", { outputFile: "test-results/playwright.xml" }],
  ],
  use: {
    ...devices[process.env.DEVICE || "Desktop Chrome"],
    screenshot: "only-on-failure",
    video: "off",
    trace: "retain-on-failure",
    baseURL: process.env.BASE_URL || "https://www.douglas.de/de",
  },
  outputDir: "test-results",
  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //   },
  //   {
  //     name: "firefox",
  //     use: { ...devices["Desktop Firefox"] },
  //   },
  //   {
  //     name: "webkit",
  //     use: { ...devices["Desktop Safari"] },
  //   },
  // ],
};

export default config;
