Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Request aborted')) {
    return false;
  }
  return true;
});
describe('Scenario tambah pegawai baru', () => {
  it('TC_PIM', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
    cy.get('a[href="/web/index.php/pim/viewPimModule"]').click()
    cy.get('button:contains("Add")', { timeout: 10000 }).click()
    cy.get('input[name="firstName"]').type('Yu')
    cy.get('input[name="lastName"]').type('Zhong')
    cy.get('button[type="submit"]').click()
  })
})

