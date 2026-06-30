/**
 * Trivia Generator — Application Logic
 */
document.addEventListener("DOMContentLoaded", () => {
  initYear();
  populateCategorySelect();
  initGenerator();
  initCategoryCards();
  initFaqAccordion();
  initScrollReveal();
  initCounters();
});

/* ---------- Year stamp (used in a couple of small UI badges) ---------- */
function initYear() {
  const els = document.querySelectorAll("[data-current-year]");
  els.forEach((el) => (el.textContent = new Date().getFullYear()));
}

/* ---------- Populate the category <select> from data ---------- */
function populateCategorySelect() {
  const select = document.getElementById("categorySelect");
  if (!select) return;
  TRIVIA_CATEGORIES.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = `${cat.icon} ${cat.label}`;
    select.appendChild(opt);
  });
}

/* ---------- Core Generator ---------- */
const generatorState = {
  current: null,
  answered: false,
  stats: { asked: 0, correct: 0 }
};

function initGenerator() {
  const generateBtn = document.getElementById("generateBtn");
  const flashcard = document.getElementById("flashcard");
  const categorySelect = document.getElementById("categorySelect");
  const difficultySelect = document.getElementById("difficultySelect");

  if (!generateBtn || !flashcard) return;

  generateBtn.addEventListener("click", () => {
    const category = categorySelect ? categorySelect.value : "all";
    const difficulty = difficultySelect ? difficultySelect.value : "all";
    drawQuestion(category, difficulty);
  });

  // Allow category cards / hash links to trigger an immediate draw
  document.addEventListener("trivia:draw", (e) => {
    const { category, difficulty } = e.detail || {};
    if (categorySelect && category) categorySelect.value = category;
    if (difficultySelect && difficulty) difficultySelect.value = difficulty;
    drawQuestion(category || "all", difficulty || "all");
  });
}

function drawQuestion(category, difficulty) {
  const flashcard = document.getElementById("flashcard");
  const inner = document.getElementById("flashcardInner");
  const back = document.getElementById("flashcardBack");
  if (!flashcard || !inner || !back) return;

  const q = getRandomQuestion(category, difficulty);
  if (!q) {
    back.innerHTML = `<div class="no-results">
      <p>No questions match that combination yet. Try "All Categories".</p>
    </div>`;
    flashcard.classList.add("is-flipped");
    return;
  }

  generatorState.current = q;
  generatorState.answered = false;

  const catInfo = TRIVIA_CATEGORIES.find((c) => c.id === q.category);

  back.innerHTML = `
    <div class="card-stamp">${catInfo ? catInfo.icon : "🎓"} ${catInfo ? catInfo.label : "General"}</div>
    <div class="card-difficulty diff-${q.difficulty}">${q.difficulty}</div>
    <h3 class="card-question">${q.question}</h3>
    <ul class="card-options" id="cardOptions" role="list">
      ${q.options
        .map(
          (opt, i) =>
            `<li><button class="option-btn" data-index="${i}" type="button">
              <span class="option-letter">${String.fromCharCode(65 + i)}</span>
              <span class="option-text">${opt}</span>
            </button></li>`
        )
        .join("")}
    </ul>
    <div class="card-fact" id="cardFact" hidden></div>
    <div class="card-footer">
      <button class="btn btn-ghost btn-small" id="nextQuestionBtn" type="button">Next Question →</button>
    </div>
  `;

  flashcard.classList.add("is-flipped");
  flashcard.classList.remove("pulse");
  // restart the pulse animation on the punch-hole stamp
  void flashcard.offsetWidth;
  flashcard.classList.add("pulse");

  back.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(btn, q));
  });

  document.getElementById("nextQuestionBtn").addEventListener("click", () => {
    const categorySelect = document.getElementById("categorySelect");
    const difficultySelect = document.getElementById("difficultySelect");
    drawQuestion(
      categorySelect ? categorySelect.value : "all",
      difficultySelect ? difficultySelect.value : "all"
    );
  });
}

function handleAnswer(button, question) {
  if (generatorState.answered) return;
  generatorState.answered = true;
  generatorState.stats.asked += 1;

  const selectedIndex = Number(button.dataset.index);
  const allOptions = document.querySelectorAll(".option-btn");
  const fact = document.getElementById("cardFact");

  allOptions.forEach((btn) => {
    const idx = Number(btn.dataset.index);
    btn.disabled = true;
    if (idx === question.answer) {
      btn.classList.add("is-correct");
    } else if (idx === selectedIndex) {
      btn.classList.add("is-incorrect");
    }
  });

  if (selectedIndex === question.answer) {
    generatorState.stats.correct += 1;
  }

  if (fact) {
    fact.hidden = false;
    fact.innerHTML = `<strong>Did you know?</strong> ${question.fact}`;
  }

  updateScoreboard();
}

function updateScoreboard() {
  const askedEl = document.getElementById("statAsked");
  const correctEl = document.getElementById("statCorrect");
  const accuracyEl = document.getElementById("statAccuracy");
  if (!askedEl) return;

  const { asked, correct } = generatorState.stats;
  askedEl.textContent = asked;
  correctEl.textContent = correct;
  accuracyEl.textContent = asked === 0 ? "0%" : `${Math.round((correct / asked) * 100)}%`;
}

/* ---------- Category cards trigger a filtered draw + scroll to generator ---------- */
function initCategoryCards() {
  const cards = document.querySelectorAll("[data-category-card]");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category-card");
      const generatorSection = document.getElementById("generator");
      if (generatorSection) {
        generatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      document.dispatchEvent(
        new CustomEvent("trivia:draw", { detail: { category, difficulty: "all" } })
      );
    });
  });
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((i) => i.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  });
}

/* ---------- Scroll reveal animations ---------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Animated stat counters in the "stats" band ---------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length === 0) return;

  const animate = (el) => {
    const target = Number(el.getAttribute("data-count-to"));
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => observer.observe(el));
}
