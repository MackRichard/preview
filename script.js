document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================
     1. Theme Switcher (Dark / Light Mode)
     ========================================================== */
  const themeToggle = document.getElementById("theme-toggle");

  // Gespeichertes Theme oder Systemeinstellung laden
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "dark";

    if (currentTheme === "dark") {
      targetTheme = "light";
    } else if (currentTheme === "light") {
      targetTheme = "dark";
    } else {
      // Wenn noch kein data-theme gesetzt ist, prüfen was der Browser bevorzugt
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      targetTheme = prefersDark ? "light" : "dark";
    }

    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  });

  /* ==========================================================
     2. Scroll Reveal Effects & To-Top Button
     ========================================================== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // To-Top Button
  const toTopBtn = document.getElementById("to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      toTopBtn?.classList.add("show");
    } else {
      toTopBtn?.classList.remove("show");
    }
  });

  toTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ==========================================================
     3. Game of Life Canvas Animation (Hero Section)
     ========================================================== */
  const canvas = document.getElementById("life");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let cellSize = 12;
    let cols = 0;
    let rows = 0;
    let grid = [];

    function resizeCanvas() {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      cols = Math.floor(canvas.width / cellSize);
      rows = Math.floor(canvas.height / cellSize);
      grid = createRandomGrid();
    }

    function createRandomGrid() {
      return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() > 0.85 ? 1 : 0))
      );
    }

    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Farbe aus CSS-Variable lesen
      const cellColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--life")
        .trim() || "rgba(38, 70, 209, 0.28)";

      ctx.fillStyle = cellColor;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] === 1) {
            ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
          }
        }
      }
    }

    function getNextGeneration() {
      const nextGrid = grid.map((arr) => [...arr]);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let neighbors = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              const nr = r + i;
              const nc = c + j;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                neighbors += grid[nr][nc];
              }
            }
          }

          if (grid[r][c] === 1 && (neighbors < 2 || neighbors > 3)) {
            nextGrid[r][c] = 0;
          } else if (grid[r][c] === 0 && neighbors === 3) {
            nextGrid[r][c] = 1;
          }
        }
      }
      grid = nextGrid;
    }

    let lastTime = 0;
    function animate(currentTime) {
      if (currentTime - lastTime > 150) { // ~6-7 FPS für ruhige Animation
        getNextGeneration();
        drawGrid();
        lastTime = currentTime;
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(animate);
  }

  /* ==========================================================
     4. Anonymes Nachricht-Formular (Zeichenzähler)
     ========================================================== */
  const msgText = document.getElementById("msg-text");
  const charCount = document.getElementById("char-count");
  const anonForm = document.getElementById("anon-form");
  const msgStatus = document.getElementById("msg-status");

  msgText?.addEventListener("input", () => {
    if (charCount) {
      charCount.textContent = msgText.value.length;
    }
  });

  anonForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (msgStatus) {
      msgStatus.className = "msg-status ok";
      msgStatus.textContent = "Vielen Dank! Deine Nachricht wurde abgesendet.";
      anonForm.reset();
      if (charCount) charCount.textContent = "0";
    }
  });

  /* ==========================================================
     5. Live-Uhr im Footer
     ========================================================== */
  const clockEl = document.getElementById("clock");
  function updateClock() {
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString("de-DE");
    }
  }
  setInterval(updateClock, 1000);
  updateClock();
});
