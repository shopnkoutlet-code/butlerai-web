// Besucherzaehler ohne Cookies: meldet nur Seite, Herkunfts-Website (nur der Name) und ob Handy oder Computer.
// Keine IP-Speicherung, kein Profil. Siehe Datenschutzerklaerung Punkt 3.
(function () {
  var Z = "https://macbook-air-von-niklas.tailcd6010.ts.net:8443/nova-office/z";
  function senden(extra) {
    try {
      var r = ""; try { r = document.referrer ? new URL(document.referrer).hostname : ""; } catch (e) {}
      var i = new Image(); i.referrerPolicy = "no-referrer";
      i.src = Z + "?p=" + encodeURIComponent(location.pathname) + "&r=" + encodeURIComponent(r) + "&w=" + (window.innerWidth || 0) + (extra || "") + "&t=" + Date.now();
    } catch (e) {}
  }
  window.baZaehle = function (ereignis) { senden("&e=" + encodeURIComponent(ereignis)); };
  if (navigator.doNotTrack !== "1") senden("");
})();
