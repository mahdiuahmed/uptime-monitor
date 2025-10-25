// __tests__/selenium/auth-simple.test.js
import { Builder, Browser, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Simple Clerk Auth", () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments(
      "--disable-notifications", // Disable notification popups
      "--disable-popup-blocking", // Disable popup blocking (allow all popups)
      "--disable-default-apps", // Disable default apps
      "--disable-infobars", // Disable "Chrome is being controlled" infobar
      "--disable-web-security", // Disable web security (for testing)
      "--disable-extensions", // Disable extensions
      "--no-first-run", // Skip first run dialogs
      "--incognito", // Skip first run dialogs
      "--no-default-browser-check" // Disable default browser check
    );
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .build();
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
      until.elementLocated(By.id("identifier-field")),
      10000
    );
    await emailInput.sendKeys("test123@test.com");

    console.log("3. Clicking continue");
    const continueBtn1 = await driver.findElement(
      By.css("button.cl-formButtonPrimary")
    );
    await continueBtn1.click();

    console.log("4. Waiting for password field");
    // Wait for the page to update and password field to be available
    await driver.wait(until.elementLocated(By.id("password-field")), 10000);

    // Small pause to ensure form is ready
    await driver.sleep(1000);

    console.log("5. Refinding password field and filling it");
    // REFIND the element after page transition
    const passwordInput = await driver.findElement(By.id("password-field"));

    // Click the field first to focus it
    await passwordInput.click();

    // Clear any existing value
    await passwordInput.clear();

    // Type the password character by character (like a real user)
    await passwordInput.sendKeys("test123@test.com");

    console.log("6. Refinding and clicking continue button");
    // REFIND the continue button after page transition
    const continueBtn2 = await driver.findElement(
      By.css("button.cl-formButtonPrimary")
    );
    await continueBtn2.click();

    console.log("7. Waiting for dashboard");
    await driver.wait(until.urlContains("/dashboard"), 15000);

    const currentUrl = await driver.getCurrentUrl();
    console.log("✅ Success! Current URL:", currentUrl);
    expect(currentUrl).toContain("/dashboard");
  }, 30000);
});
