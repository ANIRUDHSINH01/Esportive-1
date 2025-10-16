import React from 'react';

const Footer = () => {
  return (
    <footer className="glass mt-auto p-6 text-center text-gray-400 text-sm">
      <hr className="border-gray-700 my-4" />
      <div className="flex flex-wrap justify-center space-x-4 mb-3">
        <a href="pages/privacy-policy.html" className="hover:text-white">Privacy Policy</a>
        <a href="pages/terms-of-use.html" className="hover:text-white">Terms Of Use</a>
        <a href="pages/cookie-policy.html" className="hover:text-white">Cookie Policy</a>
        <a href="pages/faq.html" className="hover:text-white">FAQ</a>
      </div>
      <div className="flex justify-center space-x-6 text-xl mb-3">
        <a href="https://www.instagram.com" className="hover:text-white"><i className="fab fa-instagram"></i></a>
        <a href="https://www.discord.com" className="hover:text-white"><i className="fab fa-discord"></i></a>
        <a href="https://www.youtube.com" className="hover:text-white"><i className="fab fa-youtube"></i></a>
        <a href="https://www.x.com" className="hover:text-white"><i className="fab fa-x"></i></a>
      </div>
      <p>&copy; 2025 Esportive. All rights reserved.</p>
      <div className="flex justify-center items-center py-3 space-x-3">
        <img src="/assets/navbar/logo.png" alt="Esportive Logo" className="h-6" />
        <span className="text-gray-500 font-bold text-sm">PART OF</span>
        <img src="/assets/footer/flm.png" alt="FLM Logo" className="h-6" />
      </div>
    </footer>
  );
};

export default Footer;