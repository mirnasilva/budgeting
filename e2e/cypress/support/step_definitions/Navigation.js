import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('I navigate to Budget page', () => {
  cy.visit('/budget');
});

Then('I should see buttons "Budget" and "Reports" at the top of the page', () => {
  cy.get('._1ZQm-')
    .as('budgetBtn')
    .should('have.attr', 'href')
    .and('include', 'budget');

  cy.get('._3k5Wa')
    .contains('Reports')
    .as('ReportsBtn')
    .should('be.visible');
});
