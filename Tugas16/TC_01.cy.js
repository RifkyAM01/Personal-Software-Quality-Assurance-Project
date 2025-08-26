Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Request aborted')) {
    return false;
  }
  return true;
});
describe('Scenario berhasil login', ()=>{
    it('TC_Login', ()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]').should('be.visible').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('getActionSummary')
        cy.get('button[type="submit"]').click()
        cy.wait('@getActionSummary').then((interception) => {
          expect(interception.response.statusCode).to.eq(200)
        })
        cy.url().should('include', '/dashboard');
    })
})