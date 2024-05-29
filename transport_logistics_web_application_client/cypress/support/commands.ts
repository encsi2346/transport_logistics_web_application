Cypress.Commands.add("login", (user) => {
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
    cy.get('[data-testid="/logout"]').click()
    cy.visit('http://localhost:3000/logout');
})

Cypress.Commands.add('dashboard', () => {
    cy.get('[data-testid="/dashboard"]').click()
    cy.visit('http://localhost:3000/dashboard');
})

Cypress.Commands.add('users', () => {
    cy.get('[data-testid="/users"]').click()
    cy.visit('http://localhost:3000/users');
})

Cypress.Commands.add('transportations', () => {
    cy.get('[data-testid="/transportations"]').click()
    cy.visit('http://localhost:3000/transportations*');
})

Cypress.Commands.add('cartypes', () => {
    cy.get('[data-testid="/car-types"]').click()
    cy.visit('http://localhost:3000/car-types');
})

Cypress.Commands.add('productscategories', () => {
    cy.get('[data-testid="/products-categories"]').click()
    cy.visit('http://localhost:3000/product-categories');
})

Cypress.Commands.add('orders', () => {
    cy.get('[data-testid="/orders"]').click()
    cy.visit('http://localhost:3000/orders');
})

Cypress.Commands.add('requests*', () => {
    cy.get('[data-testid="/requests"]').click()
    cy.visit('http://localhost:3000/requests*');
})

Cypress.Commands.add('profile', () => {
    cy.get('[data-testid="/users/profile"]').click()
    cy.visit('http://localhost:3000/users/profile');
})

Cypress.Commands.add('documents', () => {
    cy.get('[data-testid="/documents"]').click()
    cy.visit('http://localhost:3000/documents*');
})

Cypress.Commands.add('invoices', () => {
    cy.get('[data-testid="/invoices"]').click()
    cy.visit('http://localhost:3000/invoices*');
})