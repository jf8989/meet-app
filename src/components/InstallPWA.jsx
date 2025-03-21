// src/components/InstallPWA.jsx
import { useState, useEffect } from 'react';

const InstallPWA = () => {
    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect(() => {
        // Check if app is running in standalone mode (already installed)
        const isRunningAsInstalledPWA = window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone ||
            document.referrer.includes('android-app://');

        if (isRunningAsInstalledPWA) {
            // Already installed and running as PWA, no need for install button
            return;
        }

        // Handler for the beforeinstallprompt event - only fires if app is
        // installable AND not already installed
        const handleInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPrompt(e);
            console.log('App is installable as PWA');
        };

        window.addEventListener('beforeinstallprompt', handleInstallPrompt);

        // Listen for successful installation
        const handleAppInstalled = () => {
            console.log('App was successfully installed');
            // Hide the install button after installation
            setInstallPrompt(null);
        };

        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = (e) => {
        e.preventDefault();
        if (!installPrompt) return;

        installPrompt.prompt();
        installPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            // Clear the saved prompt - it can only be used once
            setInstallPrompt(null);
        });
    };

    // Only render the button if we have an install prompt
    if (!installPrompt) {
        return null;
    }

    return (
        <button
            className="install-button"
            onClick={handleInstallClick}
            aria-label="Install app"
            title="Install app"
        >
            📱 Install App
        </button>
    );
};

export default InstallPWA;