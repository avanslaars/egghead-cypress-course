describe('List Item Behavior', () => {
  it('Deletes an item', () => {
    cy.server()
    cy
      .route({
        method: 'DELETE',
        url: '/api/todos/*',
        response: {}
      })
      .as('delete')

    cy.seedAndVisit()

    cy.get('.todo-list li').as('list')

    cy
      .get('@list')
      .first()
      .find('.destroy')
      .invoke('show')
      .click()

    cy.wait('@delete')

    cy.get('@list').should('have.length', 3)
  })

  it.only('Marks an item complete', () => {
    cy.server()
    cy.seedAndVisit()
    cy.fixture('todos').then(todos => {
      const target = todos[0]
      cy
        .route(
          'PUT',
          `/api/todos/${target.id}`,
          Cypress._.merge(target, { isComplete: true })
        )
        .as('update')
    })

    cy
      .get('.todo-list li')
      .first()
      .as('first-todo')

    cy
      .get('@first-todo')
      .find('.toggle')
      .as('checkbox')

    cy.get('@checkbox').click()

    cy.wait('@update')

    cy.get('@checkbox').should('be.checked')

    cy.get('@first-todo').should('have.class', 'completed')

    cy.get('.todo-count').should('contain', 3)
  })
})
