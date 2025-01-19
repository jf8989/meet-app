// src/mock-data/mock-events.js

const mockData = [
    {
        kind: "calendar#event",
        etag: "3181161784712000",
        id: "1",
        status: "confirmed",
        htmlLink: "https://www.google.com/calendar/event?eid=MGVxcTlybjl2M3RjZGVxamV2YXBoaHZvdWkgZnVsbHN0YWNrd2ViZGV2QGNhcmVlcmZvdW5kcnkuY29t",
        created: "2023-05-19T19:17:46.000Z",
        updated: "2023-05-27T12:01:32.356Z",
        summary: "Learn JavaScript",
        description: "Learn JavaScript with us and make those beautiful websites.",
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
            dateTime: "2023-05-19T16:00:00+02:00",
            timeZone: "Europe/Berlin"
        },
        end: {
            dateTime: "2023-05-19T17:00:00+02:00",
            timeZone: "Europe/Berlin"
        },
    },
    {
        kind: "calendar#event",
        etag: "3181161784712111",
        id: "2",
        status: "confirmed",
        htmlLink: "https://www.google.com/calendar/event?eid=MGVxcTlybjl2M3RjZGVxamV2YXBoaHZvdWkgZnVsbHN0YWNrd2ViZGV2QGNhcmVlcmZvdW5kcnkuY29t",
        created: "2023-06-19T19:17:46.000Z",
        updated: "2023-06-27T12:01:32.356Z",
        summary: "Build a React App",
        description: "Learn React by building your first React application.",
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
            dateTime: "2023-06-19T16:00:00+02:00",
            timeZone: "Europe/Berlin"
        },
        end: {
            dateTime: "2023-06-19T17:00:00+02:00",
            timeZone: "Europe/Berlin"
        },
    }
];

export default mockData;