// auth-server/handler.js
import { google } from 'googleapis';
import fs from 'fs';

// Pull in credentials from config.json
const credentials = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// Create an OAuth2 client
const OAuth2 = google.auth.OAuth2;
const oAuth2Client = new OAuth2(
    credentials.CLIENT_ID,
    credentials.CLIENT_SECRET,
    credentials.REDIRECT_URI
);

// Google Calendar object for queries
const calendar = google.calendar('v3');

// Set default headers for CORS, JSON, etc.
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    'Content-Type': 'application/json',
};

// Helper for standardized error responses
const createErrorResponse = (statusCode, error) => {
    console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code
    });

    return {
        statusCode,
        headers,
        body: JSON.stringify({
            error: {
                message: error.message,
                type: error.name,
                code: error.code || statusCode
            }
        })
    };
};

/**
 * 1) getAuthURL - returns the Google OAuth URL
 */
export const getAuthURL = async () => {
    console.log('getAuthURL function started');
    console.log('Using redirect URI:', credentials.REDIRECT_URI);

    try {
        if (!credentials.CLIENT_ID || !credentials.CLIENT_SECRET) {
            throw new Error('Missing required credentials in config.json');
        }

        // Request offline access and the desired scope
        const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];

        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ authUrl }),
        };
    } catch (error) {
        console.error('Error in getAuthURL:', error);
        return createErrorResponse(500, error);
    }
};

/**
 * 2) getAccessToken - exchanges an auth code for tokens
 */
export const getAccessToken = async (event) => {
    console.log('getAccessToken function started');

    try {
        if (!event.pathParameters || !event.pathParameters.code) {
            throw new Error('No code parameter provided in the request');
        }

        const code = decodeURIComponent(event.pathParameters.code);
        console.log('Decoded authorization code:', code);

        const { tokens } = await oAuth2Client.getToken(code);
        console.log('Tokens received from Google:', tokens);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(tokens),
        };
    } catch (error) {
        console.error('Error in getAccessToken:', error);
        return createErrorResponse(500, error);
    }
};

/**
 * 3) getCalendarEvents - uses the access_token to fetch events
 */
export const getCalendarEvents = async (event) => {
    console.log('getCalendarEvents function started');

    try {
        if (!event.pathParameters || !event.pathParameters.access_token) {
            throw new Error('No access_token provided in the request');
        }

        // Grab the token from pathParameters
        const access_token = decodeURIComponent(event.pathParameters.access_token);
        console.log('Decoded access token:', access_token);

        // Set credentials so that calendar.events.list() can authenticate
        oAuth2Client.setCredentials({ access_token });

        // Make the call to Google Calendar
        const results = await calendar.events.list({
            calendarId: credentials.CALENDAR_ID,
            auth: oAuth2Client,
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        // Return the data in a consistent shape
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                events: results.data.items,
                count: results.data.items.length,
            }),
        };
    } catch (error) {
        console.error('Error in getCalendarEvents:', error);
        return createErrorResponse(500, error);
    }
};
