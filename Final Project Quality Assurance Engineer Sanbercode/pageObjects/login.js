class Login {
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/')
    }
    getUsername(){
        return cy.get('input[name="username"]')
    }
    getPassword(){
        return cy.get('input[name="password"]')
    }
    getLoginButton(){
        return cy.get('button[type="submit"]')
    }
    
    login(username, password){
        this.getUsername().type(username)
        this.getPassword().type(password)
        this.getLoginButton().click()
    }
}

export default new Login()