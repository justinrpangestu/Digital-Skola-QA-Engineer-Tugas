const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

describe('Tugas Web UI Automation - SauceDemo (Sesi 10)', function () {
    let driver;

    // 1. Hook before(): Buka browser sekali di awal
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // 2. Hook beforeEach(): Beri penanda log sebelum test case jalan
    beforeEach(async function () {
        console.log('---> Memulai eksekusi Test Case...');
    });

    // 3. Hook afterEach(): Beri penanda log setelah test case selesai
    afterEach(async function () {
        console.log('<--- Test Case selesai dieksekusi.\n');
    });

    // 4. Hook after(): Tutup browser sekali di akhir setelah semua test beres
    after(async function () {
        await driver.quit();
    });

    it('Sukses Login', async function () {
        await driver.get('https://www.saucedemo.com');
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        let titleElement = await driver.findElement(By.className('title'));
        let isDisplayed = await titleElement.isDisplayed();
        assert.strictEqual(isDisplayed, true);
    });

    it('Urutkan Produk dari A-Z', async function () {
        let sortDropdown = await driver.findElement(By.className('product_sort_container'));
        await sortDropdown.click();

        let optionAZ = await driver.findElement(By.css('option[value="az"]'));
        await optionAZ.click();

        let activeOption = await driver.findElement(By.className('active_option')).getText();
        assert.strictEqual(activeOption, 'Name (A to Z)');
    });
});