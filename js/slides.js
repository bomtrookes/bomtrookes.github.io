(function () {
  var track = document.querySelector('.slides');
  if (!track) return;

  var slides = Array.prototype.slice.call(track.querySelectorAll('.slide'));
  var prev = document.querySelector('[data-prev]');
  var next = document.querySelector('[data-next]');
  var current = document.querySelector('.counter .current');
  var total = document.querySelector('.counter .total');
  var dotsWrap = document.querySelector('.dots');
  var index = 0;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  slides.forEach(function (slide, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap.querySelectorAll('button');
  total.textContent = '/ ' + pad(slides.length);

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
  }

  function update() {
    index = Math.round(track.scrollLeft / track.clientWidth);
    current.textContent = pad(index + 1);
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    dots.forEach(function (d, i) { d.setAttribute('aria-current', i === index ? 'true' : 'false'); });
    var id = slides[index].id;
    if (id && location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
  }

  prev.addEventListener('click', function () { goTo(index - 1); });
  next.addEventListener('click', function () { goTo(index + 1); });
  track.addEventListener('scroll', function () { window.requestAnimationFrame(update); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goTo(index + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goTo(index - 1); }
    if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1); }
  });

  var locked = false;
  track.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    var s = slides[index];
    if (s.scrollHeight > s.clientHeight + 2) return;
    e.preventDefault();
    if (locked || Math.abs(e.deltaY) < 4) return;
    locked = true;
    goTo(index + (e.deltaY > 0 ? 1 : -1));
    setTimeout(function () { locked = false; }, 650);
  }, { passive: false });

  if (location.hash) {
    var start = slides.findIndex(function (s) { return '#' + s.id === location.hash; });
    if (start > 0) track.scrollLeft = slides[start].offsetLeft;
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && slides.length > 1 && track.scrollLeft === 0) {
    setTimeout(function () {
      if (track.scrollLeft !== 0) return;
      track.classList.add('nudge');
      slides[0].addEventListener('animationend', function () { track.classList.remove('nudge'); }, { once: true });
    }, 700);
  }

  window.addEventListener('resize', function () { track.scrollLeft = slides[index].offsetLeft; });
  update();
})();
