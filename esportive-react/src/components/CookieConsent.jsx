import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookieAccepted')) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setVisible(false);
  };

  const declineCookies = () => {
    // You might want to implement a more robust "decline" functionality
    localStorage.setItem('cookieAccepted', 'true'); // For now, we'll just hide it
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div id="cookie-consent" className="fixed bottom-4 left-4 right-4 max-w-md mx-auto p-4 glass z-50">
      <p className="mb-3">
        We use cookies to improve your experience. By continuing, you accept our
        <a href="pages/cookie-policy.html" className="underline text-red-400">Cookie Policy</a>.
      </p>
      <div className="flex gap-2">
        <button id="accept-cookies" onClick={acceptCookies} className="px-4 py-2 bg-red-600 text-white rounded font-bold">Accept</button>
        <button id="decline-cookies" onClick={declineCookies} className="px-4 py-2 bg-gray-700 text-white rounded font-bold">Decline</button>
      </div>
    </div>
  );
};

export default CookieConsent;