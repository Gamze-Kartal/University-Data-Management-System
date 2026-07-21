const i18n = {
  tr: {
    uniName: "Boğaziçi Üniversitesi",
    signIn: "Giriş Yap",
    signInHint: "Hesabınıza erişmek için bilgilerinizi girin.",
    email: "E-posta",
    password: "Şifre",
    remember: "Beni Hatırla",
    forgot: "Şifremi Unuttum",
    login: "Giriş Yap",
    showPassword: "Şifreyi göster",
    hidePassword: "Şifreyi gizle",
    empty: "Lütfen e-posta ve şifrenizi girin.",
    invalidEmail: "Geçerli bir e-posta adresi girin.",
    success: "Giriş başarılı. Yönlendiriliyorsunuz…",
  },
  en: {
    uniName: "Boğaziçi University",
    signIn: "Sign in",
    signInHint: "Enter your credentials to access your account.",
    email: "Email",
    password: "Password",
    remember: "Remember me",
    forgot: "Forgot password",
    login: "Sign in",
    showPassword: "Show password",
    hidePassword: "Hide password",
    empty: "Please enter your email and password.",
    invalidEmail: "Please enter a valid email address.",
    success: "Signed in successfully. Redirecting…",
  },
};

let lang = "tr";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const themeToggle = document.getElementById("themeToggle");
const langSelect = document.getElementById("langSelect");
const langBtn = langSelect.querySelector(".lang-btn");
const langMenu = langSelect.querySelector(".lang-menu");
const langLabel = document.getElementById("langLabel");
const loginForm = document.getElementById("loginForm");
const formMessage = document.getElementById("formMessage");
const iconSun = themeToggle.querySelector(".icon-sun");
const iconMoon = themeToggle.querySelector(".icon-moon");
const iconEye = togglePassword.querySelector(".icon-eye");
const iconEyeOff = togglePassword.querySelector(".icon-eye-off");

function t(key) {
  return i18n[lang][key];
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (i18n[lang][key]) el.placeholder = i18n[lang][key];
  });
  const showing = passwordInput.type === "text";
  togglePassword.setAttribute("aria-label", showing ? t("hidePassword") : t("showPassword"));
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("boun-theme", theme);
  const isDark = theme === "dark";
  // Açık tema: güneş | Koyu tema: ay — ikisi birden asla
  iconSun.classList.toggle("is-hidden", isDark);
  iconMoon.classList.toggle("is-hidden", !isDark);
}

function syncPasswordIcon() {
  const visible = passwordInput.type === "text";
  // Şifre görünür: açık göz | gizli: kapalı göz
  iconEye.classList.toggle("is-hidden", !visible);
  iconEyeOff.classList.toggle("is-hidden", visible);
  togglePassword.setAttribute("aria-label", visible ? t("hidePassword") : t("showPassword"));
}

function setLang(next) {
  lang = next;
  langLabel.textContent = next.toUpperCase();
  langMenu.querySelectorAll("[role='option']").forEach((opt) => {
    opt.setAttribute("aria-selected", String(opt.dataset.lang === next));
  });
  localStorage.setItem("boun-lang", next);
  applyI18n();
}

const savedTheme = localStorage.getItem("boun-theme") || "light";
setTheme(savedTheme);

const savedLang = localStorage.getItem("boun-lang") || "tr";
setLang(savedLang);
syncPasswordIcon();

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

langBtn.addEventListener("click", () => {
  const open = !langMenu.hidden;
  langMenu.hidden = open;
  langBtn.setAttribute("aria-expanded", String(!open));
});

langMenu.addEventListener("click", (e) => {
  const opt = e.target.closest("[data-lang]");
  if (!opt) return;
  setLang(opt.dataset.lang);
  langMenu.hidden = true;
  langBtn.setAttribute("aria-expanded", "false");
});

document.addEventListener("click", (e) => {
  if (!langSelect.contains(e.target)) {
    langMenu.hidden = true;
    langBtn.setAttribute("aria-expanded", "false");
  }
});

togglePassword.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  syncPasswordIcon();
});

function showMessage(text, type) {
  formMessage.hidden = false;
  formMessage.textContent = text;
  formMessage.classList.toggle("is-error", type === "error");
  formMessage.classList.toggle("is-ok", type === "ok");
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formMessage.hidden = true;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage(t("empty"), "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMessage(t("invalidEmail"), "error");
    return;
  }

  const btn = loginForm.querySelector(".submit-btn");
  btn.disabled = true;
  showMessage(t("success"), "ok");

  if (document.getElementById("remember").checked) {
    localStorage.setItem("boun-remember-email", email);
  } else {
    localStorage.removeItem("boun-remember-email");
  }

  setTimeout(() => {
    btn.disabled = false;
    window.location.href = "ogrenci-yonetimi.html";
  }, 800);
});

const remembered = localStorage.getItem("boun-remember-email");
if (remembered) {
  emailInput.value = remembered;
  document.getElementById("remember").checked = true;
}
