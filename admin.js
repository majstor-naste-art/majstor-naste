import { auth, db, storage } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";

const loginSection = document.getElementById('login-section');
const gallerySection = document.getElementById('gallery-section');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginStatus = document.getElementById('login-status');
const fileInput = document.getElementById('fileInput');
const imgTitle = document.getElementById('imgTitle');
const uploadBtn = document.getElementById('uploadBtn');
const galleryList = document.getElementById('galleryList');

loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginStatus.textContent = "Login successful!";
    loginSection.style.display = 'none';
    gallerySection.style.display = 'block';
    loadGallery();
  } catch(e) {
    loginStatus.textContent = e.message;
  }
});

logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  gallerySection.style.display = 'none';
  loginSection.style.display = 'block';
});

uploadBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  const title = imgTitle.value;
  if(!file || !title) return alert("Select file and enter title.");

  const storageRef = ref(storage, `gallery/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, 'gallery'), { title, imgUrl: url, created: Date.now() });
  fileInput.value = '';
  imgTitle.value = '';
  loadGallery();
});

async function loadGallery() {
  galleryList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'gallery'));
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `<img src="${data.imgUrl}" width="150"><span>${data.title}</span><button data-id="${docSnap.id}">Delete</button>`;
    galleryList.appendChild(div);

    div.querySelector('button').addEventListener('click', async () => {
      await deleteDoc(doc(db, 'gallery', docSnap.id));
      loadGallery();
    });
  });
}
