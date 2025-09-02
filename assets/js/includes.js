// assets/js/includes.js
async function injectPartials() {
  const targets = document.querySelectorAll("[data-include]");

  // Fallbacks if fetch() fails (e.g., file://)
  const fallback = {
    "partials/header.html": `
<header class="header">
  <div class="container nav" role="navigation" aria-label="Main">
    <a href="index.html"><img src="assets/images/logo.svg" alt="{BrandName} logo" width="140" /></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">☰</button>
    <ul id="site-nav">
      <li><a href="index.html" data-nav="index.html">Home</a></li>
      <li><a href="products.html" data-nav="products.html">Products</a></li>
      <li><a href="about.html" data-nav="about.html">About</a></li>
      <li><a href="contact.html" data-nav="contact.html">Contact Us</a></li>
    </ul>
  </div>
</header>`,
    "partials/footer.html": `
<footer class="site-footer">
  <div class="container">
    <ul class="footer-social" aria-label="Social media">
      <li><a href="{FacebookURL}" aria-label="Facebook" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.25 0-1.64.78-1.64 1.58V12h2.79l-.45 2.97h-2.34V22c4.78-.79 8.46-4.94 8.46-9.94Z"/></svg>
      </a></li>
      <li><a href="{InstagramURL}" aria-label="Instagram" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-2.75a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/></svg>
      </a></li>
      <li><a href="{TwitterURL}" aria-label="Twitter / X" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 3h5.1l3.4 4.7L16.8 3H20l-6.5 7.6L20 21h-5.1l-3.7-5-4 5H4l7-8.2L4 3Z"/></svg>
      </a></li>
      <li><a href="{GoogleURL}" aria-label="Google" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1H12v2.9h5.35c-.23 1.47-1.8 4.3-5.35 4.3a6.15 6.15 0 1 1 0-12.3 5.38 5.38 0 0 1 3.8 1.5l2-2A8.86 8.86 0 0 0 12 3a9 9 0 1 0 0 18c5.2 0 8.65-3.65 8.65-8.6 0-.6-.07-1.1-.3-1.3Z"/></svg>
      </a></li>
      <li><a href="{YouTubeURL}" aria-label="YouTube" target="_blank" rel="noopener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M23 7.1a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.1ZM9.75 15.3v-6L15.5 12l-5.75 3.3Z"/></svg>
      </a></li>
    </ul>

    <nav class="footer-links" aria-label="Footer">
      <a href="index.html">Home</a>
      <a href="products.html">Products</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact Us</a>
    </nav>
  </div>
  <div class="footer-bottom">
    <div class="container small">
      <span>Copyright © <span id="year"></span> · Designed by {YourName}</span>
    </div>
  </div>
</footer>`,
  };

  // Fetch & inject
  await Promise.all(
    [...targets].map(async (el) => {
      const url = el.getAttribute("data-include");
      try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
        el.innerHTML = await res.text();
      } catch (err) {
        console.warn(`Include failed for ${url}:`, err);
        if (fallback[url]) el.innerHTML = fallback[url];
      }
    })
  );

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Signal ready
  document.dispatchEvent(new CustomEvent("partials:loaded"));
}

document.addEventListener("DOMContentLoaded", injectPartials);
