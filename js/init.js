import configLoader from './config-loader.js';
import themeManager from './theme-manager.js';

// Load and apply configuration when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize theme manager (this will handle the initial theme)
    themeManager.init();
    
    // Load and apply configuration
    await configLoader.loadConfig();
    configLoader.applyConfig();
});

// Reload config when navigating back/forward
window.addEventListener('popstate', async () => {
    await configLoader.loadConfig();
    configLoader.applyConfig();
});

// Reload config when the page is shown (e.g., after being hidden)
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
        await configLoader.loadConfig();
        configLoader.applyConfig();
    }
}); 