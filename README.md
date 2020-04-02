# Modus Create

## Test Plan

### 1. Application Under Test

The application under test is a simple budget management application called Budgeting Application. It tracks inflow and outflow, shows remaining budget, and interesting reports with charts. As such, it offers more features than the usual Todo App.

Budgeting app is a showcase project that demonstrates important decisions in architecture and development of a modern React application.

### 2. Scope

This test plan aims to test and validate the Budgeting Application through functional tests that will simulate the user behavior. To be able to achieve the goal of the test plan, end-to-end tests will be described and implemented in the test automation.

### 3. Out of scope

Other types of tests like unit tests, performance tests and integration tests are out of scope.

### 4. Test Scenarios

#### 4.1 Positive Test Scenarios

##### Scenario 1: Verify initial page elements on Budget Page

Given I navigate to Budget page
Then I should see buttons "Budget" and "Reports" at the top of the page
And I should see Budget Table
And I should see Working Balance container

##### Scenario 2: Verify that user can add a new expense entry

Given I navigate to Budget page
When I add a new expense entry
Then I should see the new expense added to the Budget table
And I should see the Working Balance and Total Outflow amount updated

##### Scenario 3: Verify each new expense added will automatically be a negative value

Given I navigate to Budget page
When I add a new expense entry with negative value
Then I should see a negative value for that entry in the Budget table
When I add a new expense entry with positive value
Then I should see a negative value for that entry in the Budget table

##### Scenario 4: Verify that user can add a new income entry

Given I navigate to Budget page
When I add a new income entry
Then I should see the new income added to the Budget table
And I should see the Working Balance and Total Inflow amount updated

##### Scenario 5: Verify each new income added will automatically be a positive value

Given I navigate to Budget page
When I add a new income entry with negative value
Then I should see a positive value for that entry in the Budget table
When I add a new income entry with positive value
Then I should see a positive value for that entry in the Budget table

##### Scenario 6: Verify that the calculation of the Total Inflow, Total Outflow and Working Balance are correct

Given I navigate to Budget page
When I add a new income entry
And I add a new expense entry
Then I should see the Total Inflow as the sum of all incomes on the Budget table
And I should see the Total Outflow as the sum of all expenses on the Budget table
And I should see the Working Balance as the result of Total Inflow minus Total Outflow

##### Scenario 7: Delete an existing entry

Given I navigate to Budget page
When I add a new income entry
Then I should see the new income added to the Budget table
When I select any entry on the Budget table
And I delete the selected entry
Then I should not see that entry on the Budget table

##### Scenario 8: Update an existing entry

Given I navigate to Budget page
When I add a new income entry
Then I should see the new income added to the Budget table
When I select any entry on the Budget table
And I update the description on the selected entry
Then I should see that entry with updated description on the Budget table

##### Scenario 9: Verify initial page elements on Reports Page

Given I navigate to Reports page
Then I should see buttons "Budget" and "Reports" at the top of the page
And I should see "Inflow vs Outflow" and "Spending by Category" tabs
When I select "Inflow vs Outflow" tab
Then I should see a graph
When I select "Spending by Category" tab
Then I should see a graph

##### Scenario 10: Verify that "Inflow vs Outflow" graph is displaying the correct values and expenses distribution

Given I navigate to Reports page
When I select "Inflow vs Outflow" tab
Then I should see a graph with "Inflow" and "Outflow" columns
And the "Inflow" column should have the same amount as the Total Inflow in the Budget page
And the "Outflow" column should have the same amount as the Total Outflow in the Budget page
And the "Categories" listed should be the same as the ones in the Budget page

##### Scenario 11: Verify that "Spending by Category" graph is displaying the correct values and expenses distribution

Given I navigate to Reports page
When I select "Spending by Category" tab
Then I should see a graph with expenses categories
And I should see that each category have the same amount listed in the Budget page

#### 4.2 Negative Test Scenarios

##### Scenario 1: Verify that alphanumeric values cannot be added into value field

Given I navigate to Budget page
When I try to add a new income entry with alphanumeric values on "value" field
Then I should not be able to add this entry

##### Scenario 2: Verify that user can't add a new entry with empty value

Given I navigate to Budget page
When I try to add a new income entry with "value" field empty
Then I should not be able to add this entry

##### Scenario 3: Verify that user can't add a new income with negative value

Given I navigate to Budget page
When I try to add a new income entry with a negative number on "value" field
Then I should see the new income added to the Budget table with positive value

##### Scenario 4: Verify that user can't add a new expense with positive value

Given I navigate to Budget page
When I try to add a new expense entry with a positive number on "value" field
Then I should see the new expense added to the Budget table with negative value

##### Scenario 5: Verify that user can't edit the Total Inflow, Total Outflow and Working Balance fields

Given I navigate to Budget page
When I try to edit the fields "Total Inflow", "Total Outflow" and "Working Balance"
Then I should not be able to change the values on it

## Javascript Test Automation

### 1. Cypress test automation

The test automation suite was developed with Cypress. A total of 4 test cases were implemented.

All the Cypress files are inside folder `./e2e/cypress`

The feature file with all the test cases can be found in: `./integration/BudgetPage.feature`

The step definitions can be found in: `./support/step_definition/BudgetPage.js` and `./support/step_definition/Navigation.js`

The following tests are passing:

```
Scenario: Verify initial page elements on Budget Page
Scenario: Verify that user can add a new expense entry
Scenario: Verify each new expense added will automatically be a negative value
```

And the following test case is intended to fail, as required in the task description.

```
Scenario: Verify that user can add a new income entry
```

### 2. Cucumber

As part of the task description, this test automation was developed with [Cucumber](https://cucumber.io/). Cucumber is a software tool that supports behavior-driven development (BDD).

In order to achieve that, this repo uses [cypress-cucumber-processor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor), which is a plugin for Cypress.

### 3. Installation and Execution

1.  Install all dependencies:
    `npm install`

2.  Build the app:
    `npm run build`

3.  Serve the app on [localhost:8000](http://localhost:8000)
    `npm run prod`

4.  Use another terminal to run Cypress test automation.

    - To open Cypress Desktop App:
    `npm run test:e2e`

    - To run Cypress tests in Chrome:
    `npm run test:e2e:chrome`

    - To run Cypress tests in Firefox:
    `npm run test:e2e:firefox`

    - To run Cypress in headless mode:
    `npm run test:e2e:headless`

## Service Workers

Service workers are enabled only when serving static files, not through webpack-dev-server. Here's how you can test service worker functionality:

1.  Run `npm run build` to build the app
2.  Run `npm run prod` to serve the app on [localhost:8000](http://localhost:8000)

## Execute E2E tests

- To open Cypress Desktop App:
  `npm run test:e2e`

- To run Cypress tests in Chrome:
  `npm run test:e2e:chrome`

- To run Cypress tests in Firefox:
  `npm run test:e2e:firefox`

- To run Cypress in headless mode:
  `npm run test:e2e:headless`
