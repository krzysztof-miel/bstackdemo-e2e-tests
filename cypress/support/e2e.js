import './commands';
import 'cypress-mochawesome-reporter/register';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on uncaught exceptions
  return false;
});