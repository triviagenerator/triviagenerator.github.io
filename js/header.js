/**
 * Site Header Component
 * Renders the sticky navigation header into #site-header.
 */
function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  mount.innerHTML = `
    <header class="site-header" role="banner">
      <div class="header-inner container">
        <a href="#top" class="brand" aria-label="Random Trivia Generator — Home">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="40" height="30" rx="3" stroke="currentColor" stroke-width="3"/>
              <path d="M14 16h20M14 23h14M14 30h9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              <circle cx="38" cy="38" r="6" fill="var(--amber)" stroke="var(--ink)" stroke-width="2"/>
              <path d="M36 38l1.5 1.5L40 36.5" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="brand-text">
            <span class="brand-title">Trivia Generator</span>
            <span class="brand-subtitle">Random Questions, On Demand</span>
          </span>
        </a>

        <nav class="main-nav" aria-label="Primary">
          <ul>
            <li><a href="#generator">Generator</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#use-cases">Use Cases</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <a href="#generator" class="btn btn-primary btn-small">Generate Trivia</a>
          <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div class="mobile-nav" id="mobileNav" hidden>
        <ul>
          <li><a href="#generator">Generator</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#use-cases">Use Cases</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>
    </header>
  `;

  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.hasAttribute("hidden") === false;
    if (isOpen) {
      mobileNav.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("is-open");
    } else {
      mobileNav.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      toggle.classList.add("is-open");
    }
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("is-open");
    });
  });

  // Shrink header on scroll
  const headerEl = mount.querySelector(".site-header");
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 24) {
        headerEl.classList.add("is-scrolled");
      } else {
        headerEl.classList.remove("is-scrolled");
      }
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", renderHeader);
