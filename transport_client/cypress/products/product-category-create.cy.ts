beforeEach(() => {
    cy.login()
})

describe('Create new product category', () => {
    it('Should return 200 response code on creating new product category', () => {
        cy.createNewProductCategory('Új teszt kategória', 'Ez a leírása a teszt kategóriának')
    })
})

afterEach(() => {
    cy.logout()
})