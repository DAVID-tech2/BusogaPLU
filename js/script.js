/* ============================================================
   BRPV — Busoga Region Patriotic Volunteers
   Vanilla JavaScript — no dependencies
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Config: edit nav + footer links in one place ---------- */
  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "leadership.html", label: "Leadership" },
    { href: "activities.html", label: "Activities" },
    { href: "districts.html", label: "Districts" },
    { href: "news.html", label: "News" },
    { href: "events.html", label: "Events" },
    { href: "gallery.html", label: "Gallery" },
    { href: "endorsement.html", label: "Endorse" }
  ];
  var NAV_FULL = NAV.concat([
    { href: "membership.html", label: "Join" },
    { href: "contact.html", label: "Contact" }
  ]);

  var SOCIALS = [
    { name: "Facebook", href: "#", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H8v3h3v6h3v-6h2.5l.5-3H14V9z"/></svg>' },
    { name: "X", href: "#", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3h3l-7 8 8 10h-6l-5-6-5 6H4l7-9L3 3h6l4 5 4-5z"/></svg>' },
    { name: "TikTok", href: "#", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2 1.5 3.6 3.5 4v3c-1.3 0-2.6-.3-3.5-.9V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3z"/></svg>' },
    { name: "Instagram", href: "#", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>' },
    { name: "YouTube", href: "#", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 8c-.3-1-1-2-2-2-2-.5-7-.5-7-.5s-5 0-7 .5c-1 0-1.7 1-2 2C2.5 10 2.5 12 2.5 12s0 2 .5 4c.3 1 1 2 2 2 2 .5 7 .5 7 .5s5 0 7-.5c1 0 1.7-1 2-2 .5-2 .5-4 .5-4s0-2-.5-4zM10 15V9l5 3-5 3z"/></svg>' },
    { name: "WhatsApp", href: "#", icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm0 2a7 7 0 0 1 5.8 10.9l-.3.4.5 1.8-1.9-.5-.4.2A7 7 0 1 1 12 5zm-2.8 4c-.2 0-.5 0-.7.3-.3.3-.8.8-.8 1.9s.8 2.2 1 2.4c.1.1 1.7 2.7 4.2 3.6 2 .8 2.4.6 2.9.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3c-.3-.2-1.5-.8-1.8-.8-.2 0-.4.1-.6.3l-.5.6c-.1.2-.3.2-.5.1-.6-.2-1.4-.6-2.2-1.4-.6-.5-1-1.2-1.2-1.4-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4z"/></svg>' }
  ];

  var LOGO_SVG = '<img class="brand-logo" src="assets/logo/IMG-20261002-WA0103.jpg">';

  /* ---------- Header injection ---------- */
  function activePage() {
    var p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function buildHeader() {
    var current = activePage();
    var navLinks = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="' + (n.href === current ? "active" : "") + '">' + n.label + "</a>";
    }).join("");
    var endorseActive = current === "endorsement.html" ? "active" : "";

    var html =
      '<div class="scroll-progress" id="scrollProgress"></div>'
      + '<header class="site-header" id="siteHeader">'
      + '<div class="container header-bar">'
      + '<a href="index.html" class="brand" aria-label="BRPV Home">'
      + LOGO_SVG
      + '<span class="brand-text"><span class="brand-name">BRPV</span>'
      + '<span class="brand-sub">Busoga Region Patriotic Volunteers</span></span>'
      + "</a>"
      + '<nav class="nav" aria-label="Primary">'
      + navLinks
      + '<a href="endorsement.html" class="btn btn--gold ' + endorseActive + '" style="margin-left:.4rem">Endorse</a>'
      + "</nav>"
      + '<div class="header-tools">'
      + '<button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" title="Toggle theme">'
      + '<span class="theme-icon">☀</span></button>'
      + '<button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false"><span></span></button>'
      + "</div>"
      + "</div>"
      + "</header>"
      + '<div class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">'
      + NAV_FULL.map(function (n) {
          return '<a href="' + n.href + '" class="' + (n.href === current ? "active" : "") + '">'
            + n.label + '<span class="chev">›</span></a>';
        }).join("")
      + '<a href="endorsement.html" class="btn btn--gold btn--block">Endorse</a>'
      + "</div>";

    var mount = document.getElementById("header-mount");
    if (mount) { mount.innerHTML = html; }
    else { document.body.insertAdjacentHTML("afterbegin", html); }
  }

  /* ---------- Footer injection ---------- */
  function buildFooter() {
    var year = new Date().getFullYear();
    var quick = NAV_FULL.map(function (n) {
      return '<li><a href="' + n.href + '">' + n.label + "</a></li>";
    }).join("");
    var soc = SOCIALS.map(function (s) {
      return '<a href="' + s.href + '" aria-label="' + s.name + '" target="_blank" rel="noopener">' + s.icon + "</a>";
    }).join("");

    var html =
      '<footer class="site-footer">'
      + '<div class="container">'
      + '<div class="footer-grid">'
      + '<div class="footer-about">'
      + '<a href="index.html" class="brand" style="color:#fff">'
      + LOGO_SVG
      + '<span class="brand-text"><span class="brand-name">BRPV</span>'
      + '<span class="brand-sub">Busoga Region Patriotic Volunteers</span></span></a>'
      + "<p>A Busoga-focused patriotic volunteer and mobilisation initiative associated with the Patriotic League of Uganda (PLU).</p>"
      + '<div class="socials">' + soc + "</div>"
      + "</div>"
      + '<div class="footer-col"><h4>Quick Links</h4><ul>' + quick + "</ul></div>"
      + '<div class="footer-col"><h4>Organisation</h4><ul>'
      + '<li><a href="about.html">About BRPV</a></li>'
      + '<li><a href="leadership.html">Leadership</a></li>'
      + '<li><a href="activities.html">Activities</a></li>'
      + '<li><a href="districts.html">Districts</a></li>'
      + '<li><a href="membership.html">Join BRPV</a></li>'
      + "</ul></div>"
      + '<div class="footer-col"><h4>Endorse</h4><ul>'
      + '<li><a href="endorsement.html">Endorsement Form</a></li>'
      + '<li><a href="privacy.html">Privacy Policy</a></li>'
      + '<li><a href="disclaimer.html">Disclaimer</a></li>'
      + '<li><a href="contact.html">Contact</a></li>'
      + "</ul></div>"
      + "</div>"
      + '<div class="footer-bottom">'
      + "<span>© " + year + ' Busoga Region Patriotic Volunteers. All rights reserved.Developed by Aklon.</span>'
      + '<div class="footer-bottom-links">'
      + '<a href="privacy.html">Privacy Policy</a>'
      + '<a href="disclaimer.html">Disclaimer</a>'
      + "</div>"
      + "</div>"
      + "</div>"
      + "</footer>"
      + '<button class="to-top" id="toTop" aria-label="Back to top">↑</button>';

    var fm = document.getElementById("footer-mount");
    if (fm) { fm.innerHTML = html; }
    else { document.body.insertAdjacentHTML("beforeend", html); }
  }

  /* ---------- Theme toggle (persist UI pref only) ---------- */
  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem("brpv-theme"); } catch (e) {}
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(theme);
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var cur = document.documentElement.getAttribute("data-theme") || "light";
        var next = cur === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem("brpv-theme", next); } catch (e) {}
      });
    }
  }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var ic = document.querySelector(".theme-icon");
    if (ic) ic.textContent = t === "dark" ? "☾" : "☀";
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var btn = document.getElementById("menuBtn");
    var nav = document.getElementById("mobileNav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        document.body.classList.remove("menu-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll effects: progress + header + back-to-top ---------- */
  function initScroll() {
    var header = document.getElementById("siteHeader");
    var prog = document.getElementById("scrollProgress");
    var toTop = document.getElementById("toTop");
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (header) header.classList.toggle("scrolled", y > 8);
      if (toTop) toTop.classList.toggle("show", y > 500);
      if (prog) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Toast ---------- */
  function toast(type, title, msg) {
    var wrap = document.querySelector(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    var el = document.createElement("div");
    el.className = "toast toast--" + (type || "success");
    var ico = type === "error"
      ? '<svg class="ti" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>'
      : '<svg class="ti" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    el.innerHTML = ico + '<div><div class="tt">' + title + "</div><div class=\"tm\">" + msg + "</div></div>";
    wrap.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 400);
    }, 4800);
  }

  /* ---------- Form validation helper ---------- */
  function setError(field, msg) {
    var f = field.closest(".field");
    if (!f) return;
    f.classList.add("invalid");
    var e = f.querySelector(".error");
    if (e && msg) e.textContent = msg;
  }
  function clearError(field) { var f = field.closest(".field"); if (f) f.classList.remove("invalid"); }

  function validateField(field) {
    if (!field.required) { return true; }
    var ok = true;
    if (field.type === "checkbox") {
      ok = field.checked;
      if (!ok) setError(field, "Please confirm to continue.");
    } else if (field.value && field.value.trim() === "") {
      ok = false; setError(field, "This field is required.");
    } else if (!field.value && field.hasAttribute("required")) {
      ok = false; setError(field, "This field is required.");
    } else {
      clearError(field);
    }
    return ok;
  }

  function validateForm(form) {
    var fields = form.querySelectorAll("[required]");
    var valid = true;
    fields.forEach(function (f) {
      f.addEventListener("input", function () { clearError(f); });
      if (!validateField(f)) valid = false;
    });
    return valid;
  }

  /* ---------- Endorsement form (NIN sensitive — never stored/logged) ---------- */
  function initEndorseForm() {
    var form = document.getElementById("endorseForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll("[required]");
      var valid = true;
      fields.forEach(function (f) { if (!validateField(f)) valid = false; });

      var nin = form.querySelector("#nin");
      if (nin && nin.value) {
        var v = nin.value.trim();
        if (v.length < 8) { setError(nin, "Please enter a valid National Identification Number."); valid = false; }
      }

      if (!valid) {
        toast("error", "Please check the form", "Some required fields need your attention.");
        return;
      }

      var btn = form.querySelector("[type=submit]");
      var orig = btn.textContent;
      btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Submitting…';

      // Endpoint placeholder — replace with real Formspree endpoint
      var endpoint = form.getAttribute("action");
      var isPlaceholder = !endpoint || endpoint.indexOf("FORMSPREE_ENDPOINT_PLACEHOLDER") !== -1;

      if (isPlaceholder) {
        // Demo mode: do not transmit. Show success state.
        setTimeout(function () {
          showEndorseSuccess();
          form.reset();
          btn.disabled = false; btn.textContent = orig;
        }, 900);
        return;
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
      .then(function (r) { if (!r.ok) throw new Error("net"); return r.json(); })
      .then(function () {
        showEndorseSuccess();
        form.reset();
        btn.disabled = false; btn.textContent = orig;
      })
      .catch(function () {
        toast("error", "Submission failed", "Your submission could not be completed. Please check your information and try again.");
        btn.disabled = false; btn.textContent = orig;
      });
    });
  }

  function showEndorseSuccess() {
    var box = document.getElementById("endorseSuccess");
    if (!box) { toast("success", "Endorsement Submitted", "Thank you. Your endorsement has been submitted successfully."); return; }
    var form = document.getElementById("endorseForm");
    if (form) form.classList.add("hide");
    box.classList.remove("hide");
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  window.brpvShowEndorse = showEndorseSuccess;

  /* ---------- Generic membership form (same pattern) ---------- */
  function initMembershipForm() {
    var form = document.getElementById("membershipForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) {
        toast("error", "Please check the form", "Some required fields need your attention.");
        return;
      }
      var btn = form.querySelector("[type=submit]");
      var orig = btn.textContent;
      btn.disabled = true; btn.textContent = "Submitting…";
      var endpoint = form.getAttribute("action");
      var isPlaceholder = !endpoint || endpoint.indexOf("MEMBERSHIP_FORMSPREE_ENDPOINT_PLACEHOLDER") !== -1;
      if (isPlaceholder) {
        setTimeout(function () {
          toast("success", "Application Received", "Thank you for applying to join BRPV. We will be in touch.");
          form.reset(); btn.disabled = false; btn.textContent = orig;
        }, 800);
        return;
      }
      fetch(endpoint, { method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw new Error("net"); return r.json(); })
        .then(function () {
          toast("success", "Application Received", "Thank you for applying to join BRPV. We will be in touch.");
          form.reset(); btn.disabled = false; btn.textContent = orig;
        })
        .catch(function () {
          toast("error", "Submission failed", "Please try again later.");
          btn.disabled = false; btn.textContent = orig;
        });
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) { toast("error", "Please check the form", "Some required fields need attention."); return; }
      toast("success", "Message Sent", "Thank you for contacting BRPV. We will respond to your enquiry.");
      form.reset();
    });
  }

  /* ---------- Generic filter system (data-filter attr on chips) ---------- */
  function initFilters(groupId, itemSelector) {
    var group = document.getElementById(groupId);
    if (!group) return;
    var chips = group.querySelectorAll(".chip");
    var items = document.querySelectorAll(itemSelector);
    var search = group.querySelector(".search-wrap input");

    function apply() {
      var activeChip = group.querySelector(".chip.active");
      var cat = activeChip ? activeChip.getAttribute("data-filter") : "all";
      var q = search ? search.value.trim().toLowerCase() : "";
      var visible = 0;
      items.forEach(function (it) {
        var itCat = it.getAttribute("data-cat") || "";
        var text = (it.textContent || "").toLowerCase();
        var catOk = cat === "all" || itCat.indexOf(cat) !== -1;
        var qOk = !q || text.indexOf(q) !== -1;
        if (catOk && qOk) { it.classList.remove("hide"); visible++; }
        else it.classList.add("hide");
      });
      var nr = document.getElementById(groupId + "-empty");
      if (nr) nr.classList.toggle("show", visible === 0);
    }

    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        chips.forEach(function (x) { x.classList.remove("active"); });
        c.classList.add("active");
        apply();
      });
    });
    if (search) search.addEventListener("input", apply);
  }

  /* ---------- Gallery lightbox ---------- */
  var lbIndex = 0; var lbItems = [];
  function initGallery() {
    var grid = document.querySelector(".gallery-grid");
    if (!grid) return;
    var items = grid.querySelectorAll(".gallery-item");
    lbItems = Array.prototype.map.call(items, function (it) {
      var img = it.querySelector("img");
      return { src: img.getAttribute("data-full") || img.src, cap: it.querySelector(".gallery-cap") ? it.querySelector(".gallery-cap").textContent : (img.alt || "") };
    });
    items.forEach(function (it, i) {
      it.addEventListener("click", function () { openLightbox(i); });
    });

    if (!document.getElementById("lightbox")) {
      var lb = document.createElement("div");
      lb.id = "lightbox"; lb.className = "lightbox";
      lb.innerHTML = '<button class="lightbox-close" aria-label="Close">×</button>'
        + '<button class="lightbox-nav prev" aria-label="Previous">‹</button>'
        + '<img alt="" id="lbImg">'
        + '<button class="lightbox-nav next" aria-label="Next">›</button>'
        + '<div class="lightbox-cap" id="lbCap"></div>';
      document.body.appendChild(lb);
      lb.addEventListener("click", function (e) {
        if (e.target === lb || e.target.classList.contains("lightbox-close")) closeLightbox();
        if (e.target.classList.contains("prev")) navLightbox(-1);
        if (e.target.classList.contains("next")) navLightbox(1);
      });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navLightbox(-1);
        if (e.key === "ArrowRight") navLightbox(1);
      });
    }
  }
  function openLightbox(i) { lbIndex = i; renderLightbox(); document.getElementById("lightbox").classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeLightbox() { document.getElementById("lightbox").classList.remove("open"); document.body.style.overflow = ""; }
  function navLightbox(d) { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; renderLightbox(); }
  function renderLightbox() {
    var it = lbItems[lbIndex];
    document.getElementById("lbImg").src = it.src;
    document.getElementById("lbImg").alt = it.cap;
    document.getElementById("lbCap").textContent = it.cap;
  }

  /* ---------- Accordion ---------- */
  function initAccordion() {
    document.querySelectorAll(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        var item = head.closest(".acc-item");
        var body = item.querySelector(".acc-body");
        var open = item.classList.contains("open");
        if (open) {
          item.classList.remove("open");
          body.style.maxHeight = "0";
        } else {
          item.classList.add("open");
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    initTheme();
    initMenu();
    initScroll();
    initReveal();
    initEndorseForm();
    initMembershipForm();
    initContactForm();
    initGallery();
    initAccordion();

    // Page-specific filters
    initFilters("districtFilters", ".district-card");
    initFilters("newsFilters", ".news-card");
    initFilters("eventsFilters", ".event-card");
    initFilters("galleryFilters", ".gallery-item");
    initFilters("activitiesFilters", ".activity-card");

    // live field error clearing
    document.querySelectorAll(".field input, .field select, .field textarea").forEach(function (f) {
      f.addEventListener("input", function () { clearError(f); });
      f.addEventListener("change", function () { clearError(f); });
    });
  });
})();
