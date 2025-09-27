// --- SVG ICONS (Lucide-style, MIT licensed) ---
const ICONS = {
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  back: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
  game: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  prize: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"></path><path d="M20 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"></path><circle cx="12" cy="12" r="2"></circle></svg>`,
  slots: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  format: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path><polyline points="4 12 12 16 20 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  org: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6M3 10V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 10h8M9 10V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m0 0v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6M9 10h8"></path></svg>`,
  social: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  register: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
};

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

// 🔒 REMINDER: Restrict this API key in Google Cloud Console!
const firebaseConfig = {
  apiKey: "AIzaSyDB9gtUd2KcBB9bEkD8Jzj_kyFE20GE7OA",
  authDomain: "espotive.firebaseapp.com",
  databaseURL: "https://espotive-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "espotive",
  storageBucket: "espotive.firebasestorage.app",
  messagingSenderId: "439864037476",
  appId: "1:439864037476:web:f6dc91eefae15c00a3cf71",
  measurementId: "G-Q2W9WHLCCR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Auth state listener
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

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Logout
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

  // Sidebar toggle
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle && menuIcon && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-xmark');
    });
  }

  // Socials toggle
  const socialsToggle = document.getElementById('socials-toggle');
  const socialLinks = document.getElementById('social-links');
  if (socialsToggle && socialLinks) {
    socialsToggle.addEventListener('click', () => {
      socialLinks.classList.toggle('hidden');
      const icon = socialsToggle.querySelector('i');
      if (icon) icon.classList.toggle('rotate-180');
    });
  }

  // Tournament elements
  const tournamentsContainer = document.getElementById('tournaments-container');
  const gameFilter = document.getElementById('game-filter');
  let allTournaments = [];

  // Create filter dropdown
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

  // Create tournament card
  const createCard = (tournament) => {
    const card = document.createElement('div');
    card.className = 'bg-gray-900 rounded-lg p-4 flex flex-col items-center text-center tournament-card shadow-lg';

    const closeDate = tournament['Close Date'] 
      ? new Date(tournament['Close Date']).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      : tournament['Close Date'];

    card.innerHTML = `
      <div class="w-full relative aspect-square mb-3">
        <img src="${tournament.ImageURL || 'https://via.placeholder.com/150/333/fff?text=No+Image'}" 
             alt="${tournament['Event Name']}" 
             class="h-full w-full object-contain p-2 rounded"
             onerror="this.src='https://via.placeholder.com/150/333/fff?text=No+Image'; this.onerror=null;">
      </div>

      <h2 class="text-lg font-bold text-white mb-1 line-clamp-2">${tournament['Event Name']}</h2>
      <p class="text-sm text-gray-400 flex items-center justify-center gap-1">
        ${ICONS.game} ${tournament.Game}
      </p>
      <p class="text-xs text-gray-500 flex items-center justify-center gap-1">
        ${ICONS.prize} ${tournament.PrizePool}
      </p>

      <div class="mt-3 flex space-x-2 w-full">
        <button class="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors flex items-center justify-center gap-1" data-details-toggle>
          ${ICONS.info} Details
        </button>
        <a href="${tournament.Registration}" target="_blank" rel="noopener" 
           class="flex-1 px-3 py-1.5 text-sm font-medium text-center text-white border border-red-600 hover:bg-red-600 rounded-full transition-colors flex items-center justify-center gap-1">
          ${ICONS.register} Register
        </a>
      </div>

      <div class="mt-4 w-full hidden tournament-details" data-card-details>
        <div class="bg-gray-800 rounded-lg p-3 text-left space-y-2 text-sm">
          <div class="flex justify-between items-center">
            <span class="text-gray-400 flex items-center gap-1">${ICONS.slots} Slots:</span>
            <span class="text-white font-medium">${tournament.Slots}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 flex items-center gap-1">${ICONS.format} Format:</span>
            <span class="text-white font-medium">${tournament.Format}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-400 flex items-center gap-1">${ICONS.calendar} Closes:</span>
            <span class="text-white font-medium">${closeDate || 'N/A'}</span>
          </div>
          <div class="pt-2 border-t border-gray-700">
            <span class="text-gray-400 flex items-center gap-1 mb-1">${ICONS.org} Organized by:</span>
            <span class="text-white font-medium">${tournament.Organization}</span>
          </div>
          <div class="pt-2">
            <span class="text-gray-400 flex items-center gap-1 mb-1">${ICONS.social} Social:</span>
            <a href="${tournament['Social Link']}" target="_blank" rel="noopener" 
               class="text-blue-400 hover:underline font-medium break-words inline-flex items-center gap-1">
              View Page ${ICONS.social}
            </a>
          </div>
        </div>
      </div>
    `;
    return card;
  };

  // Render tournaments
  const renderTournaments = (tournaments) => {
    tournamentsContainer.innerHTML = '';
    if (tournaments.length === 0) {
      tournamentsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">No tournaments found for this game.</p>';
      return;
    }
    tournaments.forEach(tournament => {
      tournamentsContainer.appendChild(createCard(tournament));
    });
  };

  // Fetch tournaments from Google Sheets
  const fetchTournaments = () => {
    const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRA4wuYi-9mQm_jqQJcX_o5biFNxBbS45jsp-J1bbVd3i4LEZDvgUWWDk29uqovv7aTAssL6M_I4YFG/pub?output=csv';

    Papa.parse(googleSheetsUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        allTournaments = results.data
          .map(row => {
            const cleaned = {};
            for (const key in row) {
              cleaned[key.trim()] = (row[key] || '').toString().trim();
            }
            return cleaned;
          })
          .filter(row => {
            const required = ['Event Name', 'PrizePool', 'ImageURL', 'Slots', 'Format', 'Close Date', 'Organization', 'Social Link', 'Registration', 'Game'];
            return required.every(field => row[field] && row[field] !== '');
          });

        createFilterDropdown();
        renderTournaments(allTournaments.slice(0, 10));
      },
      error: (error) => {
        console.error("CSV parsing error:", error);
        tournamentsContainer.innerHTML = '<p class="text-center text-red-500 py-8">Failed to load tournaments. Please try again later.</p>';
      }
    });
  };

  // Event delegation for details toggle
  tournamentsContainer.addEventListener('click', (e) => {
    if (e.target.matches('[data-details-toggle]') || e.target.closest('[data-details-toggle]')) {
      const button = e.target.matches('[data-details-toggle]') 
        ? e.target 
        : e.target.closest('[data-details-toggle]');
      
      const card = button.closest('.tournament-card');
      const detailsPanel = card.querySelector('.tournament-details');
      const isExpanded = !detailsPanel.classList.contains('hidden');

      detailsPanel.classList.toggle('hidden');

      if (isExpanded) {
        button.innerHTML = `${ICONS.info} Details`;
      } else {
        button.innerHTML = `${ICONS.back} Back`;
      }
    }
  });

  // Filter change handler
  gameFilter.addEventListener('change', (e) => {
    const game = e.target.value;
    const filtered = game 
      ? allTournaments.filter(t => t.Game === game)
      : allTournaments;
    renderTournaments(filtered.slice(0, 10));
  });

  // Initial load
  fetchTournaments();
});
