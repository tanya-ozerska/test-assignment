import DashBoardPage from '../pages/dashboardPage';
import LoginPage from '../pages/loginPage';
import '../support/commands';

const loginPage = new LoginPage();
const dashBoardPage = new DashBoardPage();
const randomUsername = loginPage.generateRandomEmail();
const randomPassword = loginPage.generateRandomPassword();

describe('Login functionality', () => {
  beforeEach(() => {
    loginPage.goTo();
  });

  it('should login successfully', () => {
    loginPage.fillLoginForm(Cypress.env('UI_USERNAME'), decodeURIComponent(Cypress.env('UI_PASSWORD')));
    loginPage.buttonLogin.click();
    cy.url().should('include', '/account/dashboard');
  });

  it('should show an error for invalid login credentials', () => {
    loginPage.fillLoginForm(randomUsername, randomPassword);
    loginPage.buttonLogin.click();
    loginPage.checkMessage('You have entered an incorrect username or password.');
    cy.url().should('not.include', '/account/dashboard');
  });

  it('should show an error if the username or password is empty', () => {
    loginPage.buttonLogin.click();
    cy.url().should('not.include', '/account/dashboard');
  });

  it('should show an error for invalid email', () => {
    loginPage.fillLoginForm(randomUsername, decodeURIComponent(Cypress.env('UI_PASSWORD')));
    loginPage.buttonLogin.click();
    loginPage.checkMessage('You have entered an incorrect username or password.');
    cy.url().should('not.include', '/account/dashboard');
  });

  it('should show an error for invalid password', () => {
    loginPage.fillLoginForm(Cypress.env('UI_USERNAME'), randomPassword);
    loginPage.buttonLogin.click();
    loginPage.checkMessage('You have entered an incorrect username or password.');
    cy.url().should('not.include', '/account/dashboard');
  });
});

describe('Logout functionality', () => {
  beforeEach(() => {
    cy.login(Cypress.env('UI_USERNAME'), decodeURIComponent(Cypress.env('UI_PASSWORD'))); 
  });

  it('should log out successfully', () => {
    const userName = dashBoardPage.formatEmailToUserName();
    dashBoardPage.buttonAdmin.should('be.visible', {timeout: 500});
    dashBoardPage.buttonAdmin.should('have.attr', 'title', `${userName}`);
    dashBoardPage.buttonAdmin.click();
    dashBoardPage.buttonLogout.should('be.visible');
    dashBoardPage.buttonLogout.click();
    cy.url().should('include', '/login');
    loginPage.checkMessage('You have successfully logged out.');
  });
});
