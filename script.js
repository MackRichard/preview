const toggle = document.getElementById("languageToggle");
let language = localStorage.getItem("richardPortfolioLanguage") === "en" ? "en" : "de";

function setLanguage(lang) {
  language = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-de][data-en]").forEach((node) => {
    node.textContent = lang === "en" ? node.dataset.en : node.dataset.de;
  });
  toggle.textContent = lang === "de" ? "EN" : "DE";
  toggle.setAttribute("aria-label", lang === "de" ? "Switch language to English" : "Sprache auf Deutsch wechseln");
  try { localStorage.setItem("richardPortfolioLanguage", lang); } catch (error) {}
  updateGreeting();
}

function updateGreeting() {
  const node = document.getElementById("greeting");
  const hour = new Date().getHours();
  const messages = language === "en"
    ? (hour < 11 ? ["Good morning — glad you’re here.", "Hope your day is off to a good start."]
      : hour < 18 ? ["Glad you stopped by.", "Nice to have you here."]
      : ["Good evening — glad you’re here.", "Nice to see you this evening."])
    : (hour < 11 ? ["Guten Morgen – schön, dass du da bist.", "Ich wünsche dir einen guten Start in den Tag."]
      : hour < 18 ? ["Schön, dass du vorbeischaust.", "Ich freue mich, dass du hier bist."]
      : ["Guten Abend – schön, dass du da bist.", "Schön, dass du vorbeischaust."]);
  node.textContent = messages[Math.floor(Math.random() * messages.length)];
}
toggle.addEventListener("click", () => setLanguage(language === "de" ? "en" : "de"));
setLanguage(language);

document.addEventListener("DOMContentLoaded", () => {
    // Duolingo Streak Auto-Increment (Basierend auf Startdatum 29.10.2026 = 1130 Tage)
    const baseDate = new Date("2026-10-29T00:00:00");
    const baseStreak = 1130;
    
    const today = new Date();
    // Berechnung des Tagesunterschieds
    const diffTime = today - baseDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const currentStreak = baseStreak + (diffDays > 0 ? diffDays : 0);
    
    const streakElement = document.getElementById("duolingo-streak");
    if (streakElement) {
        streakElement.textContent = `${currentStreak} Tage Streak`;
    }
});
