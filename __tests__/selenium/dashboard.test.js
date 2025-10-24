// tests/selenium/dashboard.test.ts
import { Builder, Browser, By, until } from "selenium-webdriver";

describe("Dashboard Page UI Tests", () => {
  let driver;
  const baseUrl = "http://localhost:3000";
  const email = "test123@test.com";
  const password = "test123@test.com";

  beforeAll(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().setTimeouts({ implicit: 10000 });

    // First, sign in
    await driver.get(`${baseUrl}/sign-in`);

    // Fill credentials
    await driver.wait(
      until.elementLocated(By.css('input[type="email"]')),
      5000
    );
    const emailInput = await driver.findElement(By.css('input[type="email"]'));
    await emailInput.sendKeys(email);

    const continueButton = await driver.findElement(
      By.xpath('//button[contains(text(), "Continue")]')
    );
    await continueButton.click();

    await driver.wait(
      until.elementLocated(By.css('input[type="password"]')),
      5000
    );
    const passwordInput = await driver.findElement(
      By.css('input[type="password"]')
    );
    await passwordInput.sendKeys(password);

    const signInButton = await driver.findElement(
      By.xpath('//button[contains(text(), "Continue")]')
    );
    await signInButton.click();

    // Wait for dashboard to load
    await driver.wait(until.urlContains("/dashboard"), 10000);
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test("renders dashboard title", async () => {
    const title = await driver.wait(
      until.elementLocated(
        By.xpath("//h1[contains(text(),'Website Monitoring')]")
      ),
      5000
    );
    expect(await title.getText()).toContain("Website Monitoring");
  });

  test("search filters list", async () => {
    const searchInput = await driver.findElement(
      By.css("input[type='search']")
    );
    await searchInput.clear();
    await searchInput.sendKeys("Google");

    // Wait for filtering to take effect
    await driver.sleep(1000);

    const rows = await driver.findElements(By.css("table tbody tr"));
    expect(rows.length).toBeGreaterThan(0);
  });

  test("clicking row navigates to monitor page", async () => {
    const firstRow = await driver.findElement(By.css("table tbody tr"));
    await firstRow.click();

    await driver.wait(until.urlContains("/dashboard/monitor/"), 5000);
    const currentUrl = await driver.getCurrentUrl();

    expect(currentUrl).toContain("/dashboard/monitor/");
  });

  test("should display user profile after sign in", async () => {
    // Look for user avatar or profile element
    const userAvatar = await driver.wait(
      until.elementLocated(
        By.css('[class*="user"], [class*="avatar"], [class*="profile"]')
      ),
      5000
    );
    expect(await userAvatar.isDisplayed()).toBeTruthy();
  });
});
