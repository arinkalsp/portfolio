(function () {
  "use strict";

  var S = window.SITE;
  if (!S) {
    var bar = document.createElement("div");
    bar.className = "content-error";
    bar.textContent = "Content could not load. In js/content.js the latest edit probably lost a quote mark or a comma: open the file’s History on GitHub and compare it with the previous version.";
    document.body.prepend(bar);
    return;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(id) { return document.getElementById(id); }
  function esc(v) {
    return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function set(id, html) { var el = $(id); if (el) el.innerHTML = html; }

  var PLAY = '<svg viewBox="0 0 28 32" aria-hidden="true"><path d="M4 2l22 14L4 30z"/></svg>';

  function youtubeId(url) {
    if (!url) return "";
    var m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : "";
  }

  // Lazy looping video: loads when near the viewport, plays only while visible.
  function loop(src, poster, label, cls) {
    return '<video class="loop ' + (cls || "") + '" muted loop playsinline preload="none" data-src="' + esc(src) + '"' +
      (poster ? ' poster="' + esc(poster) + '"' : "") + ' aria-label="' + esc(label) + '"></video>';
  }

  function playButton(youtube, image, title, extraClass) {
    return '<button type="button" class="poster ' + (extraClass || "") + '" data-youtube="' + esc(youtube) + '" aria-label="Play ' + esc(title) + '">' +
      '<img src="' + esc(image) + '" alt="" loading="lazy">' +
      '<span class="play">' + PLAY + '</span></button>';
  }

  // ─── Hero ───
  var P = S.person || {};
  var photo = $("hero-photo");
  if (photo && P.photo) photo.src = P.photo;
  set("hero-intro", (P.intro || "") + (P.mission ? '<br><span class="muted">' + P.mission + "</span>" : ""));
  set("hero-footnote", P.imdb ? '*Credits on <a class="link" href="' + esc(P.imdb) + '" target="_blank" rel="noopener">IMDb</a>' : "");
  set("manifesto-note", S.manifestoNote || "");

  // ─── Flagship ───
  var F = S.flagship || {};
  set("flagship-title", F.title || "");
  set("flagship-text", F.text || "");
  set("flagship-facts", (F.facts || []).map(function (f) {
    return "<div><dt>" + f[0] + "</dt><dd>" + f[1] + "</dd></div>";
  }).join(""));
  set("flagship-media", F.image ? playButton(F.youtube, F.image, (F.caption || F.title), "poster-flagship") +
    (F.caption ? '<span class="chip chip-corner">' + F.caption + "</span>" : "") : "");

  // ─── Projects ───
  set("projects-track", (S.projects || []).map(function (p) {
    return '<article class="project">' + playButton(p.youtube, p.image, p.title) +
      "<h4>" + p.title + "</h4><p>" + (p.text || "") + "</p></article>";
  }).join(""));

  // ─── Hybrid ───
  var H = S.hybrid || {};
  set("hybrid-intro", (H.intro || "") + (H.introMuted ? ' <span class="muted">' + H.introMuted + "</span>" : ""));
  set("hybrid-grid", (H.items || []).map(function (it) {
    var media;
    if (it.kind === "stacked") {
      var l = it.labels || ["Before", "After"];
      media = '<div class="stack-single">' + loop(it.video, it.poster, l[0] + " and " + l[1]) +
        '<span class="chip">' + l[0] + '</span><span class="chip chip-accent chip-mid">' + l[1] + "</span></div>";
    } else {
      media = '<div class="stack-pair">' +
        '<div class="cell">' + loop(it.top.video, it.top.poster, it.top.label) + '<span class="chip">' + it.top.label + "</span></div>" +
        '<div class="cell">' + loop(it.bottom.video, it.bottom.poster, it.bottom.label) + '<span class="chip chip-accent">' + it.bottom.label + "</span></div></div>";
    }
    return '<figure class="hybrid-item">' + media + "<figcaption>" +
      (it.lead ? '<span class="accent">' + it.lead + "</span> " : "") + (it.caption || "") + "</figcaption></figure>";
  }).join(""));

  // ─── Factories ───
  var FA = S.factories || {};
  set("factories-process", (FA.process || []).join(" → "));
  set("factories-stats", (FA.stats || []).map(function (s) {
    return '<div class="stat' + (s.highlight ? " stat-hi" : "") + '"><span class="stat-value">' + s.value + '</span><span class="stat-label">' + s.label + "</span></div>";
  }).join(""));
  set("factories-channels", (FA.channels || []).map(function (c) {
    return '<div class="channel">' + loop(c.video, c.poster, c.name + ", vertical video") +
      '<span class="channel-name">' + c.name + "</span>" +
      (c.url ? '<a class="link small" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + (c.handle || c.url) + "</a>" : "") +
      '<span class="muted small">' + (c.platform || "") + "</span></div>";
  }).join(""));

  // ─── E-com ───
  var E = S.ecom || {};
  set("ecom-number", E.figure || "");
  set("ecom-figure-text", (E.figureText || "") + (E.figureItalic ? ' <span class="serif">' + E.figureItalic + "</span>" : ""));
  set("ecom-text", E.text || "");
  set("ecom-track", (E.items || []).map(function (e) {
    return '<figure class="ecom-item">' + loop(e.video, e.poster, "Animated marketplace cover: " + e.caption) +
      "<figcaption>" + e.caption + "</figcaption></figure>";
  }).join(""));

  // ─── Skills ───
  var K = S.skills || {};
  set("skills-intro", K.intro || "");
  set("skills-techniques", K.techniques || "");
  set("skills-tools", (K.tools || []).map(function (g) {
    return '<div class="list-block"><h3 class="accent-small">' + g.group + "</h3>" +
      g.items.map(function (i) { return '<div class="row">' + i + "</div>"; }).join("") + "</div>";
  }).join(""));
  var gens = K.generations || [];
  var genGrid = $("generations");
  if (genGrid) {
    genGrid.classList.toggle("is-single", gens.length === 1);
    genGrid.innerHTML = gens.map(function (g, i) {
      var media = g.video ? loop(g.video, g.poster, g.caption || "Generation") :
        '<img src="' + esc(g.image) + '" alt="' + esc(g.caption || "") + '" loading="lazy">';
      return '<figure class="gen' + (i === 0 ? " gen-lead" : "") + '">' + media +
        (g.caption ? "<figcaption>" + g.caption + "</figcaption>" : "") + "</figure>";
    }).join("");
    if (!gens.length) genGrid.closest(".generations").hidden = true;
  }

  // ─── About ───
  var A = S.about || {};
  set("about-statement", A.statement || "");
  set("about-own", (A.own || []).map(function (g) {
    return g.items.map(function (item, i) {
      return '<div class="row row-pair' + (i === 0 ? " row-group" : "") + '"><span class="muted">' + (i === 0 ? g.group : "") + "</span><span>" + item + "</span></div>";
    }).join("");
  }).join(""));
  set("about-experience", (A.experience || []).map(function (r) {
    return '<div class="row row-pair"><span>' + r[0] + "</span><span>" + r[1] + "</span></div>";
  }).join(""));
  set("about-education", (A.education || []).map(function (r) { return '<div class="row">' + r + "</div>"; }).join(""));
  set("about-languages", (A.languages || []).map(function (r) { return '<div class="row">' + r + "</div>"; }).join(""));

  var ER = S.earlier || {};
  set("earlier-text", (ER.text || "") + (ER.archiveUrl ? ' <a class="link" href="' + esc(ER.archiveUrl) + '" target="_blank" rel="noopener">View archive</a>' : ""));

  // ─── Contacts ───
  set("contacts", (S.contacts || []).map(function (c) {
    var ext = /^https?:/.test(c.url) ? ' target="_blank" rel="noopener"' : "";
    return '<div class="contact"><div class="contact-top"><span class="accent-small">' + c.label + "</span>" +
      '<a class="contact-value" href="' + esc(c.url) + '"' + ext + ">" + c.value + "</a></div>" +
      '<a class="button" href="' + esc(c.url) + '"' + ext + ">" + c.button + "</a></div>";
  }).join(""));
  var fl = [];
  if (P.cv) fl.push('<a class="link" href="' + esc(P.cv) + '" target="_blank" rel="noopener">Download CV</a>');
  if (P.imdb) fl.push('<a class="link" href="' + esc(P.imdb) + '" target="_blank" rel="noopener">IMDb</a>');
  if (ER.archiveUrl) fl.push('<a class="link" href="' + esc(ER.archiveUrl) + '" target="_blank" rel="noopener">Earlier work archive</a>');
  set("footer-links", fl.join(""));
  document.querySelectorAll(".cv-link").forEach(function (a) {
    if (P.cv) { a.href = P.cv; a.hidden = false; }
  });

  // ─── Looping videos: load near the viewport, play while visible ───
  var loops = document.querySelectorAll("video.loop");
  function load(v) { if (!v.getAttribute("src") && v.dataset.src) { v.src = v.dataset.src; } }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          load(v);
          if (!reduceMotion) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { rootMargin: "200px 0px", threshold: 0.15 });
    loops.forEach(function (v) { io.observe(v); });
  } else {
    loops.forEach(function (v) { load(v); if (!reduceMotion) v.play(); });
  }
  // With reduced motion, a tap plays or pauses a loop.
  if (reduceMotion) {
    loops.forEach(function (v) {
      v.tabIndex = 0;
      v.addEventListener("click", function () { load(v); if (v.paused) v.play(); else v.pause(); });
    });
  }

  // ─── YouTube player in a dialog ───
  var dlg = $("player"), frame = $("player-frame");
  function openPlayer(url) {
    var id = youtubeId(url);
    if (!id) { window.open(url, "_blank", "noopener"); return; }
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1" title="Video" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  }
  function closePlayer() {
    frame.innerHTML = "";
    if (dlg.open) { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-youtube]");
    if (b) { e.preventDefault(); openPlayer(b.getAttribute("data-youtube")); }
  });
  dlg.querySelector(".player-close").addEventListener("click", closePlayer);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closePlayer(); });
  dlg.addEventListener("close", function () { frame.innerHTML = ""; });

  // ─── Carousel arrows ───
  var ARROW_L = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  document.querySelectorAll(".carousel-controls").forEach(function (ctl) {
    var track = $(ctl.getAttribute("data-for"));
    if (!track) return;
    ctl.innerHTML = '<button type="button" class="arrow" aria-label="Scroll back">' + ARROW_L + "</button>" +
      '<button type="button" class="arrow" aria-label="Scroll forward">' + ARROW_R + "</button>";
    var btns = ctl.querySelectorAll("button");
    function step() {
      var first = track.firstElementChild;
      return first ? first.getBoundingClientRect().width + 24 : 300;
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      ctl.hidden = max <= 0;
      btns[0].disabled = track.scrollLeft <= 2;
      btns[1].disabled = track.scrollLeft >= max;
    }
    btns[0].addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }); });
    btns[1].addEventListener("click", function () { track.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
})();
