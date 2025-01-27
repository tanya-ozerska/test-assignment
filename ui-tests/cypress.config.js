const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        supportFile: 'cypress/support/e2e.js',
        clearCookies: false,
        clearLocalStorage: false,
        reporter: 'json',
        screenshotOnRunFailure: true,
        screenshotFolder: 'cypress/screenshots',
        reporterOptions: {
            outputFile: 'cypress/results/output.json',
        }
    },
    env: {
        UI_BASE_URL: process.env.UI_BASE_URL,
        UI_USERNAME: process.env.UI_USERNAME,
        UI_PASSWORD: process.env.UI_PASSWORD,
    },
});
