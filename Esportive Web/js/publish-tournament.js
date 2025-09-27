import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);

onAuthStateChanged(auth, (user) => {
    const profileContainer = document.getElementById('profile-container');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (user) {
        if (user.photoURL) {
            profileContainer.innerHTML = `
                <img src="${user.photoURL}" alt="User Profile" class="h-8 w-8 rounded-full border-2 border-red-600 cursor-pointer">
            `;
        } else {
            profileContainer.innerHTML = `
                <i class="fas fa-user-circle text-2xl text-white cursor-pointer"></i>
            `;
        }
    } else {
        window.location.href = '../index.html'; // Redirect to login if not authenticated
    }
    
    // Add event listener for the profile dropdown
    profileContainer.addEventListener('click', () => {
        profileDropdown.classList.toggle('hidden');
    });
});

// Add event listener to Logout button
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = '../index.html';
            } catch (error) {
                console.error("Error signing out:", error);
            }
        });
    }
});
