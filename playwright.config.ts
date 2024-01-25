import { devices, PlaywrightTestConfig } from "@playwright/test";
import "dotenv/config";

const config: PlaywrightTestConfig = {
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  workers: process.env.CI ? 2 : 3,
  testMatch: /.*\.spec\.ts/,
  retries: process.env.TEST_RETRIES ? Number.parseInt(process.env.TEST_RETRIES) : 0,
  reporter: [
    [process.env.CI ? "github" : "list"],
    ["junit", { outputFile: "test-results/playwright.xml" }],
    ["html", { open: "never" }],
  ],
  use: {
    ...devices[process.env.DEVICE || "Desktop Chrome"],
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    navigationTimeout: 30_000,
    baseURL: process.env.BASE_URL || "https://www.douglas.de/de",
  },
  reportSlowTests: { max: 0, threshold: 45_000 },
  outputDir: "test-results",
};

export default config;
