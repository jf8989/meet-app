// src/serviceWorkerRegistration.js
// This code uses a more conservative approach to service worker registration

// Check if we're in a browser environment with service worker support
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

// This function registers the service worker
export function register(config) {
    // Only register in production and if service workers are supported
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
        const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);

        // Don't register if on a different origin
        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        // Register when the window has loaded
        window.addEventListener('load', () => {
            const swUrl = `${import.meta.env.BASE_URL}sw.js`;

            if (isLocalhost) {
                // This is running on localhost
                checkValidServiceWorker(swUrl, config);

                navigator.serviceWorker.ready.then(() => {
                    console.log('This web app is being served cache-first by a service worker');
                });
            } else {
                // Not localhost - just register
                registerValidSW(swUrl, config);
            }
        });
    }
}

// This function handles the actual registration
function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            // Don't check for updates more than once per session to prevent loops
            if (!sessionStorage.getItem('swRegistered')) {
                sessionStorage.setItem('swRegistered', 'true');

                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker == null) {
                        return;
                    }

                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // New content available
                                console.log('New content is available');

                                if (config && config.onUpdate) {
                                    config.onUpdate(registration);
                                }
                            } else {
                                // Content cached for offline use
                                console.log('Content is cached for offline use');

                                if (config && config.onSuccess) {
                                    config.onSuccess(registration);
                                }
                            }
                        }
                    };
                };
            }
        })
        .catch((error) => {
            console.error('Error during service worker registration:', error);
        });
}

// This function checks if a service worker exists
function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' },
    })
        .then((response) => {
            // Ensure service worker exists
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                // No service worker found
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker found
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log('No internet connection found. App is running in offline mode.');
        });
}

// This function unregisters the service worker
export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}