// Data: base proverbs (objects, arrays)
const baseProverbs = [
  { text: "However long the night, the dawn will break.", theme: "Perseverance" },
  { text: "Wisdom is like fire; people take it from others.", theme: "Wisdom" },
  { text: "Where there is love, there is no darkness.", theme: "Community" },
  { text: "A child who is not embraced by the village will grow up to burn it down to feel its warmth.", theme: "Community" },
  { text: "You learn how to cut down trees by cutting them down.", theme: "Practice" }
];

// Storage helpers (objects, template literals)
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key, fallback = null) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

// Merge base data with user submissions
function getAllProverbs() {
  const submissions = loadFromStorage("submissions", []);
  return [...baseProverbs, ...submissions];
}

// Random selection (conditionals)
function randomProverb() {
  const all = getAllProverbs();
  if (all.length === 0) return { text: "No proverbs available.", theme: "General" };
  const i = Math.floor(Math.random() * all.length);
  return all[i];
}

// Render featured proverb (DOM selection + modification)
function renderFeatured() {
  const el = document.querySelector("#proverb-text");
  const status = document.querySelector("#favorite-status");
  const btnNext = document.querySelector("#new-proverb");
  const btnSave = document.querySelector("#save-favorite");
  if (!el || !btnNext || !btnSave) return;

  const stored = loadFromStorage("featuredProverb");
  const validStored = stored && getAllProverbs().some(p => p.text === stored.text);
  const current = validStored ? stored : randomProverb();
  el.textContent = `${current.text} — ${current.theme}`;
  saveToStorage("featuredProverb", current);

  btnNext.addEventListener("click", () => {
    const next = randomProverb();
    el.textContent = `${next.text} — ${next.theme}`;
    saveToStorage("featuredProverb", next);
    status.textContent = "";
  });

  btnSave.addEventListener("click", () => {
    const favs = loadFromStorage("favorites", []);
    const featured = loadFromStorage("featuredProverb");
    const exists = favs.some(f => f.text === featured.text);
    if (exists) {
      status.textContent = "Already in favorites.";
    } else {
      favs.push(featured);
      saveToStorage("favorites", favs);
      status.textContent = "Saved to favorites!";
    }
  });
}

// Themes page: populate filter and grid (arrays, array methods, template literals)
function initThemesPage() {
  const select = document.querySelector("#theme-filter");
  const grid = document.querySelector("#themes");
  if (!select || !grid) return;

  const all = getAllProverbs();
  const themes = Array.from(new Set(all.map(p => p.theme))).sort();

  // Populate filter
  select.innerHTML = ["all", ...themes].map(t => `<option value="${t}">${t[0].toUpperCase()}${t.slice(1)}</option>`).join("");

  function renderGrid(filter = "all") {
    const items = all.filter(p => filter === "all" ? true : p.theme === filter);
    const groups = items.reduce((acc, p) => {
      acc[p.theme] = acc[p.theme] || [];
      acc[p.theme].push(p);
      return acc;
    }, {});

    grid.innerHTML = Object.entries(groups).map(([theme, arr]) => `
      <article class="card">
        <h3>${theme}</h3>
        <ul>
          ${arr.map(item => `<li>${item.text}</li>`).join("")}
        </ul>
        <picture>
          <source srcset="assets/img/${theme.toLowerCase()}-thumb.webp" type="image/webp">
          <img loading="lazy" src="assets/img/${theme.toLowerCase()}-thumb.jpg" alt="${theme} illustration">
        </picture>
      </article>
    `).join("");

    // Lazy-load visual cue
    grid.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.addEventListener("load", () => img.classList.add("lazy-loaded"));
    });
  }

  renderGrid();
  select.addEventListener("change", (e) => renderGrid(e.target.value));
}

// Submit page: form handling (events, validation, localStorage)
function initSubmitPage() {
  const form = document.querySelector("#proverb-form");
  const list = document.querySelector("#submitted-list");
  const clearBtn = document.querySelector("#clear-submissions");
  if (!form || !list || !clearBtn) return;

  const submissions = loadFromStorage("submissions", []);

  function renderSubmissions() {
    list.innerHTML = submissions.map(s => `
      <li>${s.text} — ${s.theme}${s.source ? ` (<a href="${s.source}" rel="noopener" target="_blank">source</a>)` : ""}</li>
    `).join("");
  }
  renderSubmissions();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = form.querySelector("#text").value.trim();
    const theme = form.querySelector("#theme").value.trim();
    const source = form.querySelector("#source").value.trim();

    // Conditional branching
    if (!text || !theme) {
      alert("Please provide both a proverb and a theme.");
      return;
    }

    submissions.push({ text, theme, source });
    saveToStorage("submissions", submissions);
    renderSubmissions();
    form.reset();
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("Clear all your submissions?")) {
      submissions.splice(0, submissions.length);
      saveToStorage("submissions", submissions);
      renderSubmissions();
    }
  });
}

// Responsive navigation (DOM interaction + events)
function initNav() {
  const toggle = document.querySelector("#menu-toggle");
  const links = document.querySelector("#primary-nav");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const visible = links.getAttribute("data-visible") === "true";
    links.setAttribute("data-visible", String(!visible));
    toggle.setAttribute("aria-expanded", String(!visible));
  });
}

// App bootstrap
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderFeatured();      // index.html
  initThemesPage();      // themes.html
  initSubmitPage();      // submit.html
});
