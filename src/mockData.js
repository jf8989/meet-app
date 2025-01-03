// src/mockData.js

// Google Calendar API format events
export const mockCalendarEvents = [
    {
        kind: "calendar#event",
        etag: "\"3181161784712000\"",
        id: "4eahs9ghkhrvkld72hogu9ph3e",
        status: "confirmed",
        htmlLink: "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
        created: "2020-05-19T19:17:46.000Z",
        updated: "2020-05-27T12:01:32.356Z",
        summary: "Learn JavaScript",
        description: "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavaScript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
        location: "London, UK",
        creator: {
            email: "fullstackwebdev@careerfoundry.com",
            self: true
        },
        organizer: {
            email: "fullstackwebdev@careerfoundry.com",
            self: true
        },
        start: {
            dateTime: "2020-05-19T16:00:00+02:00",
            timeZone: "Europe/Berlin"
        },
        end: {
            dateTime: "2020-05-19T17:00:00+02:00",
            timeZone: "Europe/Berlin"
        },
        iCalUID: "4eahs9ghkhrvkld72hogu9ph3e@google.com",
        sequence: 0,
        reminders: {
            useDefault: true
        },
        eventType: "default"
    },
    {
        kind: "calendar#event",
        etag: "\"3181159875584000\"",
        id: "3qtd6uscq4tsi6gc7nmmtpqlct",
        status: "confirmed",
        htmlLink: "https://www.google.com/calendar/event?eid=M3F0ZDZ1c2NxNHRzaTZnYzdubW10cHFsY3RfMjAyMDA1MTlUMTIwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
        created: "2020-05-19T19:14:30.000Z",
        updated: "2020-05-27T11:45:37.792Z",
        summary: "Build a React App",
        description: "React is one of the most popular JavaScript libraries for building user interfaces. Join us to learn how to build a React application from scratch!",
        location: "Berlin, Germany",
        creator: {
            email: "fullstackwebdev@careerfoundry.com",
            self: true
        },
        organizer: {
            email: "fullstackwebdev@careerfoundry.com",
            self: true
        },
        start: {
            dateTime: "2020-05-19T14:00:00+02:00",
            timeZone: "Europe/Berlin"
        },
        end: {
            dateTime: "2020-05-19T15:00:00+02:00",
            timeZone: "Europe/Berlin"
        },
        iCalUID: "3qtd6uscq4tsi6gc7nmmtpqlct@google.com",
        sequence: 0,
        reminders: {
            useDefault: true
        },
        eventType: "default"
    }
];

// Simplified format for app's internal use
export const mockAppEvents = [
    {
        id: 1,
        title: "Learn JavaScript",
        location: "London, UK",
        dateTime: "2024-12-28T19:00:00Z",
        description: "Join us for an introductory JavaScript workshop"
    },
    {
        id: 2,
        title: "Build a React App",
        location: "Berlin, Germany",
        dateTime: "2024-12-29T20:00:00Z",
        description: "Learn how to build a React application from scratch"
    }
];

// Helper function to transform Google Calendar format to App format
export const transformGoogleEventToAppEvent = (googleEvent) => {
    return {
        id: googleEvent.id,
        title: googleEvent.summary,
        location: googleEvent.location,
        dateTime: googleEvent.start.dateTime,
        description: googleEvent.description
    };
};

// Helper function to transform all events
export const transformGoogleEventsToAppEvents = (googleEvents) => {
    return googleEvents.map(transformGoogleEventToAppEvent);
};

export default {
    mockCalendarEvents,
    mockAppEvents,
    transformGoogleEventToAppEvent,
    transformGoogleEventsToAppEvents
};