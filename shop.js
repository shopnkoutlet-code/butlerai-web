// ---- Shop-Einstellungen: nur hier Links eintragen ----
// "link" = Stripe-Zahlungslink (Stripe > Zahlungslinks). Leer = Bestellung per Mail.
// "aktion": Startpreis mit eigenem Link bis "bis"; danach gelten wieder preis und link.
const PRODUKTE = {
  "ebook-kompakt": { name: "Butler AI · Kompakt-Ausgabe (E-Book)", preis: 27, link: "",
                     ds24: "https://www.checkout-ds24.com/product/756219",          // Digistore24 (PayPal, Klarna); Gutschein START19 gilt bis 14.11.
                     aktion: { preis: 19, link: "https://buy.stripe.com/cNi6oG8q89VubJ4bv4aMU00", ds24: "https://www.checkout-ds24.com/product/756219?voucher=START19", bis: "2026-11-15T00:00:00+01:00" } },
};
const KONTAKT = "kontakt@butlerai.de";

// ---- ab hier nichts ändern ----
function euro(n) { return n.toLocaleString("de-DE") + " €"; }
document.querySelectorAll("[data-produkt]").forEach((box) => {
  const id = box.dataset.produkt, g = PRODUKTE[id]; if (!g) return;
  const aktiv = g.aktion && Date.now() < Date.parse(g.aktion.bis);
  const p = aktiv ? Object.assign({}, g, { preis: g.aktion.preis, link: g.aktion.link, statt: g.preis }) : g;
  const ds = box.querySelector(".ds24-link"); if (ds && (p.ds24 || g.ds24)) { ds.href = aktiv && g.aktion.ds24 ? g.aktion.ds24 : g.ds24; ds.addEventListener("click", function () { if (window.baZaehle) window.baZaehle("kauf_klick"); }); }
  const knopf = box.querySelector(".kauf"), haken = box.querySelector("input[type=checkbox]"), info = box.querySelector(".kasse-info");
  const offen = !p.ab || Date.now() >= Date.parse(p.ab) || /vorschau=start/.test(location.search);
  const preisFeld = box.querySelector("[data-preis]"); if (preisFeld) preisFeld.textContent = euro(p.preis) + (p.statt ? " statt " + euro(p.statt) : "");
  const aktionFeld = box.querySelector("[data-aktion]"); if (aktionFeld && p.statt) aktionFeld.textContent = "Startpreis bis 14. November";
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
    if (window.baZaehle) window.baZaehle(p.link ? "kauf_klick" : "bestell_mail");
    if (p.link) { setTimeout(function () { location.href = p.link; }, 150); return; }
    location.href = "mailto:" + KONTAKT + "?subject=" + encodeURIComponent("Bestellung: " + p.name) +
      "&body=" + encodeURIComponent("Hallo,\n\nich möchte bestellen: " + p.name + " (" + euro(p.preis) + ").\n\nName:\nFirma (falls vorhanden):\n\nBitte schickt mir den Zahlungslink.\n");
  });
  stand();
});
