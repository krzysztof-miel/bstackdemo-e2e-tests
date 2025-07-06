export class LogiPage {
    constructor (){
        this.usernameInput = '#react-select-2-input';
        this.passwordInput = "#react-select-3-input";
        this.loginButton = "#login-btn";
    }

    loginViaUI(username, password) {
        cy.get('#react-select-2-input').type(username, { force: true }).type('{enter}');
        cy.get("#react-select-3-input").type(password, { force: true }).type('{enter}');
        cy.get(this.loginButton).click();
    }
}