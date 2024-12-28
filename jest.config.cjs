module.exports = {
    // Tell Jest to use jsdom environment which simulates a browser environment
    testEnvironment: 'jest-environment-jsdom',

    // Transform files ending in .js or .jsx using babel
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },

    // Tell Jest how to handle non-JavaScript files
    moduleNameMapper: {
        // Treat CSS imports as empty modules (we don't need to test CSS)
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },

    // File extensions Jest should look for
    moduleFileExtensions: ['js', 'jsx'],

    // Files to run before tests
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};