// src/components/InstallPWA.jsx
import { useState, useEffect } from 'react';

const InstallPWA = () => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if the app is running in standalone mode (as a PWA)
        const isRunningStandalone = window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone ||
            document.referrer.includes('android-app://');

        setIsStandalone(isRunningStandalone);

        // Only set up the install prompt event if not already in standalone mode
        if (!isRunningStandalone) {
            const handler = (e) => {
                e.preventDefault();
                setPromptInstall(e);
                setSupportsPWA(true);
            };

            window.addEventListener('beforeinstallprompt', handler);
            return () => window.removeEventListener('beforeinstallprompt', handler);
        }
    }, []);

    const onClick = (evt) => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }

        promptInstall.prompt();
        promptInstall.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setPromptInstall(null);
        });
    };

    // Don't render the button if running as a PWA or if PWA is not supported
    if (isStandalone || !supportsPWA) {
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