// Fizzy Littlejoy — Gizlilik Politikası
// Tema değiştirme (açık / koyu) ve telif yılı

(function () {
  const root = document.documentElement;
  const button = document.getElementById("themeToggle");
  const STORAGE_KEY = "fizzy-theme";

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    const set = root.getAttribute("data-theme");
    if (set) return set;
    return systemPrefersDark() ? "dark" : "light";
  }

  function updateButton() {
    if (!button) return;
    button.textContent = currentTheme() === "dark" ? "Açık tema" : "Koyu tema";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* depolama kapalı olabilir */ }
    updateButton();
  }

  // Kayıtlı tercihi yükle
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) { /* depolama kapalı olabilir */ }

  updateButton();

  if (button) {
    button.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  // Sistem teması değişirse (ve kullanıcı seçim yapmadıysa) butonu güncelle
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateButton);
  }

  // Telif yılını güncel tut
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
