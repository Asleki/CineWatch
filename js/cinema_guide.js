// Placeholder for user login status - in a real app, this would come from backend
let userLoggedIn = false; // Default to not logged in

// --- Utility Functions ---
function showMessageBox(message, iconClass = "fas fa-info-circle blue-icon") {
    const customAlertOverlay = document.getElementById('customAlertOverlay');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');

    alertMessage.textContent = message;
    alertIcon.className = `alert-icon ${iconClass}`; // Set icon and its color
    customAlertOverlay.classList.add('show');
}

function hideMessageBox() {
    const customAlertOverlay = document.getElementById('customAlertOverlay');
    customAlertOverlay.classList.remove('show');
}

// Function to update account dropdown content based on login status
function updateAccountDropdown(isLoggedIn) {
    const accountDropdown = document.getElementById('accountDropdown');
    accountDropdown.innerHTML = ''; // Clear existing content

    if (isLoggedIn) {
        accountDropdown.innerHTML = `
            <a href="profile.html"><i class="fas fa-user-circle"></i> Profile</a>
            <a href="playlist.html"><i class="fas fa-list-ul"></i> My Playlist</a>
            <a href="#" class="logout-item" id="logoutButton"><i class="fas fa-sign-out-alt"></i> Logout</a>
        `;
        document.getElementById('logoutButton').addEventListener('click', (event) => {
            event.preventDefault();
            userLoggedIn = false;
            updateAccountDropdown(userLoggedIn);
            showMessageBox("You have been successfully logged out!", "fas fa-check-circle green-icon");
            // In a real app, you'd also clear session/token here
        });
        // Update mobile auth button
        document.getElementById('mobileAuthButton').textContent = 'Logout';
        document.getElementById('mobileAuthButton').classList.remove('mobile-login-btn');
        document.getElementById('mobileAuthButton').classList.add('mobile-logout-btn');
    } else {
        accountDropdown.innerHTML = `
            <a href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a>
            <a href="signup.html"><i class="fas fa-user-plus"></i> Sign Up</a>
        `;
         // Update mobile auth button
        document.getElementById('mobileAuthButton').textContent = 'Login / Sign Up';
        document.getElementById('mobileAuthButton').classList.remove('mobile-logout-btn');
        document.getElementById('mobileAuthButton').classList.add('mobile-login-btn');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after 1 second
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1000);

    const searchIcon = document.getElementById('searchIcon');
    const searchSubheader = document.getElementById('searchSubheader');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const suggestionsBox = document.getElementById('suggestionsBox');
    const accountIcon = document.getElementById('accountIcon');
    const accountDropdown = document.getElementById('accountDropdown');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeMobileNav = document.getElementById('closeMobileNav');
    const closeAlertBtn = document.getElementById('closeAlertBtn');

    // Close alert message
    if (closeAlertBtn) {
        closeAlertBtn.addEventListener('click', hideMessageBox);
    }

    // --- Search Functionality ---
    if (searchIcon && searchSubheader && searchInput && clearSearchBtn && suggestionsBox) {
        searchIcon.addEventListener('click', () => {
            searchSubheader.classList.toggle('visible');
            if (searchSubheader.classList.contains('visible')) {
                searchInput.focus();
            }
            accountDropdown.classList.remove('visible'); // Close account dropdown if open
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            suggestionsBox.classList.remove('visible');
            suggestionsBox.innerHTML = '';
        });

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                clearSearchBtn.style.display = 'block';
                // Simulate search suggestions
                const suggestions = [
                    'Oppenheimer', 'Barbie', 'Dune Part Two', 'Cinema Paradiso',
                    'Inception', 'Interstellar', 'The Matrix', 'Pulp Fiction',
                    'The Shawshank Redemption', 'The Dark Knight', 'Fight Club'
                ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
                renderSuggestions(suggestions);
            } else {
                clearSearchBtn.style.display = 'none';
                suggestionsBox.classList.remove('visible');
            }
        });

        function renderSuggestions(suggestions) {
            suggestionsBox.innerHTML = '';
            if (suggestions.length > 0) {
                suggestions.forEach(suggestion => {
                    const div = document.createElement('div');
                    div.classList.add('suggestion-item');
                    div.textContent = suggestion;
                    div.addEventListener('click', () => {
                        searchInput.value = suggestion;
                        suggestionsBox.classList.remove('visible');
                        // In a real app, you'd navigate to a search results page or filter content
                        showMessageBox(`Searching for "${suggestion}"...`, "fas fa-search blue-icon");
                    });
                    suggestionsBox.appendChild(div);
                });
                suggestionsBox.classList.add('visible');
            } else {
                suggestionsBox.classList.remove('visible');
            }
        }

        // Close search subheader if clicked outside
        document.addEventListener('click', (event) => {
            if (!searchIcon.contains(event.target) && !searchSubheader.contains(event.target)) {
                searchSubheader.classList.remove('visible');
                suggestionsBox.classList.remove('visible');
            }
        });
    }


    // --- Account Dropdown Functionality ---
    if (accountIcon && accountDropdown) {
        accountIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from closing immediately
            accountDropdown.classList.toggle('visible');
            searchSubheader.classList.remove('visible'); // Close search if open
            suggestionsBox.classList.remove('visible');
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!accountIcon.contains(event.target) && !accountDropdown.contains(event.target)) {
                accountDropdown.classList.remove('visible');
            }
        });
    }

    // --- Dark Mode Toggle ---
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.classList.replace('fa-moon', 'fa-sun');
                darkModeToggle.setAttribute('title', 'Toggle Light Mode');
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.classList.replace('fa-sun', 'fa-moon');
                darkModeToggle.setAttribute('title', 'Toggle Dark Mode');
            }
        });
    }

    // --- Mobile Navigation (Hamburger Menu) ---
    if (hamburgerMenu && mobileNavOverlay && closeMobileNav) {
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
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.classList.replace('fa-moon', 'fa-sun');
            darkModeToggle.setAttribute('title', 'Toggle Light Mode');
        }
    }
    updateAccountDropdown(false); // Initialize account dropdown based on userLoggedIn state (default to false on page load)

    // Update the current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Last Modified Date (footer)
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleDateString();
    } else {
        console.warn("Last Modified span not found.");
    }
});