document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const socialsToggle = document.getElementById('socials-toggle');
    const socialLinks = document.getElementById('social-links');

    const toggleSidebar = () => {
        sidebar.classList.toggle('-translate-x-full');
        backdrop.classList.toggle('hidden');
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', toggleSidebar);
    }

    if (backdrop) {
        backdrop.addEventListener('click', toggleSidebar);
    }

    if (socialsToggle) {
        socialsToggle.addEventListener('click', () => {
            socialLinks.classList.toggle('hidden');
            socialsToggle.querySelector('i').classList.toggle('rotate-180');
        });
    }

    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    if (cookieConsent && !localStorage.getItem('cookieAccepted')) {
        cookieConsent.style.display = 'block';
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            if (cookieConsent) {
                cookieConsent.style.display = 'none';
            }
        });
    }

    if (declineCookies) {
        declineCookies.addEventListener('click', () => {
            // For now, we'll just hide it
            localStorage.setItem('cookieAccepted', 'true');
            if (cookieConsent) {
                cookieConsent.style.display = 'none';
            }
        });
    }

    const fetchTournaments = async () => {
        const tournamentsContainer = document.getElementById('tournaments-container');
        try {
            const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRA4wuYi-9mQm_jqQJcX_o5biFNxBbS45jsp-J1bbVd3i4LEZDvgUWWDk29uqovv7aTAssL6M_I4YFG/pub?output=csv');
            const text = await res.text();
            const lines = text.split('\n').slice(1).filter(l => l.trim());
            const tournamentData = lines.slice(0, 5).map(line => {
                const [title, prize, _1, _2, _3, _4, _5, _6, _7, game] = line.split(',');
                return { title, prize, game };
            });

            if (tournamentsContainer) {
                tournamentsContainer.innerHTML = '';
                if (tournamentData.length > 0) {
                    tournamentData.forEach(tournament => {
                        const tournamentCard = document.createElement('div');
                        tournamentCard.className = 'tournament-card glass flex-shrink-0 p-4 min-w-[260px]';
                        tournamentCard.innerHTML = `
                            <h3 class="text-red-600 font-black text-lg mb-1">${tournament.title || 'Untitled'}</h3>
                            <p class="text-gray-300 mb-2">${tournament.game || 'Game'}</p>
                            <div class="bg-red-600/20 text-white font-bold py-1 px-3 rounded-full inline-block mb-3 border border-red-600">
                                ${tournament.prize || 'Prize TBD'}
                            </div>
                            <button onclick="window.location.href='login.html'"
                                class="w-full mt-2 py-2 bg-red-600/20 text-white font-bold rounded-full border border-red-600 hover:bg-red-600 transition">
                                Register Now
                            </button>
                        `;
                        tournamentsContainer.appendChild(tournamentCard);
                    });
                } else {
                    tournamentsContainer.innerHTML = '<p class="text-red-400">Failed to load tournaments.</p>';
                }
            }
        } catch (e) {
            console.error("Failed to load tournaments.", e);
            if (tournamentsContainer) {
                tournamentsContainer.innerHTML = '<p class="text-red-400">Failed to load tournaments.</p>';
            }
        }
    };

    fetchTournaments();

    const fetchVideos = async () => {
        const videosContainer = document.getElementById('videos-container');
        const key = 'AIzaSyAkUf-Vwi0KbLw49xTryOsrNx9PvR3ph-8';
        const channelId = 'UCJKmT7fdYF7F2tqijFEzDgQ';
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&channelId=${channelId}&order=date&type=video&key=${key}`);
            const data = await res.json();
            const videos = data.items || [];

            if (videosContainer) {
                videosContainer.innerHTML = '';
                if (videos.length > 0) {
                    videos.forEach(item => {
                        const id = item.id.videoId;
                        const title = item.snippet.title;
                        const thumb = item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url;
                        const videoCard = document.createElement('div');
                        videoCard.className = 'glass p-3';
                        videoCard.innerHTML = `
                            <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">
                                <img src="${thumb}" alt="${title}" class="w-full rounded mb-2" />
                                <p class="text-sm text-gray-200 truncate">${title}</p>
                            </a>
                        `;
                        videosContainer.appendChild(videoCard);
                    });
                } else {
                    videosContainer.innerHTML = '<p class="text-red-400 col-span-full">Failed to load videos.</p>';
                }
            }
        } catch (e) {
            console.error("Failed to load videos.", e);
            if (videosContainer) {
                videosContainer.innerHTML = '<p class="text-red-400 col-span-full">Failed to load videos.</p>';
            }
        }
    };

    fetchVideos();

    const fetchTournamentsPage = async () => {
        const tournamentsContainer = document.getElementById('tournaments-page-container');
        const gameFilter = document.getElementById('game-filter');
        let allTournaments = [];

        try {
            const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRA4wuYi-9mQm_jqQJcX_o5biFNxBbS45jsp-J1bbVd3i4LEZDvgUWWDk29uqovv7aTAssL6M_I4YFG/pub?output=csv');
            const text = await res.text();
            const lines = text.split('\n').slice(1).filter(l => l.trim());
            allTournaments = lines.map(line => {
                const [title, prize, _1, _2, _3, _4, _5, _6, _7, game, imageUrl, slots, organization, registration, closeDate, format, socialLink] = line.split(',');
                return { title, prize, game, imageUrl, slots, organization, registration, closeDate, format, socialLink };
            });

            const uniqueGames = [...new Set(allTournaments.map(t => t.game))];
            if (gameFilter) {
                uniqueGames.forEach(game => {
                    const option = document.createElement('option');
                    option.value = game;
                    option.textContent = game;
                    gameFilter.appendChild(option);
                });
            }

            const renderTournaments = (tournaments) => {
                if (tournamentsContainer) {
                    tournamentsContainer.innerHTML = '';
                    if (tournaments.length > 0) {
                        tournaments.forEach(tournament => {
                            const tournamentCard = document.createElement('div');
                            tournamentCard.className = 'bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/30 hover:scale-[1.02] transition-all duration-300 flex flex-col relative group tournament-card border border-gray-700';
                            const isExpired = new Date(tournament.closeDate) < new Date();
                            tournamentCard.innerHTML = `
                                <div class="relative w-full h-48 bg-black">
                                    <img src="${tournament.imageUrl || '/assets/navbar/logo.png'}" alt="${tournament.title}" class="h-full w-full object-cover" />
                                    <span class="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded-full font-semibold">${tournament.game}</span>
                                    <span class="absolute top-2 right-2 bg-red-800 text-xs px-2 py-1 rounded-full">${tournament.slots} slots</span>
                                </div>
                                <div class="p-4 flex-1 flex flex-col">
                                    <h2 class="text-lg font-bold text-white truncate mb-1" title="${tournament.title}">${tournament.title}</h2>
                                    <p class="text-sm text-gray-400 mb-2">By ${tournament.organization}</p>
                                    <div class="flex items-center justify-between text-sm text-gray-300 mb-3">
                                        <span class="font-semibold text-green-400">${tournament.prize}</span>
                                        <span class="text-xs ${isExpired ? 'text-red-400' : 'text-yellow-400'}">
                                            ${isExpired ? 'Registration Closed' : 'Registration Open'}
                                        </span>
                                    </div>
                                    <div class="mt-auto flex space-x-2">
                                        <button class="details-button flex-1 px-3 py-2 text-sm text-white border-2 border-red-600 rounded-lg hover:bg-red-600 transition-colors">Details</button>
                                        <a href="${tournament.registration}" target="_blank" rel="noopener noreferrer"
                                           class="flex-1 px-3 py-2 text-sm text-center text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                                           Register
                                        </a>
                                    </div>
                                </div>
                            `;
                            tournamentsContainer.appendChild(tournamentCard);
                        });
                    } else {
                        tournamentsContainer.innerHTML = '<p class="text-red-400 col-span-full">No tournaments found.</p>';
                    }
                }
            };

            renderTournaments(allTournaments);

            if (gameFilter) {
                gameFilter.addEventListener('change', (e) => {
                    const selectedGame = e.target.value;
                    if (selectedGame) {
                        renderTournaments(allTournaments.filter(t => t.game === selectedGame));
                    } else {
                        renderTournaments(allTournaments);
                    }
                });
            }

        } catch (e) {
            console.error("Failed to load tournaments.", e);
            if (tournamentsContainer) {
                tournamentsContainer.innerHTML = '<p class="text-red-400 col-span-full">Failed to load tournaments.</p>';
            }
        }
    };

    if (window.location.pathname.includes('tournaments.html')) {
        fetchTournamentsPage();
    }
});
