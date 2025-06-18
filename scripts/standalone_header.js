/*
 * File: standalone_header.js
 * Description: This script handles all UI interactions for the header,
 * including search bar toggling, account dropdown, dark/light mode toggle,
 * and mobile navigation. It relies on core functions and data from main.js.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const searchIcon = document.getElementById("searchIcon");
  const searchSubheader = document.getElementById("searchSubheader");
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const suggestionsBox = document.getElementById("suggestionsBox");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const addIcon = document.getElementById("addIcon");
  const accountIcon = document.getElementById("accountIcon");
  const accountDropdown = document.getElementById("accountDropdown");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  // Ensure all necessary elements are present and main.js functions are available
  if (!searchIcon || !searchSubheader || !searchInput || !suggestionsBox ||
      !darkModeToggle || !addIcon || !accountIcon || !accountDropdown ||
      !hamburgerMenu || !mobileNavOverlay || typeof showMessageBox === 'undefined' ||
      typeof getUniqueValues === 'undefined' || typeof renderShowTitleSuggestions === 'undefined' ||
      typeof renderScopedValueSuggestions === 'undefined' || typeof showPrimarySuggestions === 'undefined' ||
      typeof updateAccountDropdown === 'undefined' || typeof toggleDarkMode === 'undefined') {
      console.error("Critical header elements or main.js functions are missing. Header functionality may be limited.");
      return; // Exit if core dependencies are not met
  }

  // State variables for search
  let searchScope = null; // Can be null (initial), a primary type (e.g., "category"), or a specific filter (e.g., "category:Hollywood")
  let selectedIndex = -1; // For keyboard navigation of suggestions

  // --- Search Functionality ---

  // Toggle search bar visibility
  searchIcon.addEventListener("click", () => {
    searchSubheader.classList.toggle("show");
    if (searchSubheader.classList.contains("show")) {
      searchInput.focus(); // Focus on input when search bar opens
      if (!searchScope) {
        showPrimarySuggestions(suggestionsBox); // Show primary filters initially
      }
    } else {
      suggestionsBox.classList.add("hidden"); // Hide suggestions when search bar closes
      searchInput.value = ""; // Clear input
      searchScope = null; // Reset search scope
      selectedIndex = -1; // Reset keyboard selection
    }
  });

  // Clear search input
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    searchScope = null; // Reset search scope
    selectedIndex = -1; // Reset keyboard selection
    showPrimarySuggestions(suggestionsBox); // Show primary filters after clearing
    searchInput.focus();
  });

  // Handle input changes in the search bar
  searchInput.addEventListener("input", () => {
    selectedIndex = -1; // Reset keyboard selection on input
    const val = searchInput.value.trim();

    if (!searchScope) {
      // No search scope selected yet
      if (val === "") {
        showPrimarySuggestions(suggestionsBox); // Show primary filters if input is empty
      } else {
        renderShowTitleSuggestions(val, null, suggestionsBox); // Directly search and suggest show titles
      }
    } else {
      // A search scope is active (e.g., "category" or "category:Hollywood")
      if (searchScope.includes(':')) {
        // If it's a specific filter (e.g., "category:Hollywood"), now search for show titles within that filter
        renderShowTitleSuggestions(val, searchScope, suggestionsBox);
      } else {
        // If it's just a primary type (e.g., "category"), show values for that type
        renderScopedValueSuggestions(val, searchScope, suggestionsBox);
      }
    }
  });

  // Handle clicks on suggestions
  suggestionsBox.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.type && target.dataset.value) {
      // User selected a specific filter value (e.g., "Hollywood")
      searchScope = `${target.dataset.type}:${target.dataset.value}`;
      searchInput.value = `${target.dataset.type}: ${target.dataset.value}`;
      suggestionsBox.classList.add("hidden");
      searchInput.focus();
      renderShowTitleSuggestions('', searchScope, suggestionsBox); // Show all shows in the selected scope
    } else if (target.dataset.type) {
      // User selected a primary filter type (e.g., "category")
      searchScope = target.dataset.type;
      searchInput.value = `${target.dataset.type}: `;
      suggestionsBox.classList.add("hidden");
      searchInput.focus();
      renderScopedValueSuggestions('', searchScope, suggestionsBox); // Show all values for that type
    } else if (target.dataset.type === "show") {
      // User selected a specific show title (direct navigation)
      const title = target.dataset.title;
      window.location.href = `details.html?title=${title}`;
    }
    selectedIndex = -1; // Reset keyboard selection after click
  });

  // Keyboard navigation for search suggestions
  searchInput.addEventListener("keydown", (e) => {
    const suggestions = suggestionsBox.querySelectorAll("div");
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
        suggestions[selectedIndex].click(); // Simulate click on the highlighted suggestion
      }
    }
  });

  function highlightSelectedSuggestion(suggestions, index) {
    suggestions.forEach((div, i) => {
      if (i === index) {
        div.classList.add("selected");
        div.scrollIntoView({ block: "nearest", inline: "nearest" }); // Scroll to highlighted
      } else {
        div.classList.remove("selected");
      }
    });
  }

  // Hide suggestions when clicking outside
  document.addEventListener("click", (event) => {
    if (!searchSubheader.contains(event.target) && event.target !== searchIcon) {
      searchSubheader.classList.remove("show");
      suggestionsBox.classList.add("hidden");
      searchInput.value = "";
      searchScope = null;
      selectedIndex = -1;
    }
  });


  // --- Account Dropdown Functionality ---
  accountIcon.addEventListener("click", () => {
    accountDropdown.classList.toggle("visible");
    // Pass user login status and username from main.js (or wherever it's truly managed)
    // For now, using placeholders until we integrate full auth
    // Assuming userLoggedIn and currentUsername are global in main.js
    updateAccountDropdown(userLoggedIn, currentUsername);
  });

  // Hide account dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!accountDropdown.contains(event.target) && event.target !== accountIcon) {
      accountDropdown.classList.remove("visible");
    }
  });

  // --- Dark Mode Toggle ---
  darkModeToggle.addEventListener("click", () => {
    // Call the global function from main.js
    toggleDarkMode();
  });

  // --- Add Icon Functionality ---
  addIcon.addEventListener('click', (event) => {
      // Prevent default navigation if it's a link
      event.preventDefault();

      // Assuming `userLoggedIn` is a global variable from main.js
      if (userLoggedIn) {
          showMessageBox("Proceeding to add show feature! (Not yet implemented)", "fas fa-check-circle green-icon");
          // In a real app, you'd navigate to an add show page or open a modal
          // window.location.href = "add-show-page.html";
      } else {
          showMessageBox("You must be logged in to add shows to your playlist!", "fas fa-exclamation-triangle red-icon");
      }
  });

  // --- Mobile Navigation (Hamburger Menu) ---
  hamburgerMenu.addEventListener('click', () => {
      mobileNavOverlay.classList.add('show');
  });

  // Close mobile nav when clicking on overlay itself or a link inside
  mobileNavOverlay.addEventListener('click', (event) => {
      if (event.target === mobileNavOverlay || event.target.tagName === 'A') {
          mobileNavOverlay.classList.remove('show');
      }
  });

});
