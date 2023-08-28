/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.on('window:before:load', (win) => {
    // Force fallback to use XHR for cypress
    // win.fetch = undefined as any
})

export const uploadFileFromInput = (
    path: string,
    inputSelector: string,
    fileName?: string,
) => {
    cy.fixture(path)
        .then(Cypress.Blob.base64StringToBlob)
        .then((blob: any) => {
            const testFiles: File[] = [
                new File([blob], fileName || new Date().valueOf() + '.jpg'),
            ]
            cy.get(inputSelector).trigger('change', { testFiles, force: true })
        })
}

export const uploadMultipleFilesFromInput = (
    fileInfo: Array<{ path: string; fileName?: string }>,
    inputSelector: string,
) => {
    const files: File[] = []
    fileInfo.forEach((fi) => {
        cy.fixture(fi.path)
            .then(Cypress.Blob.base64StringToBlob)
            .then((blob: any) => {
                files.push(
                    new File(
                        [blob],
                        fi.fileName || new Date().valueOf() + '.jpg',
                    ),
                )
            })
    })

    cy.get(inputSelector).trigger('change', { testFiles: files, force: true })
}

export const clickFilterMenuOptions = (
    filterBtnKey: string,
    optionKey: string,
) => {
    cy.get(`[data-cy=${filterBtnKey}]`).click()
    cy.get(`[data-cy=${optionKey}]`).click()
    cy.get(`[data-cy=${optionKey}]`).should('not.be.visible')
}

Cypress.Commands.overwrite('log', (message) => cy.task('log', message))
