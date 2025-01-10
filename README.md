# Meet App

## Description
Meet App is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) approach. The application uses the Google Calendar API to fetch upcoming events.

## Key Features and User Stories

### Feature 1: Filter Events By City
As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city

### Feature 2: Show/Hide Event Details
As a user,
I should be able to show/hide event details
So that I can see more/less information about an event

### Feature 3: Specify Number of Events
As a user,
I should be able to specify the number of events I want to view
So that I can see more or fewer events in the list

### Feature 4: Use the App When Offline
As a user,
I should be able to use the app when offline
So that I can see the events I viewed last time I was online

### Feature 5: Add an App Shortcut to the Home Screen
As a user,
I should be able to add the app shortcut to my home screen
So that I can open the app faster

### Feature 6: Display Charts Visualizing Event Details
As a user,
I should be able to see a chart showing upcoming events in each city
So that I can know what events are organized in which city

## User Scenarios (Given-When-Then)

### Feature 2: Show/Hide Event Details
#### Scenario 1: An event element is collapsed by default
- Given: The user has opened the app
- When: The user views the event list
- Then: All event elements should be collapsed by default

#### Scenario 2: User can expand an event to see details
- Given: The user is viewing the event list
- When: The user clicks on "show details" button for an event
- Then: The event element should expand to show event details

#### Scenario 3: User can collapse an event to hide details
- Given: The user is viewing an expanded event element
- When: The user clicks on "hide details" button
- Then: The event element should collapse

### Feature 3: Specify Number of Events
#### Scenario 1: When user hasn't specified a number, 32 events are shown by default
- Given: The user hasn't specified a number of events
- When: The user views the events list
- Then: 32 events should be shown by default

#### Scenario 2: User can change the number of events displayed
- Given: The user is viewing the events list
- When: The user specifies a number of events to display
- Then: The specified number of events should be displayed

### Feature 4: Use the App When Offline
#### Scenario 1: Show cached data when there's no internet connection
- Given: The user has no internet connection
- When: The user opens the app
- Then: Cached data should be displayed

#### Scenario 2: Show error when user changes search settings (city, number of events)
- Given: The user has no internet connection
- When: The user changes the search settings (city, number of events)
- Then: An error message should be displayed

### Feature 5: Add an App Shortcut to the Home Screen
#### Scenario 1: User can install the meet app as a shortcut on their device home screen
- Given: The user wants to add the app to their home screen
- When: The user selects to add the app to their home screen
- Then: The app should be installed and appear as a shortcut

### Feature 6: Display Charts Visualizing Event Details
#### Scenario 1: Show a chart with the number of upcoming events in each city
- Given: The user wants to see events visualization
- When: The user views the events charts
- Then: A chart showing the number of events in each city should be displayed

## Technical Requirements
- React application
- Built using TDD technique
- Google Calendar API and OAuth2 authentication
- Serverless functions (AWS lambda)
- Responsive design
- PWA features including offline functionality
- Deployed on GitHub Pages
- Alert system using OOP
- Data visualization
- 90%+ test coverage
- Performance monitoring

## Getting Started
1. Clone this repository
2. Install dependencies using `npm install`
3. Start the development server using `npm run dev`
4. Run tests using `npm test`