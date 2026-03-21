// Script Customizado

document.addEventListener("DOMContentLoaded", function () {
  console.log("Página carregada com sucesso!");

  // Exemplo: Adicionar interatividade aos cards
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      console.log("Card clicado:", this.querySelector(".card-title").textContent);
    });
  });

  // Smooth scroll para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
});
