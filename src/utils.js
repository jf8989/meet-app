// src/utils.js

/**
 * Formats ISO date string to a human-readable format
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    // Format: "March 16, 2025 at 2:30 PM"
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) + ' at ' +
        date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
};