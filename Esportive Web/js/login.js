import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDB9gtUd2KcBB9bEkD8Jzj_kyFE20GE7OA",
    authDomain: "espotive.firebaseapp.com",
    databaseURL: "https://espotive-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "espotive",
    storageBucket: "espotive.firebasestorage.app",
    messagingSenderId: "439864037476",
    appId: "1:439864037476:web:f6dc91eefae15c00a3cf71",
    measurementId: "G-Q2W9WHLCCR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check for existing user on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to the tournaments page
        window.location.href = "tournaments.html";
    }
});

// Function to handle the Google Sign-In response
window.handleCredentialResponse = async (response) => {
    try {
        // Build a Firebase credential with the Google ID token.
        const credential = GoogleAuthProvider.credential(response.credential);

        // Sign in with the credential and redirect to tournaments page on success.
        await signInWithCredential(auth, credential);

    } catch (error) {
        console.error("Error during Google Sign-in:", error);
    }
}
