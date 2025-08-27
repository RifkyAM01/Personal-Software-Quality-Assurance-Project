class LoginPage{
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/')
    }
    getUsernameInput(){
        return cy.get('input[name="username"]')
    }
    getPasswordInput(){
        return cy.get('input[name="password"]')
    }
    getLoginButton(){
        return cy.get('button[type="submit"]')
    }
    getErrorMessage(){
        return cy.get('.oxd-alert-content-text')
    }
    getUsernameRequiredMessage(){
        return cy.get('.oxd-input-field-error-message').eq(0)
    }
    getPasswordRequiredMessage(){
        return cy.get('.oxd-input-field-error-message').eq(1)
    }
    login(username,password){
        this.getUsernameInput().type(username)
        this.getPasswordInput().type(password)
        this.getLoginButton().click()
    }
}

export default LoginPage;
