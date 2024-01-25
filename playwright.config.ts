import { devices, PlaywrightTestConfig } from "@playwright/test";
import "dotenv/config";

const config: PlaywrightTestConfig = {
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  workers: process.env.CI ? 2 : 3,
  testMatch: /.*\.spec\.ts/,
  retries: process.env.CI ? 1 : 3,
  reporter: [
    process.env.CI ? ["github"] : ["html", { open: "never" }],
    ["line"],
    ["junit", { outputFile: "test-results/playwright.xml" }],
  ],
  use: {
    ...devices[process.env.DEVICE || "Desktop Chrome"],
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    baseURL: process.env.BASE_URL || "https://www.douglas.de/de",
  },
  outputDir: "test-results",
};

export default config;
