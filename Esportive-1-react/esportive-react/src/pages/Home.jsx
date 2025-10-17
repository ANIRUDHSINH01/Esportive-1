import React from 'react';
import Hero from '../components/Hero';
import Tournaments from '../components/Tournaments';
import SupportedGames from '../components/SupportedGames';
import Feed from '../components/Feed';

const Home = () => {
  return (
    <>
      <Hero />
      <Tournaments />
      <SupportedGames />
      <Feed />
    </>
  );
};

export default Home;