Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
 cy.get('#firstName').type('Hyago')
 cy.get('#lastName').type('Oliveira')
 cy.get('#email').type('hyagooc@gmail.com')
 cy.get('#phone').type('123123123')
 cy.get('#open-text-area').type('teste')
 cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('selecionaProdutoListaSuspensa', (productOrId) => {
 cy.get('#product').select(productOrId)
})


