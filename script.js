
let users = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = null;

function showGame() {
  const user = users[currentUser];
  document.getElementById("player-name").textContent = currentUser;
  document.getElementById("resources").textContent = user.resources;
  document.getElementById("farm").textContent = user.farm;
  document.getElementById("explore").textContent = user.explore;
  document.getElementById("build").textContent = user.build;
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
}

function logout() {
  currentUser = null;
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("msg").textContent = "";
}

function levelUp(type) {
  const user = users[currentUser];
  const cost = 10;
  if (user.resources >= cost) {
    user.resources -= cost;
    user[type]++;
    localStorage.setItem("users", JSON.stringify(users));
    showGame();
  } else {
    alert("لا تملك موارد كافية.");
  }
}

document.getElementById("login-btn").onclick = function () {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  if (!u || !p) return;
  if (!users[u]) {
    document.getElementById("msg").textContent = "المستخدم غير موجود.";
    return;
  }
  if (users[u].password !== p) {
    document.getElementById("msg").textContent = "كلمة المرور خاطئة.";
    return;
  }
  currentUser = u;
  showGame();
};

document.getElementById("register-btn").onclick = function () {
  const emailField = document.getElementById("email");
  if (emailField.classList.contains("hidden")) {
    emailField.classList.remove("hidden");
    return;
  }
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const e = document.getElementById("email").value.trim();
  if (!u || !p || !e) return;
  if (users[u]) {
    document.getElementById("msg").textContent = "اسم المستخدم موجود مسبقًا.";
    return;
  }
  users[u] = { password: p, email: e, resources: 100, farm: 1, explore: 1, build: 1 };
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("msg").textContent = "تم إنشاء الحساب. يمكنك الآن تسجيل الدخول.";
  document.getElementById("email").classList.add("hidden");
};
