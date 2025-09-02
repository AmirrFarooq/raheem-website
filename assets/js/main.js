// assets/js/main.js

function highlightActiveNav() {
  const path = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();
  const navLinks = document.querySelectorAll(".nav a[data-nav], .nav a[href]");
  navLinks.forEach((a) => {
    const target = (
      a.getAttribute("data-nav") ||
      a.getAttribute("href") ||
      ""
    ).toLowerCase();
    if (path === target || (path === "" && target === "index.html")) {
      a.classList.add("active");
    }
  });
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// Run immediately (for pages without partials), then again after partials are injected
document.addEventListener("DOMContentLoaded", () => {
  setYear();
  highlightActiveNav();
});
document.addEventListener("partials:loaded", () => {
  setYear();
  highlightActiveNav();
});
