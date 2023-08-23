describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'usuario',
      name: 'nombre',
      password: 'passw'
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

  describe('when logged in', () => {
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

    it('a blog can be liked', () => {
      cy.createBlog({title: 'valid title', author: 'valid author', url: 'valid url'})
      cy.contains('view').first().click()
      cy.get('.likeCounter').first().should('contain', 0)
      cy.get('.likeButton').first().click()
      cy.get('.likeCounter').first().should('contain', 1)
    })
    
    it('a blog can be deleted by the user that owns it', () => {
      cy.createBlog({title: 'valid title', author: 'valid author', url: 'valid url'})
      cy.contains('view').first().click()
      cy.contains('remove').first().click()

      cy.contains('valid title').should('not.exist')
      cy.contains('valid author').should('not.exist')
      cy.contains('view').should('not.exist')
    })

    it('a blog cannot be deleted by other user', () => {
      cy.createBlog({title: 'valid title', author: 'valid author', url: 'valid url'})  
      cy.contains('log out').click()
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'patricio',
        name: 'patricio',
        password: 'siup'
      })
      cy.login({username: 'patricio', password: 'siup'})
      cy.contains('view').first().click()
      cy.contains('remove').first().click()
      cy.contains('this blog isnt yours')
      cy.contains('valid title')
      cy.contains('valid author')
      cy.contains('valid url')
    })

    it.only('blogs are sorted by most likes', () => {
      cy.createBlog({title: 'second most likes', author: 'second liked author', url: 'second liked url'})
      cy.createBlog({title: 'most likes', author: 'most liked author', url: 'most liked url'})
      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.likeButton').eq(1).click()
      cy.get('.blog').eq(0).should('contain', 'most likes')
      cy.get('.blog').eq(1).should('contain', 'second most likes')
    }) 
  })
})