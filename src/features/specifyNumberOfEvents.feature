Feature: Specify Number of Events

Scenario: When user hasn't specified a number, 32 events are shown by default
Given the user has not specified a number of events
When the user views the events list
Then 32 events should be shown by default

Scenario: User can change the number of events displayed
Given the user is viewing the events list
When the user specifies a new number of events
Then the number of events displayed should match the user's input