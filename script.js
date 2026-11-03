(function () {
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  // Solid nav once the hero is scrolled past the top.
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu.
  function setOpen(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close the menu' : 'Open the menu');
  }
  burger.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: crossfade every 6.5 seconds. The first slide stays put when motion is reduced.
  var slides = document.querySelectorAll('.slide');
  if (!reduce && slides.length > 1) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-on');
    }, 6500);
  }

  // Sections ease in as they scroll into view.
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.head, .card, .masonry figure, .about-ph, .about-copy, .review, .qs details, .c-info, .c-cta, .stat');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { t.classList.add('reveal'); io.observe(t); });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
