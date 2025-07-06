Cypress.Commands.add('loginProgrammatically', (username) => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.sessionStorage.setItem('username', username);
      }
    });    

    cy.window().should((win) => {
      expect(win.sessionStorage.getItem('username')).to.equal('demouser')
    });

    cy.get('#signin').should('have.text', 'Logout');
})