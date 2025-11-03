document.getElementById("yr").textContent = new Date().getFullYear();

// Contact form
document.getElementById("contact-form").addEventListener("submit", e=>{
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  const email = f.email.value.trim();
  const msg = f.message.value.trim();
  if(!name||!email||!msg){ alert("Моля попълнете всички полета."); return; }
  window.location.href = `mailto:info@majstornaste.example?subject=От ${name}&body=${msg}%0AEmail: ${email}`;
  alert("Съобщението е изпратено!");
  f.reset();
});

// Language switch
const langBtns = document.querySelectorAll(".lang-btn");
langBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    langBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const lang = btn.dataset.lang;
    const heroTitle = document.getElementById("hero-title");
    const heroSub = document.getElementById("hero-sub");
    const ctaBtn = document.getElementById("cta-btn");
    if(lang==="en"){
      heroTitle.textContent = "Facades & Stone - Professional Work";
      heroSub.textContent = "Specialization: facades, gneiss cladding, fireplaces, stone fences and plaster.";
      ctaBtn.textContent = "Get a Quote";
    } else if(lang==="mk"){
      heroTitle.textContent = "Фасади & Камен - Професионално изведување";
      heroSub.textContent = "Специјализација: фасади, гнајс, камини, камени огради и малтер.";
      ctaBtn.textContent = "Барајте бесплатна проценка";
    } else {
      heroTitle.textContent = "Фасади & Камен - професионално изпълнение";
      heroSub.textContent = "Специализация: фасади, облицовки с гнајс, камини, каменни огради и мазилка.";
      ctaBtn.textContent = "Вземете оферта";
    }
  });
});
