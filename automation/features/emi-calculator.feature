Feature: EMI Calculator

  Scenario: Calculate EMI for a home loan
    Given I am on the EMI calculator page
    When I enter a loan amount of 2500000
    And I enter an interest rate of 10
    And I enter a tenure of 10 years
    And I click the calculate button
    Then the displayed EMI should match the independently calculated EMI
    And the EMI chart should be visible
    And the chart values should be greater than zero

  Scenario: Calculate EMI for a business loan
    Given I am on the EMI calculator page
    When I enter a loan amount of 5000000
    And I enter an interest rate of 7.5
    And I enter a tenure of 15 years
    And I click the calculate button
    Then the displayed EMI should match the independently calculated EMI
