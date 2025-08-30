class ForgotPassword{
    clickForgotPassword(){
        cy.contains('Forgot your password?').click()
    }
    getUsername(){
        return cy.get('input[placeholder="Username"]')
    }
    getResetButton(){
        return cy.get('button[type="submit"]')
    }

    resetPassword(username){
        this.getUsername().type(username)
        this.getResetButton().click()
    }
}

export default new ForgotPassword()