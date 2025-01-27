class DashBoardPage {
    get buttonAdmin() {
        return cy.get('header .admin-options .admin-dropdown')
    }

    get buttonLogout() {
        return cy.get('.admin-dropdown button')
    }
    
    goTo() {
        cy.visit(`${Cypress.env('UI_BASE_URL')}/account/dashboard`);
    }

    formatEmailToUserName() {
        return Cypress.env('UI_USERNAME').split('@')[0].replace(/\./g, ' ');
    }
}

export default DashBoardPage;
