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

    it('should have four initial todos', function () {
        cy.server();
        /*
        cy.fixture('todos')
            .then(todos => {
                cy.route('GET', '/api/todos', todos);
            });
            */
        cy.route('GET', '/api/todos', 'fixture:todos');
        cy.visit('/');

        cy.get('.todo-list > li')
            .should('have.length', 4);
    });

    it('should have four initial todos and waiting loaded', function () {
        cy.server();
        cy.route('GET', '/api/todos', 'fixture:todos')
            .as('loadingTodos');
        cy.visit('/');
        cy.wait('@loadingTodos');

        cy.get('.todo-list > li')
            .should('have.length', 4);
    });

    it('should use Cypress commands to simplify the code: using default value', function () {
        cy.seedAndVisit();
        cy.get('.todo-list > li')
            .should('have.length', 4);
    });

    it('should use Cypress commands to simplify the code: using defined value', function () {
        cy.seedAndVisit([]);
        cy.get('.todo-list > li')
            .should('have.length', 0);
    });
});