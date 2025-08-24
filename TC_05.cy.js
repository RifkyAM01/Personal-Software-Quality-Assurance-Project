Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Request aborted')) {
    return false;
  }
  return true;
})
describe('Scenario cari data berdasarkan username', () => {
  it('TC_Admin_Search', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('a[href="/web/index.php/admin/viewAdminModule"]').click()
    cy.contains('h5', 'System Users', { timeout: 10000 }).should('be.visible')
    cy.contains('label.oxd-label', 'Username').parents('.oxd-input-group').find('input.oxd-input').clear().type('Yuzhong')
    cy.contains('button', 'Search').click()
})
})

