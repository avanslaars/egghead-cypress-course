describe('App initialization', () => {
  it('Displays todos from API on load', () => {
    cy.server()
    cy.route('GET', '/api/todos', 'fixture:todos').as('load')

    cy.visit('/')

    cy.wait('@load')

    cy.get('.todo-list li').should('have.length', 4)
  })
})
