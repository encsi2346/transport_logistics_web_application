beforeEach(() => {
    cy.intercept('POST', '/login*').as('login')
})

describe('Testing urls', () => {
    context('Dashboard', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to dashboard page', () => {
            cy.dashboard();
            cy.url().should('include', '/dashboard');
        });
    });

    context('Users', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to users page', () => {
            cy.users();
            cy.url().should('include', '/users');
        });
    });

    context('Transportations', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to transportations page', () => {
            cy.transportations();
            cy.url().should('include', '/transportations*');
        });
    });

    context('Car-types', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to car-types page', () => {
            cy.cartypes();
            cy.url().should('include', '/car-types');
        });
    });

    context('Products-categories', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to products-categories page', () => {
            cy.productscategories();
            cy.url().should('include', '/products-categories');
        });
    });

    context('Orders', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to orders page', () => {
            cy.orders();
            cy.url().should('include', '/orders');
        });
    });

    context('Requests', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to requests page', () => {
            cy.requests();
            cy.url().should('include', '/requests*');
        });
    });

    context('Profile', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to profile page', () => {
            cy.profile();
            cy.url().should('include', '/profile');
        });
    });

    context('Documents', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to documents page', () => {
            cy.documents();
            cy.url().should('include', '/documents*');
        });
    });

    context('Invoices', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Should successfully login and go to invoices page', () => {
            cy.invoices();
            cy.url().should('include', '/invoices*');
        });
    });
});
