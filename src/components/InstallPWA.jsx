// src/components/InstallPWA.jsx
import { useState, useEffect } from 'react';

const InstallPWA = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if app was previously installed (using localStorage)
        const checkIfInstalled = () => {
            const installed = localStorage.getItem('pwaInstalled');
            if (installed === 'true') {
                setIsInstalled(true);
                return true;
            }

            // Also check for standalone mode
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone ||
                document.referrer.includes('android-app://');

            if (isStandalone) {
                // If in standalone mode, update localStorage
                localStorage.setItem('pwaInstalled', 'true');
                setIsInstalled(true);
                return true;
            }

            return false;
        };

        // Initial check
        if (!checkIfInstalled()) {
            // Only set up the beforeinstallprompt handler if not already installed
            const handler = (e) => {
                e.preventDefault();
                setPromptInstall(e);
                setSupportsPWA(true);
            };

            window.addEventListener('beforeinstallprompt', handler);

            // Cleanup
            return () => {
                window.removeEventListener('beforeinstallprompt', handler);
            };
        }
    }, []);

    // Also add a check for the appinstalled event
    useEffect(() => {
        const handleAppInstalled = () => {
            localStorage.setItem('pwaInstalled', 'true');
            setIsInstalled(true);
        };

        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const onClick = (evt) => {
        evt.preventDefault();
        if (!promptInstall) return;

        promptInstall.prompt();
        promptInstall.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                // Mark as installed in localStorage
                localStorage.setItem('pwaInstalled', 'true');
                setIsInstalled(true);
            }
            setPromptInstall(null);
        });
    };

    // Don't show the button if app is installed or PWA is not supported
    if (isInstalled || !supportsPWA) {
        return null;
    }

    return (
        <button
            className="install-button"
            onClick={onClick}
            aria-label="Install app"
            title="Install app"
        >
            📱 Install App
        </button>
    );
};

export default InstallPWA;