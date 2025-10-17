import React, { useState, useEffect } from 'react';

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const key = 'AIzaSyAkUf-Vwi0KbLw49xTryOsrNx9PvR3ph-8';
      const channelId = 'UCJKmT7fdYF7F2tqijFEzDgQ';
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&channelId=${channelId}&order=date&type=video&key=${key}`);
        const data = await res.json();
        setVideos(data.items || []);
      } catch (e) {
        console.error("Failed to load videos.", e);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section>
      <h2 className="mb-4 text-2xl text-red-600 font-bold border-l-4 border-red-600 pl-3">Esportive Feed</h2>
      <div id="videos-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <p className="text-red-400 col-span-full">Loading videos...</p>
        ) : videos.length > 0 ? (
          videos.map(item => {
            const id = item.id.videoId;
            const title = item.snippet.title;
            const thumb = item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url;
            return (
              <div key={id} className="glass p-3">
                <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
                  <img src={thumb} alt={title} className="w-full rounded mb-2" />
                  <p className="text-sm text-gray-200 truncate">{title}</p>
                </a>
              </div>
            );
          })
        ) : (
          <p className="text-red-400 col-span-full">Failed to load videos.</p>
        )}
      </div>
    </section>
  );
};

export default Feed;