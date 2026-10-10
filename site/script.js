const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeLabel() {
  const nextTheme = currentTheme() === "dark" ? "light" : "dark";
  themeButton.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeButton.setAttribute("title", `Switch to ${nextTheme} theme`);
}

themeButton.addEventListener("click", () => {
  const nextTheme = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  updateThemeLabel();
});

document.querySelector("#year").textContent = new Date().getFullYear();
updateThemeLabel();
