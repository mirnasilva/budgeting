# Date: 04/01/2020
# QA responsible: Mirna Baeta

Feature: Budget Page

  This feature allows adding, updating and deleting expenses and incomes entries in the Budget table.

Scenario: Verify initial page elements on Budget Page
Given I navigate to Budget page
Then I should see buttons "Budget" and "Reports" at the top of the page
And I should see Budget Table
And I should see Working Balance container

Scenario: Verify that user can add a new expense entry
Given I navigate to Budget page
When I add a new "expense" entry
Then I should see the new expense added to the Budget table
And I should see the Working Balance and Total Outflow amount updated

Scenario: Verify each new expense added will automatically be a negative value
Given I navigate to Budget page
When I add a new expense entry with "negative" value
Then I should see a negative value for that entry in the Budget table
When I add a new expense entry with "positive" value
Then I should see a negative value for that entry in the Budget table

# NOTE: This test is intended to fail in the last step. 
# The expected working balance is wrong
@failing-test
Scenario: Verify that user can add a new income entry
Given I navigate to Budget page
When I add a new "income" entry
Then I should see the new income added to the Budget table
And I should see the Working Balance and Total Inflow amount updated