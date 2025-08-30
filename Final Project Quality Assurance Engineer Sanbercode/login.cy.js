import Login from './pageObjects/login'

describe('Tes Login', () => { 
    it('Tes Login dan Intercept',()=>{
        Login.visit()
        cy.intercept('GET', '/web/index.php/dashboard/index').as('dashboard')
        Login.login('Admin', 'admin123')
        cy.url().should('include', '/dashboard')
        cy.wait('@dashboard').its('response.statusCode').should('eq', 200)
    })
})