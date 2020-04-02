import { And } from 'cypress-cucumber-preprocessor/steps';

// Page Selectors
const budgetTable = '.opmhI';
const workingBalanceContainer = '._3eF2Q';
const tableFooter = '._3R7ot';
const totalInflow = ':nth-child(1) > ._3S2Fs > .sG1fB';
const totalOutflow = ':nth-child(3) > ._3S2Fs > .sG1fB';
const workingBalance = ':nth-child(5) > ._3S2Fs > .sG1fB';

And('I should see Budget Table', () => {
  cy.get(budgetTable).should('be.visible');
});

And('I should see Working Balance container', () => {
  cy.get(workingBalanceContainer).should('be.visible');
});

When('I add a new {string} entry', category => {
  if (category == 'expense') {
    // Select category
    cy.get('select').select('Taxes');
    // Add description
    cy.get(tableFooter)
      .find('input[type=text]')
      .type('Taxes for test');
  } else {
    // Select category
    cy.get('select').select('Income');
    // Add description
    cy.get(tableFooter)
      .find('input[type=text]')
      .type('Income for test');
  }
  // Add value
  cy.get(tableFooter)
    .find('input[type=number]')
    .type('100');
  // Click on Add button
  cy.get('.submit').click();
});

Then('I should see the new expense added to the Budget table', () => {
  cy.get(budgetTable)
    .contains('Taxes for test')
    .should('be.visible');
});

Then('I should see the new income added to the Budget table', () => {
  cy.get(budgetTable)
    .contains('Income for test')
    .should('be.visible');
});

And('I should see the Working Balance and Total Outflow amount updated', () => {
  // For the purpose of this test, I'm using hardcoded values for Total Outflow and Working Balance.
  // Since it's a small suite of test, we can rely that these values won't change.
  cy.get(totalOutflow).should('have.text', '$4,688.07');
  cy.get(workingBalance).should('have.text', '$2,113.93');
});

//This test is intended to fail. The expected working balance is wrong
And('I should see the Working Balance and Total Inflow amount updated', () => {
  // For the purpose of this test, I'm using hardcoded values for Total Inflow and Working Balance.
  // Since it's a small suite of test, we can rely that these values won't change.
  cy.get(totalInflow).should('have.text', '$6,902.00');
  cy.get(workingBalance).should('have.text', '$2,113.93');
});

When('I add a new expense entry with {string} value', operator => {
  // Select category
  cy.get('select').select('Groceries');
  // Add description
  cy.get(tableFooter)
    .find('input[type=text]')
    .type('Groceries for test');

  let value;

  if (operator == 'negative') {
    value = -250;
  } else {
    value = 250;
  }
  // Add value
  cy.get(tableFooter)
    .find('input[type=number]')
    .type(value);

  // Click on Add button
  cy.get('.submit').click();
});

Then('I should see a negative value for that entry in the Budget table', () => {
  cy.get(budgetTable)
    .find('tbody')
    .find('tr')
    .last()
    .should('contain.text', '-$250.00');
});
