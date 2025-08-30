class Maintenance{
    clickMenuMaintenance(){
        cy.contains('Maintenance').click()
    }

    getPassword(){
        return cy.get('input[type="password"]')
    }
    getConfirmButton(){
        return cy.get('button[type="submit"]')
    }
    confirmPassword(password){
        this.getPassword().type(password)
        this.getConfirmButton().click()
    }
    getHeader(){
        return cy.get('.oxd-topbar-header-title')
    }
}

export default new Maintenance()