// auth-server/handler.js
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const CALENDAR_ID = 'fullstackwebdev@careerfoundry.com';

const credentials = {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    client_secret: process.env.CLIENT_SECRET,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    redirect_uris: [
        "https://meet-app-navy.vercel.app",
        "http://127.0.0.1:5500/test-auth-server.html",
        "http://localhost:5173"
    ],
    javascript_origins: ["https://meet-app-navy.vercel.app"]
};

const { client_secret, client_id, redirect_uris } = credentials;
const oAuth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

const getAllowedHeaders = (origin) => {
    const allowedOrigins = [
        "https://meet-app-navy.vercel.app",
        "http://localhost:5173",
    ];

    return {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "https://meet-app-navy.vercel.app",
        "Access-Control-Allow-Credentials": true,
    };
};

export const getAuthURL = async (event) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers: getAllowedHeaders(event.headers.origin),
        body: JSON.stringify({ authUrl }),
    };
};

export const getAccessToken = async (event) => {
    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
        oAuth2Client.getToken(code, (error, response) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    })
        .then((results) => ({
            statusCode: 200,
            headers: getAllowedHeaders(event.headers.origin),
            body: JSON.stringify(results),
        }))
        .catch((error) => ({
            statusCode: 500,
            headers: getAllowedHeaders(event.headers.origin),
            body: JSON.stringify(error),
        }));
};

export const getCalendarEvents = async (event) => {
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    oAuth2Client.setCredentials({ access_token });

    return new Promise((resolve, reject) => {
        calendar.events.list(
            {
                calendarId: CALENDAR_ID,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: "startTime",
            },
            (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            }
        );
    })
        .then((results) => ({
            statusCode: 200,
            headers: getAllowedHeaders(event.headers.origin),
            body: JSON.stringify({ events: results.data.items }),
        }))
        .catch((error) => ({
            statusCode: 500,
            headers: getAllowedHeaders(event.headers.origin),
            body: JSON.stringify(error),
        }));
};