import LoginPage from '../pages/loginPage';

Cypress.Commands.add('login', (username, password) => {
  const loginPage = new LoginPage();
  loginPage.goTo();
  loginPage.fillLoginForm(username, password);
  loginPage.buttonLogin.click();
});