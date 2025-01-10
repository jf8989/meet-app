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

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

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

export const getAuthURL = async (event) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    const allowedOrigins = [
        "https://meet-app-navy.vercel.app",
        "http://localhost:5173",
    ];

    const origin = event.headers.origin;

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "https://meet-app-navy.vercel.app",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ authUrl }),
    };
};
