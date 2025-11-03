document.getElementById("yr").textContent = new Date().getFullYear();

// Lightbox functionality
const galleryImgs = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lbImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

galleryImgs.forEach((img, i) => {
  img.addEventListener("click", ()=>{
    currentIndex = i;
    lbImg.src = img.dataset.full;
    lightbox.style.display = "flex";
  });
});

closeBtn.addEventListener("click", ()=>lightbox.style.display="none");

prevBtn.addEventListener("click", ()=>{
  currentIndex = (currentIndex-1+galleryImgs.length)%galleryImgs.length;
  lbImg.src = galleryImgs[currentIndex].dataset.full;
});

nextBtn.addEventListener("click", ()=>{
  currentIndex = (currentIndex+1)%galleryImgs.length;
  lbImg.src = galleryImgs[currentIndex].dataset.full;
});

lightbox.addEventListener("click", e=>{
  if(e.target===lightbox) lightbox.style.display="none";
});
