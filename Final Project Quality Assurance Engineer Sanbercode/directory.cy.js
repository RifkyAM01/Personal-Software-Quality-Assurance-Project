import Login from '../5-Final-Project/pageObjects/login'
import Directory from '../5-Final-Project/pageObjects/directory'

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Request aborted')) {
      return false
    }
    return true
})
describe('Tes Directory', () => {
    before(()=>{
        Login.visit()
        Login.login('Admin','admin123')
        cy.url().should('include', '/dashboard')
    })
    it('Menampilkan Menu Directory dan Interceptnya',()=>{
        cy.intercept('GET', '**/directory/**').as('directory')
        Directory.DirectoryMenu()
        cy.wait('@directory').its('response.statusCode').should('eq', 200)
        Directory.DirectoryHeader().should('contain.text', 'Directory')
    })
})