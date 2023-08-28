// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import 'cypress-pipe'
import './commands'

beforeEach(function () {
    cy.window().then((win) => {
        win.sessionStorage.clear()
        win.localStorage.clear()
    })
})

Cypress.on('window:before:load', (win) => {
    // cy.spy(win.console, "log");  // Uncomment to show console.log in cypress log.
})

// When ending a test on the edit page, the browser cannot close due to a system popup
// This prevents the popup to come, such that cypress is able to exit
Cypress.on('window:load', (window) => {
    Object.defineProperty(window, 'onbeforeunload', {
        get: () => {},
        set: () => {},
    })
})
