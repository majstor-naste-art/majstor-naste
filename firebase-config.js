// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQXww-trNI_5vgocyI_MH29uIysSJe7Jo",
  authDomain: "majstor-naste-255d5.firebaseapp.com",
  projectId: "majstor-naste-255d5",
  storageBucket: "majstor-naste-255d5.firebasestorage.app",
  messagingSenderId: "435344614331",
  appId: "G-TJDBYMKTHP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
