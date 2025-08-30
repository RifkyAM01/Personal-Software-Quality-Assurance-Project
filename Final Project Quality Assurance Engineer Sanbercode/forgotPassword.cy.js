import ForgotPassword from './pageObjects/forgotPassword'

describe('Tes Lupa Password',()=>{
    it('Menampilkan halaman lupa password',()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        ForgotPassword.clickForgotPassword()
        cy.url().should('include','requestPasswordResetCode')
        ForgotPassword.resetPassword('Admin')
        cy.contains('Reset Password link sent successfully')
    })
})