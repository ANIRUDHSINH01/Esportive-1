<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Featured Tournaments | Esportive</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Fonts & Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Zalando+Sans+Expanded:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  <style>
    body {
      background: url('https://media.giphy.com/media/pHEiu1rj2Rk2k/giphy.gif') no-repeat center center fixed;
      background-size: cover;
      font-family: 'Zalando Sans Expanded', sans-serif;
      margin: 0; color: #eee;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.76);
      backdrop-filter: blur(10px);
      z-index: -1;
    }
    main { padding: 2rem 0.8rem; max-width: 1100px; margin: 0 auto; }
    h1 {
      text-align: center; color: #ff3b3b; font-weight: 900;
      font-size: 2.3rem; margin: 1.5rem 0 2.3rem 0; letter-spacing: 0.12em;
      text-shadow: 0 1px 5px rgba(255,59,59,0.14);
    }
    #profile-container { position: absolute; top: 20px; right: 16px; z-index: 1500;}
    #profile-container img, #profile-container i {
      cursor:pointer; box-shadow: 0 1px 6px rgba(255,59,59,0.1);
    }
    #profile-dropdown {
      position: absolute; top: 45px; right: 0;
      background: rgba(23,23,24,0.96); color: #eee; min-width:100px;
      border-radius: 0.8rem; border:1px solid rgba(255,59,59,0.1); box-shadow: 0 2px 8px rgba(255,59,59,0.10);
      padding: 0.7rem 1rem; font-size:0.97rem; display: none;
    }
    #profile-dropdown:not(.hidden) { display: block; }
    #logout-btn { color: #ff3b3b; background:none; border:none; cursor:pointer; font-weight:600; margin-top:8px;}
    #tournaments-container { display: flex; flex-wrap: nowrap; gap: 1rem; overflow-x: auto; padding-bottom: 1.3rem; scroll-padding-left: 0.4rem; margin-bottom: 2rem;}
    .tournament-card {
      min-width: 260px;
      background: rgba(255,255,255,0.10);
      backdrop-filter: blur(14px);
      border-radius: 18px;
      border: 1px solid rgba(255,59,59,0.13);
      box-shadow: 0 2px 8px rgba(255,59,59,0.11);
      padding: 1rem 1rem 1.3rem 1rem;
      color: #eee;
      transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
      display: flex; flex-direction: column;
      align-items: center;
    }
    .tournament-card:hover,
    .tournament-card:focus-within {
      box-shadow: 0 6px 16px rgba(255,59,59,0.15);
      border-color: #ff3b3b;
      transform: translateY(-4px) scale(1.02);
    }
    .tournament-card h2 {
      color: #ff3b3b;
      text-shadow: 0 1px 5px rgba(255,59,59,0.13);
      font-weight: 800;
      font-size: 1.13rem;
      margin-bottom: 0.27rem;
    }
    .tournament-card p {
      color: #ccc;
      font-size: 0.96rem;
      margin-bottom: 0.05rem;
    }
    .tournament-card [data-details-toggle],
    .tournament-card a {
      background: rgba(255,59,59,0.12);
      border: 2px solid #ff3b3b;
      color: white;
      font-weight: 600;
      border-radius: 9999px;
      box-shadow: 0 1px 6px rgba(255,59,59,0.11);
      padding: 0.33rem 1.2rem;
      font-size: 0.93rem;
      margin: 0.18rem 0.12rem 0 0.12rem;
      transition: background 0.3s, box-shadow 0.3s, color 0.3s;
      display: inline-block;
      text-decoration: none;
    }
    .tournament-card [data-details-toggle]:hover,
    .tournament-card a:hover {
      background: #ff3b3b;
      color: #fff;
    }
    [data-card-details] {
      background: rgba(18,18,20, 0.98);
      border-radius: 14px;
      border: 1px solid rgba(255,59,59,0.11);
      box-shadow: 0 2px 8px rgba(255,59,59,0.10);
      padding: 1rem 0.7rem;
      color: #eee;
      z-index: 1;
      min-width: 220px;
      max-width: 260px;
      overflow: auto;
      font-size: 0.94rem;
    }
    [data-card-details] li {
      margin-bottom: 0.6rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    /* Icons in details with colors like your theme */
    .icon-yellow { color: #fbbf24; } /* yellow */
    .icon-green { color: #34d399; } /* green */
    .icon-cyan { color: #22d3ee; } /* cyan */
    .icon-purple { color: #a78bfa; } /* purple */
    .icon-blue { color: #60a5fa; } /* blue */
    .icon-pink { color: #f472b6; } /* pink */
    .icon-orange { color: #fb923c; } /* orange */
    .icon-red { color: #f87171; } /* red */

    /* Utility for icons */
    svg.details-icon {
      width: 1rem; height: 1rem;
      flex-shrink: 0;
    }
    .details-label {
      font-weight: 600;
      color: #fff;
      min-width: 100px;
    }

    @media (max-width: 650px) {
      #tournaments-container {
        flex-direction: column;
        overflow-x: visible;
        gap: 0.74rem;
      }
      .tournament-card {
        min-width: unset;
        width: 96vw;
        margin: 0 auto 0.7rem auto;
      }
      [data-card-details] {
        max-width: 96vw;
      }
      #profile-container { right: 8px;}
      main { padding: 1.2rem 0.25rem; }
    }
  </style>
</head>

<body>
  <div id="profile-container"></div>
  <div id="profile-dropdown" class="hidden">
    <span>Profile</span><br />
    <button id="logout-btn">Logout</button>
  </div>

  <main>
    <h1>Featured Tournaments</h1>
    <select id="game-filter" aria-label="Select Game Filter"></select>
    <div id="tournaments-container" tabindex="0" aria-live="polite" role="list"></div>
  </main>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
    import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

    const googleSheetsUrl = "https://docs.google.com/spreadsheets/d/14vc1xeqDs5fGoIqasCEN9J4UDMFV6Qx6wGQTo-3rXnc/export?format=csv&gid=0";
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

    // Your SVG icons matching your theme
    const svgIcons = {
      "Event Name": `<svg xmlns="http://www.w3.org/2000/svg" class="details-icon icon-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m1-3a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
      "Game": `<svg xmlns="http://www.w3.org/2000/svg" class="details-icon icon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/></svg>`,
      "PrizePool": `<svg xmlns="http://www.w3.org/2000/svg" class="details-icon icon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.567-3 3.5s1.343 3.5 3 3.5 3-1.567 3-3.5-1.343-3.5-3-3.5z"/></svg>`,
      "Slots": `<svg xmlns="http://www.w3.org/2000/svg" class="details-icon icon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="3"/></svg>`,
      "Format": `<svg xmlns="http://www.w3.org/2000/svg" class="details-icon icon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/></svg>`,
      "Close Date": `<svg xmlns="http://www.w3.org/2000/svg" class="details-icon icon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"/></svg>`,
      "Organization": `<svg xmlns="http://www.w3.org/2000/svg" class="details-icon icon-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v3a4 4 0 004 4h10a4 4 0 004-4V7"/></svg>`,
      "Social Link": `<svg xmlns="http://www.w3.org/2000/svg" class="details-icon icon-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 7a2 2 0 00-2 2m0 0v4a2 2 0 002 2m-4-6a2 2 0 00-2 2m0 0v4a2 2 0 002 2m-6-4h.01"/></svg>`
    };

    const detailRow = (label, value, link = false) => `
      <li>${svgIcons[label] || ""}<span class="details-label">${label}:</span>
      <span>${link ? `<a href="${value}" target="_blank" rel="noopener noreferrer">View</a>` : value}</span></li>
    `;

    onAuthStateChanged(auth, (user) => {
      const profileContainer = document.getElementById('profile-container');
      const profileDropdown = document.getElementById('profile-dropdown');

      if (user) {
        if (user.photoURL) {
          profileContainer.innerHTML = `<img src="${user.photoURL}" alt="User Profile" class="h-8 w-8 rounded-full border-2 border-red-600" />`;
        } else {
          profileContainer.innerHTML = `<i class="fas fa-user-circle text-2xl text-white"></i>`;
        }
        profileContainer.onclick = () => {
          profileDropdown.classList.toggle('hidden');
        };
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

      const tournamentsContainer = document.getElementById('tournaments-container');
      const gameFilter = document.getElementById('game-filter');
      let allTournaments = [];

      const parseCSV = (csv) => {
        const lines = csv.split('\n').filter(line => line.trim() !== '');
        if (!lines.length) return [];
        const headers = lines[0].split(',').map(h => h.trim());
        const reqFields = ['Event Name', 'PrizePool', 'ImageURL', 'Slots', 'Format', 'Close Date', 'Organization', 'Social Link', 'Registration', 'Game'];
        return lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          let row = {};
          headers.forEach((h,i) => row[h] = values[i]);
          return row;
        }).filter(row => reqFields.every(f => row[f] && row[f].length));
      };

      const createCard = (t) => {
        const card = document.createElement('div');
        card.className = 'tournament-card';
        card.innerHTML = `
          <div class="w-full relative aspect-square" style="min-height:145px;">
            <img src="${t.ImageURL}" alt="${t['Event Name']}" class="h-full w-full object-contain rounded-md mb-2" data-card-image/>
            <div class="absolute inset-0 p-4 hidden" data-card-details>
              <p class="text-base font-bold mb-3 text-red-500">Tournament Details:</p>
              <ul>
                ${detailRow("Event Name", t['Event Name'])}
                ${detailRow("Game", t.Game)}
                ${detailRow("PrizePool", t.PrizePool)}
                ${detailRow("Slots", t.Slots)}
                ${detailRow("Format", t.Format)}
                ${detailRow("Close Date", t['Close Date'])}
                ${detailRow("Organization", t.Organization)}
                ${detailRow("Social Link", t['Social Link'], true)}
              </ul>
            </div>
          </div>
          <div class="mt-4 flex flex-col items-center w-full">
            <h2>${t['Event Name']}</h2>
            <p>Game: ${t.Game}</p>
            <p class="text-xs mb-2">Prize Pool: ${t.PrizePool}</p>
            <div class="flex space-x-2 mt-1 w-full justify-center">
              <button data-details-toggle>Details</button>
              <a href="${t.Registration}" target="_blank">Register</a>
            </div>
          </div>
        `;
        return card;
      };

      const renderTournaments = (tournaments) => {
        tournamentsContainer.innerHTML = '';
        if (!tournaments.length) {
          tournamentsContainer.innerHTML = '<p class="text-center text-gray-400">No tournaments found.</p>';
          return;
        }
        tournaments.forEach(t => tournamentsContainer.appendChild(createCard(t)));
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

      function createFilterDropdown() {
        const games = [...new Set(allTournaments.map(t => t.Game))].sort();
        gameFilter.innerHTML = '<option value="">All Games</option>';
        games.forEach(game => {
          const option = document.createElement('option');
          option.value = game;
          option.textContent = game;
          gameFilter.appendChild(option);
        });
      }

      async function fetchTournaments() {
        try {
          const resp = await fetch(googleSheetsUrl);
          const csvText = await resp.text();
          allTournaments = parseCSV(csvText);
          createFilterDropdown();
          renderTournaments(allTournaments.slice(0, 10));

          gameFilter.onchange = (e) => {
            const selected = e.target.value;
            const filtered = selected ? allTournaments.filter(t => t.Game === selected) : allTournaments;
            renderTournaments(filtered.slice(0, 10));
          };
        } catch(e) {
          tournamentsContainer.innerHTML = '<p class="text-center text-gray-400">Failed to load tournaments.</p>';
          console.error(e);
        }
      }

      fetchTournaments();
    });
  </script>
</body>
</html>
  
