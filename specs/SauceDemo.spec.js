const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const SauceDemoPage = require('../page/SauceDemoPage');
const ScreenshotPage = require('../page/ScreenshotPage');
const VisualRegressionHelper = require('../utilities/VisualRegressionHelper');

describe('Tugas POM & Visual Regression - SauceDemo', function () {
    let driver, page, screenshotAction, visualRegression;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        page = new SauceDemoPage(driver);
        screenshotAction = new ScreenshotPage(driver);
        visualRegression = new VisualRegressionHelper();
    });

    beforeEach(async function () {
        await page.open();
    });

    after(async function () {
        await driver.quit();
    });

    // Validasi Visual Regression Reusable
    async function validateVisual(imageName) {
        await screenshotAction.takeFullScreenshot(imageName);
        const result = await visualRegression.compareImages(imageName);
        if (!result.hasBaseline) {
            console.log(`\n[Info] Baseline created for ${imageName}`);
        } else {
            assert.strictEqual(result.matchPercentage > 95, true, `Visual regression failed for ${imageName}. Match: ${result.matchPercentage}%`);
        }
    }

    it('Positive: Login Success, Add to Cart, Checkout', async function () {
        await page.login('standard_user', 'secret_sauce');
        const isDisplayed = await page.isInventoryDisplayed();
        assert.strictEqual(isDisplayed, true); // Assertion
        
        await page.addToCartAndCheckout();
        await validateVisual('positive_checkout.png'); // Visual Regression
    });

    it('Negative: Invalid Username', async function () {
        await page.login('invalid_user', 'secret_sauce');
        const error = await page.getErrorMessage();
        assert.ok(error.includes('Username and password do not match')); // Assertion
        await validateVisual('negative_invalid_username.png'); // Visual Regression
    });

    it('Negative: Wrong Password', async function () {
        await page.login('standard_user', 'wrong_password');
        const error = await page.getErrorMessage();
        assert.ok(error.includes('Username and password do not match')); // Assertion
        await validateVisual('negative_wrong_password.png'); // Visual Regression
    });

    it('Negative: Locked Out User', async function () {
        await page.login('locked_out_user', 'secret_sauce');
        const error = await page.getErrorMessage();
        assert.ok(error.includes('Sorry, this user has been locked out')); // Assertion
        await validateVisual('negative_locked_out.png'); // Visual Regression
    });
});