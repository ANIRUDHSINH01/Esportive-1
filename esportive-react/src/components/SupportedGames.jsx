import React from 'react';

const SupportedGames = () => {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl text-red-600 font-bold border-l-4 border-red-600 pl-3">Supported Games</h2>
      <div className="supported-games flex gap-4 overflow-x-auto pb-2">
        <img src="/assets/games/bgmi.png" alt="BGMI" className="w-20 h-20 object-contain bg-black/10 rounded-lg" />
        <img src="/assets/games/codm.png" alt="CODM" className="w-20 h-20 object-contain bg-black/10 rounded-lg" />
        <img src="/assets/games/freefire.png" alt="Free Fire" className="w-20 h-20 object-contain bg-black/10 rounded-lg" />
        <img src="/assets/games/coc.png" alt="Clash of Clans" className="w-20 h-20 object-contain bg-black/10 rounded-lg" />
        <img src="/assets/games/brawl_stars.png" alt="Brawl Stars" className="w-20 h-20 object-contain bg-black/10 rounded-lg" />
        <img src="/assets/games/pokemon_unite.png" alt="Pokemon Unite" className="w-20 h-20 object-contain bg-black/10 rounded-lg" />
        <img src="/assets/games/clash_royale.png" alt="Clash Royale" className="w-20 h-20 object-contain bg-black/10 rounded-lg" />
      </div>
    </section>
  );
};

export default SupportedGames;