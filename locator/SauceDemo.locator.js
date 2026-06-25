const LOCATORS = {
    url: 'https://www.saucedemo.com/',
    selectors: {
        usernameInput: { type: 'id', value: 'user-name' },
        passwordInput: { type: 'id', value: 'password' },
        loginButton: { type: 'id', value: 'login-button' },
        errorMessage: { type: 'css', value: '[data-test="error"]' },
        inventoryList: { type: 'className', value: 'inventory_list' },
        addToCartBtn: { type: 'id', value: 'add-to-cart-sauce-labs-backpack' },
        cartIcon: { type: 'className', value: 'shopping_cart_link' },
        checkoutBtn: { type: 'id', value: 'checkout' }
    }
};
module.exports = LOCATORS;