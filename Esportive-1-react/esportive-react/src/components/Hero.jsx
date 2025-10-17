import React from 'react';

const Hero = () => {
  return (
    <section className="hero glass mb-8 p-6 text-center">
      <div className="inline-block bg-black bg-opacity-20 p-5 rounded-xl">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-8 bg-red-600 rounded"></div>
          <h1 className="font-black text-xl tracking-widest">Find Tournaments.</h1>
        </div>
        <p className="mb-4">Esportive is India's e-sports tournament finder. Simply browse, choose, and register externally.</p>
        <a href="login.html" className="inline-block bg-red-600/20 text-white font-bold py-2 px-6 rounded-full border-2 border-red-600 shadow hover:bg-red-600 transition">Sign in To Browse</a>
      </div>
    </section>
  );
};

export default Hero;