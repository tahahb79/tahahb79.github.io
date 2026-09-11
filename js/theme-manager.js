// Theme manager utility
class ThemeManager {
    constructor() {
        this.darkMode = false;
        this.init();
    }

    init() {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Get saved theme or use system preference
        const savedTheme = localStorage.getItem('theme');
        this.darkMode = savedTheme ? savedTheme === 'dark' : prefersDark.matches;

        // Apply initial theme
        this.applyTheme();

        // Listen for system theme changes
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.darkMode = e.matches;
                this.applyTheme();
            }
        });

        // Setup theme toggle buttons
        this.setupToggleButtons();
    }

    applyTheme() {
        // Apply to HTML element
        if (this.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Update all toggle button icons
        this.updateToggleIcons();

        // Save theme preference
        localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    }

    setupToggleButtons() {
        // Setup floating toggle button
        const floatToggle = document.getElementById('theme-toggle-float');
        if (floatToggle) {
            // Remove any existing event listeners
            floatToggle.replaceWith(floatToggle.cloneNode(true));
            const newFloatToggle = document.getElementById('theme-toggle-float');
            newFloatToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Update initial icons
        this.updateToggleIcons();
    }

    updateToggleIcons() {
        // Update floating toggle icon
        const floatIcon = document.getElementById('theme-toggle-float-icon');
        if (floatIcon) {
            if (this.darkMode) {
                floatIcon.classList.remove('fa-sun');
                floatIcon.classList.add('fa-moon');
            } else {
                floatIcon.classList.remove('fa-moon');
                floatIcon.classList.add('fa-sun');
            }
        }
    }

    toggleTheme() {
        this.darkMode = !this.darkMode;
        this.applyTheme();
    }

    // Public method to reinitialize toggle buttons
    reinitializeToggles() {
        this.setupToggleButtons();
    }
}

// Initialize and export theme manager
const themeManager = new ThemeManager();
export default themeManager; 