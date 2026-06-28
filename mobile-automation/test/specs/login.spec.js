import { expect } from '@wdio/globals'
import loginAction from '../actions/login.action'

describe('Swag Labs App', () => {
    it('should launch app and verify login page', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)

        await loginAction.login('standard_user', 'secret_sauce')

        const isProductsVisible = await loginAction.waitForProducts()
        await expect(isProductsVisible).toBe(true)
    })
})