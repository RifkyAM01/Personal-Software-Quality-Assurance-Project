class Directory{
    DirectoryMenu(){
        cy.contains('Directory').click()
    }
    DirectoryHeader(){
        return cy.get('.oxd-topbar-header-title')
    }
}

export default new Directory()