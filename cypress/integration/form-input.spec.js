describe('Form input', function () {

    beforeEach(() => {
        cy.visit('/');
    });

    it('should has input filed auto focused when page loaded', function () {
        cy.focused()
            .should('have.class', 'new-todo')
            .and('have.attr', 'placeholder', 'What needs to be done?')
            .and('be.empty');
    });

    it('should type new todo into the input field', function () {
        const typedText = 'New todo';
        cy.get('.new-todo')
            .type(typedText)
            .should('have.value', typedText);
    });
});
