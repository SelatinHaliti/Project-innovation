 function showForm(form) {
      const loginForm = document.getElementById("loginForm");
      const registerForm = document.getElementById("registerForm");
      const loginBtn = document.getElementById("loginBtn");
      const registerBtn = document.getElementById("registerBtn");
      if (form === "login") {
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        loginBtn.classList.add("bg-blue-600", "text-white");
        registerBtn.classList.remove("bg-blue-600", "text-white");
      } else {
        registerForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        registerBtn.classList.add("bg-blue-600", "text-white");
        loginBtn.classList.remove("bg-blue-600", "text-white");
      }
    }

    function handleLogin(event) {
      event.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      if (email === "admin@prona.com" && password === "123456") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "indexi.html";
      } else {
        alert("Email ose fjalëkalim i pasaktë.");
      }
    }
    if (window.location.pathname.includes("indexi.html") && localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "login.html";
    }
    let useri=document.getElementById("registerUser").value;
    if(email === winndow.localStorage.getItem("email") && password === window.localStorage.getItem("password")) {
      alert("Ky përdorues ekziston");
    }
    function handleRegister(event) {
      event.preventDefault();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value.tirm();
      if (email && password) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        alert("Regjistrimi u krye me sukses!");
        showForm("login");
      } else {
        alert("Ju lutemi plotësoni të gjitha fushat.");
      }
    }