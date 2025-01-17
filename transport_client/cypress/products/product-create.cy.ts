beforeEach(() => {
    cy.login()
})

describe('Create new product', () => {
    it('Should return 200 response code on creating new product category', () => {
        cy.createNewProduct(
            'Termék 1',
            'Termékleírás',
            'Termékkategória',
            '010',
            '0000',
            '15',
            '15',
            '90',
            'Készleten'
        )
    })
})

afterEach(() => {
    cy.logout()
})