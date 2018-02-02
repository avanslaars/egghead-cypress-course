describe('Form Input', () => {
  beforeEach(() => {
    cy.seedAndVisit([])
  })

  it('Focuses the input on load', () => {
    cy.focused().should('have.class', 'new-todo')
  })

  it('Accepts input', () => {
    const typedText = 'New todo'
    cy
      .get('.new-todo')
      .type(typedText)
      .should('have.value', typedText)
  })
})
