import { Builder, By, until, Browser } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Home Page UI Tests", () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments("--incognito");
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .build();
    await driver.manage().setTimeouts({
      implicit: 20000,
    });
    await driver.get("http://localhost:3000/");
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test("renders main headline", async () => {
    const headline = await driver.wait(
      until.elementLocated(
        By.xpath("//h1[contains(text(),'Monitor Your Websites')]")
      ),
      10000
    );
    const text = await headline.getText();
    expect(text).toContain("Monitor Your Websites");
  });

  test("Start Monitoring Free button navigates to dashboard", async () => {
    const button = await driver.wait(
      until.elementLocated(By.linkText("Start Monitoring Free")),
      10000
    );

    await button.click();
    await driver.wait(until.urlContains("/sign-in"), 10000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain("/sign-in");
  }, 60000); // Set timeout for this test to 60 seconds
});
