describe('Form submission', () => {
  it('Adds a new todo item', () => {
    const newTodo = 'Buy Milk'
    cy.server()
    cy
      .route({
        method: 'POST',
        url: '/api/todos',
        response: { id: 123, name: newTodo, isComplete: false }
      })
      .as('save')

    cy.seedAndVisit()

    cy
      .get('.new-todo')
      .type(newTodo)
      .type('{enter}')

    cy.wait('@save')

    cy.get('.todo-list li').should('have.length', 5)
  })

  it('Shows an error message for a failed form submission', () => {
    const newTodo = 'Test'
    cy.server()
    cy
      .route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: {}
      })
      .as('save')

    cy.seedAndVisit()

    cy
      .get('.new-todo')
      .type(newTodo)
      .type('{enter}')

    cy.wait('@save')

    cy.get('.todo-list li').should('have.length', 4)

    cy.get('.error').should('be.visible')
  })
})
