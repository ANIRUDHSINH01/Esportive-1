import React, { useState, useEffect } from 'react';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRA4wuYi-9mQm_jqQJcX_o5biFNxBbS45jsp-J1bbVd3i4LEZDvgUWWDk29uqovv7aTAssL6M_I4YFG/pub?output=csv');
        const text = await res.text();
        const lines = text.split('\n').slice(1).filter(l => l.trim());
        const tournamentData = lines.slice(0, 5).map(line => {
          const [title, prize, _1, _2, _3, _4, _5, _6, _7, game] = line.split(',');
          return { title, prize, game };
        });
        setTournaments(tournamentData);
      } catch (e) {
        console.error("Failed to load tournaments.", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl text-red-600 font-bold border-l-4 border-red-600 pl-3">Featured Tournaments</h2>
      <div id="tournaments-container" className="flex gap-4 overflow-x-auto pb-2">
        {loading ? (
          <p className="text-red-400">Loading tournaments...</p>
        ) : tournaments.length > 0 ? (
          tournaments.map((tournament, index) => (
            <div key={index} className="tournament-card glass flex-shrink-0 p-4 min-w-[260px]">
              <h3 className="text-red-600 font-black text-lg mb-1">{tournament.title || 'Untitled'}</h3>
              <p className="text-gray-300 mb-2">{tournament.game || 'Game'}</p>
              <div className="bg-red-600/20 text-white font-bold py-1 px-3 rounded-full inline-block mb-3 border border-red-600">
                {tournament.prize || 'Prize TBD'}
              </div>
              <button onClick={() => window.location.href='login.html'}
                className="w-full mt-2 py-2 bg-red-600/20 text-white font-bold rounded-full border border-red-600 hover:bg-red-600 transition">
                Register Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-red-400">Failed to load tournaments.</p>
        )}
      </div>
    </section>
  );
};

export default Tournaments;