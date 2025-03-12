/* eslint-disable no-unused-vars */
import { loadFeature, defineFeature } from 'jest-cucumber';

// Load the feature file
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

// Define the feature test
defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the user is viewing the event list', () => {

        });

        when('the events are displayed', () => {

        });

        then('the event details should be collapsed', () => {

        });
    });

    test('User can expand an event to see details', ({ given, when, then }) => {
        given('the user is viewing the event list with collapsed events', () => {

        });

        when(/^the user clicks on the "(.*)" button for an event$/, (arg0) => {

        });

        then('the event details should be displayed', () => {

        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
        given('the user is viewing the event details', () => {

        });

        when(/^the user clicks on the "(.*)" button$/, (arg0) => {

        });

        then('the event details should be hidden', () => {

        });
    });
});