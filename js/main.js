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
  var ft = $("factories-text");
  if (ft && FA.text) { ft.innerHTML = FA.text; ft.hidden = false; }
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
  var links = (S.contacts || []).slice();
  if (P.imdb) links.push({ text: "IMDb", url: P.imdb });
  set("footer-links", links.map(function (c) {
    var ext = /^https?:/.test(c.url) ? ' target="_blank" rel="noopener"' : "";
    return '<a href="' + esc(c.url) + '"' + ext + ">" + (c.text || c.value || c.label) + "</a>";
  }).join(""));
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
  // Uses the official YouTube IFrame API, so if a video can't be embedded
  // the viewer sees a clear message and a direct link instead of a blank frame.
  var dlg = $("player"), frame = $("player-frame"), ytPlayer = null, ytQueue = [];
  function loadYT(cb) {
    if (window.YT && window.YT.Player) { cb(); return; }
    ytQueue.push(cb);
    if (ytQueue.length > 1) return;
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (prev) prev();
      var q = ytQueue; ytQueue = []; q.forEach(function (f) { f(); });
    };
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onerror = function () { var q = ytQueue; ytQueue = []; q.forEach(function (f) { f(true); }); };
    document.head.appendChild(tag);
  }
  function showFallback(id, reason) {
    var box = frame.querySelector(".player-fallback");
    if (!box) return;
    box.innerHTML = reason + ' <a href="https://www.youtube.com/watch?v=' + id + '" target="_blank" rel="noopener">Watch on YouTube</a>';
    box.hidden = false;
  }
  function openPlayer(url) {
    var id = youtubeId(url);
    if (!id) { window.open(url, "_blank", "noopener"); return; }
    frame.innerHTML = '<div class="player-screen"><div id="yt-player"></div><p class="player-fallback" hidden></p></div>' +
      '<a class="player-yt" href="https://www.youtube.com/watch?v=' + id + '" target="_blank" rel="noopener">Open on YouTube</a>';
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    loadYT(function (failed) {
      if (failed || !dlg.open) {
        if (failed) showFallback(id, "The video player could not load here.");
        return;
      }
      ytPlayer = new YT.Player("yt-player", {
        videoId: id,
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, rel: 0, playsinline: 1, origin: window.location.origin },
        events: {
          onError: function (e) {
            var embedOff = e.data === 101 || e.data === 150 || e.data === 153;
            showFallback(id, embedOff ? "This video can’t be played on other websites." : "This video can’t be played here right now.");
          }
        }
      });
    });
  }
  function clearPlayer() {
    if (ytPlayer && ytPlayer.destroy) { try { ytPlayer.destroy(); } catch (err) {} }
    ytPlayer = null;
    frame.innerHTML = "";
  }
  function closePlayer() {
    clearPlayer();
    if (dlg.open) { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-youtube]");
    if (b) { e.preventDefault(); openPlayer(b.getAttribute("data-youtube")); }
  });
  dlg.querySelector(".player-close").addEventListener("click", closePlayer);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closePlayer(); });
  dlg.addEventListener("close", clearPlayer);

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

  // ─── Scroll reveals and counters (skipped when reduced motion is on) ───
  if (!document.documentElement.classList.contains("js-anim")) return;

  function mark(selector, cls, stepMs) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add(cls);
      if (stepMs) el.style.setProperty("--d", (i * stepMs) + "ms");
    });
  }
  // Single elements that slide up as they enter the screen.
  [".meta-row", ".flagship-title", ".flagship-info", "#flagship-media", ".section-head",
   ".factories-head > *", ".channels-bar", ".skills-intro", ".about-statement",
   ".about-right .list-block", ".earlier > *", ".footer-title", ".footer-bar"].forEach(function (sel) {
    mark(sel, "reveal");
  });
  // Lines that follow each other.
  mark(".manifesto-title > span", "reveal", 110);
  mark(".manifesto-note", "reveal");
  mark(".skills-title > span", "reveal", 110);
  mark(".tool-groups > .list-block", "reveal", 90);
  // Groups whose children appear one after another.
  document.querySelectorAll(".track, .hybrid-grid, .stats, .gen-grid").forEach(function (g) {
    g.classList.add("stagger");
    Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--i", Math.min(i, 6)); });
  });

  // Numbers count up from zero the first time they appear.
  function countUp(el) {
    var final = el.textContent;
    var m = final.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
    if (!m) return;
    var target = parseFloat(m[2].replace(",", ".")), decimals = (m[2].split(/[.,]/)[1] || "").length;
    var t0 = null, dur = 1200;
    function frame(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
      el.textContent = m[1] + (target * eased).toFixed(decimals) + m[3];
      if (k < 1) requestAnimationFrame(frame); else el.textContent = final;
    }
    requestAnimationFrame(frame);
  }

  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add("is-in");
      if (el.classList.contains("stats")) el.querySelectorAll(".stat-value").forEach(countUp);
      if (el.id === "ecom-number") countUp(el);
      seen.unobserve(el);
    });
  }, { rootMargin: "0px 0px -5% 0px", threshold: 0.08 });
  var watched = document.querySelectorAll(".reveal, .stagger, #ecom-number, .manifesto-title > span");
  watched.forEach(function (el) { seen.observe(el); });
  // At the very bottom of the page nothing can scroll further into view, so show what is left.
  window.addEventListener("scroll", function () {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      watched.forEach(function (el) { if (!el.classList.contains("is-in")) { el.classList.add("is-in"); seen.unobserve(el); } });
    }
  }, { passive: true });
})();
