/* Bubble Truck Window Cleaning — homepage interactions */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Sticky header shadow ─────────────────────────────── */
  var header = document.querySelector('.header');
  var onScrollHeader = function () {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  /* ── Back to top button ───────────────────────────────── */
  var backToTop = document.getElementById('backToTop');
  var onScrollTop = function () {
    if (!backToTop) return;
    backToTop.classList.toggle('is-visible', window.scrollY > 480);
  };

  var ticking = false;
  var onScroll = function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScrollHeader();
      onScrollTop();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScrollHeader();
  onScrollTop();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ── Mobile navigation ────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var panel = document.getElementById('mobile-panel');

  var setMenu = function (open) {
    if (!hamburger || !panel) return;
    hamburger.setAttribute('aria-expanded', String(open));
    if (open) {
      panel.hidden = false;
      document.body.style.overflow = 'hidden';
    } else {
      panel.hidden = true;
      document.body.style.overflow = '';
    }
  };

  if (hamburger && panel) {
    hamburger.addEventListener('click', function () {
      var open = hamburger.getAttribute('aria-expanded') === 'true';
      setMenu(!open);
    });
    panel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });
    document.addEventListener('click', function (event) {
      if (hamburger.getAttribute('aria-expanded') === 'true' &&
          !event.target.closest('.header')) {
        setMenu(false);
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 992) setMenu(false);
    });
  }

  /* ── Google reviews carousel ──────────────────────────── */
  var REVIEWS = [
    { name: 'Gary Ohrt', date: 'Sep 26, 2026', text: 'Adam and Kelly were in time and did a great job at our home. I recommend them to anyone who needs a good window cleaning service.' },
    { name: 'Steven Blomquist', date: 'Sep 23, 2026', text: 'Well done! Even scrapped the paint overspray from the interior! See ya next year.' },
    { name: 'Philip Chiappini', date: 'Sep 22, 2026', text: 'They did a great job. Very clear communication and excellent work.' },
    { name: 'Toshiko Watson', date: 'Sep 17, 2026', text: 'Adam and Kelly did a wonderful job cleaning our windows and screens. They were quick and yet thorough. We\'ll definitely have them back in a few months.' },
    { name: 'Karen Wylie', date: 'Sep 17, 2026', text: 'Adam and Kelly were great to work with. It was easy to make an appointment, they were prompt and efficient and the windows look great. The best compliment I can give is that this is the third year in a row we\'ve had them come back because I love their work!' },
    { name: 'Rachel Silva', date: 'Sep 17, 2026', text: 'We are really enjoying our clean windows! Good communication and great service.' },
    { name: 'Christine K', date: 'Sep 12, 2026', text: 'Love the Bubbletrucks… and my windows are all super clean again.' },
    { name: 'Lucy R', date: 'Sep 10, 2026', text: 'Very sparkly windows. Looks terrific. Another satisfied customer!' },
    { name: 'Dave Valenti', date: 'Sep 8, 2026', text: 'I\'ve used Bubble Truck Window Cleaning for years always great work and friendly personalities always a pleasure to work with.' },
    { name: 'David Kline', date: 'Aug 27, 2026', text: 'I am so happy with the work they did! Our windows have never look so good, so clear, so clean. They showed up on time, incredibly professional, and still very personable working as a team to do all of our windows and our skylights. It\'s been a couple of weeks and the windows still look great. I would highly recommend the bubble truck window cleaning service to everyone.' }
  ];

  var STAR = '<svg viewBox="0 0 24 24" width="15" height="15" fill="#f6b93b" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01z"/></svg>';
  var GOOGLE_G = '<svg viewBox="0 0 48 48" width="13" height="13" aria-hidden="true"><path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

  var escapeHtml = function (str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };

  var track = document.getElementById('reviewsTrack');
  if (track) {
    track.innerHTML = REVIEWS.map(function (review, index) {
      var initial = escapeHtml(review.name.charAt(0).toUpperCase());
      var avatarClass = index % 3 === 1 ? 'review-card__avatar review-card__avatar--accent' : 'review-card__avatar';
      var stars = STAR + STAR + STAR + STAR + STAR;
      return (
        '<article class="review-card" aria-label="Review by ' + escapeHtml(review.name) + '">' +
          '<div class="review-card__top">' +
            '<span class="' + avatarClass + '" aria-hidden="true">' + initial + '</span>' +
            '<span><span class="review-card__name">' + escapeHtml(review.name) + '</span><br />' +
            '<span class="review-card__date">' + escapeHtml(review.date) + ' · Posted on Google</span></span>' +
          '</div>' +
          '<div class="review-card__stars" role="img" aria-label="5 out of 5 stars">' + stars + '</div>' +
          '<p class="review-card__text">' + escapeHtml(review.text) + '</p>' +
          '<span class="review-card__src">' + GOOGLE_G + 'Verified by Trustindex</span>' +
        '</article>'
      );
    }).join('');

    var prevBtn = document.querySelector('.reviews__nav--prev');
    var nextBtn = document.querySelector('.reviews__nav--next');
    var cardStep = function () {
      var card = track.querySelector('.review-card');
      if (!card) return 340;
      return card.getBoundingClientRect().width + 18;
    };
    if (prevBtn) prevBtn.addEventListener('click', function () { track.scrollBy({ left: -cardStep(), behavior: 'smooth' }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { track.scrollBy({ left: cardStep(), behavior: 'smooth' }); });

    if (!prefersReducedMotion) {
      var autoTimer = null;
      var startAuto = function () {
        stopAuto();
        autoTimer = window.setInterval(function () {
          var maxScroll = track.scrollWidth - track.clientWidth - 8;
          if (track.scrollLeft >= maxScroll) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            track.scrollBy({ left: cardStep(), behavior: 'smooth' });
          }
        }, 5000);
      };
      var stopAuto = function () { if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; } };
      track.addEventListener('mouseenter', stopAuto);
      track.addEventListener('mouseleave', startAuto);
      track.addEventListener('focusin', stopAuto);
      track.addEventListener('focusout', startAuto);
      track.addEventListener('touchstart', stopAuto, { passive: true });
      startAuto();
    }
  }

  /* ── Animated counters ───────────────────────────────── */
  var counters = document.querySelectorAll('.counter');
  if (counters.length) {
    var animateCounter = function (el) {
      var target = parseFloat(el.getAttribute('data-target') || '0');
      var suffix = el.getAttribute('data-suffix') || '';
      var useComma = el.getAttribute('data-comma') === 'true';
      var duration = 1400;
      if (prefersReducedMotion) { el.textContent = (useComma ? target.toLocaleString() : target) + suffix; return; }
      var start = null;
      var step = function (timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(2, -10 * progress);
        if (progress === 1) eased = 1;
        var value = Math.round(target * eased);
        el.textContent = (useComma ? value.toLocaleString() : value) + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { io.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ── Footer year ──────────────────────────────────────── */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
