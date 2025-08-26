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

     cy.intercept('GET', '**/admin/saveSystemUser').as('loadAddForm')
    cy.contains('button', 'Add').click()
cy.wait('@loadAddForm')
    
    cy.get('div.oxd-select-wrapper').eq(0).click()
    cy.contains('.oxd-select-dropdown > div', 'ESS').click()
    cy.intercept('GET', '**/api/v2/pim/employees**').as('searchEmployee')
    cy.get('input[placeholder="Type for hints..."]').type('Yu Zhong',{ timeout: 6000 })
    cy.wait('@searchEmployee',{ timeout: 6000 })
    cy.get('.oxd-autocomplete-dropdown > div',{ timeout: 10000 }).should('exist') .should('be.visible').first().click()
    cy.get('div.oxd-select-wrapper').eq(1).click()
    cy.contains('.oxd-select-dropdown > div', 'Enabled').click()
    cy.contains('label', 'Username').parents('.oxd-input-group').find('input').type('Yuzhong')
    cy.contains('label', 'Password').parents('.oxd-input-group').find('input').type('testing123')
    cy.contains('label', 'Confirm Password').parents('.oxd-input-group').find('input').type('testing123')
    cy.intercept('POST', '**/api/v2/admin/users').as('addUser')
    cy.contains('button', 'Save').click()
    cy.wait('@addUser').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.request.body).to.have.property('username', 'Yuzhong');
    })
  })
})
