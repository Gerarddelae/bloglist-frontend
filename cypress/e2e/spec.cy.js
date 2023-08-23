describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //cy.login({ username: 'patricio', password: 'siu'})
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: "usuario",
      name: "nombre",
      password: "passw"
    })
    cy.visit('http://localhost:5173/')
  })

  it('login form is shown', () => {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    it('succeds with correct credentials', () => {
      cy.get('#username').type('usuario')
      cy.get('#password').type('passw')
      cy.get('#login-button').click()

      cy.contains('usuario logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('usuario')
      cy.get('#password').type('fail')
      cy.get('#login-button').click()

      cy.get('#error:first').should('include.text', 'Wrong credentials')
      .should('have.css', 'color')
      .and('eq', 'rgb(255, 0, 0)')
    })
  })

  describe.only('when logged in', () => {
    beforeEach(function() {
      cy.login({username: 'usuario', password: 'passw'})
    })

    it('A blog can be created', () => {
      cy.get('#toggleBlogForm').click()
      cy.get('#title').type('valid title')
      cy.get('#author').type('valid author')
      cy.get('#url').type('valid url')

      cy.get('#submitBlog').click()

      cy.contains('valid title')
      cy.contains('valid author')
    })
  })

})