import { defineConfig } from "cypress"

export default defineConfig({
    env: {
        user: 'testuser@test.hu',
        password: '123456789',
    },
    e2e: {
        defaultCommandTimeout: 15000,
        supportFile: 'cypress/support/e2e.ts',
        setupNodeEvents(on, config) {
            config.specPattern = [
                'cypress/e2e/auth/authentication.cy.ts',
            ]
            return config
        },
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
});