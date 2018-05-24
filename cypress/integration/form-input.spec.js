describe('Form input', function () {
    it('should visit thh app', function () {
        cy.visit('/');
    });

    it('should has input filed auto focused when page loaded', function () {
        cy.visit('/');
        cy.focused()
            .should('have.class', 'new-todo')
            .and('have.attr', 'placeholder', 'What needs to be done?')
            .and('be.empty');
    });
});

