import React, { useState, useEffect } from 'react';

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRA4wuYi-9mQm_jqQJcX_o5biFNxBbS45jsp-J1bbVd3i4LEZDvgUWWDk29uqovv7aTAssL6M_I4YFG/pub?output=csv');
        const text = await res.text();
        const lines = text.split('\n').slice(1).filter(l => l.trim());
        const tournamentData = lines.map(line => {
          const [title, prize, _1, _2, _3, _4, _5, _6, _7, game, imageUrl, slots, organization, registration, closeDate, format, socialLink] = line.split(',');
          return { title, prize, game, imageUrl, slots, organization, registration, closeDate, format, socialLink };
        });
        setTournaments(tournamentData);
        setFilteredTournaments(tournamentData);

        const uniqueGames = [...new Set(tournamentData.map(t => t.game))];
        setGames(uniqueGames);

      } catch (e) {
        console.error("Failed to load tournaments.", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    if (selectedGame) {
      setFilteredTournaments(tournaments.filter(t => t.game === selectedGame));
    } else {
      setFilteredTournaments(tournaments);
    }
  }, [selectedGame, tournaments]);

  return (
    <div className="container mx-auto p-4 pt-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h1 className="text-2xl text-red-600 font-bold mb-2 sm:mb-0">Tournaments</h1>
        <a
          href="/publish-tournament"
          className="px-4 py-2 text-sm text-red-600 border-2 border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300"
        >
          Publish Tournament
        </a>
      </div>

      <div className="mb-6">
        <label
          htmlFor="game-filter"
          className="block text-sm font-medium text-gray-400 mb-1"
        >
          Filter by Game:
        </label>
        <select
          id="game-filter"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3 p-2 rounded-lg border-2 border-red-600 bg-gray-900 text-white focus:ring-red-600 focus:border-red-600"
        >
          <option value="">All Games</option>
          {games.map(game => (
            <option key={game} value={game}>{game}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-red-400 col-span-full">Loading tournaments...</p>
        ) : filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament, index) => (
            <TournamentCard key={index} tournament={tournament} />
          ))
        ) : (
          <p className="text-red-400 col-span-full">No tournaments found.</p>
        )}
      </div>
    </div>
  );
};

const TournamentCard = ({ tournament }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const { title, prize, game, imageUrl, slots, organization, registration, closeDate } = tournament;
  const isExpired = new Date(closeDate) < new Date();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/30 hover:scale-[1.02] transition-all duration-300 flex flex-col relative group tournament-card border border-gray-700">
      <div className="relative w-full h-48 bg-black">
        <img src={imageUrl || "/assets/navbar/logo.png"} alt={title} className="h-full w-full object-cover" />
        <span className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded-full font-semibold">{game}</span>
        <span className="absolute top-2 right-2 bg-red-800 text-xs px-2 py-1 rounded-full">{slots} slots</span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-bold text-white truncate mb-1" title={title}>{title}</h2>
        <p className="text-sm text-gray-400 mb-2">By {organization}</p>
        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
          <span className="font-semibold text-green-400">{prize}</span>
          <span className={`text-xs ${isExpired ? 'text-red-400' : 'text-yellow-400'}`}>
            {isExpired ? 'Registration Closed' : 'Registration Open'}
          </span>
        </div>
        <div className="mt-auto flex space-x-2">
          <button onClick={() => setDetailsVisible(!detailsVisible)} className="flex-1 px-3 py-2 text-sm text-white border-2 border-red-600 rounded-lg hover:bg-red-600 transition-colors">Details</button>
          <a href={registration} target="_blank" rel="noopener noreferrer"
             className="flex-1 px-3 py-2 text-sm text-center text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
             Register
          </a>
        </div>
        {detailsVisible && <TournamentDetails tournament={tournament} close={() => setDetailsVisible(false)} />}
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const TournamentDetails = ({ tournament, close }) => {
  // ... (logic for displaying details, social sharing, etc.)
  return (
    <div className="mt-4" data-card-details>
      <div className="bg-gray-900/90 backdrop-blur-md rounded-lg p-4 border border-gray-700">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-red-500 font-bold">Tournament Info</h3>
          <button onClick={close} className="text-gray-400 hover:text-white text-sm">&times;</button>
        </div>
        {/* ... details list ... */}
      </div>
    </div>
  );
};

export default TournamentsPage;