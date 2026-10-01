/*
 * Tooltips del glosario.
 * Al pasar el cursor (o enfocar) un enlace a glosario/#termino, muestra la
 * definicion tomada de la propia pagina del glosario (unica fuente de verdad).
 */
(function () {
  "use strict";

  var cache = {};      // URL del glosario -> Promise<Document>
  var tooltip = null;  // elemento unico reutilizado
  var activeLink = null;

  function isGlossaryPath(pathname) {
    return /\/glosario\/(index\.html)?$/.test(pathname);
  }

  function fetchGlossary(url) {
    if (!cache[url]) {
      cache[url] = fetch(url, { credentials: "same-origin" })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.text();
        })
        .then(function (html) {
          return new DOMParser().parseFromString(html, "text/html");
        })
        .catch(function (err) {
          delete cache[url];
          throw err;
        });
    }
    return cache[url];
  }

  function cleanText(text) {
    return text
      .replace(/\\\(|\\\)|\\\[|\\\]/g, "") // delimitadores MathJax
      .replace(/\s+/g, " ")
      .trim();
  }

  function lookup(doc, id) {
    var heading = doc.getElementById(id);
    if (!heading) return null;
    var clone = heading.cloneNode(true);
    clone.querySelectorAll(".headerlink").forEach(function (a) { a.remove(); });
    var term = cleanText(clone.textContent);
    var el = heading.nextElementSibling;
    while (el && !/^H[1-6]$/.test(el.tagName)) {
      if (el.tagName === "P") {
        return { term: term, def: cleanText(el.textContent) };
      }
      el = el.nextElementSibling;
    }
    return term ? { term: term, def: "" } : null;
  }

  function getTooltip() {
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.className = "glosario-tooltip";
      tooltip.id = "glosario-tooltip";
      tooltip.setAttribute("role", "tooltip");
      tooltip.hidden = true;
      document.body.appendChild(tooltip);
    }
    if (!tooltip.isConnected) document.body.appendChild(tooltip);
    return tooltip;
  }

  function position(link, tip) {
    var margin = 8;
    var rect = link.getBoundingClientRect();
    var tw = tip.offsetWidth;
    var th = tip.offsetHeight;
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;

    var left = rect.left + rect.width / 2 - tw / 2;
    left = Math.max(margin, Math.min(left, vw - tw - margin));

    var top = rect.bottom + margin;
    if (top + th > vh - margin && rect.top - th - margin >= margin) {
      top = rect.top - th - margin; // arriba si no cabe abajo
    }
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }

  function show(link) {
    activeLink = link;
    var data = link._glosarioData;
    var tip = getTooltip();
    tip.textContent = "";
    var strong = document.createElement("strong");
    strong.className = "glosario-tooltip__term";
    strong.textContent = data.term;
    tip.appendChild(strong);
    if (data.def) {
      var p = document.createElement("span");
      p.className = "glosario-tooltip__def";
      p.textContent = data.def;
      tip.appendChild(p);
    }
    tip.hidden = false;
    link.setAttribute("aria-describedby", tip.id);
    position(link, tip);
  }

  function hide(link) {
    if (link && activeLink !== link) return;
    if (tooltip) tooltip.hidden = true;
    if (activeLink) activeLink.removeAttribute("aria-describedby");
    activeLink = null;
  }

  function onEnter(event) {
    var link = event.currentTarget;
    activeLink = link;
    if (link._glosarioData) {
      show(link);
      return;
    }
    fetchGlossary(link._glosarioUrl)
      .then(function (doc) {
        var data = lookup(doc, link._glosarioId);
        if (!data) return;
        link._glosarioData = data;
        if (activeLink === link) show(link);
      })
      .catch(function () { /* sin tooltip si falla la descarga */ });
  }

  function onLeave(event) {
    hide(event.currentTarget);
  }

  function init() {
    hide();
    if (isGlossaryPath(window.location.pathname)) return;
    var links = document.querySelectorAll(".md-content a[href*='glosario']");
    links.forEach(function (link) {
      if (link._glosarioBound) return;
      var url;
      try {
        url = new URL(link.getAttribute("href"), window.location.href);
      } catch (e) {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (!isGlossaryPath(url.pathname) || url.hash.length < 2) return;
      var id = decodeURIComponent(url.hash.slice(1));
      link._glosarioBound = true;
      link._glosarioUrl = url.origin + url.pathname;
      link._glosarioId = id;
      link.classList.add("glosario-link");
      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("focus", onEnter);
      link.addEventListener("mouseleave", onLeave);
      link.addEventListener("blur", onLeave);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hide();
  });
  window.addEventListener("scroll", function () {
    if (activeLink && tooltip && !tooltip.hidden) position(activeLink, tooltip);
  }, { passive: true });

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(init);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
