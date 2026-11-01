// Texte für Deutsch und Englisch

const translations = {

    de: {
        heading: "Testumgebung",

        description:
            "Diese Website ist eine separate Vorschau und wird zum Testen neuer Funktionen, Designs und Inhalte verwendet. Die hier gezeigten Inhalte können unvollständig sein oder sich jederzeit ändern.",

        status: "Separate Testumgebung",

        homeButton: "Zur Hauptwebsite",

        footnote:
            "Du befindest dich auf der Preview-Version, nicht auf dem regulären Portfolio."
    },

    en: {
        heading: "Testing Environment",

        description:
            "This website is a separate preview used to test new features, designs and content. The content displayed here may be incomplete or subject to change at any time.",

        status: "Separate testing environment",

        homeButton: "Visit main website",

        footnote:
            "You are currently viewing the preview version, not the regular portfolio."
    }

};


// Sprache ändern

function setLanguage(language) {

    const text = translations[language];

    if (!text) return;

    // Seitensprache ändern

    document.documentElement.lang = language;

    // Texte aktualisieren

    document.getElementById("heading").textContent =
        text.heading;

    document.getElementById("description").textContent =
        text.description;

    document.getElementById("status-text").textContent =
        text.status;

    document.getElementById("home-button").textContent =
        text.homeButton;

    document.getElementById("footnote").textContent =
        text.footnote;


    // Aktiven Sprachbutton markieren

    const deButton = document.getElementById("de-button");
    const enButton = document.getElementById("en-button");

    deButton.classList.toggle("active", language === "de");
    enButton.classList.toggle("active", language === "en");

    deButton.setAttribute(
        "aria-pressed",
        language === "de"
    );

    enButton.setAttribute(
        "aria-pressed",
        language === "en"
    );

}


// Sprachbuttons verbinden

document.getElementById("de-button").addEventListener("click", () => {
    setLanguage("de");
});

document.getElementById("en-button").addEventListener("click", () => {
    setLanguage("en");
});
