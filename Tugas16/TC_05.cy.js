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
    cy.intercept('POST', '**/auth/validate').as('loginRequest')
    cy.intercept('GET', '**/dashboard/employees/action-summary').as('getDashboard')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(302)
    })
    cy.wait('@getDashboard')
    cy.intercept('GET', '**/admin/viewSystemUsers').as('viewUsers')
    cy.get('a[href="/web/index.php/admin/viewAdminModule"]').click()
    cy.wait('@viewUsers')
    cy.contains('h5', 'System Users', { timeout: 10000 }).should('be.visible')
    cy.contains('label.oxd-label', 'Username').parents('.oxd-input-group').find('input.oxd-input').clear().type('Yuzhong')
    cy.intercept('GET', '**/admin/users?*').as('searchUser')
    cy.contains('button', 'Search').click()
    cy.wait('@searchUser')
})
})

