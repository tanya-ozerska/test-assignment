class LoginPage {
    get cookiesBanner() {
        return cy.get('[aria-label="Cookie Consent Banner"]')
    }

    get fieldUserName() {
        return cy.get('#inputEmail');
    }

    get fieldPassword() {
        return cy.get('#inputPassword');
    }

    get buttonLogin() {
        return cy.get('.login-btn');
    }

    get formLogin() {
        return cy.get('.login-container .form')
    }

    goTo() {
        cy.visit(`${Cypress.env('UI_BASE_URL')}/login`);
    }

    acceptCookies() {
        this.cookiesBanner
            .should('be.visible')
            .within(() => {
                cy.get('button').contains('Save').click();
                this.cookiesBanner.should('not.be.visible');
            });
    }

    fillLoginForm(username, password) {
        this.fieldUserName.clear().type(username);
        this.fieldPassword.clear().type(password);
    }

    checkMessage(message) {
        this.formLogin
            .contains(message)
            .should('be.visible');
    }

    generateRandomEmail = () => {
        const randomString = Math.random().toString(36).substring(2, 15);
        return `${randomString}@testexample.com`;
    }

    generateRandomPassword = (length = 12) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }
}

export default LoginPage;
