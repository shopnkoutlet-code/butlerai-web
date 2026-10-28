// Gemeinsamer Kopf für alle Seiten: Logo, Menü, auf dem Handy Menü-Knopf (drei Striche) mit Seitenleiste.
(function () {
  var SEITEN = [["shop.html", "Shop"], ["index.html", "E-Book"], ["kontakt.html", "Kontakt"], ["rechtliches.html", "Rechtliches"]];
  var ZEICHEN = '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke-width="2.6"><ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(-20 50 50)" stroke="#d9c08b"/><ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(20 50 50)" stroke="#9c8a63"/></g><g fill="#d9c08b" stroke="#0d0e10" stroke-width="4" paint-order="stroke"><path d="M27 39 Q29.5 50 27 61 L46 53.5 Q47.5 50 46 46.5 Z"/><path d="M73 39 Q70.5 50 73 61 L54 53.5 Q52.5 50 54 46.5 Z"/><rect x="45.5" y="45" width="9" height="10" rx="2.2"/></g></svg>';
  var css = '@font-face{font-family:"BA Marke";font-weight:700;font-display:swap;src:url(schriften/space-grotesk-latin-700-normal.woff2) format("woff2")}' +
    '.bk{position:relative;z-index:20;border-bottom:1px solid rgba(217,192,139,.14)}' +
    '.bk-in{max-width:1120px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px max(20px,env(safe-area-inset-right,0px)) 16px max(20px,env(safe-area-inset-left,0px))}' +
    '.bk-logo{display:flex;align-items:center;gap:12px;text-decoration:none}.bk-logo svg{width:46px;height:46px;flex:none}' +
    '.bk-logo span{font-family:"BA Marke","Helvetica Neue",Arial,sans-serif;font-weight:700;font-size:17px;letter-spacing:.32em;color:#d9c08b;white-space:nowrap}' +
    '.bk-nav{display:flex;align-items:center;gap:26px}.bk-nav a{font-size:15px;color:#cfc6b4;text-decoration:none;border-bottom:1px solid transparent;padding-bottom:2px}' +
    '.bk-nav a:hover,.bk-nav a[aria-current]{color:#f4e6c2;border-color:#d9c08b}' +
    '.bk-nav a.bk-kauf,.bk-sl a.bk-kauf{background:#d9c08b;color:#0d0e10;font-weight:600;border:0;border-radius:10px;padding:9px 16px}.bk-nav a.bk-kauf:hover{background:#f4e6c2}' +
    '.bk-burger{display:none;width:46px;height:46px;border:1px solid rgba(217,192,139,.3);border-radius:10px;background:transparent;cursor:pointer;align-items:center;justify-content:center;flex-direction:column;gap:5px}' +
    '.bk-burger i{display:block;width:20px;height:2px;background:#d9c08b;border-radius:2px}' +
    '.bk-schatten{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:40}' +
    '.bk-sl{position:fixed;top:0;right:0;bottom:0;width:min(82vw,320px);background:#121317;border-left:1px solid rgba(217,192,139,.2);z-index:50;display:flex;flex-direction:column;gap:6px;' +
    'padding:calc(18px + env(safe-area-inset-top,0px)) calc(22px + env(safe-area-inset-right,0px)) calc(24px + env(safe-area-inset-bottom,0px)) 22px;transform:translateX(100%);transition:transform .25s ease}' +
    '.bk-sl.offen{transform:none}.bk-sl a{font-size:19px;color:#f4e6c2;text-decoration:none;padding:13px 4px;border-bottom:1px solid rgba(217,192,139,.12)}.bk-sl a[aria-current]{color:#d9c08b}' +
    '.bk-sl a.bk-kauf{margin-top:18px;text-align:center;padding:14px}' +
    '.bk-zu{align-self:flex-end;width:44px;height:44px;border:0;background:transparent;color:#d9c08b;font-size:30px;line-height:1;cursor:pointer;margin-bottom:8px}' +
    '.bk-sl small{margin-top:auto;font-size:13px;color:#8f8673}' +
    '.bk a:focus-visible,.bk button:focus-visible{outline:2px solid #d9c08b;outline-offset:3px}' +
    '.bk .bk-burger{background:transparent;padding:0;box-shadow:none}.bk .bk-zu{background:transparent;padding:0}' +
    '@media (max-width:760px){.bk-nav{display:none}.bk-burger{display:flex}.bk-logo svg{width:40px;height:40px}.bk-logo span{font-size:15px}}' +
    '@media (prefers-reduced-motion:reduce){.bk-sl{transition:none}}';
  var hier = (location.pathname.split("/").pop() || "index.html");
  function links(extra) {
    return SEITEN.map(function (s) { return '<a href="' + s[0] + '"' + (s[0] === hier ? ' aria-current="page"' : "") + ">" + s[1] + "</a>"; }).join("") +
      '<a class="bk-kauf" href="shop.html#ebook">Jetzt kaufen · ' + (Date.now() < Date.parse("2026-11-15T00:00:00+01:00") ? "19" : "27") + ' €</a>' + (extra || "");
  }
  function bauen() {
    var kopf = document.querySelector("header"); if (!kopf) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    kopf.className = "bk";
    kopf.innerHTML = '<div class="bk-in"><a class="bk-logo" href="index.html" aria-label="Butler AI Startseite">' + ZEICHEN + '<span>BUTLER AI</span></a>' +
      '<nav class="bk-nav" aria-label="Hauptmenü">' + links() + '</nav>' +
      '<button class="bk-burger" type="button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="bk-sl"><i></i><i></i><i></i></button></div>';
    var sl = document.createElement("nav"); sl.className = "bk-sl"; sl.id = "bk-sl"; sl.setAttribute("aria-label", "Menü"); sl.hidden = true;
    sl.innerHTML = '<button class="bk-zu" type="button" aria-label="Menü schließen">×</button>' + links('<small>Fragen? kontakt@butlerai.de</small>');
    var sch = document.createElement("div"); sch.className = "bk-schatten"; sch.hidden = true;
    document.body.appendChild(sch); document.body.appendChild(sl);
    var knopf = kopf.querySelector(".bk-burger");
    function auf() { sl.hidden = false; sch.hidden = false; requestAnimationFrame(function () { sl.classList.add("offen"); }); knopf.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; sl.querySelector("a").focus(); }
    function zu() { sl.classList.remove("offen"); sch.hidden = true; knopf.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; setTimeout(function () { sl.hidden = true; }, 260); }
    knopf.addEventListener("click", auf); sch.addEventListener("click", zu); sl.querySelector(".bk-zu").addEventListener("click", zu);
    sl.addEventListener("click", function (e) { if (e.target.tagName === "A") zu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sl.hidden) { zu(); knopf.focus(); } });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bauen); else bauen();
})();
