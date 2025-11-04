import { Builder, Browser, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Simple Clerk Auth", () => {
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
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test("simple sign in", async () => {
    console.log("1. Going to sign-in page");
    await driver.get("http://localhost:3000/sign-in");

    console.log("2. Filling email");
    const emailInput = await driver.wait(
      until.elementLocated(By.id("identifier-field"))
    );
    await emailInput.sendKeys("test123@test.com");

    console.log("3. Clicking continue");
    const continueBtn1 = await driver.findElement(
      By.css("button.cl-formButtonPrimary")
    );
    await continueBtn1.click();

    console.log("4. Waiting for password field");

    await driver.wait(until.elementLocated(By.id("password-field")));

    await driver.sleep(1000);

    console.log("5. Refinding password field and filling it");

    const passwordInput = await driver.findElement(By.id("password-field"));

    await passwordInput.click();

    await passwordInput.clear();

    await passwordInput.sendKeys("test123@test.com");

    console.log("6. Refinding and clicking continue button");

    const continueBtn2 = await driver.findElement(
      By.css("button.cl-formButtonPrimary")
    );
    await continueBtn2.click();

    console.log("7. Waiting for dashboard");
    await driver.wait(until.urlContains("/dashboard"));

    const currentUrl = await driver.getCurrentUrl();
    console.log("✅ Success! Current URL:", currentUrl);
    expect(currentUrl).toContain("/dashboard");
  }, 60000);
});
