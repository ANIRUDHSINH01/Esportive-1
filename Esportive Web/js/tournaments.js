import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

// ✅ Your Google Sheets CSV link (published to web)
const googleSheetsUrl = 
  "https://docs.google.com/spreadsheets/d/14vc1xeqDs5fGoIqasCEN9J4UDMFV6Qx6wGQTo-3rXnc/export?format=csv&gid=0";

// ✅ Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDB9gtUd2KcBB9bEkD8Jzj_kyFE20GE7OA",
    authDomain: "espotive.firebaseapp.com",
    databaseURL: "https://espotive-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "espotive",
    storageBucket: "espotive.appspot.com", // fixed bucket
    messagingSenderId: "439864037476",
    appId: "1:439864037476:web:f6dc91eefae15c00a3cf71",
    measurementId: "G-Q2W9WHLCCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// SVG icons used in details UI
const detailsIcons = {
    "Event Name": `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m1-3a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
    "Game": `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/></svg>`,
    "PrizePool": `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.567-3 3.5s1.343 3.5 3 3.5 3-1.567 3-3.5-1.343-3.5-3-3.5z"/></svg>`,
    "Slots": `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="3"/></svg>`,
    "Format": `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/></svg>`,
    "Close Date": `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"/></svg>`,
    "Organization": `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v3a4 4 0 004 4h10a4 4 0 004-4V7"/></svg>`,
    "Social Link": `<svg xmlns="http://www.w3.org/2000/svg" class="inline w-4 h-4 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 7a2 2 0 00-2 2m0 0v4a2 2 0 002 2m-4-6a2 2 0 00-2 2m0 0v4a2 2 0 002 2m-6-4h.01"/></svg>`
};

// Helper function to create detail list items with icon
const detailRow = (label, value, link = false) => `
    <li class="flex items-center py-1 text-gray-300">
        ${detailsIcons[label] || ""}
        <span class="font-semibold text-white">${label}:</span>
        <span class="ml-1 ${link ? "text-blue-400 underline" : ""}">
            ${link ? `<a href="${value}" target="_blank" rel="noopener noreferrer">View</a>` : value}
        </span>
    </li>
`;

// Auth state
onAuthStateChanged(auth, (user) => {
    const profileContainer = document.getElementById('profile-container');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (user) {
        if (user.photoURL) {
            profileContainer.innerHTML = `
                <img src="${user.photoURL}" alt="User Profile" class="h-8 w-8 rounded-full border-2 border-red-600 cursor-pointer">
            `;
        } else {
            profileContainer.innerHTML = `
                <i class="fas fa-user-circle text-2xl text-white cursor-pointer"></i>
            `;
        }

        profileContainer.addEventListener('click', () => {
            profileDropdown.classList.toggle('hidden');
        });
    } else {
        window.location.href = 'index.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = 'index.html';
            } catch (error) {
                console.error("Error signing out:", error);
            }
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const socialsToggle = document.getElementById('socials-toggle');
    const socialLinks = document.getElementById('social-links');
    const tournamentsContainer = document.getElementById('tournaments-container');
    const gameFilter = document.getElementById('game-filter');
    let allTournaments = [];

    // Sidebar toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    socialsToggle.addEventListener('click', () => {
        socialLinks.classList.toggle('hidden');
        socialsToggle.querySelector('i').classList.toggle('rotate-180');
    });

    // ✅ Parse CSV
    const parseCSV = (csv) => {
        const lines = csv.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) {
            console.warn("CSV data is empty.");
            return [];
        }
        
        const headers = lines[0].split(',').map(header => header.trim());
        const requiredFields = [
            'Event Name',
            'PrizePool', // matches your sheet
            'ImageURL',
            'Slots',
            'Format',
            'Close Date',
            'Organization',
            'Social Link',
            'Registration',
            'Game'
        ];
        
        const parsedData = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            const row = {};
            headers.forEach((header, i) => {
                row[header] = values[i];
            });
            return row;
        });

        return parsedData.filter(row => {
            const isValid = requiredFields.every(field => row[field] && row[field].length > 0);
            if (!isValid) {
                console.error("Skipping row due to missing required fields:", row);
            }
            return isValid;
        });
    };

    // Card creation
    const createCard = (tournament) => {
        const card = document.createElement('div');
        card.className = 'bg-gray-900 rounded-lg p-4 flex flex-col items-center text-center tournament-card relative';
        
        card.innerHTML = `
            <div class="w-full relative aspect-square">
                <div class="absolute inset-0">
                    <img src="${tournament.ImageURL}" alt="${tournament['Event Name']}" class="h-full w-full object-contain p-4" data-card-image>
                </div>
                <div class="absolute inset-0 p-4 hidden bg-gray-900/90 rounded-lg border border-gray-800 text-left overflow-auto" data-card-details>
                    <p class="text-base font-bold mb-3 text-red-500">Tournament Details:</p>
                    <ul>
                        ${detailRow("Event Name", tournament['Event Name'])}
                        ${detailRow("Game", tournament.Game)}
                        ${detailRow("PrizePool", tournament.PrizePool)}
                        ${detailRow("Slots", tournament.Slots)}
                        ${detailRow("Format", tournament.Format)}
                        ${detailRow("Close Date", tournament['Close Date'])}
                        ${detailRow("Organization", tournament.Organization)}
                        ${detailRow("Social Link", tournament['Social Link'], true)}
                    </ul>
                </div>
            </div>
            <div class="mt-4 flex flex-col items-center w-full">
                <h2 class="text-lg font-semibold text-white">${tournament['Event Name']}</h2>
                <p class="text-sm text-gray-400">Game: ${tournament.Game}</p>
                <p class="text-xs text-gray-400">Prize Pool: ${tournament.PrizePool}</p>
                <div class="flex space-x-2 mt-4 w-full justify-center">
                    <button class="flex-1 px-4 py-1 text-sm text-white border-2 border-red-600 rounded-full hover:bg-red-600 transition-colors" data-details-toggle>Details</button>
                    <a href="${tournament.Registration}" target="_blank" class="flex-1 px-4 py-1 text-sm text-center text-white border-2 border-red-600 rounded-full hover:bg-red-600 transition-colors">Register</a>
                </div>
            </div>
        `;
        return card;
    };

    const renderTournaments = (tournaments) => {
        tournamentsContainer.innerHTML = '';
        if (tournaments.length === 0) {
            tournamentsContainer.innerHTML = '<p class="text-center text-gray-500">No tournaments found.</p>';
            return;
        }
        tournaments.forEach(t => {
            const card = createCard(t);
            tournamentsContainer.appendChild(card);
        });
        document.querySelectorAll('[data-details-toggle]').forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.tournament-card');
                const image = card.querySelector('[data-card-image]');
                const details = card.querySelector('[data-card-details]');
                image.classList.toggle('hidden');
                details.classList.toggle('hidden');
                button.textContent = image.classList.contains('hidden') ? 'Back' : 'Details';
            });
        });
    };

    const createFilterDropdown = () => {
        const games = [
            'BGMI',
            'Free Fire',
            'CODM',
            'Clash Of Clans',
            'Clash Royale',
            'Brawl Stars',
            'Pokemon Unite'
        ];
        gameFilter.innerHTML = '<option value="">All Games</option>';
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game;
            option.textContent = game;
            gameFilter.appendChild(option);
        });
    };

    const fetchTournaments = async () => {
        try {
            const response = await fetch(googleSheetsUrl);
            const csvText = await response.text();
            allTournaments = parseCSV(csvText);
            
            createFilterDropdown();
            
            renderTournaments(allTournaments.slice(0, 10));

            gameFilter.addEventListener('change', (e) => {
                const gameToFilter = e.target.value;
                let filtered = allTournaments;
                if (gameToFilter) {
                    filtered = allTournaments.filter(t => t['Game'] === gameToFilter);
                }
                renderTournaments(filtered.slice(0, 10));
            });
        } catch (error) {
            console.error("Error fetching tournaments:", error);
        }
    };

    fetchTournaments();
});
