document.getElementById("yr").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();
  if(!name || !email || !msg){
    alert("Моля попълнете всички полета.");
    return;
  }
  window.location.href = `mailto:info@majstornaste.example?subject=От ${name}&body=${msg}%0AEmail: ${email}`;
  alert("Съобщението е изпратено!");
  form.reset();
});

// Language switch (BG/MK/EN)
const langBtns = document.querySelectorAll(".lang-btn");
langBtns.forEach(btn => {
  btn.addEventListener("click", ()=>{
    langBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const lang = btn.dataset.lang;
    if(lang==="en"){
      document.getElementById("hero-title").textContent = "Facades & Stone - Professional Work";
      document.getElementById("hero-sub").textContent = "Specialization: facades, gneiss cladding, fireplaces, stone fences and plaster.";
      document.getElementById("cta-btn").textContent = "Get a Quote";
    } else if(lang==="mk"){
      document.getElementById("hero-title").textContent = "Фасади & Камен - Професионално изведување";
      document.getElementById("hero-sub").textContent = "Специјализација: фасади, гнајс, камини, камени огради и малтер.";
      document.getElementById("cta-btn").textContent = "Барајте бесплатна проценка";
    } else {
      document.getElementById("hero-title").textContent = "Фасади & Камен - професионално изпълнение";
      document.getElementById("hero-sub").textContent = "Специализация: фасади, облицовки с гнајс, камини, каменни огради и мазилка.";
      document.getElementById("cta-btn").textContent = "Вземете оферта";
    }
  });
});
