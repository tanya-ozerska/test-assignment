import './commands';
import LoginPage from '../pages/loginPage';

beforeEach(() => {
    cy.session('accept-cookies-session', () => {
        const loginPage = new LoginPage();
        loginPage.goTo();
        
        loginPage.cookiesBanner.should('exist').then((banner) => {
            if (banner.is(':visible')) {
                cy.wrap(banner).within(() => {
                    cy.get('button').each(($btn) => {
                        const buttonText = $btn.text().trim();
                        if (buttonText === 'Accept') {
                            cy.wrap($btn).click(); 
                        } else if (buttonText === 'Save') {
                            cy.wrap($btn).click();
                        }
                    });
                });
            } else {
                cy.log('Cookies banner not visible, continuing with test...');
            }
        });
    });
});
