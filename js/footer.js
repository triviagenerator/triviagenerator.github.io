/**
 * Site Footer Component
 * Renders the site footer into #site-footer.
 */
function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const year = new Date().getFullYear();

  mount.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a href="#top" class="brand" aria-label="Random Trivia Generator — Home">
            <span class="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="40" height="30" rx="3" stroke="currentColor" stroke-width="3"/>
                <path d="M14 16h20M14 23h14M14 30h9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </span>
            <span class="brand-title">Trivia Generator</span>
          </a>
          <p class="footer-tagline">
            A free random trivia and quiz question generator for classrooms, game nights,
            and curious minds — across science, history, geography, pop culture, and more.
          </p>
        </div>

        <nav class="footer-col" aria-label="Site sections">
          <h3>Explore</h3>
          <ul>
            <li><a href="#generator">Trivia Generator</a></li>
            <li><a href="#categories">Browse Categories</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#benefits">Why Use It</a></li>
          </ul>
        </nav>

        <nav class="footer-col" aria-label="Use cases">
          <h3>Use Cases</h3>
          <ul>
            <li><a href="#use-cases">Classroom Trivia</a></li>
            <li><a href="#use-cases">Game Night Questions</a></li>
            <li><a href="#use-cases">Icebreaker Trivia</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </nav>

       <nav class="footer-col" aria-label="Use cases">
          <h3>Use Cases</h3>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/cookies">Cookies Policy</a></li>
          </ul>
        </nav>
      </div>

      <div class="container footer-bottom">
        <p>&copy; ${year} Trivia Generator. All rights reserved.</p>
        <p class="footer-url">triviagenerator.github.io</p>
      </div>
    </footer>
  `;
}

document.addEventListener("DOMContentLoaded", renderFooter);
