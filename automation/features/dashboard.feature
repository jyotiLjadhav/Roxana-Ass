Feature: Dashboard

  Scenario: Dashboard loads summary cards and chart
    Given I am on the dashboard page
    Then the dashboard heading should be visible
    And the summary cards should be visible
    And the chart should be visible
