    // Script da página home

document.addEventListener("DOMContentLoaded", function () {
  // Toggle de tema
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  // Verifica se há tema salvo no localStorage
  const savedTheme = localStorage.getItem("appTheme");
  if (savedTheme === "dark") {
    html.setAttribute("data-theme", "dark");
    updateThemeIcon(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = html.getAttribute("data-theme");
      const isDark = currentTheme === "dark";

      if (isDark) {
        html.removeAttribute("data-theme");
        localStorage.setItem("appTheme", "light");
        updateThemeIcon(false);
      } else {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("appTheme", "dark");
        updateThemeIcon(true);
      }
    });
  }

  function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      if (isDark) {
        icon.className = "fas fa-sun";
      } else {
        icon.className = "fas fa-moon";
      }
    }
  }

  // Carrega comentários do localStorage
  let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  // Elementos
  const comentarioForm = document.querySelector(".comentario-form");
  const comentarioInput = document.getElementById("comentario");
  const usernameInput = document.getElementById("username");
  const container = document.getElementById("comentariosContainer");
  const contador = document.getElementById("comentarioCount");

  // Define o nome de usuário (pode ser "Visitante" se não estiver logado)
  const usuarioLogado = localStorage.getItem("usuarioLogado") || "Visitante";
  usernameInput.value = usuarioLogado;

  // Renderiza comentários
  function renderComentarios() {
    if (comentarios.length === 0) {
      container.innerHTML = `
        <div class="text-center text-muted py-5">
          <p>Nenhum comentário ainda. Seja o primeiro!</p>
        </div>
      `;
      contador.textContent = "0";
      return;
    }

    container.innerHTML = comentarios
      .map(
        (comentario, index) => `
      <div class="comentario-card mb-3">
        <div class="comentario-header">
          <strong class="comentario-usuario">
            <i class="fas fa-user-circle"></i> ${comentario.usuario}
          </strong>
          <small class="comentario-data text-muted">${comentario.data}</small>
          <button class="btn btn-sm btn-deletar" data-index="${index}" title="Deletar">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="comentario-body">
          ${comentario.texto}
        </div>
      </div>
    `
      )
      .join("");

    contador.textContent = comentarios.length;

    // Adiciona eventos aos botões de deletar
    document.querySelectorAll(".btn-deletar").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        deletarComentario(index);
      });
    });
  }

  // Adiciona novo comentário
  function adicionarComentario(usuario, texto) {
    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR") + " " + agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const novoComentario = {
      usuario: usuario,
      texto: texto,
      data: data,
    };

    comentarios.unshift(novoComentario);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
    renderComentarios();
  }

  // Deleta comentário
  function deletarComentario(index) {
    if (confirm("Tem certeza que deseja deletar este comentário?")) {
      comentarios.splice(index, 1);
      localStorage.setItem("comentarios", JSON.stringify(comentarios));
      renderComentarios();
    }
  }

  // Handle do formulário
  if (comentarioForm) {
    comentarioForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const usuario = usernameInput.value;
      const texto = comentarioInput.value.trim();

      if (!texto) {
        alert("Por favor, escreva algo no comentário!");
        return;
      }

      if (usuario === "Visitante") {
        const resultado = confirm(
          "Você está como visitante. Deseja fazer login para comentar com sua conta?"
        );
        if (resultado) {
          window.location.href = "login.html";
          return;
        }
      }

      adicionarComentario(usuario, texto);
      comentarioInput.value = "";
      comentarioInput.focus();
    });
  }

  // Renderiza comentários ao carregar
  renderComentarios();
});
