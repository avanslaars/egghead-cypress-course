describe('App initialization', () => {
  it('Displays todos from API on load', () => {
    cy.server()
    cy.route('GET', '/api/todos', [
      { id: 1, name: 'One', isComplete: false },
      { id: 2, name: 'Two', isComplete: false },
      { id: 3, name: 'Three', isComplete: false },
      { id: 4, name: 'Four', isComplete: false }
    ])
    cy.visit('/')
    cy.get('.todo-list li').should('have.length', 4)
  })
})
