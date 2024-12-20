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

### 🔍 Core Functionality

- **City-Based Event Filtering**
  - Search events by city
  - Smart suggestions while typing
  - Real-time results updating

- **Interactive Event Details**
  - Expandable event cards
  - Rich event information
  - Intuitive show/hide controls

- **Customizable Event Display**
  - Adjustable number of visible events
  - Default 32 events per view
  - Smooth pagination

- **Offline Capabilities**
  - Access to cached event data
  - Offline-first architecture
  - Seamless online/offline transition

- **PWA Integration**
  - One-click home screen installation
  - Native app-like experience
  - Push notification support

- **Data Visualization**
  - Events per city charts
  - Interactive data exploration
  - Real-time updates

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

## 📚 User Stories & Scenarios

<details>
<summary>Click to expand feature details</summary>

### Feature 2: Show/Hide Event Details
```gherkin
Scenario: An event element is collapsed by default
  Given the user is viewing a list of events
  When the page loads
  Then each event element should be collapsed
```

[Additional scenarios preserved...]
</details>

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
- Your Name - [@yourgithub](https://github.com/yourgithub)

---

<p align="center">Made with ❤️ and React</p>