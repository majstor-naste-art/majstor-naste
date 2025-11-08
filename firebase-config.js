// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQXww-trNI_5vgocyI_MH29uIysSJe7Jo",
  authDomain: "majstor-naste-255d5.firebaseapp.com",
  projectId: "majstor-naste-255d5",
  storageBucket: "majstor-naste-255d5.appspot.com",
  messagingSenderId: "435344614331",
  appId: "1:435344614331:web:484c03303935ac824c9a9e",
  measurementId: "G-TJDBYMKTHP"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
