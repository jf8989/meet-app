Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default
Given the user is viewing the event list
When the events are displayed
Then the event details should be collapsed

Scenario: User can expand an event to see details
Given the user is viewing the event list with collapsed events
When the user clicks on the "show details" button for an event
Then the event details should be displayed

Scenario: User can collapse an event to hide details
Given the user is viewing the event details
When the user clicks on the "hide details" button
Then the event details should be hidden