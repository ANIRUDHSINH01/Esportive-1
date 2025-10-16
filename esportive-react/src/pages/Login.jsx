import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/navbar/logo.png" alt="Esportive Logo" className="h-8 mb-2" />
          <h1 className="text-xl font-bold">Welcome Back Goat!</h1>
          <p className="text-xs text-gray-400 mt-1">Sign in to find your next tournament.</p>
        </div>
        <div className="space-y-4">
          <div
            id="g_id_onload"
            data-client_id="439864037476-lac2p8r9mt1ea7dsd43docstjdtenc27.apps.googleusercontent.com"
            data-callback="handleCredentialResponse"
            data-auto_prompt="false"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-size="large"
            data-theme="outline"
            data-text="sign_in_with"
            data-shape="pill"
            data-logo_alignment="left"
          ></div>
          <p className="mt-2 text-center text-xs text-gray-500">
            By signing in you agree to our
            <a href="pages/terms-of-use.html" className="text-red-600 hover:underline">Terms of Use</a> and
            <a href="pages/privacy-policy.html" className="text-red-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;