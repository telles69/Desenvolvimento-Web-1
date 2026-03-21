// Script da página de perfil

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

  // Carrega perfil do localStorage
  let perfil = JSON.parse(localStorage.getItem("perfilUsuario")) || {
    nome: "Seu Nome",
    foto: "https://via.placeholder.com/150",
    bio: "Escreva algo sobre você...",
    interesses: [],
  };

  // Elementos
  const nomePerfil = document.getElementById("nomePerfil");
  const bioPerfil = document.getElementById("bioPerfil");
  const interessesPerfil = document.getElementById("interessesPerfil");
  const fotoPerfil = document.getElementById("fotoPerfil");

  const inputNome = document.getElementById("inputNome");
  const inputBio = document.getElementById("inputBio");
  const inputFoto = document.getElementById("inputFoto");
  const inputInteresses = document.getElementById("inputInteresses");

  const salvarNomeBtn = document.getElementById("salvarNomeBtn");
  const salvarBioBtn = document.getElementById("salvarBioBtn");
  const salvarFotoBtn = document.getElementById("salvarFotoBtn");
  const salvarInteressesBtn = document.getElementById("salvarInteressesBtn");

  // Renderiza perfil
  function renderPerfil() {
    nomePerfil.textContent = perfil.nome;
    bioPerfil.textContent = perfil.bio;
    fotoPerfil.src = perfil.foto;

    // Renderiza interesses
    if (perfil.interesses.length === 0) {
      interessesPerfil.innerHTML =
        '<span class="badge bg-secondary">Adicione seus interesses</span>';
    } else {
      interessesPerfil.innerHTML = perfil.interesses
        .map(
          (interesse) =>
            `<span class="badge bg-primary me-2 mb-2">${interesse}</span>`
        )
        .join("");
    }
  }

  // Abre modais e preenche inputs
  const editNomeModal = document.getElementById("editNomeModal");
  const editBioModal = document.getElementById("editBioModal");
  const editFotoModal = document.getElementById("editFotoModal");
  const editInteressesModal = document.getElementById("editInteressesModal");

  editNomeModal.addEventListener("show.bs.modal", function () {
    inputNome.value = perfil.nome;
    inputNome.focus();
  });

  editBioModal.addEventListener("show.bs.modal", function () {
    inputBio.value = perfil.bio;
    inputBio.focus();
  });

  editFotoModal.addEventListener("show.bs.modal", function () {
    inputFoto.value = perfil.foto;
    inputFoto.focus();
  });

  editInteressesModal.addEventListener("show.bs.modal", function () {
    inputInteresses.value = perfil.interesses.join(", ");
    inputInteresses.focus();
  });

  // Salvar Nome
  salvarNomeBtn.addEventListener("click", function () {
    const novoNome = inputNome.value.trim();

    if (!novoNome) {
      alert("Por favor, insira um nome!");
      return;
    }

    perfil.nome = novoNome;
    localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
    renderPerfil();

    const modal = bootstrap.Modal.getInstance(editNomeModal);
    modal.hide();
  });

  // Salvar Bio
  salvarBioBtn.addEventListener("click", function () {
    const novaBio = inputBio.value.trim();

    if (!novaBio) {
      alert("Por favor, insira uma bio!");
      return;
    }

    perfil.bio = novaBio;
    localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
    renderPerfil();

    const modal = bootstrap.Modal.getInstance(editBioModal);
    modal.hide();
  });

  // Salvar Foto
  salvarFotoBtn.addEventListener("click", function () {
    const novaFoto = inputFoto.value.trim();

    if (!novaFoto) {
      alert("Por favor, insira uma URL de foto!");
      return;
    }

    // Validação básica de URL
    try {
      new URL(novaFoto);
    } catch {
      alert("Por favor, insira uma URL válida!");
      return;
    }

    perfil.foto = novaFoto;
    localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
    renderPerfil();

    const modal = bootstrap.Modal.getInstance(editFotoModal);
    modal.hide();
  });

  // Salvar Interesses
  salvarInteressesBtn.addEventListener("click", function () {
    const novosInteresses = inputInteresses.value
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i !== "");

    if (novosInteresses.length === 0) {
      alert("Por favor, adicione pelo menos um interesse!");
      return;
    }

    perfil.interesses = novosInteresses;
    localStorage.setItem("perfilUsuario", JSON.stringify(perfil));
    renderPerfil();

    const modal = bootstrap.Modal.getInstance(editInteressesModal);
    modal.hide();
  });

  // Renderiza perfil ao carregar
  renderPerfil();
});
