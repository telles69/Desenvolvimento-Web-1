// Script da página de registro

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

  // Validação do formulário de registro
  const registroForm = document.querySelector(".registro-form");

  if (registroForm) {
    registroForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Validação básica
      if (!username || !email || !password || !confirmPassword) {
        alert("Por favor, preencha todos os campos!");
        return;
      }

      if (username.length < 3) {
        alert("O nome de usuário deve ter no mínimo 3 caracteres!");
        return;
      }

      if (!email.includes("@")) {
        alert("Por favor, insira um email válido!");
        return;
      }

      if (password.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres!");
        return;
      }

      if (password !== confirmPassword) {
        alert("As senhas não correspondem!");
        return;
      }

      // Aqui você poderia enviar os dados para um servidor
      console.log("Dados de registro:", {
        username: username,
        email: email,
        password: password,
      });

      // Salva o usuário como logado
      localStorage.setItem("usuarioLogado", username);
      localStorage.setItem("perfilUsuario", JSON.stringify({
        nome: username,
        foto: "https://via.placeholder.com/150",
        bio: "Escreva algo sobre você...",
        interesses: []
      }));
      
      // Redireciona para a home
      window.location.href = "index.html";
    });
  }
});
