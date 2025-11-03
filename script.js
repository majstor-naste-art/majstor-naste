// Update current year
document.getElementById("yr").textContent = new Date().getFullYear();

// Gallery images
const galleryContainer = document.getElementById("gallery");
const galleryImages = [1,2,3,4,5,6];
galleryImages.forEach(i => {
  const img = document.createElement("img");
  img.src = `https://majstor-naste-art.free.bg/images/${i}.jpeg`;
  img.alt = `Project ${i}`;
  img.onerror = () => img.src = `https://placehold.co/400x300?text=Project+${i}`;
  galleryContainer.appendChild(img);
});

// Contact form
const form = document.getElementById("contact-form");
const status = document.getElementById("contact-status");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if(!name || !email || !message){
    status.textContent = "Моля попълнете всички полета.";
    return;
  }
  // fallback: mailto
  const subject = encodeURIComponent(`Контакт от сайта - ${name}`);
  const body = encodeURIComponent(`Име/Телефон: ${name}\nИмейл: ${email}\n\n${message}`);
  window.location.href = `mailto:info@majstornaste.example?subject=${subject}&body=${body}`;
  status.textContent = "Съобщението е изпратено!";
  form.reset();
});

// Language switching (basic example)
const langBtns = document.querySelectorAll(".lang-btn");
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    langBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const lang = btn.dataset.lang;
    // Simple translation logic (example)
    if(lang === "en"){
      document.getElementById("hero-title").textContent = "Facades & Stone - Professional Work";
      document.getElementById("hero-sub").textContent = "Specialization: facades, gneiss cladding, fireplaces, stone fences and plaster.";
      document.getElementById("cta-btn").textContent = "Get a Quote";
    } else if(lang==="mk"){
      document.getElementById("hero-title").textContent = "Фасади & Камен - Професионално изведување";
      document.getElementById("hero-sub").textContent = "Специјализација: фасади, гнајс, камини, камени огради и малтер.";
      document.getElementById("cta-btn").textContent = "Барајте бесплатна проценка";
    } else { // bg
      document.getElementById("hero-title").textContent = "Фасади & Камен - професионално изпълнение";
      document.getElementById("hero-sub").textContent = "Специализация: фасади, облицовки с гнајс, камини, каменни огради и мазилка.";
      document.getElementById("cta-btn").textContent = "Вземете оферта";
    }
  });
});
