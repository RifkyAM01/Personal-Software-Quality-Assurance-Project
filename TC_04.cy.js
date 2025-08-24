Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Request aborted')) {
    return false;
  }
  return true;
})
describe('Scenario tambah username baru', () => {
  it('TC_Admin', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('a[href="/web/index.php/admin/viewAdminModule"]').click()
    cy.contains('button', 'Add').click()
    cy.get('div.oxd-select-wrapper').eq(0).click()
    cy.contains('.oxd-select-dropdown > div', 'ESS').click()
    cy.get('input[placeholder="Type for hints..."]').type('Yu Zhong')
    cy.get('.oxd-autocomplete-dropdown > div').first().click()
    cy.get('div.oxd-select-wrapper').eq(1).click()
    cy.contains('.oxd-select-dropdown > div', 'Enabled').click()
    cy.contains('label', 'Username').parents('.oxd-input-group').find('input').type('Yuzhong')
    cy.contains('label', 'Password').parents('.oxd-input-group').find('input').type('testing123')
    cy.contains('label', 'Confirm Password').parents('.oxd-input-group').find('input').type('testing123')
    cy.contains('button', 'Save').click()
  })
})
