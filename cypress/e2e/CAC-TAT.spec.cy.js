describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.viewport(410, 860)
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Hyago')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('hyagooc@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at diam tempor, consequat massa non, auctor odio. Fusce maximus et tortor a bibendum. Nam eu imperdiet mauris, quis consectetur ex. Aliquam finibus ex eu nisi bibendum, a rutrum tellus mollis. Donec vulputate, risus a lacinia rhoncus, sem elit tempor elit, id volutpat sem enim quis augue. Sed sodales libero quis est condimentum, quis luctus quam gravida. Morbi aliquet fringilla lacus eget egestas. Ut hendrerit magna vitae elit sollicitudin, sed rutrum nunc pulvinar. Nullam volutpat risus ac tempus molestie. In eu iaculis ligula. Donec facilisis ex at enim blandit elementum. Nulla at efficitur sem, at fermentum felis. Nullam luctus sollicitudin justo ut lacinia. Suspendisse a rutrum diam. Mauris at interdum turpis, sed ultrices lectus. Duis et mollis sapien, id ornare ante. Morbi risus justo, malesuada eget fermentum mollis, ornare non eros. Morbi fringilla sapien sit amet lorem dictum cursus quis quis augue. Sed pretium tincidunt diam vel mattis. Suspendisse potenti. Pellentesque sit amet cursus est. Vivamus vel ante enim. Ut tristique tempus enim, in congue odio ultricies eu. Duis eu tortor molestie ante tempor pretium. Nulla nec varius velit, sit amet bibendum nulla. Cras eleifend dictum elit. Cras maximus lacus eu ex commodo, sed pellentesque nulla posuere. Curabitur eget dolor eleifend, congue elit in, vulputate lorem. Suspendisse dapibus consequat magna, sed consequat ante congue non. Etiam at nulla ut purus suscipit dignissim. Quisque metus libero, maximus a enim vitae, vehicula malesuada augue. Sed turpis magna, posuere non urna ut, semper posuere ipsum. Vestibulum sit amet nisi in lorem pellentesque mollis. Suspendisse pretium cursus augue, at bibendum justo accumsan vitae. Sed metus magna, tincidunt a urna quis, euismod consectetur est. Etiam lacus quam, semper vitae mattis auctor, venenatis vel magna. Aliquam erat volutpat. Donec quis volutpat dui. Integer ultricies tempor enim, in tincidunt massa. Nullam ac aliquet nisl, quis pharetra augue. Ut ac justo vestibulum, euismod libero sed, fermentum dolor. Praesent lacinia turpis sed ligula facilisis iaculis. Nam et lacus tortor. Nullam tempor egestas felis non euismod. Quisque ultricies elit ac velit semper eleifend. Cras fermentum, tellus nec lacinia rhoncus, nisl erat ultrices ex, ac suscipit lectus urna ac urna.', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Hyago')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('emailinvalido#email,br')
    cy.get('#open-text-area').type('teste de email')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Campo de telefone permanece vazio ao preencher com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdefgh')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Hyago')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('hyagooc@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste de telefone obrigatório')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Hyago')
      .should('have.value', 'Hyago')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Oliveira')
      .should('have.value', 'Oliveira')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('hyagooc@gmail.com')
      .should('have.value', 'hyagooc@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('5579981007521')
      .should('have.value', '5579981007521')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.selecionaProdutoListaSuspensa('YouTube')
    cy.get('#product').should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu texto', () => {
    cy.selecionaProdutoListaSuspensa('mentoria')
    cy.get('#product').should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu texto', () => {
    cy.selecionaProdutoListaSuspensa(1)
    cy.get('#product').should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
    cy.get('input[type="radio"][value="feedback"]').should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(($radio) => {
        cy.wrap($radio).check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should((upload) => {
        expect(upload[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((upload) => {
        expect(upload[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('example')
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@example', { action: 'drag-drop' })
      .should((upload) => {
        expect(upload[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
  })

  it('Testa a página da política de privacidade de forma independente', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
  })
})