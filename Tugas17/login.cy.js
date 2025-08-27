import LoginPage from '../support/pageObjects/LoginPage'

describe('Login Test', ()=>{
    const loginPage = new LoginPage()

    beforeEach(()=>{
        loginPage.visit()
    })

    it('sukses login', ()=>{
        loginPage.login('Admin', 'admin123')

        cy.url().should('include', 'dashboard')
    })

    it('gagal login dengan notifikasi error',()=>{
        loginPage.login('invalidUser', 'wrongPass')
        loginPage.getErrorMessage().should('be.visible').and('contain', 'Invalid credentials')
    })
    it('Menunjukan notifikasi field yang belum diisi',()=>{
        loginPage.getLoginButton().click()
        loginPage.getUsernameRequiredMessage().should('contain', 'Required')
        loginPage.getPasswordRequiredMessage().should('contain', 'Required')
    })
})