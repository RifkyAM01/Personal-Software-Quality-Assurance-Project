import Login from '../5-Final-Project/pageObjects/login'
import Maintenance from './pageObjects/maintenance'

describe('Tes Menu Maintenance', () => { 
    before(()=>{
        Login.visit()
        Login.login('Admin', 'admin123')
        cy.url().should('include', '/dashboard')
    })
    it('Menampilkan menu Maintenance',()=>{
        cy.intercept('GET', '**/maintenance/**').as('maintenanceTestIntercept')
        Maintenance.clickMenuMaintenance()
        cy.wait('@maintenanceTestIntercept')
        cy.url().should('include', '/maintenance')
        Maintenance.getPassword().should('be.visible')
        Maintenance.confirmPassword('admin123')
        Maintenance.getHeader().should('contain.text', 'Maintenance')
    })
})