// Script da página de login

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

  // Validação do formulário
  const loginForm = document.querySelector(".login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validação básica
      if (!email || !password) {
        alert("Por favor, preencha todos os campos!");
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

      // Aqui você poderia enviar os dados para um servidor
      console.log("Tentativa de login:", {
        email: email,
        password: password,
        rememberMe: document.getElementById("remember").checked,
      });

      // Salva o email como usuário logado
      localStorage.setItem("usuarioLogado", email);
      
      // Redireciona para a home
      window.location.href = "index.html";
    });
  }
});
