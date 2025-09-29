document.addEventListener('DOMContentLoaded', function() {
  // Sidebar & Socials Dropdown
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const sidebar = document.getElementById('sidebar');
  const socialsToggle = document.getElementById('socials-toggle');
  const socialLinks = document.getElementById('social-links');

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('translate-x-0');
    sidebar.classList.toggle('-translate-x-full');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
  });

  socialsToggle.addEventListener('click', () => {
    socialLinks.hidden = !socialLinks.hidden;
    socialsToggle.classList.toggle('open');
    socialsToggle.querySelector('i').classList.toggle('rotate-180');
  });

  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('translate-x-0');
      sidebar.classList.add('-translate-x-full');
      menuIcon.classList.add('fa-bars');
      menuIcon.classList.remove('fa-times');
    });
  });

  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('translate-x-0')) {
      sidebar.classList.remove('translate-x-0');
      sidebar.classList.add('-translate-x-full');
      menuIcon.classList.add('fa-bars');
      menuIcon.classList.remove('fa-times');
    }
  });

  // Cookie Consent Logic
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptButton = document.getElementById('accept-cookies');
  const declineButton = document.getElementById('decline-cookies');
  if (cookieConsent && acceptButton && declineButton) {
    if (!localStorage.getItem('cookieAccepted')) {
      cookieConsent.classList.remove('hidden');
    }
    const hideCookieConsent = () => { cookieConsent.classList.add('hidden'); };
    acceptButton.addEventListener('click', () => {
      localStorage.setItem('cookieAccepted', 'true');
      hideCookieConsent();
    });
    declineButton.addEventListener('click', () => {
      localStorage.setItem('cookieAccepted', 'true');
      hideCookieConsent();
    });
  }

  // Featured Tournaments: Load from Google Sheets CSV
  async function fetchAndRenderTournaments() {
    const tournamentsContainer = document.getElementById('tournaments-container');
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRA4wuYi-9mQm_jqQJcX_o5biFNxBbS45jsp-J1bbVd3i4LEZDvgUWWDk29uqovv7aTAssL6M_I4YFG/pub?output=csv';
    try {
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const csvText = await response.text();
      const lines = csvText.split('\n').slice(1); // Skip header
      if (lines.length === 0 || (lines.length === 1 && lines[0].trim() === '')) {
        tournamentsContainer.innerHTML = '<div class="text-gray-400">No featured tournaments found.</div>';
        return;
      }
      const limitedLines = lines.slice(0, 5);
      tournamentsContainer.innerHTML = '';
      limitedLines.forEach(line => {
        const parts = line.split(',');
        if (parts.length >= 10) {
          const title = parts[0].trim();
          const prize = parts[1].trim();
          const game = parts[9].trim();
          const card = document.createElement('div');
          card.className = 'w-64 flex-shrink-0 bg-gray-900 rounded-lg p-4 shadow-lg flex flex-col items-center justify-between transition-all duration-300 transform hover:scale-105 mb-4';
          card.innerHTML = `
            <div class="text-center">
              <h3 class="text-lg font-semibold text-center truncate w-full">${title}</h3>
              <p class="text-sm text-gray-400 mt-1">${game}</p>
              <div class="mt-2 text-center">
                <span class="text-xl font-bold text-red-600">${prize}</span>
                <p class="text-xs text-gray-500">Prize Pool</p>
              </div>
            </div>
            <button onclick="window.location.href='login.html'" class="w-full mt-4 px-4 py-2 text-white border-2 border-red-600 rounded-full text-center text-sm font-semibold transition hover:bg-red-600 hover:border-red-600">
              Register Now
            </button>
          `;
          tournamentsContainer.appendChild(card);
        }
      });
    } catch (error) {
      tournamentsContainer.innerHTML = '<div class="text-red-400">Failed to load tournaments. Please check the CSV link and try again.</div>';
      console.error('Tournaments Error:', error);
    }
  }

  // Esportive Feed: Load YouTube videos
  async function fetchAndRenderVideos() {
    const apiKey = 'AIzaSyAkUf-Vwi0KbLw49xTryOsrNx9PvR3ph-8';
    const channelId = 'UCJKmT7fdYF7F2tqijFEzDgQ';
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&channelId=${channelId}&order=date&type=video&key=${apiKey}`;
    const videosContainer = document.getElementById('videos-container');
    try {
      const response = await fetch(youtubeApiUrl);
      if (!response.ok) throw new Error(`YouTube API error: ${response.statusText}`);
      const data = await response.json();
      videosContainer.innerHTML = '';
      if (!data.items || data.items.length === 0) {
        videosContainer.innerHTML = '<div class="text-gray-400">No videos found.</div>';
        return;
      }
      data.items.forEach(item => {
        if (!item.id || !item.id.videoId || !item.snippet) return;
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const thumbnailUrl =
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url ||
          item.snippet.thumbnails?.default?.url ||
          '';
        const card = document.createElement('div');
        card.className = 'w-64 flex-shrink-0 bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col mb-4';
        card.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">
            <img src="${thumbnailUrl}" alt="${videoTitle}" class="w-full h-auto rounded-t-lg">
            <p class="text-sm font-semibold text-gray-300 truncate mt-2 px-2">${videoTitle}</p>
          </a>
        `;
        videosContainer.appendChild(card);
      });
    } catch (error) {
      videosContainer.innerHTML = '<div class="text-red-400">Failed to load videos. Please check your API key and channel ID.</div>';
      console.error('YouTube Feed Error:', error);
    }
  }

  // Run loaders
  fetchAndRenderTournaments();
  fetchAndRenderVideos();
});
