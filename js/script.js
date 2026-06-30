(function () {
  'use strict';

  /* ---------- Hamburger side menu ---------- */
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var closeMenuBtn = document.getElementById('close-menu-btn');
  var sideMenu = document.getElementById('side-menu');
  var menuOverlay = document.getElementById('menu-overlay');

  function openMenu() {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('visible');
    sideMenu.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('visible');
    sideMenu.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', function () {
    sideMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  closeMenuBtn.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); closeAllModals(); }
  });
  sideMenu.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Modals (Log In) ---------- */
  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function closeAllModals() {
    document.querySelectorAll('.modal.open').forEach(function (m) {
      closeModal(m.id);
    });
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      closeMenu();
      openModal(el.getAttribute('data-open-modal'));
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', function () {
      closeModal(el.getAttribute('data-close-modal'));
    });
  });
  document.querySelectorAll('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal(modal.id);
    });
  });

  /* ---------- Forms (front-end only demo) ---------- */
  var contactForm = document.getElementById('contact-form');
  var formSuccess = document.getElementById('form-success');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formSuccess.hidden = false;
      contactForm.reset();
    });
  }

  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      closeModal('login-modal');
      loginForm.reset();
    });
  }

  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector('input');
      input.value = '';
      input.placeholder = 'Thank you for subscribing!';
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header shrink-on-scroll ---------- */
  var header = document.getElementById('site-header');
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    header.style.boxShadow = y > 20 ? '0 8px 24px rgba(0,0,0,0.35)' : 'none';
    lastScroll = y;
  }, { passive: true });

  /* ---------- Gold sparkle canvas ---------- */
  var canvas = document.getElementById('sparkle-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ctx = canvas.getContext('2d');
    var sparkles = [];
    var W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function makeSparkle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005,
        drift: (Math.random() - 0.5) * 0.08
      };
    }

    var COUNT = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 9000));
    for (var i = 0; i < COUNT; i++) sparkles.push(makeSparkle());

    var t = 0;
    function tick() {
      t += 1;
      ctx.clearRect(0, 0, W, H);
      for (var j = 0; j < sparkles.length; j++) {
        var s = sparkles[j];
        var alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        s.y += s.drift;
        if (s.y > H) s.y = 0;
        if (s.y < 0) s.y = H;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(243, 215, 132, ' + alpha.toFixed(3) + ')';
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
