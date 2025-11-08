import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

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
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();

const loginContainer = document.getElementById("login-container");
const adminContainer = document.getElementById("admin-container");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const fileInput = document.getElementById("file-input");
const uploadBtn = document.getElementById("upload-btn");
const uploadStatus = document.getElementById("upload-status");
const galleryPreview = document.getElementById("gallery-preview");

// Login
loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider).catch(console.error);
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// Auth state
onAuthStateChanged(auth, user => {
  if(user){
    loginContainer.style.display = "none";
    adminContainer.style.display = "block";
    loadGallery();
  } else {
    loginContainer.style.display = "block";
    adminContainer.style.display = "none";
  }
});

// Upload image
uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if(!file) return alert("Избери слика!");
  const storageRef = ref(storage, `gallery/${file.name}`);
  uploadStatus.textContent = "Uploading...";
  await uploadBytes(storageRef, file);
  uploadStatus.textContent = "Upload successful!";
  loadGallery();
});

// Load gallery from Firebase
async function loadGallery(){
  galleryPreview.innerHTML = "";
  const listRef = ref(storage, "gallery");
  const res = await listAll(listRef);
  for(let itemRef of res.items){
    const url = await getDownloadURL(itemRef);
    const img = document.createElement("img");
    img.src = url;
    galleryPreview.appendChild(img);
  }
}
