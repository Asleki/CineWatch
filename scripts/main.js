/*
 * File: main.js
 * Description: Consolidated core application data, hero slideshow logic,
 * show card rendering, carousel functionality, quote management,
 * and essential utility functions for CineWatch.
 * This version includes a redesigned show card layout and enhanced carousel behavior,
 * and now places hero show posters and quotes into separate cards.
 */

// --- Data Definitions (Consolidated from multiple original JS files) ---

// Data for hero slides (used on homepage/discover.html)
const heroSlides = [
    {
        backdrop: 'images/herobackdrops/allofusaredeadbackdrop.webp',
        poster: 'images/heroposters/allofusaredeadheroposter.webp',
        quote: 'We’re trapped, surrounded by dead things… and by dead people.',
    },
    {
        backdrop: 'images/herobackdrops/breakingbadbackdrop.webp',
        poster: 'images/heroposters/breakingbadheroposter.webp',
        quote: 'I am the one who knocks!',
    },
    {
        backdrop: 'images/herobackdrops/extractionbackdrop.webp',
        poster: 'images/heroposters/extractionheroposter.webp',
        quote: 'You send a boy to do a man\'s job.',
    },
    {
        backdrop: 'images/herobackdrops/moneyheistbackdrop.webp',
        poster: 'images/heroposters/moneyheistheroposter.webp',
        quote: 'The police are just like us. They\'re just doing their job.',
    },
    {
        backdrop: 'images/herobackdrops/prisonbreakbackdrop.webp',
        poster: 'images/heroposters/prisonbreakheroposter.webp',
        quote: 'Get yourself a plan and stick to it.',
    },
    {
        backdrop: 'images/herobackdrops/theboysbackdrop.webp',
        poster: 'images/heroposters/theboysheroposter.webp',
        quote: 'Supes are everywhere. You gotta be careful.',
    },
    {
        backdrop: 'images/herobackdrops/thelastofusbackdrop.webp',
        poster: 'images/heroposters/thelastofusheroposter.webp',
        quote: 'You keep finding something to fight for.',
    },
    {
        backdrop: 'images/herobackdrops/wednesdaybackdrop.webp',
        poster: 'images/heroposters/wednesdayheroposter.webp',
        quote: 'I act as if I do not care, but deep down... I actually do not care.',
    },
];

// Placeholder for user login status (controlled by account dropdown logic)
// In a real app, this would be managed via session storage or a backend API
let userLoggedIn = false; // Default to false

// --- Utility Functions ---

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
        // Clear existing icon classes and add new ones
        alertIcon.className = 'alert-icon ' + iconClasses;
        customAlert.classList.add('show'); // Make the alert visible

        // Add event listener to close button (remove it after click to prevent multiple listeners)
        const closeHandler = () => {
            customAlert.classList.remove('show');
            closeAlertBtn.removeEventListener('click', closeHandler);
        };
        closeAlertBtn.addEventListener('click', closeHandler);

        // Optionally, close when clicking outside the alert content
        const overlayClickHandler = (event) => {
            if (event.target === customAlert) {
                customAlert.classList.remove('show');
                customAlert.removeEventListener('click', overlayClickHandler);
            }
        };
        customAlert.addEventListener('click', overlayClickHandler);
    } else {
        console.error("MessageBox elements not found. Cannot show message.");
        // Fallback for critical errors (though this shouldn't happen with correct HTML)
        // alert(message);
    }
}

/**
 * Toggles dark mode on/off.
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Update dark mode icon (moon for light, sun for dark)
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

    if (isLoggedIn) {
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'block'; // Show profile link
        if (logoutLink) logoutLink.style.display = 'block';   // Show logout link
        if (mobileLoginLink) mobileLoginLink.style.display = 'none';
        if (mobileLogoutLink) mobileLogoutLink.style.display = 'block';
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (registerLink) registerLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
        if (mobileLoginLink) mobileLoginLink.style.display = 'block';
        if (mobileLogoutLink) mobileLogoutLink.style.display = 'none';
    }
    userLoggedIn = isLoggedIn; // Update global login status
}

/**
 * Generates an array of unique values for a specified key from a dataset.
 * Used for populating search suggestions (e.g., unique genres, titles).
 * @param {Array<Object>} data - The dataset (e.g., showsData).
 * @param {string} key - The key to extract unique values from (e.g., 'genre', 'title').
 * @returns {Array<string>} An array of unique string values, sorted alphabetically.
 */
function getUniqueValues(data, key) {
    if (!data || !Array.isArray(data)) return [];
    const unique = new Set();
    data.forEach(item => {
        if (item[key]) {
            if (Array.isArray(item[key])) { // For keys like 'genre' which might be arrays
                item[key].forEach(subItem => unique.add(subItem.trim()));
            } else {
                unique.add(item[key].trim());
            }
        }
    });
    return Array.from(unique).sort();
}

/**
 * Renders primary search suggestions (e.g., top genres or keywords).
 * This is a placeholder; real implementation would fetch/determine popular terms.
 * @param {HTMLElement} container - The DOM element to render suggestions into.
 */
function showPrimarySuggestions(container) {
    container.innerHTML = ''; // Clear previous
    const suggestions = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Animation'];
    suggestions.forEach(s => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item', 'primary-suggestion');
        div.textContent = s;
        // In a real app, clicking this would trigger a search
        div.addEventListener('click', () => {
            document.getElementById('searchInput').value = s;
            // Optionally, trigger a search or navigate
            showMessageBox(`Searching for category: ${s}`);
            container.innerHTML = ''; // Clear suggestions
        });
        container.appendChild(div);
    });
    container.classList.add('visible');
}

/**
 * Renders scoped suggestions based on a specific attribute (e.g., genres for a show).
 * This is not currently used in the search input but is a helper for structured search.
 * @param {HTMLElement} container - The DOM element to render suggestions into.
 * @param {string[]} values - An array of values to suggest.
 * @param {string} scope - The scope/type of the suggestion (e.g., 'genre', 'actor').
 */
function renderScopedValueSuggestions(container, values, scope) {
    container.innerHTML = ''; // Clear previous
    if (values.length === 0) {
        container.classList.remove('visible');
        return;
    }
    values.forEach(value => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = `${value} (${scope})`;
        div.dataset.value = value;
        div.dataset.scope = scope;
        container.appendChild(div);
    });
    container.classList.add('visible');
}

/**
 * Renders show title suggestions based on user input.
 * @param {HTMLElement} container - The DOM element to render suggestions into.
 * @param {string[]} titles - An array of matching show titles.
 */
function renderShowTitleSuggestions(container, titles) {
    container.innerHTML = ''; // Clear previous
    if (titles.length === 0) {
        container.classList.remove('visible');
        return;
    }
    titles.slice(0, 10).forEach(title => { // Limit to 10 suggestions
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = title;
        div.addEventListener('click', () => {
            document.getElementById('searchInput').value = title;
            showMessageBox(`Searching for show: ${title}`);
            container.innerHTML = ''; // Clear suggestions
        });
        container.appendChild(div);
    });
    container.classList.add('visible');
}

// --- Hero Slideshow Logic ---
let currentSlideIndex = 0;

/**
 * Renders the current hero slide based on `currentSlideIndex`.
 * Updates background, poster, and quote.
 */
function renderHeroSlides() {
    const heroSection = document.getElementById('heroSection');
    const heroPoster = document.getElementById('heroPoster');
    const heroQuote = document.getElementById('heroQuote');

    if (heroSection && heroPoster && heroQuote && heroSlides.length > 0) {
        const slide = heroSlides[currentSlideIndex];
        heroSection.style.backgroundImage = `url('${slide.backdrop}')`;
        heroPoster.src = slide.poster;
        heroQuote.textContent = slide.quote;
    }
}

/**
 * Navigates to the previous hero slide.
 */
function showPrevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + heroSlides.length) % heroSlides.length;
    renderHeroSlides();
}

/**
 * Navigates to the next hero slide.
 */
function showNextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    renderHeroSlides();
}

// --- Dynamic Content Rendering (Show Cards & Carousels) ---

// Placeholder for show data (In a real app, this would come from a database/API)
const showsData = [
    {
        id: 'breakingbad',
        title: 'Breaking Bad',
        poster: 'images/showposters/breakingbadposter.webp',
        genre: ['Drama', 'Crime', 'Thriller'],
        year: 2008,
        rating: 9.5,
        description: 'A high school chemistry teacher diagnosed with lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
        isFeatured: true,
        cast: [
            { name: "Bryan Cranston", bio: "Best known for playing Walter White in Breaking Bad.", appearances: ["Malcolm in the Middle"] },
            { name: "Aaron Paul", bio: "Known for his role as Jesse Pinkman in Breaking Bad.", appearances: ["BoJack Horseman"] },
            { name: "Anna Gunn", bio: "Portrayed Skyler White in Breaking Bad.", appearances: ["Deadwood"] }
        ]
    },
    {
        id: 'moneyheist',
        title: 'Money Heist',
        poster: 'images/showposters/moneyheistposter.webp',
        genre: ['Crime', 'Drama', 'Thriller'],
        year: 2017,
        rating: 8.3,
        description: 'A mysterious man, "The Professor", recruits a band of eight robbers who take hostages and lock themselves in the Royal Mint of Spain as part of his elaborate plan to execute the biggest heist in history.',
        isFeatured: true,
        cast: [
            { name: "Úrsula Corberó", bio: "Plays Tokyo in Money Heist.", appearances: ["Snatch"] },
            { name: "Álvaro Morte", bio: "Known as The Professor in Money Heist.", appearances: ["The Wheel of Time"] },
            { name: "Itziar Ituño", bio: "Portrays Raquel Murillo (Lisbon) in Money Heist.", appearances: ["Loreak"] }
        ]
    },
    {
        id: 'strangerthings',
        title: 'Stranger Things',
        poster: 'images/showposters/strangerthingsposter.webp',
        genre: ['Sci-Fi', 'Horror', 'Drama', 'Fantasy'],
        year: 2016,
        rating: 8.7,
        description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
        isFeatured: false,
        cast: [
            { name: "Millie Bobby Brown", bio: "Plays Eleven in Stranger Things.", appearances: ["Enola Holmes"] },
            { name: "Finn Wolfhard", bio: "Portrays Mike Wheeler in Stranger Things.", appearances: ["IT"] },
            { name: "Winona Ryder", bio: "Known for her role as Joyce Byers in Stranger Things.", appearances: ["Beetlejuice"] }
        ]
    },
    {
        id: 'theboys',
        title: 'The Boys',
        poster: 'images/showposters/theboysposter.webp',
        genre: ['Action', 'Comedy', 'Drama', 'Sci-Fi'],
        year: 2019,
        rating: 8.7,
        description: 'A group of vigilantes known informally as "The Boys" set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.',
        isFeatured: true,
        cast: [
            { name: "Karl Urban", bio: "Plays Billy Butcher in The Boys.", appearances: ["Lord of the Rings"] },
            { name: "Jack Quaid", bio: "Portrays Hughie Campbell in The Boys.", appearances: ["Scream"] },
            { name: "Antony Starr", bio: "Known for his role as Homelander in The Boys.", appearances: ["Banshee"] }
        ]
    },
    {
        id: 'wednesday',
        title: 'Wednesday',
        poster: 'images/showposters/wednesdayposter.webp',
        genre: ['Comedy', 'Crime', 'Fantasy'],
        year: 2022,
        rating: 8.2,
        description: 'Wednesday Addams investigates a monstrous mystery at the school she attends.',
        isFeatured: false,
        cast: [
            { name: "Jenna Ortega", bio: "Plays Wednesday Addams.", appearances: ["Scream"] },
            { name: "Gwendoline Christie", bio: "Portrays Larissa Weems.", appearances: ["Game of Thrones"] },
            { name: "Catherine Zeta-Jones", bio: "Known as Morticia Addams.", appearances: ["Chicago"] }
        ]
    },
    {
        id: 'thecrown',
        title: 'The Crown',
        poster: 'images/showposters/thecrownposter.webp',
        genre: ['Drama', 'History', 'Biography'],
        year: 2016,
        rating: 8.7,
        description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
        isFeatured: false,
        cast: [
            { name: "Claire Foy", bio: "Played Queen Elizabeth II in early seasons.", appearances: ["First Man"] },
            { name: "Olivia Colman", bio: "Played Queen Elizabeth II in middle seasons.", appearances: ["The Favourite"] },
            { name: "Imelda Staunton", bio: "Played Queen Elizabeth II in later seasons.", appearances: ["Harry Potter"] }
        ]
    },
    {
        id: 'thequeensgambit',
        title: 'The Queen\'s Gambit',
        poster: 'images/showposters/thequeensgambitposter.webp',
        genre: ['Drama'],
        year: 2020,
        rating: 8.6,
        description: 'Orphaned at nine, prodigious chess prodigy Beth Harmon struggles with addiction in a quest to become the greatest chess player in the world.',
        isFeatured: false,
        cast: [
            { name: "Anya Taylor-Joy", bio: "Plays Beth Harmon.", appearances: ["The Witch"] },
            { name: "Thomas Brodie-Sangster", bio: "Portrays Benny Watts.", appearances: ["Love Actually"] }
        ]
    },
    {
        id: 'allofusaredead',
        title: 'All of Us Are Dead',
        poster: 'images/showposters/allofusaredeadposter.webp',
        genre: ['Action', 'Drama', 'Fantasy', 'Horror'],
        year: 2022,
        rating: 7.5,
        description: 'A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out or turn into one of the infected.',
        isFeatured: true,
        cast: [
            { name: "Park Ji-hu", bio: "Plays Nam On-jo.", appearances: ["House of Hummingbird"] },
            { name: "Yoon Chan-young", bio: "Portrays Lee Cheong-san.", appearances: ["Doctor John"] }
        ]
    },
    {
        id: 'squidgame',
        title: 'Squid Game',
        poster: 'images/showposters/squidgameposter.webp',
        genre: ['Action', 'Drama', 'Mystery', 'Thriller'],
        year: 2021,
        rating: 8.0,
        description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
        isFeatured: false,
        cast: [
            { name: "Lee Jung-jae", bio: "Plays Seong Gi-hun.", appearances: ["Deliver Us From Evil"] },
            { name: "Park Hae-soo", bio: "Portrays Cho Sang-woo.", appearances: ["Prison Playbook"] }
        ]
    },
    {
        id: 'thelastofus',
        title: 'The Last of Us',
        poster: 'images/showposters/thelastofusposter.webp',
        genre: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
        year: 2023,
        rating: 8.8,
        description: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity\'s last hope.',
        isFeatured: true,
        cast: [
            { name: "Pedro Pascal", bio: "Plays Joel Miller.", appearances: ["The Mandalorian"] },
            { name: "Bella Ramsey", bio: "Portrays Ellie Williams.", appearances: ["Game of Thrones"] }
        ]
    },
    {
        id: 'thewitcher',
        title: 'The Witcher',
        poster: 'images/showposters/thewitcherposter.webp',
        genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
        year: 2019,
        rating: 8.2,
        description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
        isFeatured: false,
        cast: [
            { name: "Henry Cavill", bio: "Plays Geralt of Rivia.", appearances: ["Man of Steel"] },
            { name: "Freya Allan", bio: "Portrays Ciri.", appearances: ["The War of the Worlds"] }
        ]
    },
    {
        id: 'arcane',
        title: 'Arcane',
        poster: 'images/showposters/arcaneposter.webp',
        genre: ['Animation', 'Action', 'Adventure', 'Fantasy'],
        year: 2021,
        rating: 9.0,
        description: 'Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League of Legends champions and the power that will tear them apart.',
        isFeatured: false,
        cast: [
            { name: "Hailee Steinfeld", bio: "Voice of Vi.", appearances: ["Bumblebee"] },
            { name: "Ella Purnell", bio: "Voice of Jinx.", appearances: ["Yellowjackets"] }
        ]
    },
    {
        id: 'peakyblinders',
        title: 'Peaky Blinders',
        poster: 'images/showposters/peakyblindersposter.webp',
        genre: ['Crime', 'Drama'],
        year: 2013,
        rating: 8.8,
        description: 'A gangster family epic set in Birmingham, England in 1919, centering on a gang who sew razor blades in the peaks of their caps, and their ferocious boss Tommy Shelby.',
        isFeatured: false,
        cast: [
            { name: "Cillian Murphy", bio: "Plays Thomas Shelby.", appearances: ["Inception"] },
            { name: "Helen McCrory", bio: "Portrays Polly Gray.", appearances: ["Harry Potter"] }
        ]
    },
    {
        id: 'dark',
        title: 'Dark',
        poster: 'images/showposters/darkposter.webp',
        genre: ['Crime', 'Drama', 'Mystery', 'Sci-Fi'],
        year: 2017,
        rating: 8.7,
        description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the double lives and fractured relationships among four families.',
        isFeatured: false,
        cast: [
            { name: "Louis Hofmann", bio: "Plays Jonas Kahnwald.", appearances: ["Land of Mine"] },
            { name: "Lisa Vicari", bio: "Portrays Martha Nielsen.", appearances: ["Isi & Ossi"] }
        ]
    },
    {
        id: 'theoffice_us',
        title: 'The Office (US)',
        poster: 'images/showposters/theofficeposter.webp',
        genre: ['Comedy'],
        year: 2005,
        rating: 9.0,
        description: 'A mockumentary on the everyday lives of a group of office employees in the Scranton, Pennsylvania, branch of the fictional Dunder Mifflin Paper Company.',
        isFeatured: false,
        cast: [
            { name: "Steve Carell", bio: "Plays Michael Scott.", appearances: ["Despicable Me"] },
            { name: "Rainn Wilson", bio: "Portrays Dwight Schrute.", appearances: ["Megamind"] },
            { name: "John Krasinski", bio: "Known for his role as Jim Halpert.", appearances: ["A Quiet Place"] }
        ]
    },
    {
        id: 'friends',
        title: 'Friends',
        poster: 'images/showposters/friendsposter.webp',
        genre: ['Comedy', 'Romance'],
        year: 1994,
        rating: 8.9,
        description: 'Follows the personal and professional lives of six twenty-somethings living in Manhattan.',
        isFeatured: false,
        cast: [
            { name: "Jennifer Aniston", bio: "Plays Rachel Green.", appearances: ["Bruce Almighty"] },
            { name: "Courteney Cox", bio: "Portrays Monica Geller.", appearances: ["Scream"] },
            { name: "Lisa Kudrow", bio: "Plays Phoebe Buffay.", appearances: ["Romy and Michele's High School Reunion"] }
        ]
    },
    {
        id: 'gameofthrones',
        title: 'Game of Thrones',
        poster: 'images/showposters/gameofthronesposter.webp',
        genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
        year: 2011,
        rating: 9.3,
        description: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.',
        isFeatured: false,
        cast: [
            { name: "Emilia Clarke", bio: "Plays Daenerys Targaryen.", appearances: ["Me Before You"] },
            { name: "Kit Harington", bio: "Portrays Jon Snow.", appearances: ["Eternals"] },
            { name: "Peter Dinklage", bio: "Known for his role as Tyrion Lannister.", appearances: ["The Chronicles of Narnia"] }
        ]
    },
    {
        id: 'thewalkingdead',
        title: 'The Walking Dead',
        poster: 'images/showposters/thewalkingdeadposter.webp',
        genre: ['Drama', 'Horror', 'Sci-Fi', 'Thriller'],
        year: 2010,
        rating: 8.1,
        description: 'Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive.',
        isFeatured: true,
        cast: [
            { name: "Andrew Lincoln", bio: "Plays Rick Grimes.", appearances: ["Love Actually"] },
            { name: "Norman Reedus", bio: "Portrays Daryl Dixon.", appearances: ["Death Stranding"] }
        ]
    },
    {
        id: 'chernobyl',
        title: 'Chernobyl',
        poster: 'images/showposters/chernobylposter.webp',
        genre: ['Drama', 'History', 'Thriller'],
        year: 2019,
        rating: 9.4,
        description: 'In April 1986, an explosion at the Chernobyl nuclear power plant in the Ukrainian SSR becomes one of the world\'s worst man-made catastrophes.',
        isFeatured: false,
        cast: [
            { name: "Jared Harris", bio: "Plays Valery Legasov.", appearances: ["The Curious Case of Benjamin Button"] },
            { name: "Stellan Skarsgård", bio: "Portrays Boris Shcherbina.", appearances: ["Pirates of the Caribbean"] }
        ]
    },
    {
        id: 'extraction',
        title: 'Extraction',
        poster: 'images/showposters/extractionposter.webp',
        genre: ['Action', 'Thriller'],
        year: 2020,
        rating: 6.7,
        description: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.',
        isFeatured: true,
        cast: [
            { name: "Chris Hemsworth", bio: "Plays Tyler Rake.", appearances: ["Thor"] },
            { name: "Randeep Hooda", bio: "Portrays Saju Rav.", appearances: ["Highway"] }
        ]
    },
    {
        id: "prisonbreak_series",
        title: "Prison Break",
        poster: "images/showposters/prisonbreakposter1.webp",
        genre: ["Action", "Hollywood", "Crime", "Drama", "Thriller"],
        year: 2005,
        rating: 8.3,
        description: "When his brother, Lincoln Burrows, is wrongly sentenced to death, a structural engineer, Michael Scofield, devises an elaborate plan to break him out of prison—starting by getting incarcerated himself. A thrilling ride full of twists, tension, and brotherly loyalty as they navigate their escape and evade authorities.",
        isFeatured: true,
        cast: [
            { name: "Wentworth Miller", bio: "Plays Michael Scofield.", appearances: ["The Flash"] },
            { name: "Dominic Purcell", bio: "Portrays Lincoln Burrows.", appearances: ["Legends of Tomorrow"] },
            { name: "Sarah Wayne Callies", bio: "Plays Dr. Sara Tancredi.", appearances: ["The Walking Dead"] }
        ]
    },
    {
        id: "inception_movie",
        title: "Inception",
        poster: "images/showposters/inceptioposter1.webp",
        genre: ["Hollywood", "Action", "Sci-Fi", "Thriller"],
        year: 2010,
        rating: 8.8,
        description: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the mission and his team to disaster.",
        isFeatured: false,
        cast: [
            { name: "Leonardo DiCaprio", bio: "Plays Dom Cobb.", appearances: ["Titanic"] },
            { name: "Joseph Gordon-Levitt", bio: "Portrays Arthur.", appearances: ["500 Days of Summer"] },
            { name: "Elliot Page", bio: "Plays Ariadne.", appearances: ["Juno"] }
        ]
    },
    {
        id: "yourhonor_series",
        title: "Your Honor",
        poster: "images/showposters/yourhonorposter1.webp",
        genre: ["Hollywood", "Coming Soon", "Crime", "Drama", "Thriller"],
        year: 2024, // Assuming 2024 for "Expected Premier"
        rating: "Expected",
        description: "A respected New Orleans judge's life is turned upside down when his teenage son is involved in a hit-and-run, leading to a high-stakes game of lies, deceit, and impossible choices to protect his family. Season 3 is highly anticipated.",
        isFeatured: false,
        cast: [
            { name: "Bryan Cranston", bio: "Plays Michael Desiato, the judge.", appearances: ["Breaking Bad"] },
            { name: "Hunter Doohan", bio: "Portrays Adam Desiato, Michael's son.", appearances: ["Wednesday"] }
        ]
    },
    {
        id: "3idiots_movie",
        title: "3 Idiots",
        poster: "images/showposters/3idiotsposter1.webp",
        genre: ["Bollywood", "Comedy", "Drama", "Romance"],
        year: 2009,
        rating: 8.4,
        description: "Two friends embark on a quest for a third, long-lost friend, while reminiscing about their college days and the profound impact their eccentric, brilliant buddy had on their lives and perspectives on education and success.",
        isFeatured: false,
        cast: [
            { name: "Aamir Khan", bio: "Plays Rancho.", appearances: ["Dangal"] },
            { name: "R. Madhavan", bio: "Portrays Farhan Qureshi.", appearances: ["Rehnaa Hai Terre Dil Mein"] },
            { name: "Sharman Joshi", bio: "Plays Raju Rastogi.", appearances: ["Rang De Basanti"] }
        ]
    },
    {
        id: "ghoul_series",
        title: "Ghoul",
        poster: "images/showposters/ghoulposter1.webp",
        genre: ["Bollywood", "Horror", "Thriller"],
        year: 2018,
        rating: 7.1,
        description: "A newly appointed interrogator arrives at a remote military detention center to question a dangerous terrorist, only to discover that the detainee is not what he seems and harbors a terrifying supernatural entity.",
        isFeatured: false,
        cast: [
            { name: "Radhika Apte", bio: "Plays Nida Rahim.", appearances: ["Sacred Games"] },
            { name: "Manav Kaul", bio: "Portrays Colonel Dacunha.", appearances: ["Jolly LLB 2"] }
        ]
    },
    {
        id: "dangal_movie",
        title: "Dangal",
        poster: "images/showposters/dangalposter1.webp",
        genre: ["Bollywood", "Biography", "Drama", "Sport"],
        year: 2016,
        rating: 8.3,
        description: "Based on the true story of Mahavir Singh Phogat, a former wrestler who trains his daughters Geeta Phogat and Babita Kumari to become world-class female wrestlers, challenging societal norms and achieving international success.",
        isFeatured: false,
        cast: [
            { name: "Aamir Khan", bio: "Plays Mahavir Singh Phogat.", appearances: ["3 Idiots"] },
            { name: "Fatima Sana Shaikh", bio: "Portrays Geeta Phogat.", appearances: ["Thugs of Hindostan"] }
        ]
    },
    {
        id: "nairobihalflife_movie",
        title: "Nairobi Half Life",
        poster: "images/showposters/nairobihalflifeposter1.webp",
        genre: ["Kenyan Drama", "Crime", "Drama"],
        year: 2012,
        rating: 7.8,
        description: "Nairobi Half Life tells the story of Mwas, an aspiring actor from a rural town who travels to Nairobi to pursue his dreams. Faced with harsh city life, he’s pulled into a world of crime and must struggle to stay true to his dreams while surviving the city’s brutal realities. It's a powerful and gritty portrayal of urban life in Kenya.",
        isFeatured: false,
        cast: [
            { name: "Joseph Wairimu", bio: "Plays Mwas.", appearances: ["Disconnect"] },
            { name: "Olwenya Maina", bio: "Portrays Oti.", appearances: ["Poacher"] }
        ]
    },
    {
        id: "crimeandjustice_series",
        title: "Crime and Justice",
        poster: "images/showposters/crimeandjusticeposter1.webp",
        genre: ["Kenyan Drama", "Trending", "Coming Soon", "Crime", "Drama", "Legal"],
        year: 2021,
        rating: 7.0,
        description: "A Kenyan police procedural series that follows two detectives as they investigate various crimes in Nairobi. The show delves into the dark side of the city, exploring themes of corruption, greed, and the pursuit of justice.",
        isFeatured: true,
        cast: [
            { name: "Sarah Hassan", bio: "Plays Detective Makena.", appearances: ["Just In Time"] },
            { name: "Alfred Munyua", bio: "Portrays Detective Silas.", appearances: ["Sense8"] }
        ]
    },
    {
        id: "dayofthejackal_series",
        title: "The Day Of The Jackal",
        poster: "images/showposters/thedayofthejackalposter1.webp",
        genre: ["International", "Coming Soon", "Thriller"],
        year: 2024, // Assuming 2024 for "Expected Premier"
        rating: "Expected",
        description: "An upcoming modern-day reimagining of the iconic novel and film, following a professional assassin known as 'The Jackal' as he undertakes a mission to assassinate a high-profile target.",
        isFeatured: false,
        cast: [
            { name: "Eddie Redmayne", bio: "Plays The Jackal.", appearances: ["The Theory of Everything"] },
            { name: "Lashana Lynch", bio: "Plays a MI6 agent.", appearances: ["No Time to Die"] }
        ]
    },
    {
        id: "traintobusan_movie",
        title: "Train To Busan",
        poster: "images/showposters/traintobusanposter1.webp",
        genre: ["K-Drama", "Action", "Horror", "Thriller"],
        year: 2016,
        rating: 7.6,
        description: "While a zombie apocalypse breaks out in South Korea, a father and daughter, along with other passengers, are trapped on a high-speed train fighting for their lives as the infection spreads rapidly.",
        isFeatured: false,
        cast: [
            { name: "Gong Yoo", bio: "Plays Seok-woo.", appearances: ["Goblin"] },
            { name: "Jung Yu-mi", bio: "Portrays Seong-kyeong.", appearances: ["Kim Ji-young, Born 1982"] }
        ]
    },
    {
        id: "secondwife_series",
        title: "Second Wife",
        poster: "images/showposters/secondfamilyposter1.webp",
        genre: ["Kenyan Drama", "Coming Soon", "Drama"],
        year: "TBA",
        rating: "Expected",
        description: "Details for 'Second Wife' are scarce, but it's expected to be a compelling Kenyan drama exploring familial and marital complexities, possibly revolving around the theme of polygamy or a new spouse in a family.",
        isFeatured: false,
        cast: [
            { name: "Brenda Wairimu", bio: "Prominent Kenyan actress.", appearances: ["Disconnect"] },
            { name: "Daniel Weke", bio: "Kenyan actor.", appearances: ["Pray & Prey"] }
        ]
    },
    {
        id: "40sticks_movie",
        title: "40 Sticks",
        poster: "images/showposters/40sticksposter1.webp",
        genre: ["Kenyan Drama", "Action", "Crime", "Thriller"],
        year: 2020,
        rating: 6.2,
        description: "When a prison bus crashes in the middle of a forest, a group of convicts must work together to survive the harsh wilderness while evading an unknown, deadly threat lurking in the shadows.",
        isFeatured: false,
        cast: [
            { name: "Robert Agengo", bio: "Plays inmate 'Zulu'.", appearances: ["Selina"] },
            { name: "Mwaura Bilal", bio: "Plays inmate 'Chaos'.", appearances: ["Nafsi"] }
        ]
    },
    {
        id: "kingdom_series",
        title: "Kingdom",
        poster: "images/showposters/kingdomposter1.webp",
        genre: ["K-Drama", "Action", "Horror", "Thriller"],
        year: 2019,
        rating: 8.3,
        description: "While strange rumors about their ill King grip a kingdom, the crown prince becomes their only hope against a mysterious plague that is turning people into zombies.",
        isFeatured: false,
        cast: [
            { name: "Ju Ji-hoon", bio: "Plays Crown Prince Lee Chang.", appearances: ["Princess Hours"] },
            { name: "Ryu Seung-ryong", bio: "Portrays Cho Hak-ju.", appearances: ["Miracle in Cell No. 7"] }
        ]
    },
    {
        id: "thegoodplace",
        title: "The Good Place",
        poster: "images/showposters/thegoodplaceposter.webp",
        genre: ['Comedy', 'Fantasy', 'Drama'],
        year: 2016,
        rating: 8.2,
        description: 'Four people and their otherworldly architect struggle in the afterlife to define what it means to be good.',
        isFeatured: false,
        cast: [
            { name: "Kristen Bell", bio: "Plays Eleanor Shellstrop.", appearances: ["Frozen"] },
            { name: "Ted Danson", bio: "Portrays Michael.", appearances: ["Cheers"] }
        ]
    },
    {
        id: "mandolorian",
        title: "The Mandalorian",
        poster: "images/showposters/mandolorianposter.webp",
        genre: ['Sci-Fi', 'Action', 'Adventure'],
        year: 2019,
        rating: 8.7,
        description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
        isFeatured: true,
        cast: [
            { name: "Pedro Pascal", bio: "Plays Din Djarin (The Mandalorian).", appearances: ["The Last of Us"] },
            { name: "Grogu (Baby Yoda)", bio: "A Force-sensitive infant.", appearances: ["None (original character)"] }
        ]
    },
    {
        id: "severance",
        title: "Severance",
        poster: "images/showposters/severanceposter.webp",
        genre: ['Sci-Fi', 'Drama', 'Thriller'],
        year: 2022,
        rating: 8.7,
        description: 'A team of employees whose memories have been surgically divided between their work and personal lives discover the true nature of their jobs.',
        isFeatured: false,
        cast: [
            { name: "Adam Scott", bio: "Plays Mark Scout.", appearances: ["Parks and Recreation"] },
            { name: "Britt Lower", bio: "Portrays Helly R.", appearances: ["Man Seeking Woman"] }
        ]
    },
    {
        id: "tedlasso",
        title: "Ted Lasso",
        poster: "images/showposters/tedlassoposter.webp",
        genre: ['Comedy', 'Sport'],
        year: 2020,
        rating: 8.8,
        description: 'American football coach Ted Lasso is hired to manage a British soccer team, despite having no experience coaching soccer.',
        isFeatured: true,
        cast: [
            { name: "Jason Sudeikis", bio: "Plays Ted Lasso.", appearances: ["Saturday Night Live"] },
            { name: "Hannah Waddingham", bio: "Portrays Rebecca Welton.", appearances: ["Game of Thrones"] }
        ]
    },
    {
        id: "fleabag",
        title: "Fleabag",
        poster: "images/showposters/fleabagposter.webp",
        genre: ['Comedy', 'Drama'],
        year: 2016,
        rating: 8.7,
        description: 'A cynical woman navigates modern life in London while dealing with tragedy.',
        isFeatured: false,
        cast: [
            { name: "Phoebe Waller-Bridge", bio: "Plays Fleabag and is the creator.", appearances: ["Solo: A Star Wars Story"] },
            { name: "Andrew Scott", bio: "Portrays The Hot Priest.", appearances: ["Sherlock"] }
        ]
    },
    {
        id: "narcos",
        title: "Narcos",
        poster: "images/showposters/narcosposter.webp",
        genre: ['Biography', 'Crime', 'Drama'],
        year: 2015,
        rating: 8.8,
        description: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.',
        isFeatured: true,
        cast: [
            { name: "Wagner Moura", bio: "Plays Pablo Escobar.", appearances: ["Elite Squad"] },
            { name: "Boyd Holbrook", bio: "Portrays Steve Murphy.", appearances: ["Logan"] }
        ]
    },
    {
        id: "theboys_presents_diabolical",
        title: "The Boys Presents: Diabolical",
        poster: "images/showposters/theboysdiabolicalposter.webp",
        genre: ['Animation', 'Action', 'Comedy'],
        year: 2022,
        rating: 7.3,
        description: 'An animated anthology series set in the universe of The Boys.',
        isFeatured: false,
        cast: [
            { name: "Seth Rogen", bio: "Voice actor and executive producer.", appearances: ["Superbad"] },
            { name: "Andy Samberg", bio: "Voice actor.", appearances: ["Brooklyn Nine-Nine"] }
        ]
    },
    {
        id: "houseofthedragon",
        title: "House of the Dragon",
        poster: "images/showposters/houseofthedragonposter.webp",
        genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
        year: 2022,
        rating: 8.5,
        description: 'The story of the Targaryen civil war that took place about 200 years before the events of Game of Thrones.',
        isFeatured: true,
        cast: [
            { name: "Paddy Considine", bio: "Plays King Viserys I Targaryen.", appearances: ["Hot Fuzz"] },
            { name: "Matt Smith", bio: "Portrays Prince Daemon Targaryen.", appearances: ["Doctor Who"] }
        ]
    },
    {
        id: "winningtime",
        title: "Winning Time: The Rise of the Lakers Dynasty",
        poster: "images/showposters/winningtimeposter.webp",
        genre: ['Biography', 'Drama', 'Sport'],
        year: 2022,
        rating: 8.2,
        description: 'A fast-break series about the professional and personal lives of the 1980s Los Angeles Lakers basketball team, one of sports\' most revered and dominant dynasties -- a team that defined an era, both on and off the court.',
        isFeatured: false,
        cast: [
            { name: "Quincy Isaiah", bio: "Plays Magic Johnson.", appearances: ["Off the Rails"] },
            { name: "Solomon Hughes", bio: "Portrays Kareem Abdul-Jabbar.", appearances: ["No Other Way to Say It"] }
        ]
    }
];


/**
 * Creates an HTML string for a single show card.
 * @param {Object} show - The show object with details like title, poster, genre, etc.
 * @returns {string} The HTML string for the show card.
 */
function createShowCardHtml(show) {
    // Determine the primary genre for display, or show "Various" if multiple or none
    const primaryGenre = Array.isArray(show.genre) && show.genre.length > 0
        ? show.genre[0]
        : 'Various';

    // Get first 3 cast names or a default message
    const castNames = show.cast && show.cast.length > 0
        ? show.cast.slice(0, 3).map(c => c.name).join(', ') + (show.cast.length > 3 ? '...' : '')
        : 'Cast info N/A';

    return `
        <div class="show-card" data-id="${show.id}" data-title="${encodeURIComponent(show.title)}">
            <div class="show-card-poster-container">
                <img src="${show.poster}" alt="${show.title} Poster" class="show-card-poster" onerror="this.onerror=null;this.src='https://placehold.co/250x350/333/fff?text=No+Poster';">
                <div class="play-button-overlay">
                    <i class="fas fa-play-circle play-icon"></i>
                </div>
            </div>
            <div class="show-card-details">
                <h3 class="show-card-title">${show.title}</h3>
                <div class="show-card-meta">
                    <span class="show-card-genre">${primaryGenre}</span>
                    <span class="show-card-year">${show.year}</span>
                    <span class="show-card-rating"><i class="fas fa-star"></i> ${show.rating}</span>
                </div>
                <p class="show-card-description">${show.description}</p>
                <p class="show-card-cast"><strong>Cast:</strong> ${castNames}</p>
                <div class="show-card-actions">
                    <button class="add-to-watchlist-btn" data-id="${show.id}">
                        <i class="fas fa-plus"></i> Add
                    </button>
                    <button class="share-btn" data-id="${show.id}">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders a single category section with its title and a carousel of show cards.
 * @param {HTMLElement} container - The DOM element to append the category section to.
 * @param {string} categoryTitle - The title of the category (e.g., "Featured Shows").
 * @param {Array<Object>} shows - An array of show objects for this category.
 */
function renderCategorySection(container, categoryTitle, shows) {
    if (!container || !Array.isArray(shows) || shows.length === 0) {
        console.warn(`Skipping rendering for category "${categoryTitle}": missing container or no shows.`);
        return;
    }

    const sectionId = categoryTitle.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'); // e.g., "featured-shows"

    const categoryHtml = `
        <div class="category-section" id="${sectionId}">
            <h2 class="category-title">${categoryTitle}</h2>
            <div class="carousel-container">
                <button class="carousel-nav-btn prev"><i class="fas fa-chevron-left"></i></button>
                <div class="carousel-track">
                    <!-- Show cards will be injected here -->
                </div>
                <button class="carousel-nav-btn next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', categoryHtml);

    const carouselTrack = document.querySelector(`#${sectionId} .carousel-track`);
    if (carouselTrack) {
        shows.forEach(show => {
            carouselTrack.insertAdjacentHTML('beforeend', createShowCardHtml(show));
        });
        setupCarouselNavigation(carouselTrack.parentElement); // Pass the carousel-container

        // Add click listener to each show card to navigate to details.html
        carouselTrack.querySelectorAll('.show-card').forEach(card => {
            card.addEventListener('click', (event) => {
                // Prevent navigation if an action button was clicked
                if (event.target.closest('.add-to-watchlist-btn') || event.target.closest('.share-btn') || event.target.closest('.play-button-overlay')) {
                    return;
                }
                const showTitle = card.dataset.title;
                if (showTitle) {
                    window.location.href = `details.html?title=${showTitle}`;
                }
            });
            // Also explicitly add click listener for title to navigate
            card.querySelector('.show-card-title').addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card click from double-firing
                const showTitle = card.dataset.title;
                if (showTitle) {
                    window.location.href = `details.html?title=${showTitle}`;
                }
            });
        });

        // Add click listener for "Add to Watchlist" buttons
        carouselTrack.querySelectorAll('.add-to-watchlist-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click from bubbling to the parent show card
                if (!userLoggedIn) {
                    showMessageBox("You must be logged in to add shows to your watchlist!", "fas fa-exclamation-triangle red-icon");
                } else {
                    showMessageBox("Redirecting to settings for watchlist management (simulated)...", "fas fa-info-circle blue-icon");
                    // Simulate redirect to settings page
                    window.location.href = 'settings.html';
                }
            });
        });

        // Add click listener for "Play" icon overlay
        carouselTrack.querySelectorAll('.play-button-overlay').forEach(overlay => {
            overlay.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click from bubbling to the parent show card
                showMessageBox("Playing show (simulated)! Enjoy!", "fas fa-play-circle blue-icon");
            });
        });

        // Add click listener for "Share" buttons
        carouselTrack.querySelectorAll('.share-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click from bubbling to the parent show card
                const showTitle = decodeURIComponent(button.closest('.show-card').dataset.title);
                showMessageBox(`Sharing "${showTitle}" (simulated)!`, "fas fa-share-alt green-icon");
            });
        });

    } else {
        console.error(`Carousel track not found for category: ${categoryTitle}`);
    }
}

/**
 * Sets up event listeners for carousel navigation buttons.
 * @param {HTMLElement} carouselContainer - The .carousel-container element.
 */
function setupCarouselNavigation(carouselContainer) {
    const prevBtn = carouselContainer.querySelector('.carousel-nav-btn.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-nav-btn.next');
    const carouselTrack = carouselContainer.querySelector('.carousel-track');

    if (!prevBtn || !nextBtn || !carouselTrack) {
        console.warn('Missing carousel elements for navigation setup.', carouselContainer);
        return;
    }

    let scrollAmount = 0; // Tracks the current scroll position

    const scrollCarousel = (direction) => {
        const card = carouselTrack.querySelector('.show-card');
        if (!card) return;

        const cardWidth = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight || '0'); // Card width + margin
        const cardsPerView = Math.floor(carouselTrack.clientWidth / cardWidth);
        const scrollBy = cardsPerView * cardWidth;

        const containerWidth = carouselTrack.clientWidth;
        const maxScroll = carouselTrack.scrollWidth - containerWidth;


        if (direction === 'next') {
            scrollAmount += scrollBy;
            if (scrollAmount > maxScroll) {
                scrollAmount = 0; // Loop to start
            }
        } else { // 'prev'
            scrollAmount -= scrollBy;
            if (scrollAmount < 0) {
                scrollAmount = maxScroll; // Loop to end
            }
        }
        carouselTrack.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    nextBtn.addEventListener('click', () => scrollCarousel('next'));
    prevBtn.addEventListener('click', () => scrollCarousel('prev'));
}


/**
 * Renders all defined categories to the #categorySections container.
 * This is the main function to call on pages like cinewatch_home.html or discover.html.
 */
function renderAllCategories() {
    const categorySectionsContainer = document.getElementById('categorySections');
    if (!categorySectionsContainer) {
        console.warn("Category sections container with ID 'categorySections' not found.");
        return;
    }

    // Clear previous content
    categorySectionsContainer.innerHTML = '';

    // Define the order of categories, pulling from unique genres/features
    const categoriesToRender = [
        { title: 'Featured Shows', filter: (show) => show.isFeatured },
        { title: 'Trending Now', filter: (show) => show.genre.includes('Trending') }, // Assuming 'Trending' can be a genre/category
        { title: 'Coming Soon', filter: (show) => show.genre.includes('Coming Soon') || show.year === 'Expected' || show.year === 'TBA' },
        { title: 'Action Packed', filter: (show) => show.genre.includes('Action') },
        { title: 'Dramas', filter: (show) => show.genre.includes('Drama') },
        { title: 'Comedies', filter: (show) => show.genre.includes('Comedy') },
        { title: 'Sci-Fi & Fantasy', filter: (show) => show.genre.includes('Sci-Fi') || show.genre.includes('Fantasy') },
        { title: 'Horror Flicks', filter: (show) => show.genre.includes('Horror') },
        { title: 'Crime & Mystery', filter: (show) => show.genre.includes('Crime') || show.genre.includes('Mystery') },
        { title: 'International Hits', filter: (show) => show.genre.includes('International') }, // Assuming 'International' for non-Hollywood/Bollywood/K-Drama
        { title: 'Bollywood', filter: (show) => show.genre.includes('Bollywood') },
        { title: 'K-Drama', filter: (show) => show.genre.includes('K-Drama') },
        { title: 'Kenyan Originals', filter: (show) => show.genre.includes('Kenyan Drama') },
        { title: 'Biographies', filter: (show) => show.genre.includes('Biography') },
        { title: 'Sports Stories', filter: (show) => show.genre.includes('Sport') },
        { title: 'Animation', filter: (show) => show.genre.includes('Animation') },
    ];


    categoriesToRender.forEach(category => {
        const showsInCategory = showsData.filter(category.filter);
        if (showsInCategory.length > 0) {
            renderCategorySection(categorySectionsContainer, category.title, showsInCategory);
        } else {
            console.log(`No shows found for category: ${category.title}`);
        }
    });
}


// --- Event Listeners and Initial Page Load Logic ---

document.addEventListener("DOMContentLoaded", () => {
    // --- Hero Slideshow Initialization ---
    const heroSection = document.getElementById('heroSection');
    // Remove hero navigation buttons by not selecting them and removing their listeners
    // const heroPrevBtn = document.getElementById('heroPrevBtn'); // Removed
    // const heroNextBtn = document.getElementById('heroNextBtn'); // Removed

    if (heroSection && heroSlides.length > 0) {
        renderHeroSlides(); // Initial render

        // Keep auto-advance, but remove manual navigation buttons' functionality
        setInterval(showNextSlide, 4000); // Change slide every 4 seconds as requested
    } else {
        console.warn("Hero section container with ID 'heroSection' not found or no slides available. Hero slideshow functionality will not work on this page.");
        // If no hero slides, hide the entire hero section or display a fallback
        if (heroSection) heroSection.style.display = 'none'; // Hide if no slides
    }

    // Last Modified Date (footer)
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleDateString();
    } else {
        console.warn("Last Modified span not found.");
    }

    // --- Page-specific function calls ---
    // This ensures functions are only called if their corresponding HTML elements exist
    if (document.getElementById('categorySections')) {
        renderAllCategories(); // For cinewatch_home.html / discover.html
    }

    // --- Account Dropdown Link Handling ---
    document.getElementById('accountDropdown').addEventListener('click', (event) => {
        const target = event.target.closest('a');
        if (!target) return;

        event.preventDefault(); // Prevent default link behavior

        if (target.id === 'loginLink' || target.id === 'registerLink') {
            showMessageBox(`Redirecting to ${target.id.replace('Link', '')} page (simulated)!`);
            // In a real app, you would navigate to login.html or register.html
            // window.location.href = `${target.id.replace('Link', '')}.html`;
        } else if (target.id === 'profileLink' || target.textContent.includes('Playlist') || target.textContent.includes('Bookmarks') || target.textContent.includes('Favorites')) {
            if (userLoggedIn) {
                showMessageBox(`${target.textContent.trim()} functionality coming soon! Redirecting to settings...`, "fas fa-info-circle blue-icon");
                window.location.href = 'settings.html'; // Redirect to settings as requested
            } else {
                showMessageBox("Please log in to access this feature!", "fas fa-exclamation-triangle red-icon");
            }
        } else if (target.id === 'logoutLink') {
            userLoggedIn = false; // Simulate logout
            updateAccountDropdown(userLoggedIn);
            showMessageBox("You have been logged out.", "fas fa-check-circle green-icon");
            document.getElementById('accountDropdown').classList.remove("visible"); // Hide dropdown after logout
        } else if (target.id === 'settingsLink' || target.textContent.includes('Settings')) { // Handles the 'Settings' link
            if (userLoggedIn) {
                showMessageBox("Redirecting to Settings page...", "fas fa-info-circle blue-icon");
                window.location.href = 'settings.html';
            } else {
                showMessageBox("Please log in to access settings!", "fas fa-exclamation-triangle red-icon");
            }
        }
    });

    // Initial update of account dropdown state
    updateAccountDropdown(userLoggedIn);

    // Set initial dark mode based on local storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.classList.replace('fa-moon', 'fa-sun');
            darkModeToggle.setAttribute('title', 'Toggle Light Mode');
        }
    }
});

// Expose functions for standalone_header.js to use
window.showMessageBox = showMessageBox;
window.updateAccountDropdown = updateAccountDropdown;
window.toggleDarkMode = toggleDarkMode;
window.getUniqueValues = getUniqueValues;
window.showPrimarySuggestions = showPrimarySuggestions;
window.renderScopedValueSuggestions = renderScopedValueSuggestions;
window.renderShowTitleSuggestions = renderShowTitleSuggestions;
window.userLoggedIn = userLoggedIn; // Expose userLoggedIn status

