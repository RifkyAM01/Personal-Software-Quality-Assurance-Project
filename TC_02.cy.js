Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Request aborted')) {
    return false;
  }
  return true;
});
describe('Scenario gagal login', ()=>{
    it('TC_Login', ()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]').should('be.visible').type('SuperAdmin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text', { timeout: 10000 }).should('be.visible').and('contain.text', 'Invalid credentials');
    })
})