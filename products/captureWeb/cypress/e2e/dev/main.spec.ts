describe('Test TV page', () => {
    it('has the right text', () => {
        cy.visit('/')
        cy.get('div').contains('This is the web page')
    })
})
