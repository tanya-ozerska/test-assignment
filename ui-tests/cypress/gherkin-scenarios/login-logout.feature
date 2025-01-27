Feature: Login and Logout functionality of portal

  Scenario: Successful login
    Given the user is on the login page
    When the user fills in the username and password
    And the user clicks the login button
    Then the user should be redirected to the dashboard page

  Scenario: Unsuccessful login with incorrect credentials
    Given the user is on the login page
    When the user fills in a non-existing username and password
    And the user clicks the login button
    Then the user should see the warning message 

  Scenario: Login page validation for empty fields
    Given the user is on the login page
    When the user leaves the username and password fields empty
    And the user clicks the login button
    Then the user should see the warning message 

  Scenario: Login page validation for invalid email
    Given the user is on the login page
    When the user fills in an invalid email
    And the user fills in the correct password
    And the user clicks the login button
    Then the user should see a message "Please enter a valid email"

  Scenario: Login page validation for password length
    Given the user is on the login page
    When the user fills in a valid username
    And the user fills in a password that is too short
    And the user clicks the login button
    Then the user should see a message "Password must be at least 8 characters long"

  Scenario: Logout from the dashboard
    Given the user is logged in and on the dashboard page
    When the user clicks on the admin options
    And the user clicks on the logout button in the drop-down
    Then the user should be redirected to the login page