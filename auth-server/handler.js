// auth-server/handler.js
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const calendar = google.calendar('v3');
const { OAuth2 } = google.auth;

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const CALENDAR_ID = 'fullstackwebdev@careerfoundry.com';

// Create OAuth2 client
const oAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://meet-app-navy.vercel.app'  // Use your primary redirect URI here
);

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
};

export const getAuthURL = async () => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            authUrl,
        }),
    };
};

export const getAccessToken = async (event) => {
    const code = decodeURIComponent(`${event.pathParameters.code}`);

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(tokens),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify(error),
        };
    }
};

export const getCalendarEvents = async (event) => {
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    oAuth2Client.setCredentials({ access_token });

    try {
        const results = await calendar.events.list({
            calendarId: CALENDAR_ID,
            auth: oAuth2Client,
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ events: results.data.items }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify(error),
        };
    }
};