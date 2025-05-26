
let users = JSON.parse(localStorage.getItem("users") || "{}");
let current = null;

function showLogin() {
  hideAll();
  document.getElementById("login-section").classList.remove("hidden");
}
function showRegister() {
  hideAll();
  document.getElementById("register-section").classList.remove("hidden");
}
function showReset() {
  hideAll();
  document.getElementById("reset-section").classList.remove("hidden");
}
function hideAll() {
  document.querySelectorAll(".container > div").forEach(d => d.classList.add("hidden"));
}

function register() {
  let u = document.getElementById("reg-username").value.trim();
  let p = document.getElementById("reg-password").value.trim();
  let e = document.getElementById("reg-email").value.trim();
  if (!u || !p || !e) return document.getElementById("reg-msg").textContent = "الرجاء ملء جميع الحقول";
  if (users[u]) return document.getElementById("reg-msg").textContent = "اسم المستخدم موجود بالفعل";
  users[u] = { password: p, email: e, resources: 100, farm: 1, explore: 1, build: 1 };
  localStorage.setItem("users", JSON.stringify(users));
  showLogin();
}

function login() {
  let u = document.getElementById("login-username").value.trim();
  let p = document.getElementById("login-password").value.trim();
  if (!users[u] || users[u].password !== p)
    return document.getElementById("login-msg").textContent = "بيانات الدخول غير صحيحة";
  current = u;
  startGame();
}

function resetPassword() {
  let email = document.getElementById("reset-email").value.trim();
  let found = false;
  for (let user in users) {
    if (users[user].email === email) {
      document.getElementById("reset-msg").textContent = "كلمة المرور الخاصة بك: " + users[user].password;
      found = true;
    }
  }
  if (!found) document.getElementById("reset-msg").textContent = "لم يتم العثور على حساب بهذا البريد";
}

function startGame() {
  hideAll();
  document.getElementById("game-section").classList.remove("hidden");
  document.getElementById("player-name").textContent = current;
  updateUI();
}

function updateUI() {
  const u = users[current];
  document.getElementById("resources").textContent = u.resources;
  document.getElementById("farm").textContent = u.farm;
  document.getElementById("explore").textContent = u.explore;
  document.getElementById("build").textContent = u.build;
}

function levelUp(type) {
  const cost = 10;
  if (users[current].resources >= cost) {
    users[current].resources -= cost;
    users[current][type]++;
    localStorage.setItem("users", JSON.stringify(users));
    updateUI();
  } else {
    alert("موارد غير كافية!");
  }
}

function logout() {
  current = null;
  showLogin();
}

function showLeaderboard() {
  hideAll();
  document.getElementById("leaderboard-section").classList.remove("hidden");
  let list = [];
  for (let u in users) {
    list.push({ name: u, score: users[u].resources });
  }
  list.sort((a, b) => b.score - a.score);
  document.getElementById("leaderboard").innerHTML = list.map(u => `<p>${u.name}: ${u.score} موارد</p>`).join("");
}

function hideLeaderboard() {
  startGame();
}

window.onload = () => {
  showLogin();
};
