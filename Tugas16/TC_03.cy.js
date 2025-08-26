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
    cy.intercept('POST', '**/auth/validate').as('loginRequest')
    cy.intercept('GET', '**/dashboard/employees/action-summary').as('getDashboard')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(302)
    })
    cy.wait('@getDashboard')
    cy.url().should('include', '/dashboard')

    cy.intercept('GET', '**/pim/viewEmployeeList').as('getEmployeeList')
    cy.get('a[href="/web/index.php/pim/viewPimModule"]').click()
    cy.wait('@getEmployeeList');

    cy.intercept('GET', '**/pim/addEmployee').as('getAddEmployeeForm')
    cy.get('button:contains("Add")', { timeout: 10000 }).click()
    cy.wait('@getAddEmployeeForm')

    cy.get('input[name="firstName"]').type('Yu')
    cy.get('input[name="lastName"]').type('Zhong')

    cy.intercept('POST', '**/api/v2/pim/employees').as('addEmployee')
    cy.get('button[type="submit"]').click()
    cy.wait('@addEmployee').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    })
  })
})

