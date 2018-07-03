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

    it('should post new todo to the backend', function () {
        // Serve the page
        cy.server();

        // Prepare a POST request
        cy.route({
            method: 'POST',
            url: '/api/todos',
            response: {id: 123, name: 'new todo', isComplete: false}
        }).as('save');

        // Call a custom command to load initial todos
        cy.seedAndVisit();

        // Enter a new todo
        cy.get('.new-todo')
            .type('new todo')
            .type('{enter}');

        // Wait network request to be finished
        cy.wait('@save');

        // Calculate the expected length of todos
        cy.get('.todo-list li')
            .should('have.length', 5);
    });

    it('should show an error message for a failed from subission', function () {
        const newTodo = "Test";
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500,
            response: {}
        }).as('save');

        cy.seedAndVisit();

        cy.get('.new-todo')
            .type(newTodo)
            .type('{enter}');

        cy.wait('@save');

        cy.get('.todo-list li').should('have.length', 4);
        cy.get('.error').should('be.visible');
    });

    it('should Delete an item', function () {
        cy.server();
        cy.route({
            method: 'DELETE',
            url: '/api/todos/*',
            response: {}
        }).as('delete');

        cy.seedAndVisit();

        cy.get('.todo-list li')
            .first()
            .find('.destroy')
            .invoke('show') // Make the hidden button appear
            .click();

        cy.wait('@delete');

        cy.get('.todo-list li')
            .should('have.length', 3);
    });

    it('Using alias for the DOM element', function () {
        cy.server();
        cy.route({
            method: 'DELETE',
            url: '/api/todos/*',
            response: {}
        }).as('delete');

        cy.seedAndVisit();

        cy.get('.todo-list li')
            .as('list');

        cy.get('@list')
            .first()
            .find('.destroy')
            .invoke('show') // Make the hidden button appear
            .click();

        cy.wait('@delete');

        cy.get('@list')
            .should('have.length', 3);
    });
});