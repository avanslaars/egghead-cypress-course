describe('Form Input', () => {
  it('Focuses the input on load', () => {
    cy.visit('/')
    cy.focused().should('have.class', 'new-todo')
  })
})
