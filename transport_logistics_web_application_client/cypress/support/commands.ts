Cypress.Commands.add('login', (user) => {
    cy.visit('http://localhost:3000/login');
    if (user) {
        cy.get('[data-testid="email-input"]').type(user)
    } else {
        cy.get('[data-testid="email-input"]').type(Cypress.env('user'))
    }
    cy.get('[data-testid="password-input"]').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()
    cy.wait(3000)
})

Cypress.Commands.add('logout', () => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/logout');
})