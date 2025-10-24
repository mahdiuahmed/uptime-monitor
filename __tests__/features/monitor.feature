Feature: Uptime Monitor Dashboard

  As a logged-in user
  I want to load my monitoring checks
  So that I can see my website statuses

  Scenario: User sees existing checks
    Given I am an authenticated user
    When I fetch my dashboard data
    Then I should see at least 1 website check in the list
