// src/api.js
import mockData from "./mock-data/mock-events";

/**
 * Extracts locations from events array
 */
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

/**
 * Check if token is valid
 */
export const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

/**
 * Get access token from local storage or URL
 */
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        // If no token or invalid token, clean up and get a new one
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (!code) {
            // If no code in URL, redirect to auth URL
            const response = await fetch(
                "https://rec0ldppe5.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authUrl } = result;
            window.location.href = authUrl;
            return null;
        }

        // Exchange code for token
        return getTokenAndEvents(code);
    }
    return accessToken;
};

/**
 * Exchange code for token and clean URL
 */
const getTokenAndEvents = async (code) => {
    const encodedCode = encodeURIComponent(code);
    const response = await fetch(
        `https://rec0ldppe5.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodedCode}`
    );
    const { access_token } = await response.json();

    // Save token and remove code from URL
    localStorage.setItem("access_token", access_token);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("code");
    const newUrl = window.location.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    window.history.pushState("", "", newUrl);

    return access_token;
};

/**
 * Get events from API
 */
export const getEvents = async () => {
    // Use mock data in local/test environment
    if (window.location.href.startsWith("http://localhost")) {
        // Sort mock data by date (newest first)
        return mockData.sort((a, b) => new Date(b.start.dateTime) - new Date(a.start.dateTime));
    }

    // Get access token
    const token = await getAccessToken();
    if (token) {
        // Fetch events using token
        const response = await fetch(
            `https://rec0ldppe5.execute-api.us-east-1.amazonaws.com/dev/api/get-events/${token}`
        );
        const result = await response.json();

        // Sort the events by start date (newest first)
        if (result.events && Array.isArray(result.events)) {
            return result.events.sort((a, b) => {
                // Safely handle cases where dateTime might be undefined
                const dateA = a.start && a.start.dateTime ? new Date(a.start.dateTime) : new Date(0);
                const dateB = b.start && b.start.dateTime ? new Date(b.start.dateTime) : new Date(0);
                return dateB - dateA; // Descending order (newest first)
            });
        }

        return result.events || [];
    }
    return [];
};
