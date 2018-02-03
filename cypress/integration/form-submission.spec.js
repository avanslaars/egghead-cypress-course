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
})
