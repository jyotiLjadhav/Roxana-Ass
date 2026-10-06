Feature: Reports

  Scenario: Report filters and updates with user input
    Given I am on the reports page
    When I apply the status filter Active
    And I search for customer name Priya
    Then the filtered report should remain visible
