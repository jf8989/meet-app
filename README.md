# 🎯 Meet App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Test Coverage](https://img.shields.io/badge/coverage-90%25%2B-brightgreen)
![React Version](https://img.shields.io/badge/react-18.2.0-blue)
![PWA](https://img.shields.io/badge/PWA-ready-orange)

## 📖 Overview

Meet App is a sophisticated progressive web application (PWA) built with React and serverless architecture. It empowers users to discover and explore events in their cities of interest, offering a seamless experience across all devices - even offline!

### 🌟 Why Meet App?

- **Serverless Architecture**: Zero backend maintenance, infinite scalability
- **Progressive Web App**: Lightning-fast loading, offline support
- **Test-Driven Development**: Ensuring robust, reliable code
- **Data Visualization**: Intuitive charts for better event insights
- **Cross-Platform**: Works seamlessly on all modern devices

## ✨ Key Features

- **Filter Events by City**: Search for events in specific cities
- **Show/Hide Event Details**: Expand and collapse event details
- **Specify Number of Events**: Control the number of events displayed
- **Use the App When Offline**: View cached data when offline
- **Add an App Shortcut to the Home Screen**: Install the app as a shortcut
- **Display Charts Visualizing Event Details**: See event distribution charts

## 🎭 User Stories

### Feature 2: Show/Hide Event Details
- As a user, I should be able to expand event details so that I can see more information about an event
- As a user, I should be able to collapse event details so that I can focus on other events

### Feature 3: Specify Number of Events
- As a user, I should be able to specify the number of events displayed so that I can control the amount of information I see
- As a user, I want to see 32 events by default if I don't specify a number, so that I always see a reasonable number of events

### Feature 4: Use the App When Offline
- As a user, I should be able to use cached data when offline so that I can view events even without an internet connection
- As a user, I should see an error if I try to change search settings offline so that I know those actions require internet access

### Feature 5: Add an App Shortcut to the Home Screen
- As a user, I should be able to add the app as a shortcut to my home screen so that I can access it quickly

### Feature 6: Display Charts Visualizing Event Details
- As a user, I should be able to view a chart showing the number of upcoming events in each city so that I can understand event distribution at a glance

## 🎬 Scenarios

### Feature 2: Show/Hide Event Details

```gherkin
Scenario: An event element is collapsed by default
  Given the user is viewing a list of events
  When the page loads
  Then each event element should be collapsed

Scenario: User can expand an event to see details
  Given the user is viewing a list of events
  When they click on the "Details" button for an event
  Then the details for that event should be displayed

Scenario: User can collapse an event to hide details
  Given the user has expanded an event
  When they click on the "Collapse" button
  Then the details for that event should be hidden
```

### Feature 3: Specify Number of Events

```gherkin
Scenario: Default number of events displayed is 32
  Given the user hasn't specified the number of events to display
  When the app displays the events
  Then 32 events should be shown by default

Scenario: User can change the number of events displayed
  Given the user is viewing events
  When they set the number of events to display to 10
  Then only 10 events should be shown
```

### Feature 4: Use the App When Offline

```gherkin
Scenario: Show cached data when offline
  Given the user has previously viewed events
  And their device is offline
  When they open the app
  Then cached event data should be displayed

Scenario: Show error when user changes search settings offline
  Given the user is offline
  When they try to change the search settings
  Then an error message should be displayed
```

### Feature 5: Add an App Shortcut to the Home Screen

```gherkin
Scenario: User can install the app as a shortcut
  Given the user is on a supported browser
  When they click "Add to Home Screen"
  Then the app should be installed as a shortcut on their device
```

### Feature 6: Display Charts Visualizing Event Details

```gherkin
Scenario: Show a chart with the number of upcoming events in each city
  Given the user is viewing events from multiple cities
  When the app loads the data
  Then a chart showing the number of events in each city should be displayed
```

## 🛠️ Technical Stack

- **Frontend**: React 18
- **Backend**: AWS Lambda
- **Authentication**: Google OAuth 2.0
- **API**: Google Calendar API
- **Testing**: Jest & Testing Library
- **Deployment**: GitHub Pages
- **Performance Monitoring**: Lighthouse

## 📱 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meet-app.git
   ```

2. Install dependencies:
   ```bash
   cd meet-app
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

Our TDD approach ensures comprehensive test coverage:

```bash
# Run all tests
npm test

# Check test coverage
npm run test:coverage
```

## 🚀 Deployment

The app is deployed on multiple platforms:
- **Production**: [Vercel Link](https://your-app.vercel.app)
- **Development**: [GitHub Pages](https://yourusername.github.io/meet-app)

## 📈 Performance

- Lighthouse Score: 95+
- Test Coverage: >90%
- PWA Compliance: ✅
- Cross-browser Support: Chrome, Firefox, Safari, Edge, Opera, IE11

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Calendar API
- React Community
- AWS Lambda Team
- All our amazing contributors

## 📧 Contact

- Project Link: [https://github.com/yourusername/meet-app](https://github.com/yourusername/meet-app)
- Your Name - [@yourgithub](https://github.com/jf8989)

---

<p align="center">Made with ❤️ and React</p>
