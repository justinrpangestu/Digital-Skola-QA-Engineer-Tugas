const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

describe('Tugas Web UI Automation - SauceDemo', function () {
    let driver;

    // Persiapan membuka browser
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Menutup browser setelah semua test selesai
    after(async function () {
        await driver.quit();
    });

    it('Sukses Login', async function () {
        // Akses halaman web
        await driver.get('https://www.saucedemo.com');

        // Mendefinisikan element locators
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));

        // Menjalankan actions
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        // Assertion / Validasi: Memastikan elemen judul halaman produk ditampilkan (sukses login)
        let titleElement = await driver.findElement(By.className('title'));
        let isDisplayed = await titleElement.isDisplayed();
        assert.strictEqual(isDisplayed, true);
    });

    it('Urutkan Produk dari A-Z', async function () {
        // Mencari elemen dropdown pengurutan
        let sortDropdown = await driver.findElement(By.className('product_sort_container'));
        await sortDropdown.click();

        // Memilih opsi A to Z (value "az")
        let optionAZ = await driver.findElement(By.css('option[value="az"]'));
        await optionAZ.click();

        // Assertion / Validasi: Memastikan pengurutan saat ini adalah Name (A to Z)
        let activeOption = await driver.findElement(By.className('active_option')).getText();
        assert.strictEqual(activeOption, 'Name (A to Z)');
    });
});