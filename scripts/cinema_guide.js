    /*
     * File: cinema_guide.js (Consolidated JavaScript for cinema_guide.html)
     * Description: Handles the entire cinema experience flow:
     * - Initial loading animation.
     * - Hero section dynamic images and scrolling text.
     * - City filtering for cinema halls.
     * - Dynamic rendering of cinema halls and their shows.
     * - Multi-step booking modal (show details, seat selection, snacks, cab, summary, payment).
     * - Price calculation and real-time updates.
     * - Cab service provider and stand selection based on city/cinema.
     * - Integrates with shared header/footer logic (search, account, dark mode).
     */

    // --- Global Data Definitions (from main.js and updated for cinema guide) ---

    // Placeholder for user login status (controlled by account dropdown logic)
    let userLoggedIn = false; // Default to false

    // Consolidated Show Data (with 'type' and 'popularityScore' added)
    const showsData = [
        {
            id: 'breakingbad', type: 'series', title: 'Breaking Bad', popularityScore: 95,
            poster: 'images/showposters/breakingbadposter1.webp', backdrop: 'images/backdrops/breakingbadbackdrop.webp',
            genre: ['Drama', 'Crime', 'Thriller'], year: 2008, rating: 9.5,
            description: 'A high school chemistry teacher diagnosed with lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
            isFeatured: true, cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"], awards: ["Golden Globe Award for Best Television Series – Drama", "Primetime Emmy Award for Outstanding Drama Series (x2)"],
            network: "AMC", networkLogo: "images/icons&logos/amclogo.svg"
        },
        {
            id: 'moneyheist', type: 'series', title: 'Money Heist', popularityScore: 90,
            poster: 'images/showposters/moneyheistposter.webp', backdrop: 'images/backdrops/moneyheistbackdrop.webp',
            genre: ['Crime', 'Drama', 'Thriller'], year: 2017, rating: 8.3,
            description: 'A mysterious man, "The Professor", recruits a band of eight robbers who take hostages and lock themselves in the Royal Mint of Spain as part of his elaborate plan to execute the biggest heist in history.',
            isFeatured: true, cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"], awards: ["International Emmy Award for Best Drama Series"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'strangerthings', type: 'series', title: 'Stranger Things', popularityScore: 92,
            poster: 'images/showposters/strangerthingsposter.webp', backdrop: 'images/backdrops/strangerthingsbackdrop.webp',
            genre: ['Sci-Fi', 'Horror', 'Drama', 'Fantasy'], year: 2016, rating: 8.7,
            description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
            isFeatured: false, cast: ["Winona Ryder", "David Harbour", "Millie Bobby Brown"], awards: ["Screen Actors Guild Award for Outstanding Performance by an Ensemble in a Drama Series"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'theboys', type: 'series', title: 'The Boys', popularityScore: 88,
            poster: 'images/showposters/theboysposter.webp', backdrop: 'images/backdrops/theboysbackdrop.webp',
            genre: ['Action', 'Comedy', 'Drama', 'Sci-Fi'], year: 2019, rating: 8.7,
            description: 'A group of vigilantes known informally as "The Boys" set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.',
            isFeatured: true, cast: ["Karl Urban", "Jack Quaid", "Antony Starr"], awards: ["Critics' Choice Super Award for Best Superhero Series"],
            network: "Amazon Prime Video", networkLogo: "images/icons&logos/amazonprimevideo.svg"
        },
        {
            id: 'wednesday', type: 'series', title: 'Wednesday', popularityScore: 85,
            poster: 'images/showposters/wednesdayposter.webp', backdrop: 'images/backdrops/wednesdaybackdrop.webp',
            genre: ['Comedy', 'Crime', 'Fantasy'], year: 2022, rating: 8.2,
            description: 'Wednesday Addams investigates a monstrous mystery at the school she attends.',
            isFeatured: false, cast: ["Jenna Ortega", "Gwendoline Christie", "Catherine Zeta-Jones"], awards: ["Hollywood Critics Association TV Award for Best Actress in a Streaming Series, Comedy (Jenna Ortega)"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'thecrown', type: 'series', title: 'The Crown', popularityScore: 78,
            poster: 'images/showposters/thecrownposter.webp', backdrop: 'images/backdrops/thecrownbackdrop.webp',
            genre: ['Drama', 'History', 'Biography'], year: 2016, rating: 8.7,
            description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
            isFeatured: false, cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"], awards: ["Golden Globe Award for Best Television Series – Drama (x2)", "Primetime Emmy Award for Outstanding Drama Series (x2)"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'thequeensgambit', type: 'series', title: 'The Queen\'s Gambit', popularityScore: 80,
            poster: 'images/showposters/thequeensgambitposter.webp', backdrop: 'images/backdrops/thequeensgambitbackdrop.webp',
            genre: ['Drama'], year: 2020, rating: 8.6,
            description: 'Orphaned at nine, prodigious chess prodigy Beth Harmon struggles with addiction in a quest to become the greatest chess player in the world.',
            isFeatured: false, cast: ["Anya Taylor-Joy", "Thomas Brodie-Sangster"], awards: ["Golden Globe Award for Best Television Limited Series, Anthology Series, or Motion Picture Made for Television", "Primetime Emmy Award for Outstanding Limited or Anthology Series"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'allofusaredead', type: 'series', title: 'All of Us Are Dead', popularityScore: 82,
            poster: 'images/showposters/allofusaredeadposter.webp', backdrop: 'images/backdrops/allofusaredeadbackdrop.webp',
            genre: ['Action', 'Drama', 'Fantasy', 'Horror'], year: 2022, rating: 7.5,
            description: 'A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out or turn into one of the infected.',
            isFeatured: true, cast: ["Park Ji-hu", "Yoon Chan-young", "Cho Yi-hyun"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'squidgame', type: 'series', title: 'Squid Game', popularityScore: 98,
            poster: 'images/showposters/squidgameposter1.webp', backdrop: 'images/backdrops/squidgamebackdrop.webp',
            genre: ['Action', 'Drama', 'Mystery', 'Thriller'], year: 2021, rating: 8.0,
            description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
            isFeatured: false, cast: ["Lee Jung-jae", "Park Hae-soo"], awards: ["Primetime Emmy Award for Outstanding Lead Actor in a Drama Series (Lee Jung-jae)", "Screen Actors Guild Award for Outstanding Performance by a Male Actor in a Drama Series (Lee Jung-jae)"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'thelastofus', type: 'series', title: 'The Last of Us', popularityScore: 93,
            poster: 'images/showposters/thelastofusposter.webp', backdrop: 'images/backdrops/thelastofusbackdrop.webp',
            genre: ['Action', 'Adventure', 'Drama', 'Sci-Fi'], year: 2023, rating: 8.8,
            description: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity\'s last hope.',
            isFeatured: true, cast: ["Pedro Pascal", "Bella Ramsey"], awards: ["N/A"],
            network: "HBO", networkLogo: "images/icons&logos/hbo.svg"
        },
        {
            id: 'thewitcher', type: 'series', title: 'The Witcher', popularityScore: 84,
            poster: 'images/showposters/thewitcherposter.webp', backdrop: 'images/backdrops/thewitcherbackdrop.webp',
            genre: ['Action', 'Adventure', 'Drama', 'Fantasy'], year: 2019, rating: 8.2,
            description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
            isFeatured: false, cast: ["Henry Cavill", "Freya Allan"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'arcane', type: 'series', title: 'Arcane', popularityScore: 89,
            poster: 'images/showposters/arcaneposter.webp', backdrop: 'images/backdrops/arcanedrop.webp',
            genre: ['Animation', 'Action', 'Adventure', 'Fantasy'], year: 2021, rating: 9.0,
            description: 'Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League of Legends champions and the power that will tear them apart.',
            isFeatured: false, cast: ["Hailee Steinfeld", "Ella Purnell"], awards: ["Primetime Emmy Award for Outstanding Animated Program"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'peakyblinders', type: 'series', title: 'Peaky Blinders', popularityScore: 86,
            poster: 'images/showposters/peakyblindersposter.webp', backdrop: 'images/backdrops/peakyblindersbackdrop.webp',
            genre: ['Crime', 'Drama'], year: 2013, rating: 8.8,
            description: 'A gangster family epic set in Birmingham, England in 1919, centering on a gang who sew razor blades in the peaks of their caps, and their ferocious boss Tommy Shelby.',
            isFeatured: false, cast: ["Cillian Murphy", "Helen McCrory"], awards: ["British Academy Television Award for Best Drama Series"],
            network: "BBC Two", networkLogo: "images/icons&logos/bbctwo.svg"
        },
        {
            id: 'dark', type: 'series', title: 'Dark', popularityScore: 83,
            poster: 'images/showposters/darkposter.webp', backdrop: 'images/backdrops/darkbackdrop.webp',
            genre: ['Crime', 'Drama', 'Mystery', 'Sci-Fi'], year: 2017, rating: 8.7,
            description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the double lives and fractured relationships among four families.',
            isFeatured: false, cast: ["Louis Hofmann", "Lisa Vicari"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'theoffice_us', type: 'series', title: 'The Office (US)', popularityScore: 87,
            poster: 'images/showposters/theofficeposter.webp', backdrop: 'images/backdrops/theofficebackdrop.webp',
            genre: ['Comedy'], year: 2005, rating: 9.0,
            description: 'A mockumentary on the everyday lives of a group of office employees in the Scranton, Pennsylvania, branch of the fictional Dunder Mifflin Paper Company.',
            isFeatured: false, cast: ["Steve Carell", "Rainn Wilson", "John Krasinski"], awards: ["Primetime Emmy Award for Outstanding Comedy Series"],
            network: "NBC", networkLogo: "images/icons&logos/nbclogo.svg"
        },
        {
            id: 'friends', type: 'series', title: 'Friends', popularityScore: 89,
            poster: 'images/showposters/friendsposter.webp', backdrop: 'images/backdrops/friendsbackdrop.webp',
            genre: ['Comedy', 'Romance'], year: 1994, rating: 8.9,
            description: 'Follows the personal and professional lives of six twenty-somethings living in Manhattan.',
            isFeatured: false, cast: ["Jennifer Aniston", "Courteney Cox", "Lisa Kudrow"], awards: ["Primetime Emmy Award for Outstanding Comedy Series"],
            network: "NBC", networkLogo: "images/icons&logos/nbclogo.svg"
        },
        {
            id: 'gameofthrones', type: 'series', title: 'Game of Thrones', popularityScore: 97,
            poster: 'images/showposters/gameofthronesposter.webp', backdrop: 'images/backdrops/gameofthronesbackdrop.webp',
            genre: ['Action', 'Adventure', 'Drama', 'Fantasy'], year: 2011, rating: 9.3,
            description: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.',
            isFeatured: false, cast: ["Emilia Clarke", "Kit Harington", "Peter Dinklage"], awards: ["Primetime Emmy Award for Outstanding Drama Series (x4)", "Golden Globe Award for Best Television Series – Drama"],
            network: "HBO", networkLogo: "images/icons&logos/hbo.svg"
        },
        {
            id: 'thewalkingdead', type: 'series', title: 'The Walking Dead', popularityScore: 79,
            poster: 'images/showposters/thewalkingdeadposter.webp', backdrop: 'images/backdrops/thewalkingdeadbackdrop.webp',
            genre: ['Drama', 'Horror', 'Sci-Fi', 'Thriller'], year: 2010, rating: 8.1,
            description: 'Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive.',
            isFeatured: true, cast: ["Andrew Lincoln", "Norman Reedus"], awards: ["Saturn Award for Best Horror Television Series"],
            network: "AMC", networkLogo: "images/icons&logos/amclogo.svg"
        },
        {
            id: 'chernobyl', type: 'series', title: 'Chernobyl', popularityScore: 91,
            poster: 'images/showposters/chernobylposter.webp', backdrop: 'images/backdrops/chernobylbackdrop.webp',
            genre: ['Drama', 'History', 'Thriller'], year: 2019, rating: 9.4,
            description: 'In April 1986, an explosion at the Chernobyl nuclear power plant in the Ukrainian SSR becomes one of the world\'s worst man-made catastrophes.',
            isFeatured: false, cast: ["Jared Harris", "Stellan Skarsgård"], awards: ["Golden Globe Award for Best Television Limited Series, Anthology Series, or Motion Picture Made for Television", "Primetime Emmy Award for Outstanding Limited or Anthology Series"],
            network: "HBO", networkLogo: "images/icons&logos/hbo.svg"
        },
        {
            id: "prisonbreak_series", type: 'series', title: "Prison Break", popularityScore: 86,
            poster: "images/showposters/prisonbreakposter1.webp", backdrop: 'images/backdrops/prisonbreakbackdrop.webp',
            genre: ["Action", "Hollywood", "Crime", "Drama", "Thriller"], year: 2005, rating: 8.3,
            description: "When his brother, Lincoln Burrows, is wrongly sentenced to death, a structural engineer, Michael Scofield, devises an elaborate plan to break him out of prison—starting by getting incarcerated himself. A thrilling ride full of twists, tension, and brotherly loyalty as they navigate their escape and evade authorities.",
            isFeatured: true, cast: ["Wentworth Miller", "Dominic Purcell", "Sarah Wayne Callies"], awards: ["N/A"],
            network: "Fox", networkLogo: "images/icons&logos/foxlogo.svg"
        },
        {
            id: "yourhonor_series", type: 'series', title: "Your Honor", popularityScore: 75,
            poster: "images/showposters/yourhonorposter1.webp", backdrop: 'images/backdrops/yourhonorbackdrop.webp',
            genre: ["Hollywood", "Coming Soon", "Crime", "Drama", "Thriller"], year: 2024, rating: "Expected",
            description: "A respected New Orleans judge's life is turned upside down when his teenage son is involved in a hit-and-run, leading to a high-stakes game of lies, deceit, and impossible choices to protect his family. Season 3 is highly anticipated.",
            isFeatured: false, cast: ["Bryan Cranston", "Hunter Doohan", "Hope Davis"], awards: ["N/A"],
            network: "Showtime", networkLogo: "images/icons&logos/showtime.svg"
        },
        {
            id: "ghoul_series", type: 'series', title: "Ghoul", popularityScore: 65,
            poster: "images/showposters/ghoulposter1.webp", backdrop: 'images/backdrops/ghoulbackdrop.webp',
            genre: ["Bollywood", "Horror", "Thriller"], year: 2018, rating: 7.1,
            description: "A newly appointed interrogator arrives at a remote military detention center to question a dangerous terrorist, only to discover that the detainee is not what he seems and harbors a terrifying supernatural entity.",
            isFeatured: false, cast: ["Radhika Apte", "Manav Kaul", "S.M. Zaheer"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: "crimeandjustice_series", type: 'series', title: "Crime and Justice", popularityScore: 70,
            poster: "images/showposters/crimeandjusticeposter1.webp", backdrop: 'images/backdrops/crimeandjusticebackdrop.webp',
            genre: ["Kenyan Drama", "Trending", "Coming Soon", "Crime", "Drama", "Legal"], year: 2021, rating: 7.0,
            description: "A Kenyan police procedural series that follows two detectives as they investigate various crimes in Nairobi. The show delves into the dark side of the city, exploring themes of corruption, greed, and the pursuit of justice.",
            isFeatured: true, cast: ["Alfred Munyua", "Sarah Hassan", "Maqbul Mohammed"], awards: ["N/A"],
            network: "Showmax", networkLogo: "images/icons&logos/showmaxlogo.svg"
        },
        {
            id: "dayofthejackal_series", type: 'series', title: "The Day Of The Jackal", popularityScore: 68,
            poster: "images/showposters/thedayofthejackalposter1.webp", backdrop: 'images/backdrops/dayoftheljackalbackdrop.webp',
            genre: ["International", "Coming Soon", "Thriller"], year: 2024, rating: "Expected",
            description: "An upcoming modern-day reimagining of the iconic novel and film, following a professional assassin known as 'The Jackal' as he undertakes a mission to assassinate a high-profile target.",
            isFeatured: false, cast: ["Edward Fox", "Michael Lonsdale", "Terence Alexander"], awards: ["N/A"],
            network: "Peacock", networkLogo: "images/icons&logos/peacocklogo.svg"
        },
        {
            id: "secondwife_series", type: 'series', title: "Second Wife", popularityScore: 60,
            poster: "images/showposters/secondfamilyposter1.webp", backdrop: 'images/backdrops/secondfamilybackdrop.webp',
            genre: ["Kenyan Drama", "Coming Soon", "Drama"], year: "TBA", rating: "Expected",
            description: "Details for 'Second Wife' are scarce, but it's expected to be a compelling Kenyan drama exploring familial and marital complexities, possibly revolving around the theme of polygamy or a new spouse in a family.",
            isFeatured: false, cast: ["Vanessa Okeyo", "Serah Wanjiru"], awards: ["N/A"],
            network: "Maisha Magic Plus", networkLogo: "images/icons&logos/MaishaMagicPlus.svg"
        },
        {
            id: "kingdom_series", type: 'series', title: "Kingdom", popularityScore: 77,
            poster: "images/showposters/kingdomposter1.webp", backdrop: 'images/backdrops/kingdombackdrop.webp',
            genre: ["K-Drama", "Action", "Horror", "Thriller"], year: 2019, rating: 8.3,
            description: "While strange rumors about their ill King grip a kingdom, the crown prince becomes their only hope against a mysterious plague that is turning people into zombies.",
            isFeatured: false, cast: ["Ju Ji-hoon", "Ryu Seung-ryong"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: "thegoodplace", type: 'series', title: "The Good Place", popularityScore: 74,
            poster: "images/showposters/thegoodplaceposter.webp", backdrop: 'images/backdrops/goodplacebackdrop.webp',
            genre: ['Comedy', 'Fantasy', 'Drama'], year: 2016, rating: 8.2,
            description: 'Four people and their otherworldly architect struggle in the afterlife to define what it means to be good.',
            isFeatured: false, cast: ["Kristen Bell", "Ted Danson"], awards: ["Peabody Award"],
            network: "NBC", networkLogo: "images/icons&logos/nbclogo.svg"
        },
        {
            id: "mandolorian", type: 'series', title: "The Mandalorian", popularityScore: 89,
            poster: "images/showposters/mandolorianposter.webp", backdrop: 'images/backdrops/mandolorianbackdrop.webp',
            genre: ['Sci-Fi', 'Action', 'Adventure'], year: 2019, rating: 8.7,
            description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
            isFeatured: true, cast: ["Pedro Pascal", "Grogu (Baby Yoda)"], awards: ["Primetime Emmy Award for Outstanding Drama Series (Nomination)", "MTV Movie & TV Award for Best Duo (Pedro Pascal & Grogu)"],
            network: "Disney+", networkLogo: "images/icons&logos/disneypluslogo.svg"
        },
        {
            id: "severance", type: 'series', title: "Severance", popularityScore: 76,
            poster: "images/showposters/severanceposter.webp", backdrop: 'images/backdrops/severancebackdrop.webp',
            genre: ['Sci-Fi', 'Drama', 'Thriller'], year: 2022, rating: 8.7,
            description: 'A team of employees whose memories have been surgically divided between their work and personal lives discover the true nature of their jobs.',
            isFeatured: false, cast: ["Adam Scott", "Britt Lower"], awards: ["Primetime Emmy Award for Outstanding Drama Series (Nomination)"],
            network: "Apple TV+", networkLogo: "images/icons&logos/appletvplus.svg"
        },
        {
            id: "tedlasso", type: 'series', title: "Ted Lasso", popularityScore: 85,
            poster: "images/showposters/tedlassoposter.webp", backdrop: 'images/backdrops/tedlassobackdrop.webp',
            genre: ['Comedy', 'Sport'], year: 2020, rating: 8.8,
            description: 'American football coach Ted Lasso is hired to manage a British soccer team, despite having no experience coaching soccer.',
            isFeatured: true, cast: ["Jason Sudeikis", "Hannah Waddingham"], awards: ["Primetime Emmy Award for Outstanding Comedy Series (x2)", "Golden Globe Award for Best Television Series – Musical or Comedy"],
            network: "Apple TV+", networkLogo: "images/icons&logos/appletvplus.svg"
        },
        {
            id: "fleabag", type: 'series', title: "Fleabag", popularityScore: 72,
            poster: "images/showposters/fleabagposter.webp", backdrop: 'images/backdrops/fleabagbackdrop.webp',
            genre: ['Comedy', 'Drama'], year: 2016, rating: 8.7,
            description: 'A cynical woman navigates modern life in London while dealing with tragedy.',
            isFeatured: false, cast: ["Phoebe Waller-Bridge", "Andrew Scott"], awards: ["Primetime Emmy Award for Outstanding Comedy Series", "Golden Globe Award for Best Television Series – Musical or Comedy"],
            network: "BBC Three", networkLogo: "images/icons&logos/bbcthree.svg"
        },
        {
            id: "narcos", type: 'series', title: "Narcos", popularityScore: 81,
            poster: "images/showposters/narcosposter.webp", backdrop: 'images/backdrops/narcosbackdrop.webp',
            genre: ['Biography', 'Crime', 'Drama'], year: 2015, rating: 8.8,
            description: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.',
            isFeatured: true, cast: ["Wagner Moura", "Boyd Holbrook"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: "theboys_presents_diabolical", type: 'series', title: "The Boys Presents: Diabolical", popularityScore: 67,
            poster: "images/showposters/theboysdiabolicalposter.webp", backdrop: 'images/backdrops/theboysdiabolicalbackdrop.webp',
            genre: ['Animation', 'Action', 'Comedy'], year: 2022, rating: 7.3,
            description: 'An animated anthology series set in the universe of The Boys.',
            isFeatured: false, cast: ["Seth Rogen", "Andy Samberg"], awards: ["N/A"],
            network: "Amazon Prime Video", networkLogo: "images/icons&logos/amazonprimevideo.svg"
        },
        {
            id: "houseofthedragon", type: 'series', title: "House of the Dragon", popularityScore: 90,
            poster: "images/showposters/houseofthedragonposter.webp", backdrop: 'images/backdrops/houseofthedragonbackdrop.webp',
            genre: ['Action', 'Adventure', 'Drama', 'Fantasy'], year: 2022, rating: 8.5,
            description: 'The story of the Targaryen civil war that took place about 200 years before the events of Game of Thrones.',
            isFeatured: true, cast: ["Paddy Considine", "Matt Smith"], awards: ["Golden Globe Award for Best Television Series – Drama"],
            network: "HBO", networkLogo: "images/icons&logos/hbo.svg"
        },
        {
            id: "winningtime", type: 'series', title: "Winning Time: The Rise of the Lakers Dynasty", popularityScore: 69,
            poster: "images/showposters/winningtimeposter.webp", backdrop: 'images/backdrops/winningtimebackdrop.webp',
            genre: ['Biography', 'Drama', 'Sport'], year: 2022, rating: 8.2,
            description: 'A fast-break series about the professional and personal lives of the 1980s Los Angeles Lakers basketball team, one of sports\' most revered and dominant dynasties -- a team that defined an era, both on and off the court.',
            isFeatured: false, cast: ["Quincy Isaiah", "Solomon Hughes"], awards: ["N/A"],
            network: "HBO", networkLogo: "images/icons&logos/hbo.svg"
        },
        {
            id: 'moneyheist_kdrama', type: 'series', title: 'Money Heist (K-Drama)', popularityScore: 73,
            poster: 'images/showposters/moneyheist_koreaposter.webp', backdrop: 'images/backdrops/moneyheist_koreabackdrop.webp',
            genre: ['K-Drama', 'Crime', 'Drama', 'Thriller'], year: 2022, rating: 7.0,
            description: 'Thieves seize the Mint of Korea. With hostages trapped inside, the police must stop the crew — and the shadowy mastermind behind it all.',
            isFeatured: false, cast: ["Yoo Ji-tae", "Yunjin Kim", "Park Hae-soo"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: 'lupin', type: 'series', title: 'Lupin', popularityScore: 78,
            poster: 'images/showposters/lupinposter.webp', backdrop: 'images/backdrops/lupinbackdrop.webp',
            genre: ['Crime', 'Drama', 'Mystery'], year: 2021, rating: 7.5,
            description: 'Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.',
            isFeatured: false, cast: ["Omar Sy", "Ludivine Sagnier", "Etan Simon"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        // --- Movies (for full data reference, but filtered out on this page) ---
        {
            id: 'extraction', type: 'movie', title: 'Extraction', popularityScore: 80,
            poster: 'images/showposters/extractionposter1.webp', backdrop: 'images/backdrops/extractionbackdrop.webp',
            genre: ['Action', 'Thriller'], year: 2020, rating: 6.7,
            description: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.',
            isFeatured: true, cast: ["Chris Hemsworth", "Rudhraksh Jaiswal", "Randeep Hooda"], awards: ["N/A"],
            network: "Netflix", networkLogo: "images/icons&logos/netflixlogo.svg"
        },
        {
            id: "inception_movie", type: 'movie', title: "Inception", popularityScore: 94,
            poster: "images/showposters/inceptioposter1.webp", backdrop: 'images/backdrops/inceptionbackdrop.webp',
            genre: ["Hollywood", "Action", "Sci-Fi", "Thriller"], year: 2010, rating: 8.8,
            description: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the mission and his team to disaster.",
            isFeatured: false, cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"], awards: ["Academy Award for Best Cinematography", "Academy Award for Best Sound Editing", "Academy Award for Best Sound Mixing", "Academy Award for Best Visual Effects"],
            network: "Warner Bros. Pictures", networkLogo: "images/icons&logos/warnerbros.svg"
        },
        {
            id: "3idiots_movie", type: 'movie', title: "3 Idiots", popularityScore: 85,
            poster: "images/showposters/3idiotsposter1.webp", backdrop: 'images/backdrops/3idiotsbackdrop.webp',
            genre: ["Bollywood", "Comedy", "Drama", "Romance"], year: 2009, rating: 8.4,
            description: "Two friends embark on a quest for a third, long-lost friend, while reminiscing about their college days and the profound impact their eccentric, brilliant buddy had on their lives and perspectives on education and success.",
            isFeatured: false, cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi"], awards: ["Filmfare Award for Best Film", "National Film Award for Best Popular Film Providing Wholesome Entertainment"],
            network: "Vinod Chopra Films", networkLogo: "images/icons&logos/filmstudio.svg"
        },
        {
            id: "dangal_movie", type: 'movie', title: "Dangal", popularityScore: 88,
            poster: "images/showposters/dangalposter1.webp", backdrop: 'images/backdrops/dangalbackdrop.webp',
            genre: ["Bollywood", "Biography", "Drama", "Sport"], year: 2016, rating: 8.3,
            description: "Based on the true story of Mahavir Singh Phogat, a former wrestler who trains his daughters Geeta Phogat and Babita Kumari to become world-class female wrestlers, challenging societal norms and achieving international success.",
            isFeatured: false, cast: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra"], awards: ["Filmfare Award for Best Film", "National Film Award for Best Popular Film Providing Wholesome Entertainment"],
            network: "Walt Disney Studios", networkLogo: "images/icons&logos/disneylogo.svg"
        },
        {
            id: "nairobihalflife_movie", type: 'movie', title: "Nairobi Half Life", popularityScore: 75,
            poster: "images/showposters/nairobihalflifeposter1.webp", backdrop: 'images/backdrops/nairobihalflifebackdrop.webp',
            genre: ["Kenyan Drama", "Crime", "Drama"], year: 2012, rating: 7.8,
            description: "Nairobi Half Life tells the story of Mwas, an aspiring actor from a rural town who travels to Nairobi to pursue his dreams. Faced with harsh city life, he’s pulled into a world of crime and must struggle to stay true to his dreams while surviving the city’s brutal realities. It's a powerful and gritty portrayal of urban life in Kenya.",
            isFeatured: false, cast: ["Joseph Wairimu", "Olwenya Maina", "Ogutu Muraya"], awards: ["Best Feature Film at the 33rd Durban International Film Festival"],
            network: "Ginger Ink Films", networkLogo: "images/icons&logos/tvnetwork.svg"
        },
        {
            id: "traintobusan_movie", type: 'movie', title: "Train To Busan", popularityScore: 79,
            poster: "images/showposters/traintobusanposter1.webp", backdrop: 'images/backdrops/traintobusanbackdrop.webp',
            genre: ["K-Drama", "Action", "Horror", "Thriller"], year: 2016, rating: 7.6,
            description: "While a zombie apocalypse breaks out in South Korea, a father and daughter, along with other passengers, are trapped on a high-speed train fighting for their lives as the infection spreads rapidly.",
            isFeatured: false, cast: ["Gong Yoo", "Jung Yu-mi", "Ma Dong-seok"], awards: ["Blue Dragon Film Award for Best New Director (Yeon Sang-ho)"],
            network: "Next Entertainment World", networkLogo: "images/icons&logos/tvnetwork.svg"
        },
        {
            id: "40sticks_movie", type: 'movie', title: "40 Sticks", popularityScore: 65,
            poster: "images/showposters/40sticksposter1.webp", backdrop: 'images/backdrops/40sticksbackdrop.webp',
            genre: ["Kenyan Drama", "Action", "Crime", "Thriller"], year: 2020, rating: 6.2,
            description: "When a prison bus crashes in the middle of a forest, a group of convicts must work together to survive the harsh wilderness while evading an unknown, deadly threat lurking in the shadows.",
            isFeatured: false, cast: ["Robert Agengo", "Mwaura Bilal", "Andreo Kamau"], awards: ["N/A"],
            network: "Netflix (Kenya)", networkLogo: "images/icons&logos/netflixlogo.svg"
        }
    ];

    // Data for Cinema Halls and their shows
    const cinemaData = {
        Nairobi: [
            {
                name: "Anga IMAX (CBD)",
                welcomeMessage: "Welcome to Anga IMAX, Nairobi! Prepare for an immersive cinematic journey!",
                shows: [
                    { id: 'inception_movie', time: '10:00 AM', price: 950, is3D: true, seats: generateRandomSeats(15, 10, 0.2) },
                    { id: 'squidgame', time: '01:00 PM', price: 800, isSeries: true, season: 1, episode: 'Pilot', seats: generateRandomSeats(15, 10, 0.3) },
                    { id: 'thelastofus', time: '04:00 PM', price: 850, isSeries: true, season: 1, episode: 'Infected', seats: generateRandomSeats(15, 10, 0.1) },
                    { id: 'extraction', time: '07:00 PM', price: 900, seats: generateRandomSeats(15, 10, 0.4) }
                ]
            },
            {
                name: "Prestige Plaza (Ngong Road)",
                welcomeMessage: "Enjoy your movie at Prestige Plaza! Comfort and convenience await.",
                shows: [
                    { id: 'moneyheist', time: '11:30 AM', price: 700, isSeries: true, season: 3, episode: 'The Game Begins', seats: generateRandomSeats(12, 8, 0.15) },
                    { id: 'dangal_movie', time: '02:30 PM', price: 650, seats: generateRandomSeats(12, 8, 0.2) },
                    { id: 'peakyblinders', time: '05:30 PM', price: 750, isSeries: true, season: 2, episode: 'Episode 3', seats: generateRandomSeats(12, 8, 0.1) },
                    { id: 'crimeandjustice_series', time: '08:00 PM', price: 600, isSeries: true, season: 1, episode: 'Justice Delayed', seats: generateRandomSeats(12, 8, 0.05) }
                ]
            },
            {
                name: "Two Rivers (Limuru Road)",
                welcomeMessage: "Welcome to Two Rivers Cinema! The ultimate family entertainment destination.",
                shows: [
                    { id: 'tedlasso', time: '10:00 AM', price: 700, isSeries: true, season: 3, episode: 'Sunflowers', seats: generateRandomSeats(10, 7, 0.1) },
                    { id: 'mandolorian', time: '01:00 PM', price: 750, isSeries: true, season: 2, episode: 'The Rescue', seats: generateRandomSeats(10, 7, 0.08) },
                    { id: '40sticks_movie', time: '04:00 PM', price: 600, seats: generateRandomSeats(10, 7, 0.25) }
                ]
            }
        ],
        Kisumu: [
            {
                name: "Mega City Cinemas",
                welcomeMessage: "Jambo Kisumu! Enjoy your film at Mega City Cinemas.",
                shows: [
                    { id: 'traintobusan_movie', time: '11:00 AM', price: 500, seats: generateRandomSeats(10, 7, 0.3) },
                    { id: 'ghoul_series', time: '02:00 PM', price: 450, isSeries: true, season: 1, episode: 'Episode 2', seats: generateRandomSeats(10, 7, 0.15) }
                ]
            },
            {
                name: "Lake Basin Mall Cinema",
                welcomeMessage: "Karibu Lake Basin Mall Cinema! Your comfort is our priority.",
                shows: [
                    { id: 'nairobihalflife_movie', time: '04:00 PM', price: 550, seats: generateRandomSeats(8, 6, 0.1) }
                ]
            }
        ],
        Mombasa: [
            {
                name: "Nyali Cinemax",
                welcomeMessage: "Welcome to Nyali Cinemax, Mombasa! Dive into the magic of movies by the coast.",
                shows: [
                    { id: 'inception_movie', time: '10:30 AM', price: 600, seats: generateRandomSeats(14, 9, 0.2) },
                    { id: 'squidgame', time: '01:30 PM', price: 550, isSeries: true, season: 1, episode: 'Red Light, Green Light', seats: generateRandomSeats(14, 9, 0.25) }
                ]
            },
            {
                name: "City Mall Cinema",
                welcomeMessage: "City Mall Cinema welcomes you! Your ultimate entertainment hub in Mombasa.",
                shows: [
                    { id: 'thelastofus', time: '04:30 PM', price: 650, isSeries: true, season: 1, episode: 'Long, Long Time', seats: generateRandomSeats(12, 8, 0.1) },
                    { id: 'moneyheist', time: '07:30 PM', price: 600, isSeries: true, season: 4, episode: 'The End of the Tunnel', seats: generateRandomSeats(12, 8, 0.05) }
                ]
            }
        ],
        Eldoret: [
            {
                name: "Rupa's Mall Cinema",
                welcomeMessage: "Greetings from Rupa's Mall Cinema, Eldoret! Great movies await.",
                shows: [
                    { id: 'breakingbad', time: '12:00 PM', price: 500, isSeries: true, season: 5, episode: 'Ozymandias', seats: generateRandomSeats(10, 7, 0.3) },
                    { id: 'tedlasso', time: '03:00 PM', price: 450, isSeries: true, season: 2, episode: 'No Weddings and a Funeral', seats: generateRandomSeats(10, 7, 0.1) }
                ]
            }
        ],
        Nakuru: [
            {
                name: "Westside Mall Cinema",
                welcomeMessage: "Hello Nakuru! Experience cinematic magic at Westside Mall.",
                shows: [
                    { id: '3idiots_movie', time: '01:00 PM', price: 500, seats: generateRandomSeats(10, 7, 0.2) },
                    { id: 'dangal_movie', time: '04:00 PM', price: 550, seats: generateRandomSeats(10, 7, 0.15) }
                ]
            }
        ]
    };

    // Cab Service Data
    const cabServiceData = {
        Uber: { logo: 'images/icons&logos/uberlogo.svg', locations: {
            Nairobi: ['Westlands Uber Cab Stand', 'Parklands Uber Cab Stand', 'Upperhill Uber Cab Stand', 'Lang\'ata Uber Cab Stand'],
            Kisumu: ['Nyalenda East Uber Cab Stand', 'Airport Uber Cab Stand'],
            Mombasa: ['Serena Uber Cab Stand', 'Bamburi Uber Cab Stand'],
            Eldoret: ['Langas Uber Cab Stand', 'Roadblock Uber Cab Stand'],
            Nakuru: ['Bahati Uber Cab Stand', 'Campus Drive Uber Cab Stand']
        }},
        Bolt: { logo: 'images/icons&logos/boltlogo.svg', locations: {
            Nairobi: ['CBD Bolt Cab Stand', 'Kilimani Bolt Cab Stand', 'Karen Bolt Cab Stand'],
            Kisumu: ['Milimani Bolt Cab Stand', 'Kisumu CBD Bolt Cab Stand'],
            Mombasa: ['Bombolulu Bolt Cab Stand', 'Mtwapa Bolt Cab Stand'],
            Eldoret: ['Laxo Bolt Cab Stand', 'Kapsoya Bolt Cab Stand'],
            Nakuru: ['Njoro Bolt Cab Stand', 'Town Centre Bolt Cab Stand']
        }},
        "Little Cab": { logo: 'images/icons&logos/littlecablogo.svg', locations: { // Assuming a logo path
            Nairobi: ['Gigiri Little Cab Stand', 'Lavington Little Cab Stand'],
            Kisumu: ['Bus Station Little Cab Stand'],
            Mombasa: ['Mpeketoni Little Cab Stand'],
            Eldoret: ['Plateau Little Cab Stand'],
            Nakuru: ['Milimani Little Cab Stand']
        }},
        Faras: { logo: 'images/icons&logos/faraslogo.svg', locations: { // Assuming a logo path
            Nairobi: ['Thika Road Faras Cab Stand', 'Ngong Road Faras Cab Stand'],
            Kisumu: ['Ondiek Faras Cab Stand'],
            Mombasa: ['Likoni Faras Cab Stand'],
            Eldoret: ['Huruma Faras Cab Stand'],
            Nakuru: ['Kapsabet Faras Cab Stand']
        }},
        Oya: { logo: 'images/icons&logos/oyalogo.svg', locations: { // Assuming a logo path
            Nairobi: ['Rongai Oya Cab Stand'],
            Kisumu: ['Bondo Oya Cab Stand'],
            Mombasa: ['Diani Oya Cab Stand'],
            Eldoret: ['Town Centre Oya Cab Stand'],
            Nakuru: ['Kiamunyi Oya Cab Stand']
        }}
    };

    const snacksData = [
        { name: "Popcorn (Large)", price: 300, image: "images/snacks/popcorns.webp" },
        { name: "Coca-Cola", price: 150, image: "images/snacks/cocacola.webp" },
        { name: "Nachos with Cheese", price: 400, image: "images/snacks/nachos.webp" },
        { name: "Bottled Water", price: 100, image: "images/snacks/bottledwater.webp" }
    ];


    // --- Global State for Booking ---
    let currentBooking = {
        show: null,
        cinemaHall: null,
        city: null,
        selectedSeat: null,
        snacks: [],
        cabService: {
            needed: false,
            pickupType: 'home', // 'home' or 'cab_stand'
            address: '',
            cabStand: ''
        },
        totalPrice: 0,
        selectedPaymentMethod: null
    };

    // --- Utility Functions (from main.js and standalone_header.js consolidated) ---

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
            // Store preference in local storage
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
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
                if (item.id !== 'loginLink' && item.id !== 'registerLink' && item.id !== 'logoutLink' && item.id !== 'profileLink') {
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
                if (item.id !== 'loginLink' && item.id !== 'registerLink' && item.id !== 'logoutLink' && item.id !== 'profileLink') {
                    item.style.display = 'none';
                }
            });
        }
        userLoggedIn = isLoggedIn;
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
                if (Array.isArray(item[key])) {
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
     * @param {HTMLElement} container - The DOM element to render suggestions into.
     */
    function showPrimarySuggestions(container) {
        container.innerHTML = '';
        const suggestions = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Animation'];
        suggestions.forEach(s => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item', 'primary-suggestion');
            div.textContent = s;
            div.addEventListener('click', () => {
                document.getElementById('searchInput').value = s;
                showMessageBox(`Searching for category: ${s}`);
                container.innerHTML = '';
            });
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
                document.getElementById('searchInput').value = title;
                showMessageBox(`Searching for show: ${title}`);
                container.innerHTML = '';
            });
            container.appendChild(div);
        });
        container.classList.add('visible');
    }

    // --- Cinema Guide Specific Functions ---

    // Hero section image and text animation
    // Adjusted paths to `images/cinema/`
    const heroBackgrounds = ['images/cinema/IMAX.webp', 'images/cinema/IMAX2.webp'];
    let currentHeroImageIndex = 0;
    const cinemaHero = document.getElementById('cinemaHero');

    function changeHeroBackground() {
        if (cinemaHero) {
            currentHeroImageIndex = (currentHeroImageIndex + 1) % heroBackgrounds.length;
            cinemaHero.style.backgroundImage = `url(${heroBackgrounds[currentHeroImageIndex]})`;
        }
    }

    // Generates a random seating arrangement for a cinema hall
    function generateRandomSeats(rows, cols, occupiedRatio) {
        const seats = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const isOccupied = Math.random() < occupiedRatio;
                const seatId = `${String.fromCharCode(65 + r)}${c + 1}`; // e.g., A1, A2...
                seats.push({ id: seatId, occupied: isOccupied, selected: false });
            }
        }
        return seats;
    }

    /**
     * Renders cinema halls and their shows based on the selected city.
     * @param {string} city - The city to filter by (e.g., 'Nairobi', 'all').
     */
    function renderCinemaHalls(city) {
        const container = document.getElementById('cinemaHallsContainer');
        container.innerHTML = '';

        const citiesToDisplay = city === 'all' ? Object.keys(cinemaData) : [city];

        citiesToDisplay.forEach(cityName => {
            const hallsInCity = cinemaData[cityName];
            if (!hallsInCity || hallsInCity.length === 0) {
                // If the city exists but has no halls, or if the city name is invalid.
                return;
            }

            hallsInCity.forEach(hall => {
                const hallSection = document.createElement('section');
                hallSection.classList.add('cinema-hall-section');
                hallSection.innerHTML = `
                    <h2 class="cinema-hall-title">${hall.name}</h2>
                    <div class="screening-shows-grid">
                        <!-- Shows for this hall will go here -->
                    </div>
                `;
                const showsGrid = hallSection.querySelector('.screening-shows-grid');

                hall.shows.forEach(showtime => {
                    const showDetails = showsData.find(s => s.id === showtime.id);
                    if (!showDetails) return; // Skip if show data is missing

                    const isExpected = showDetails.rating === "Expected";
                    const displayRating = isExpected ? showDetails.rating : `<i class="fas fa-star"></i> ${showDetails.rating}`;
                    const displayRelease = showDetails.year === "TBA" ? "" : ` | ${showDetails.year}`;
                    
                    let episodeInfo = '';
                    if (showtime.isSeries) {
                        episodeInfo = `<p class="show-card-cinema-episode-info">Season ${showtime.season || 'N/A'}, Episode ${showtime.episode || 'N/A'}</p>`;
                    }

                    const showCardHtml = `
                        <div class="show-card-cinema" data-show-id="${showDetails.id}" data-cinema-name="${hall.name}" data-city="${cityName}" data-show-time="${showtime.time}" data-ticket-price="${showtime.price}">
                            <div class="show-card-cinema-poster-container">
                                <img src="${showDetails.poster}" alt="${showDetails.title} Poster" class="show-card-cinema-poster" onerror="this.onerror=null;this.src='https://placehold.co/300x420/333/fff?text=No+Poster';">
                            </div>
                            <div class="show-card-cinema-details">
                                <h3 class="show-card-cinema-title">${showDetails.title}</h3>
                                <p class="show-card-cinema-meta">
                                    ${Array.isArray(showDetails.genre) ? showDetails.genre.join(', ') : showDetails.genre} ${displayRelease} | ${displayRating}
                                </p>
                                ${episodeInfo}
                                <button class="buy-ticket-btn"><i class="fas fa-ticket-alt"></i> Buy Ticket (KES ${showtime.price})</button>
                            </div>
                        </div>
                    `;
                    showsGrid.insertAdjacentHTML('beforeend', showCardHtml);
                });
                container.appendChild(hallSection);
            });
        });

        // Add event listeners to "Buy Ticket" buttons
        document.querySelectorAll('.buy-ticket-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const card = event.target.closest('.show-card-cinema');
                const showId = card.dataset.showId;
                const cinemaName = card.dataset.cinemaName;
                const city = card.dataset.city;
                const showTime = card.dataset.showTime;
                const ticketPrice = parseFloat(card.dataset.ticketPrice);

                const selectedShow = showsData.find(s => s.id === showId);
                const selectedCinemaHall = cinemaData[city].find(hall => hall.name === cinemaName);
                const selectedShowtimeDetails = selectedCinemaHall.shows.find(s => s.id === showId && s.time === showTime);


                currentBooking.show = selectedShow;
                currentBooking.cinemaHall = selectedCinemaHall;
                currentBooking.city = city;
                currentBooking.showtimeDetails = selectedShowtimeDetails; // Store for seat data
                currentBooking.totalPrice = ticketPrice; // Initial price
                currentBooking.selectedSeat = null; // Reset selected seat
                currentBooking.snacks = []; // Reset snacks when starting new booking
                
                openBookingModal(selectedShow);
            });
        });
    }

    // --- Booking Modal Logic ---
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModalBtn = document.getElementById('closeBookingModal');
    const stepperProgressItems = document.querySelectorAll('.step-item');
    const bookingSteps = document.querySelectorAll('.booking-step');
    let currentStep = 0;

    // Elements for price display
    const priceDisplay = document.getElementById('priceDisplay');
    const summaryTotalPriceSpan = document.getElementById('summaryTotalPrice');

    // Stepper navigation buttons
    const proceedToPurchaseBtn = document.getElementById('proceedToPurchase');
    const nextStep1Btn = document.getElementById('nextStep1');
    const prevStep2Btn = document.getElementById('prevStep2');
    const nextStep2Btn = document.getElementById('nextStep2');
    const prevStep3Btn = document.getElementById('prevStep3');
    const nextStep3Btn = document.getElementById('nextStep3');
    const prevStep4Btn = document.getElementById('prevStep4');
    const nextStep4Btn = document.getElementById('nextStep4');
    const prevStep5Btn = document.getElementById('prevStep5');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');


    function openBookingModal(show) {
        // Populate Step 0 (Show Details Confirmation)
        document.getElementById('summaryShowPoster').src = show.poster;
        document.getElementById('summaryShowPoster').alt = `${show.title} Poster`;
        document.getElementById('summaryShowTitle').textContent = show.title;
        document.getElementById('summaryShowGenre').textContent = Array.isArray(show.genre) ? show.genre.join(', ') : show.genre;
        document.getElementById('summaryShowYear').textContent = show.year;
        document.getElementById('summaryShowRating').innerHTML = show.rating !== "Expected" ? `<i class="fas fa-star"></i> ${show.rating}` : show.rating;
        document.getElementById('summaryShowDescription').textContent = show.description;
        document.getElementById('summaryShowCast').textContent = show.cast && show.cast.length > 0 ? show.cast.slice(0, 3).join(', ') + (show.cast.length > 3 ? '...' : '') : 'N/A';

        // Set hero background of the modal to the show's backdrop
        bookingModal.querySelector('.booking-content').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${show.backdrop || show.poster})`;
        bookingModal.querySelector('.booking-content').style.backgroundSize = 'cover';
        bookingModal.querySelector('.booking-content').style.backgroundPosition = 'center';
        bookingModal.querySelector('.booking-content').style.color = 'white'; // Ensure text color is visible

        bookingModal.classList.add('show');
        updateStepper(0);
        showStep(0);
    }

    closeBookingModalBtn.addEventListener('click', () => {
        bookingModal.classList.remove('show');
        resetBookingModal();
    });

    function showStep(stepIndex) {
        bookingSteps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
        updateStepper(stepIndex);
        updatePriceDisplay(); // Update price whenever step changes
        checkStepCompletion(stepIndex);
    }

    function updateStepper(activeStepIndex) {
        stepperProgressItems.forEach((item, index) => {
            item.classList.remove('active', 'completed');
            if (index === activeStepIndex) {
                item.classList.add('active');
            } else if (index < activeStepIndex) {
                item.classList.add('completed');
            }
        });
    }

    function resetBookingModal() {
        currentStep = 0;
        currentBooking = {
            show: null, cinemaHall: null, city: null, selectedSeat: null,
            snacks: [], cabService: { needed: false, pickupType: 'home', address: '', cabStand: '' },
            totalPrice: 0, selectedPaymentMethod: null
        };

        // Reset all steps to initial state
        document.getElementById('seatsGrid').innerHTML = ''; // Clear seats
        document.getElementById('noSnacks').checked = true; // Reset snacks radio
        document.querySelectorAll('.snack-qty').forEach(input => {
            input.value = 0;
            input.disabled = true; // Disable snack quantity inputs
        });
        document.getElementById('noCabService').checked = true; // Reset cab
        document.getElementById('cabDetails').style.display = 'none';
        document.getElementById('homeAddressInput').value = '';
        document.getElementById('homeAddressInput').disabled = false;
        document.getElementById('cabStandSelect').innerHTML = '<option value="">Select a cab stand</option>';
        document.getElementById('cabStandSelect').disabled = true;
        document.getElementById('pickupHome').checked = true;

        document.querySelectorAll('.payment-method-item').forEach(item => item.classList.remove('selected'));
        confirmPaymentBtn.disabled = true;

        updateStepper(0);
        showStep(0);
    }

    function updatePriceDisplay() {
        priceDisplay.textContent = `Total Price: KES ${currentBooking.totalPrice.toFixed(2)}`;
        summaryTotalPriceSpan.textContent = currentBooking.totalPrice.toFixed(2);
    }

    function checkStepCompletion(step) {
        if (step === 1) { // Seat selection step
            nextStep1Btn.disabled = !currentBooking.selectedSeat;
        } else if (step === 3) { // Cab service step
            // Cab button enable logic: if cab needed, either address or cab stand must be selected. If not needed, always enabled.
            const cabNeeded = document.getElementById('yesCabService').checked;
            let cabReady = true;
            if (cabNeeded) {
                const pickupHome = document.getElementById('pickupHome').checked;
                const pickupCabStand = document.getElementById('pickupCabStand').checked;

                if (pickupHome && homeAddressInput.value.trim() === '') {
                    cabReady = false;
                } else if (pickupCabStand && cabStandSelect.value === '') {
                    cabReady = false;
                }
            }
            nextStep3Btn.disabled = !cabReady;
        } else if (step === 5) { // Payment step
            confirmPaymentBtn.disabled = !currentBooking.selectedPaymentMethod;
        }
    }


    // Stepper Navigation Handlers
    proceedToPurchaseBtn.addEventListener('click', () => {
        currentStep = 1;
        showStep(currentStep);
        renderSeats(); // Render seats for the selected show
    });

    nextStep1Btn.addEventListener('click', () => {
        if (currentBooking.selectedSeat) {
            currentStep = 2;
            showStep(currentStep);
            renderSnacks(); // Render snacks for the step
            updateSnacksInputsState(); // Ensure inputs are enabled/disabled correctly on step entry
        } else {
            showMessageBox("Please select a seat to proceed!", "fas fa-exclamation-circle orange-icon");
        }
    });

    prevStep2Btn.addEventListener('click', () => {
        currentStep = 1;
        showStep(currentStep);
    });
    nextStep2Btn.addEventListener('click', () => {
        currentStep = 3;
        showStep(currentStep);
        updateCabOptions(); // Load cab options based on selected cinema/city
    });

    prevStep3Btn.addEventListener('click', () => {
        currentStep = 2;
        showStep(currentStep);
    });
    nextStep3Btn.addEventListener('click', () => {
        if (!nextStep3Btn.disabled) { // Only proceed if validation passes
            currentStep = 4;
            showStep(currentStep);
            updateSummary(); // Populate summary details
        }
    });

    prevStep4Btn.addEventListener('click', () => {
        currentStep = 3;
        showStep(currentStep);
    });
    nextStep4Btn.addEventListener('click', () => {
        currentStep = 5;
        showStep(currentStep);
    });

    prevStep5Btn.addEventListener('click', () => {
        currentStep = 4;
        showStep(currentStep);
    });

    confirmPaymentBtn.addEventListener('click', () => {
        if (currentBooking.selectedPaymentMethod) {
            const welcomeMessage = currentBooking.cinemaHall.welcomeMessage || "Enjoy your show!";
            showMessageBox(`Payment successful via ${currentBooking.selectedPaymentMethod}! ${welcomeMessage}`, "fas fa-check-circle green-icon");
            setTimeout(() => {
                bookingModal.classList.remove('show');
                resetBookingModal();
                // Optionally refresh cinema guide or redirect to home
                // window.location.reload();
            }, 3000); // Close modal and reset after 3 seconds
        } else {
            showMessageBox("Please select a payment method!", "fas fa-exclamation-triangle orange-icon");
        }
    });

    // --- Seat Selection (Step 1) ---
    const seatsGrid = document.getElementById('seatsGrid');
    const seatPrice = 100; // Base price per seat (example)

    function renderSeats() {
        seatsGrid.innerHTML = '';
        const showtimeDetails = currentBooking.showtimeDetails;
        if (!showtimeDetails || !showtimeDetails.seats) {
            seatsGrid.innerHTML = '<p>Seating information not available.</p>';
            return;
        }

        showtimeDetails.seats.forEach(seat => {
            const seatDiv = document.createElement('div');
            seatDiv.classList.add('seat');
            seatDiv.textContent = seat.id;
            seatDiv.dataset.seatId = seat.id;

            if (seat.occupied) {
                seatDiv.classList.add('occupied');
            } else {
                seatDiv.addEventListener('click', () => {
                    // Deselect previous seat
                    const previouslySelected = seatsGrid.querySelector('.seat.selected');
                    if (previouslySelected && previouslySelected !== seatDiv) {
                        previouslySelected.classList.remove('selected');
                        // No change to total price for initial seat selection
                    }

                    // Select current seat
                    seatDiv.classList.toggle('selected');
                    if (seatDiv.classList.contains('selected')) {
                        currentBooking.selectedSeat = seat.id;
                        currentBooking.totalPrice = currentBooking.showtimeDetails.price; // Base ticket price
                    } else {
                        currentBooking.selectedSeat = null;
                        currentBooking.totalPrice = currentBooking.showtimeDetails.price; // Reset to base ticket price if no seat selected
                    }
                    updatePriceDisplay();
                    checkStepCompletion(1); // Check if next button should be enabled
                });
            }
            seatsGrid.appendChild(seatDiv);
        });

        // Ensure the next button is initially disabled if no seat is selected
        nextStep1Btn.disabled = !currentBooking.selectedSeat;
        updatePriceDisplay(); // Initial price display
    }

    // --- Snacks Selection (Step 2) ---
    const snacksContainer = document.getElementById('snacksContainer');
    const yesSnacksRadio = document.getElementById('yesSnacks');
    const noSnacksRadio = document.getElementById('noSnacks');


    function renderSnacks() {
        snacksContainer.innerHTML = '';
        snacksData.forEach(snack => {
            const snackItem = document.createElement('div');
            snackItem.classList.add('snack-item');
            snackItem.innerHTML = `
                <img src="${snack.image}" alt="${snack.name}" onerror="this.onerror=null;this.src='https://placehold.co/100x100/333/fff?text=Snack';">
                <label>${snack.name}</label>
                <p>KES ${snack.price.toFixed(2)}</p>
                <input type="number" class="snack-qty" data-snack-name="${snack.name}" data-snack-price="${snack.price}" value="0" min="0">
            `;
            snacksContainer.appendChild(snackItem);
        });

        // Event listener for quantity changes
        document.querySelectorAll('.snack-qty').forEach(input => {
            input.addEventListener('change', updateSnacksSelection);
            input.addEventListener('input', updateSnacksSelection); // Also listen to input
        });

        // Event listeners for "Yes/No" snacks radio buttons
        yesSnacksRadio.addEventListener('change', updateSnacksInputsState);
        noSnacksRadio.addEventListener('change', updateSnacksInputsState);

        // Initial update of snacks and price
        updateSnacksSelection();
        updateSnacksInputsState(); // Set initial state of inputs
    }

    function updateSnacksInputsState() {
        const snackQuantities = document.querySelectorAll('.snack-qty');
        if (noSnacksRadio.checked) {
            snackQuantities.forEach(input => {
                input.value = 0; // Reset quantities
                input.disabled = true; // Disable inputs
            });
            currentBooking.snacks = []; // Clear selected snacks
        } else {
            snackQuantities.forEach(input => {
                input.disabled = false; // Enable inputs
            });
        }
        updateSnacksSelection(); // Recalculate price based on the state change
    }

    function updateSnacksSelection() {
        currentBooking.snacks = [];
        let snacksCost = 0;

        if (yesSnacksRadio.checked) { // Only calculate if "Yes" is selected
            document.querySelectorAll('.snack-qty').forEach(input => {
                const qty = parseInt(input.value) || 0;
                if (qty > 0) {
                    const name = input.dataset.snackName;
                    const price = parseFloat(input.dataset.snackPrice);
                    currentBooking.snacks.push({ name: name, qty: qty, price: price });
                    snacksCost += qty * price;
                }
            });
        }
        // Recalculate total price: Base ticket price + snacks cost
        // Ensure currentBooking.showtimeDetails is not null, fallback to 0 if not set yet
        const baseTicketPrice = currentBooking.showtimeDetails ? currentBooking.showtimeDetails.price : 0;
        currentBooking.totalPrice = baseTicketPrice + snacksCost;
        updatePriceDisplay();
    }


    // --- Cab Service (Step 3) ---
    const noCabServiceRadio = document.getElementById('noCabService');
    const yesCabServiceRadio = document.getElementById('yesCabService');
    const cabDetailsDiv = document.getElementById('cabDetails');
    const pickupHomeRadio = document.getElementById('pickupHome');
    const pickupCabStandRadio = document.getElementById('pickupCabStand');
    const homeAddressInput = document.getElementById('homeAddressInput');
    const cabStandSelect = document.getElementById('cabStandSelect');

    function updateCabOptions() {
        const city = currentBooking.city;
        const cinemaHall = currentBooking.cinemaHall;

        // Reset inputs and selection
        homeAddressInput.value = '';
        cabStandSelect.innerHTML = '<option value="">Select a cab stand</option>';
        
        // Reset cab service in currentBooking
        currentBooking.cabService = { needed: false, pickupType: 'home', address: '', cabStand: '' };

        if (yesCabServiceRadio.checked) {
            cabDetailsDiv.style.display = 'block';
            pickupHomeRadio.checked = true; // Default to home pickup
            homeAddressInput.disabled = false; // Enable home address input
            cabStandSelect.disabled = true; // Disable cab stand select
            
            currentBooking.cabService.needed = true;
            currentBooking.cabService.pickupType = 'home';

            // Populate cab stands based on cinema's city
            if (city && cabServiceData) {
                // Find all unique cab stands for the current city across all providers
                let cityCabStands = new Set();
                for (const provider in cabServiceData) {
                    if (cabServiceData[provider].locations[city]) {
                        cabServiceData[provider].locations[city].forEach(stand => cityCabStands.add(stand));
                    }
                }
                Array.from(cityCabStands).sort().forEach(stand => {
                    const option = document.createElement('option');
                    option.value = stand;
                    option.textContent = stand;
                    cabStandSelect.appendChild(option);
                });
            }

        } else {
            cabDetailsDiv.style.display = 'none';
            currentBooking.cabService.needed = false;
        }
        checkStepCompletion(3); // Update next button
    }

    noCabServiceRadio.addEventListener('change', updateCabOptions);
    yesCabServiceRadio.addEventListener('change', updateCabOptions);

    pickupHomeRadio.addEventListener('change', () => {
        homeAddressInput.disabled = false;
        cabStandSelect.disabled = true;
        cabStandSelect.value = ''; // Clear selected cab stand
        currentBooking.cabService.pickupType = 'home';
        currentBooking.cabService.cabStand = '';
        checkStepCompletion(3);
    });

    pickupCabStandRadio.addEventListener('change', () => {
        homeAddressInput.disabled = true;
        homeAddressInput.value = ''; // Clear home address
        cabStandSelect.disabled = false;
        currentBooking.cabService.pickupType = 'cab_stand';
        currentBooking.cabService.address = '';
        checkStepCompletion(3);
    });

    homeAddressInput.addEventListener('input', () => {
        currentBooking.cabService.address = homeAddressInput.value.trim();
        checkStepCompletion(3);
    });

    cabStandSelect.addEventListener('change', () => {
        currentBooking.cabService.cabStand = cabStandSelect.value;
        checkStepCompletion(3);
    });

    // Initial check for cab service step on load (or when step 3 is shown)
    // This is handled by checkStepCompletion(3) which is called in updateCabOptions()

    // --- Summary (Step 4) ---
    function updateSummary() {
        document.getElementById('summaryShowName').textContent = currentBooking.show ? currentBooking.show.title : 'N/A';
        document.getElementById('summaryCinemaHall').textContent = currentBooking.cinemaHall ? currentBooking.cinemaHall.name : 'N/A';
        document.getElementById('summaryCity').textContent = currentBooking.city || 'N/A';
        document.getElementById('summarySeat').textContent = currentBooking.selectedSeat || 'None selected';

        let snacksSummary = "None";
        if (currentBooking.snacks.length > 0) {
            snacksSummary = currentBooking.snacks.map(s => `${s.qty}x ${s.name}`).join(', ');
        }
        document.getElementById('summarySnacks').textContent = snacksSummary;

        let cabSummary = "Not needed";
        if (yesCabServiceRadio.checked) {
            if (pickupHomeRadio.checked && homeAddressInput.value) {
                cabSummary = `Home: ${homeAddressInput.value}`;
            } else if (pickupCabStandRadio.checked && cabStandSelect.value) {
                cabSummary = `Cab Stand: ${cabStandSelect.value}`;
            } else {
                cabSummary = "Cab service selected, but no details provided.";
            }
        }
        document.getElementById('summaryCabService').textContent = cabSummary;

        updatePriceDisplay(); // Ensures total price is updated
    }

    // --- Payment (Step 5) ---
    document.querySelectorAll('.payment-method-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.payment-method-item').forEach(p => p.classList.remove('selected'));
            item.classList.add('selected');
            currentBooking.selectedPaymentMethod = item.dataset.method;
            checkStepCompletion(5); // Enable confirm button
        });
    });


    // --- Event Listeners and Initial Page Load Logic ---

    document.addEventListener("DOMContentLoaded", () => {
        // --- Initial Loading Screen Animation ---
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                // Remove loading screen from DOM after transition
                loadingScreen.addEventListener('transitionend', () => loadingScreen.remove());
            }
        }, 3000); // 3 seconds loading

        // --- Cinema Hero Background Cycling ---
        if (cinemaHero) {
            // Set initial background
            cinemaHero.style.backgroundImage = `url(${heroBackgrounds[currentHeroImageIndex]})`;
            // Start cycling backgrounds
            setInterval(changeHeroBackground, 5000); // Change every 5 seconds
        }

        // --- Header Search and Mobile Nav Logic (from standalone_header.js consolidated) ---
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

        // Ensure all necessary elements are present
        if (!searchIcon || !searchSubheader || !searchInput || !suggestionsBox ||
            !darkModeToggle || !addIcon || !accountIcon || !accountDropdown ||
            !hamburgerMenu || !mobileNavOverlay) {
            console.error("Critical header elements are missing. Header functionality may be limited.");
        } else {
             // State variables for search
            let searchScope = null;
            let selectedIndex = -1;

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

            clearSearch.addEventListener("click", () => {
                searchInput.value = "";
                searchScope = null;
                selectedIndex = -1;
                showPrimarySuggestions(suggestionsBox);
                searchInput.focus();
            });

            searchInput.addEventListener("input", () => {
                selectedIndex = -1;
                const val = searchInput.value.trim();

                if (!searchScope) {
                    if (val === "") {
                        showPrimarySuggestions(suggestionsBox);
                    } else {
                        renderShowTitleSuggestions(suggestionsBox, showsData.filter(s =>
                            s.title.toLowerCase().includes(val.toLowerCase()) ||
                            (Array.isArray(s.genre) && s.genre.some(g => g.toLowerCase().includes(val.toLowerCase()))) ||
                            (s.cast && s.cast.some(c => c.name.toLowerCase().includes(val.toLowerCase())))
                        ).map(s => s.title));
                    }
                } else {
                    const [scopeType, scopeValue] = searchScope.split(':');
                    const filteredByScope = showsData.filter(s => {
                        if (scopeType === "genre" && Array.isArray(s.genre)) return s.genre.some(g => g.toLowerCase() === scopeValue.toLowerCase());
                        return true;
                    });
                    renderShowTitleSuggestions(suggestionsBox, filteredByScope.filter(s =>
                        s.title.toLowerCase().includes(val.toLowerCase())
                    ).map(s => s.title));
                }
            });

            suggestionsBox.addEventListener("click", (event) => {
                const target = event.target;
                if (target.classList.contains('suggestion-item')) {
                    const suggestionText = target.textContent.trim();
                    const showTitleMatch = showsData.find(show => show.title === suggestionText.split(' (')[0]);

                    if (showTitleMatch) {
                        window.location.href = `details.html?title=${encodeURIComponent(showTitleMatch.title)}`;
                    } else if (target.classList.contains('primary-suggestion')) {
                        searchScope = `genre:${suggestionText}`;
                        searchInput.value = `${suggestionText}: `;
                        suggestionsBox.classList.remove("visible");
                        searchInput.focus();
                        renderShowTitleSuggestions(suggestionsBox, showsData.filter(s =>
                            Array.isArray(s.genre) && s.genre.some(g => g.toLowerCase() === suggestionText.toLowerCase())
                        ).map(s => s.title));
                    }
                }
                selectedIndex = -1;
            });

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

            document.addEventListener("click", (event) => {
                if (!searchSubheader.contains(event.target) && event.target !== searchIcon) {
                    searchSubheader.classList.remove("visible");
                    suggestionsBox.classList.remove("visible");
                    searchInput.value = "";
                    searchScope = null;
                    selectedIndex = -1;
                }
                if (!accountDropdown.contains(event.target) && event.target !== accountIcon) {
                    accountDropdown.classList.remove("visible");
                }
            });

            accountIcon.addEventListener("click", () => {
                accountDropdown.classList.toggle("visible");
                updateAccountDropdown(userLoggedIn);
            });

            darkModeToggle.addEventListener("click", () => {
                toggleDarkMode();
            });

            addIcon.addEventListener('click', (event) => {
                event.preventDefault();
                if (userLoggedIn) {
                    showMessageBox("Redirecting to settings for watchlist management (simulated)...", "fas fa-info-circle blue-icon");
                } else {
                    showMessageBox("You must be logged in to add shows to your playlist!", "fas fa-exclamation-triangle red-icon");
                }
            });

            hamburgerMenu.addEventListener('click', () => {
                mobileNavOverlay.classList.add('show');
            });

            mobileNavOverlay.addEventListener('click', (event) => {
                if (event.target === mobileNavOverlay || event.target.tagName === 'A') {
                    mobileNavOverlay.classList.remove('show');
                }
            });
            document.getElementById('closeMobileNav').addEventListener('click', () => {
                mobileNavOverlay.classList.remove('show');
            });
        }

        // --- Cinema Guide Page Initialization ---
        const citySelect = document.getElementById('citySelect');
        citySelect.addEventListener('change', (event) => {
            renderCinemaHalls(event.target.value);
        });

        // Initial render of cinema halls (default to 'all' cities)
        renderCinemaHalls('all');


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
        updateAccountDropdown(false);

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