const TOTAL_IMAGES = 13;

// LANGUAGE SWITCH
function setLanguage(lang){
  document.querySelectorAll(".lang-btn").forEach(btn=>btn.classList.remove("active"));
  document.querySelector(`.lang-btn[data-lang="${lang}"]`)?.classList.add("active");
  // TODO: replace text for chosen language
}
setLanguage("bg");
document.querySelectorAll(".lang-btn").forEach(btn=>btn.addEventListener("click",()=>setLanguage(btn.dataset.lang)));

// HERO ACTIVE
document.addEventListener("DOMContentLoaded",()=>document.querySelector(".hero")?.classList.add("active"));

// GALLERY
function loadGallery(){
  const gallery=document.getElementById("gallery");
  for(let i=1;i<=TOTAL_IMAGES;i++){
    const img=document.createElement("img");
    img.src=`sliki/${i}.jpg`;
    img.alt=`Проект ${i}`;
    img.className="gallery-img";
    img.onerror=function(){this.onerror=null;this.src="https://placehold.co/400x300?text=Majstor+Naste"};
    img.addEventListener("click",()=>openLightbox(i));
    gallery.appendChild(img);
  }
}

// LIGHTBOX
function openLightbox(index){
  const overlay=document.createElement("div");
  overlay.className="lightbox-overlay";
  overlay.innerHTML=`<div class="lightbox-content">
    <img src="sliki/${index}.jpg" alt="Проект ${index}">
    <span class="lightbox-close">&times;</span>
  </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector(".lightbox-close").addEventListener("click",()=>document.body.removeChild(overlay));
  overlay.addEventListener("click",(e)=>{if(e.target===overlay) document.body.removeChild(overlay)});
}

document.addEventListener("DOMContentLoaded",()=>loadGallery());

// CURRENT YEAR
document.getElementById("yr").textContent = new Date().getFullYear();
