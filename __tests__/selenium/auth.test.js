// __tests__/selenium/auth.test.js
import { Builder, Browser, By, until } from "selenium-webdriver";

describe("Clerk Authentication Flow", () => {
  let driver;
  const baseUrl = "http://localhost:3000";
  const email = "test123@test.com";
  const password = "test123@test.com";

  beforeAll(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().setTimeouts({
      implicit: 10000,
      pageLoad: 30000,
      script: 30000,
    });
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test("should sign in with valid credentials and redirect to dashboard", async () => {
    console.log("Step 1: Navigating to sign-in page...");
    await driver.get(`${baseUrl}/sign-in`);

    // Wait for Clerk form to load completely
    console.log("Step 2: Waiting for email input...");
    await driver.wait(until.elementLocated(By.id("identifier-field")), 15000);

    // Wait for element to be interactable
    const emailInput = await driver.wait(
      until.elementIsVisible(driver.findElement(By.id("identifier-field"))),
      10000
    );

    console.log("Step 3: Filling email...");
    await emailInput.clear();
    await emailInput.sendKeys(email);

    console.log("Step 4: Clicking continue button...");
    const continueButton = await driver.wait(
      until.elementIsVisible(
        driver.findElement(By.css("button.cl-formButtonPrimary"))
      ),
      10000
    );
    await continueButton.click();

    // Wait for password field with multiple conditions
    console.log("Step 5: Waiting for password input...");
    const passwordInput = await driver.wait(
      until.elementIsVisible(
        until.elementIsEnabled(driver.findElement(By.id("password-field")))
      ),
      15000
    );

    console.log("Step 6: Filling password...");
    // Use JavaScript execution as fallback if clear doesn't work
    await driver.executeScript("arguments[0].value = '';", passwordInput);
    await passwordInput.sendKeys(password);

    console.log("Step 7: Clicking continue button for password...");
    const signInButton = await driver.wait(
      until.elementIsVisible(
        driver.findElement(By.css("button.cl-formButtonPrimary"))
      ),
      10000
    );
    await signInButton.click();

    // Wait for redirect to dashboard
    console.log("Step 8: Waiting for dashboard redirect...");
    await driver.wait(until.urlContains("/dashboard"), 20000);

    // Verify we're on dashboard
    const currentUrl = await driver.getCurrentUrl();
    console.log("Current URL:", currentUrl);
    expect(currentUrl).toContain("/dashboard");

    console.log("✅ Sign in successful!");
  });

  //   test("should show error with invalid credentials", async () => {
  //     console.log("Testing invalid credentials...");
  //     await driver.get(`${baseUrl}/sign-in`);

  //     const emailInput = await driver.wait(
  //       until.elementIsVisible(driver.findElement(By.id("identifier-field"))),
  //       10000
  //     );

  //     await emailInput.clear();
  //     await emailInput.sendKeys("wrong@email.com");

  //     const continueButton = await driver.wait(
  //       until.elementIsVisible(
  //         driver.findElement(By.css("button.cl-formButtonPrimary"))
  //       ),
  //       10000
  //     );
  //     await continueButton.click();

  //     // Wait for any potential error message
  //     try {
  //       await driver.wait(until.elementLocated(By.css('[class*="error"]')), 5000);
  //       const errorElement = await driver.findElement(By.css('[class*="error"]'));
  //       const errorText = await errorElement.getText();
  //       expect(errorText).toContain("Invalid");
  //     } catch (error) {
  //       console.log("No specific error message found");
  //       // Check if we're still on sign-in page (meaning auth failed)
  //       const currentUrl = await driver.getCurrentUrl();
  //       expect(currentUrl).toContain("/sign-in");
  //     }
  //   });
});
