const { By, until } = require('selenium-webdriver');
const LOCATORS = require('../locator/SauceDemo.locator');

class SauceDemoPage {
    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get(LOCATORS.url);
    }

    async login(username, password) {
        await this.driver.findElement(By.id(LOCATORS.selectors.usernameInput.value)).sendKeys(username);
        await this.driver.findElement(By.id(LOCATORS.selectors.passwordInput.value)).sendKeys(password);
        await this.driver.findElement(By.id(LOCATORS.selectors.loginButton.value)).click();
    }

    async getErrorMessage() {
        let errorEl = await this.driver.wait(until.elementLocated(By.css(LOCATORS.selectors.errorMessage.value)), 5000);
        return await errorEl.getText();
    }

    async addToCartAndCheckout() {
        await this.driver.findElement(By.id(LOCATORS.selectors.addToCartBtn.value)).click();
        await this.driver.findElement(By.className(LOCATORS.selectors.cartIcon.value)).click();
        await this.driver.findElement(By.id(LOCATORS.selectors.checkoutBtn.value)).click();
    }
    
    async isInventoryDisplayed() {
        let inventory = await this.driver.findElement(By.className(LOCATORS.selectors.inventoryList.value));
        return await inventory.isDisplayed();
    }
}
module.exports = SauceDemoPage;