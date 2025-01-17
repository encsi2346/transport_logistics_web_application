beforeEach(() => {
    cy.login()
})

describe('Create new type of transportation', () => {
    it('Should return 200 response code on creating new type of transportation', () => {
        cy.createNewTypeOfTransportation('Vizes szállítás')
    })
})

afterEach(() => {
    cy.logout()
})