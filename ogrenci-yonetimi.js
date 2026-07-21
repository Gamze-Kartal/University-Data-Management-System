const palette = { purple: "#7c77e9", purpleDark: "#5b57c5", green: "#22c55e", orange: "#f59e0b", blue: "#3b82f6", gray: "#94a3b8" };

const themeToggle = document.getElementById("themeToggle");
const iconSun = themeToggle.querySelector(".icon-sun");
const iconMoon = themeToggle.querySelector(".icon-moon");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("boun-theme", theme);
  const isDark = theme === "dark";
  iconSun.classList.toggle("is-hidden", isDark);
  iconMoon.classList.toggle("is-hidden", !isDark);
  Chart.defaults.color = isDark ? "#9ca3af" : "#6b7280";
  Object.values(window.__charts || {}).forEach(function (c) { c.update(); });
}

themeToggle.addEventListener("click", function () {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  setTheme(current === "dark" ? "light" : "dark");
});

setTheme(localStorage.getItem("boun-theme") || "light");

Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";
Chart.defaults.color = "#6b7280";

window.__charts = {};
window.__charts.gender = new Chart(document.getElementById("chartGender"), { type: "doughnut", data: { labels: ["Kad\u0131n", "Erkek", "Belirtilmedi"], datasets: [{ data: [7420, 6610, 188], backgroundColor: [palette.purple, palette.blue, palette.gray], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "62%", plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 14 } } } } });
window.__charts.level = new Chart(document.getElementById("chartLevel"), { type: "pie", data: { labels: ["Lisans", "Y\u00fcksek Lisans", "Doktora", "\u00d6nlisans"], datasets: [{ data: [10240, 2680, 980, 318], backgroundColor: [palette.purple, palette.blue, palette.green, palette.orange], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 14 } } } } });
window.__charts.faculty = new Chart(document.getElementById("chartFaculty"), { type: "bar", data: { labels: ["M\u00fchendislik", "Fen-Edebiyat", "\u0130ktisadi ve \u0130dari Bilimler", "E\u011fitim", "Uygulamal\u0131 Bilimler", "Yabanc\u0131 Diller"], datasets: [{ label: "\u00d6\u011frenci say\u0131s\u0131", data: [4120, 3580, 2740, 1680, 1420, 678], backgroundColor: palette.purple, borderRadius: 8, maxBarThickness: 40 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { callback: (v) => Number(v).toLocaleString("tr-TR") } } } } });
window.__charts.foreign = new Chart(document.getElementById("chartForeign"), { type: "doughnut", data: { labels: ["Bilgisayar M\u00fchendisli\u011fi", "\u0130\u015fletme", "Elektrik-Elektronik", "Uluslararas\u0131 \u0130li\u015fkiler", "Molek\u00fcler Biyoloji", "End\u00fcstri M\u00fchendisli\u011fi", "Psikoloji", "\u0130ktisat"], datasets: [{ label: "Yabanc\u0131 \u00f6\u011frenci oran\u0131 (%)", data: [18.6, 15.2, 14.1, 22.4, 11.8, 9.7, 13.5, 16.9], backgroundColor: ["#7c77e9", "#5b57c5", "#3b82f6", "#60a5fa", "#22c55e", "#f59e0b", "#a78bfa", "#94a3b8"], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: "55%", plugins: { legend: { position: "right", labels: { boxWidth: 12, padding: 14 } }, tooltip: { callbacks: { label: function (ctx) { return ctx.label + ": %" + ctx.parsed; } } } } } });