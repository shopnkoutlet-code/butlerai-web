// ---- Shop-Einstellungen: nur hier Links eintragen ----
// "link" = Zahlungslink aus Qonto (Qonto-App > Zahlungslinks > wiederverwendbarer Link). Leer = Knopf zeigt "Kasse öffnet in Kürze".
// Qonto-Zahlungslinks laufen nach 6 Monaten ab: dann neuen Link erstellen und hier ersetzen.
const PRODUKTE = {
  "ebook-kompakt": { name: "Butler AI · Kompakt-Ausgabe (E-Book)", preis: 27, link: "", ab: "2026-11-01T00:00:00+01:00" },
  "website-48":    { name: "NOVA ONE · Website in 48 Stunden",     preis: 249, link: "" },
};
const KONTAKT = "kontakt@butlerai.de";

// ---- ab hier nichts ändern ----
function euro(n) { return n.toLocaleString("de-DE") + " €"; }
document.querySelectorAll("[data-produkt]").forEach((box) => {
  const id = box.dataset.produkt, p = PRODUKTE[id]; if (!p) return;
  const knopf = box.querySelector(".kauf"), haken = box.querySelector("input[type=checkbox]"), info = box.querySelector(".kasse-info");
  const offen = !p.ab || Date.now() >= Date.parse(p.ab) || /vorschau=start/.test(location.search);
  const preisFeld = box.querySelector("[data-preis]"); if (preisFeld) preisFeld.textContent = euro(p.preis);
  function stand() {
    if (!offen) { knopf.textContent = "Erhältlich ab 1. November"; knopf.disabled = true; if (haken) haken.disabled = true; return; }
    if (!p.link) {                                   // Kasse noch nicht freigeschaltet: Bestellung per Mail
      knopf.textContent = "Per E-Mail bestellen · " + euro(p.preis);
      knopf.disabled = haken ? !haken.checked : false;
      if (info) info.textContent = "Die Kartenzahlung wird gerade eingerichtet. Du bekommst nach deiner Mail einen sicheren Zahlungslink.";
      return;
    }
    knopf.textContent = "Jetzt kaufen · " + euro(p.preis);
    knopf.disabled = haken ? !haken.checked : false;
  }
  if (haken) haken.addEventListener("change", stand);
  knopf.addEventListener("click", () => {
    if (knopf.disabled) return;
    if (p.link) { location.href = p.link; return; }
    location.href = "mailto:" + KONTAKT + "?subject=" + encodeURIComponent("Bestellung: " + p.name) +
      "&body=" + encodeURIComponent("Hallo,\n\nich möchte bestellen: " + p.name + " (" + euro(p.preis) + ").\n\nName:\nFirma (falls vorhanden):\n\nBitte schickt mir den Zahlungslink.\n");
  });
  stand();
});
