// auth-server/handler.js
import { google } from 'googleapis';
const calendar = google.calendar('v3');
const OAuth2 = google.auth.OAuth2;

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const CALENDAR_ID = 'fullstackwebdev@careerfoundry.com';

// Create OAuth2 client with credentials from config.json
import fs from 'fs';

const credentials = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const oAuth2Client = new OAuth2(
    credentials.CLIENT_ID,
    credentials.CLIENT_SECRET,
    'https://meet-app-roan.vercel.app/'
);

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    'Content-Type': 'application/json'
};

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

export const getAuthURL = async () => {
    console.log('getAuthURL function started');
    console.log('Environment credentials:', {
        CLIENT_ID: credentials.CLIENT_ID,
        CLIENT_SECRET: credentials.CLIENT_SECRET,
    });

    try {
        if (!credentials.CLIENT_ID || !credentials.CLIENT_SECRET) {
            throw new Error('Missing required credentials');
        }

        console.log('Generating auth URL with scopes:', SCOPES);
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        console.log('Auth URL generated successfully:', authUrl);
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

export const getAccessToken = async (event) => {
    console.log('getAccessToken function started');
    console.log('Event received:', JSON.stringify(event));

    try {
        if (!event.pathParameters || !event.pathParameters.code) {
            throw new Error('No code parameter provided');
        }

        const code = decodeURIComponent(`${event.pathParameters.code}`);
        console.log('Decoded authorization code received');

        try {
            console.log('Attempting to get tokens from Google');
            const { tokens } = await oAuth2Client.getToken(code);
            console.log('Tokens successfully retrieved');

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(tokens),
            };
        } catch (googleError) {
            console.error('Error getting tokens from Google:', googleError);
            return createErrorResponse(401, {
                ...googleError,
                message: 'Failed to authenticate with Google. Please try again.'
            });
        }
    } catch (error) {
        console.error('Error in getAccessToken:', error);
        return createErrorResponse(500, error);
    }
};

export const getCalendarEvents = async (event) => {
    console.log('getCalendarEvents function started');
    console.log('Event received:', JSON.stringify(event));

    try {
        if (!event.pathParameters || !event.pathParameters.access_token) {
            throw new Error('No access_token parameter provided');
        }

        const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
        console.log('Decoded access token received');

        try {
            console.log('Setting credentials in OAuth2 client');
            oAuth2Client.setCredentials({ access_token });

            console.log('Requesting calendar events from Google');
            const results = await calendar.events.list({
                calendarId: CALENDAR_ID,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            });

            console.log(`Successfully retrieved ${results.data.items.length} events`);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    events: results.data.items,
                    count: results.data.items.length
                }),
            };
        } catch (googleError) {
            console.error('Error getting calendar events from Google:', googleError);
            return createErrorResponse(401, {
                ...googleError,
                message: 'Failed to fetch calendar events. Token might be invalid or expired.'
            });
        }
    } catch (error) {
        console.error('Error in getCalendarEvents:', error);
        return createErrorResponse(500, error);
    }
};
