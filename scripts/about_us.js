// Placeholder for user login status (controlled by account dropdown logic)
let userLoggedIn = false; // Default to false

/**
 * Displays a custom alert/message box to the user.
 * @param {string} message - The message to display.
 * @param {string} iconClasses - Font Awesome classes for the icon (e.g., "fas fa-check-circle green-icon").
 */
function showMessageBox(message, iconClasses = "fas fa-info-circle blue-icon") {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = customAlert.querySelector('.alert-icon');
    const closeAlertBtn = document.getElementById('closeAlertBtn');

    if (customAlert && alertMessage && alertIcon && closeAlertBtn) {
        alertMessage.textContent = message;
        alertIcon.className = 'alert-icon ' + iconClasses;
        customAlert.classList.add('show');

        const closeHandler = () => {
            customAlert.classList.remove('show');
            closeAlertBtn.removeEventListener('click', closeHandler);
        };
        closeAlertBtn.addEventListener('click', closeHandler);

        const overlayClickHandler = (event) => {
            if (event.target === customAlert) {
                customAlert.classList.remove('show');
                customAlert.removeEventListener('click', overlayClickHandler);
            }
        };
        customAlert.addEventListener('click', overlayClickHandler);
    } else {
        console.error("MessageBox elements not found. Cannot show message.");
    }
}

/**
 * Toggles dark mode on/off.
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.classList.replace('fa-moon', 'fa-sun');
            darkModeToggle.setAttribute('title', 'Toggle Light Mode');
        } else {
            darkModeToggle.classList.replace('fa-sun', 'fa-moon');
            darkModeToggle.setAttribute('title', 'Toggle Dark Mode');
        }
    }
}

/**
 * Updates the visibility of login/logout/profile links in the account dropdown.
 * @param {boolean} isLoggedIn - True if the user is logged in, false otherwise.
 */
function updateAccountDropdown(isLoggedIn) {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');
    const mobileLogoutLink = document.getElementById('mobileLogoutLink');
    const mobileProfileLink = document.getElementById('mobileProfileLink');

    const accountItems = document.querySelectorAll('.account-item');

    if (isLoggedIn) {
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'flex';
        if (logoutLink) logoutLink.style.display = 'flex';
        if (mobileLoginLink) mobileLoginLink.style.display = 'none';
        if (mobileLogoutLink) mobileLogoutLink.style.display = 'flex';
        if (mobileProfileLink) mobileProfileLink.style.display = 'flex';

        accountItems.forEach(item => {
            if (item.id !== 'loginLink' && item.id !== 'registerLink' && item.id !== 'logoutLink' && item.id !== 'profileLink' && item.id !== 'settingsLink') {
                item.style.display = 'flex';
            }
        });

    } else {
        if (loginLink) loginLink.style.display = 'flex';
        if (registerLink) registerLink.style.display = 'flex';
        if (profileLink) profileLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
        if (mobileLoginLink) mobileLoginLink.style.display = 'flex';
        if (mobileLogoutLink) mobileLogoutLink.style.display = 'none';
        if (mobileProfileLink) mobileProfileLink.style.display = 'none';

        accountItems.forEach(item => {
            if (item.id !== 'loginLink' && item.id !== 'registerLink' && item.id !== 'logoutLink' && item.id !== 'profileLink' && item.id !== 'settingsLink') {
                item.style.display = 'none';
            }
        });
    }
    userLoggedIn = isLoggedIn;
}

// --- Dummy showsData for search functionality to prevent errors ---
// This page does not display carousels, but the header's search function expects this variable.
const showsData = []; // Keep it empty or minimal

// --- Event Listeners and Initial Page Load Logic ---

document.addEventListener("DOMContentLoaded", () => {
    // Last Modified Date (footer)
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleDateString();
    } else {
        console.warn("Last Modified span not found.");
    }

    // Update the current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // --- Account Dropdown Link Handling ---
    const accountIcon = document.getElementById("accountIcon");
    const accountDropdown = document.getElementById("accountDropdown");
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');
    const mobileLogoutLink = document.getElementById('mobileLogoutLink');
    const mobileProfileLink = document.getElementById('mobileProfileLink');

    if (accountIcon && accountDropdown) {
        accountIcon.addEventListener('click', (event) => {
            accountDropdown.classList.toggle("visible");
            updateAccountDropdown(userLoggedIn);
            event.stopPropagation();
        });

        accountDropdown.addEventListener('click', (event) => {
            const target = event.target.closest('a');
            if (!target) return;

            event.preventDefault();

            if (target.id === 'loginLink') {
                showMessageBox(`Redirecting to Login page (simulated)!`);
                window.location.href = `login.html`;
            } else if (target.id === 'registerLink') {
                showMessageBox(`Redirecting to Register page (simulated)!`);
                window.location.href = `signup.html`;
            }
            else if (target.id === 'profileLink' || target.id === 'playlistLink' || target.id === 'bookmarksLink' || target.id === 'favoritesLink') {
                if (userLoggedIn) {
                    showMessageBox(`${target.textContent.trim()} functionality coming soon! Redirecting to settings...`, "fas fa-info-circle blue-icon");
                    window.location.href = 'settings.html';
                } else {
                    showMessageBox("Please log in to access this feature!", "fas fa-exclamation-triangle red-icon");
                }
            } else if (target.id === 'logoutLink') {
                userLoggedIn = false;
                updateAccountDropdown(userLoggedIn);
                showMessageBox("You have been logged out.", "fas fa-check-circle green-icon");
                accountDropdown.classList.remove("visible");
            } else if (target.id === 'settingsLink') {
                if (userLoggedIn) {
                    showMessageBox("Redirecting to Settings page...", "fas fa-info-circle blue-icon");
                    window.location.href = 'settings.html';
                } else {
                    showMessageBox("Please log in to access settings!", "fas fa-exclamation-triangle red-icon");
                }
            }
        });

        document.addEventListener('click', (event) => {
            if (accountDropdown && accountIcon && !accountDropdown.contains(event.target) && event.target !== accountIcon) {
                accountDropdown.classList.remove("visible");
            }
        });
    } else {
        console.warn("Account icon or dropdown elements not found. Account functionality may be limited.");
    }


    // --- Header Search and Mobile Nav Logic ---
    const searchIcon = document.getElementById("searchIcon");
    const searchSubheader = document.getElementById("searchSubheader");
    const searchInput = document.getElementById("searchInput");
    const clearSearch = document.getElementById("clearSearch");
    const suggestionsBox = document.getElementById("suggestionsBox");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const addIcon = document.getElementById("addIcon");
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const mobileNavOverlay = document.getElementById("mobileNavOverlay");
    const closeMobileNav = document.getElementById("closeMobileNav");


    // Ensure all necessary elements are present
    if (!searchIcon || !searchSubheader || !searchInput || !suggestionsBox ||
        !darkModeToggle || !addIcon || !accountIcon || !accountDropdown ||
        !hamburgerMenu || !mobileNavOverlay || !closeMobileNav) {
        console.error("Critical header elements are missing. Header functionality may be limited.");
        // No return here to allow other parts of the script to run if possible
    } else {
        // State variables for search
        let searchScope = null;
        let selectedIndex = -1;

        // Toggle search bar visibility
        searchIcon.addEventListener("click", () => {
            searchSubheader.classList.toggle("visible");
            if (searchSubheader.classList.contains("visible")) {
                searchInput.focus();
                if (!searchScope) {
                    showPrimarySuggestions(suggestionsBox);
                }
            } else {
                suggestionsBox.classList.remove("visible");
                searchInput.value = "";
                searchScope = null;
                selectedIndex = -1;
            }
        });

        // Clear search input
        clearSearch.addEventListener("click", () => {
            searchInput.value = "";
            searchScope = null;
            selectedIndex = -1;
            showPrimarySuggestions(suggestionsBox);
            searchInput.focus();
        });

        // Handle input changes in the search bar
        searchInput.addEventListener("input", () => {
            selectedIndex = -1;
            const val = searchInput.value.trim();

            if (!searchScope) {
                if (val === "") {
                    showPrimarySuggestions(suggestionsBox);
                } else {
                     // Use dummy showsData for suggestions on this page
                    // In a real app, this would query a backend for live show suggestions
                    const dummyShowsData = [
                        { title: 'Breaking Bad', genre: ['Drama', 'Crime'] },
                        { title: 'Money Heist', genre: ['Crime', 'Thriller'] },
                        { title: 'The Boys', genre: ['Action', 'Sci-Fi'] },
                        { title: 'The Expanse', genre: ['Sci-Fi', 'Drama'] },
                        { title: 'Lupin', genre: ['Crime', 'Mystery'] },
                        { title: 'Squid Game', genre: ['Thriller'] },
                        { title: 'Wednesday', genre: ['Comedy', 'Fantasy'] },
                        { title: 'Foundation', genre: ['Sci-Fi'] },
                        { title: 'Narcos', genre: ['Crime', 'Biography'] },
                        { title: 'Game of Thrones', genre: ['Fantasy', 'Drama'] }
                    ];
                    renderShowTitleSuggestions(suggestionsBox, dummyShowsData.filter(s =>
                        s.title.toLowerCase().includes(val.toLowerCase()) ||
                        (Array.isArray(s.genre) && s.genre.some(g => g.toLowerCase().includes(val.toLowerCase())))
                        // No cast search on this page with dummy data for simplicity
                    ).map(s => s.title));
                }
            } else {
                const [scopeType, scopeValue] = searchScope.split(':');
                const dummyShowsData = [ /* same as above to filter by scope */
                    { title: 'Breaking Bad', genre: ['Drama', 'Crime'] },
                    { title: 'Money Heist', genre: ['Crime', 'Thriller'] },
                    { title: 'The Boys', genre: ['Action', 'Sci-Fi'] },
                    { title: 'The Expanse', genre: ['Sci-Fi', 'Drama'] },
                    { title: 'Lupin', genre: ['Crime', 'Mystery'] },
                    { title: 'Squid Game', genre: ['Thriller'] },
                    { title: 'Wednesday', genre: ['Comedy', 'Fantasy'] },
                    { title: 'Foundation', genre: ['Sci-Fi'] },
                    { title: 'Narcos', genre: ['Crime', 'Biography'] },
                    { title: 'Game of Thrones', genre: ['Fantasy', 'Drama'] }
                ];
                const filteredByScope = dummyShowsData.filter(s => {
                    if (scopeType === "genre" && Array.isArray(s.genre)) return s.genre.some(g => g.toLowerCase() === scopeValue.toLowerCase());
                    return true;
                });
                renderShowTitleSuggestions(suggestionsBox, filteredByScope.filter(s =>
                    s.title.toLowerCase().includes(val.toLowerCase())
                ).map(s => s.title));
            }
        });

        // Handle clicks on suggestions
        suggestionsBox.addEventListener("click", (event) => {
            const target = event.target;
            if (target.classList.contains('suggestion-item')) {
                const suggestionText = target.textContent.trim();
                // For this page, suggestions might just be categories or general terms.
                // Actual navigation/search logic for shows happens on cinewatch_home.html.
                showMessageBox(`Simulating search for: ${suggestionText}`);
                searchSubheader.classList.remove("visible"); // Close search bar
                suggestionsBox.classList.remove("visible");
                searchInput.value = "";
                searchScope = null;
                selectedIndex = -1;
            }
        });

        // Keyboard navigation for search suggestions
        searchInput.addEventListener("keydown", (e) => {
            const suggestions = suggestionsBox.querySelectorAll(".suggestion-item");
            if (suggestions.length === 0) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % suggestions.length;
                highlightSelectedSuggestion(suggestions, selectedIndex);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
                highlightSelectedSuggestion(suggestions, selectedIndex);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (selectedIndex !== -1) {
                    suggestions[selectedIndex].click();
                }
            }
        });

        function highlightSelectedSuggestion(suggestions, index) {
            suggestions.forEach((div, i) => {
                if (i === index) {
                    div.classList.add("selected");
                    div.scrollIntoView({ block: "nearest", inline: "nearest" });
                } else {
                    div.classList.remove("selected");
                }
            });
        }

        // Hide suggestions and search bar when clicking outside
        document.addEventListener("click", (event) => {
            if (!searchSubheader.contains(event.target) && event.target !== searchIcon) {
                searchSubheader.classList.remove("visible");
                suggestionsBox.classList.remove("visible");
                searchInput.value = "";
                searchScope = null;
                selectedIndex = -1;
            }
        });

        // Helper functions for search 
        function showPrimarySuggestions(container) {
            container.innerHTML = '';
            const suggestions = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Animation', 'Kenyan', 'Bollywood', 'K-Drama']; // Expanded suggestions
            suggestions.forEach(s => {
                const div = document.createElement('div');
                div.classList.add('suggestion-item', 'primary-suggestion');
                div.textContent = s;
                div.addEventListener('click', () => {
                    searchInput.value = `${s}: `;
                    searchScope = `genre:${s.toLowerCase()}`;
                    suggestionsBox.classList.remove("visible");
                    searchInput.focus();
                    // In a real scenario, this would load results
                });
                container.appendChild(div);
            });
            container.classList.add('visible');
        }

        function renderShowTitleSuggestions(container, titles) {
            container.innerHTML = '';
            if (titles.length === 0) {
                container.classList.remove('visible');
                return;
            }
            titles.slice(0, 10).forEach(title => {
                const div = document.createElement('div');
                div.classList.add('suggestion-item');
                div.textContent = title;
                div.addEventListener('click', () => {
                    // On about_us.html, this will just simulate search
                    showMessageBox(`Simulating search for: ${title}`);
                    searchSubheader.classList.remove("visible");
                    suggestionsBox.classList.remove("visible");
                    searchInput.value = "";
                });
                container.appendChild(div);
            });
            container.classList.add('visible');
        }


        // --- Dark Mode Toggle ---
        darkModeToggle.addEventListener("click", () => {
            toggleDarkMode();
        });

        // --- Add Icon Functionality ---
        addIcon.addEventListener('click', (event) => {
            event.preventDefault();
            if (userLoggedIn) {
                showMessageBox("Redirecting to settings for watchlist management (simulated)...", "fas fa-info-circle blue-icon");
                window.location.href = 'settings.html';
            } else {
                showMessageBox("You must be logged in to add shows to your playlist!", "fas fa-exclamation-triangle red-icon");
            }
        });

        // --- Mobile Navigation (Hamburger Menu) ---
        hamburgerMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.add('show');
        });

        mobileNavOverlay.addEventListener('click', (event) => {
            if (event.target === mobileNavOverlay || event.target.tagName === 'A') {
                mobileNavOverlay.classList.remove('show');
            }
        });
        closeMobileNav.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('show');
        });
    }


    // Initial update of account dropdown state
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.classList.replace('fa-moon', 'fa-sun');
            darkModeToggle.setAttribute('title', 'Toggle Light Mode');
        }
    }
    updateAccountDropdown(false); // Initialize account dropdown based on userLoggedIn state (default to false on page load)
});