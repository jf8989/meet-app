// handler.js
"use strict";

// Required imports and setup
const process = require('process');
const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_ID, CLIENT_SECRET, CALENDAR_ID } = process.env;
const redirect_uris = ["https://meet-app-navy.vercel.app"];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
);

// Function 1: Get Authorization URL
module.exports.getAuthURL = async () => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
            authUrl,
        }),
    };
};

// Function 2: Get Access Token
module.exports.getAccessToken = async (event) => {
    const code = decodeURIComponent(event.pathParameters.code);

    return new Promise((resolve, reject) => {
        oAuth2Client.getToken(code, (error, response) => {
            if (error) {
                reject(error);
            }
            resolve(response);
        });
    })
        .then((results) => ({
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(results),
        }))
        .catch((error) => ({
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(error),
        }));
};

// Function 3: Get Calendar Events (new function as per task)
module.exports.getCalendarEvents = async (event) => {
    // Get the access token from the URL parameters
    const access_token = decodeURIComponent(event.pathParameters.access_token);

    // Set the credentials using the access token
    oAuth2Client.setCredentials({ access_token });

    // Return a new Promise
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
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ events: results.data.items }),
        }))
        .catch((error) => ({
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(error),
        }));
};