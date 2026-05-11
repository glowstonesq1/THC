/* ── Register GSAP plugins ────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ── Custom Cursor ───────────────────────────── */
(function () {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  window.addEventListener('mousemove', e => {
    gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.06, ease: 'none' });
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.38, ease: 'power2.out' });
  });

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(ring, { scale: 1.8, borderColor: '#feb737', duration: 0.28 });
      gsap.to(dot,  { scale: 0, duration: 0.28 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(ring, { scale: 1, borderColor: '#543787', duration: 0.28 });
      gsap.to(dot,  { scale: 1, duration: 0.28 });
    });
  });
})();

/* ── Navbar ──────────────────────────────────── */
(function () {
  const nav  = document.getElementById('navbar');
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');

  // Entrance
  gsap.fromTo(nav,
    { yPercent: -100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
  );

  // Scroll shrink
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile toggle
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    menu.classList.remove('open');
  }));
})();

/* ── Hero ────────────────────────────────────── */
(function () {
  const lines = document.querySelectorAll('.hero-heading .line-inner');
  const badge = document.querySelector('.hero-badge');
  const sub   = document.querySelector('.hero-sub');
  const cta   = document.querySelector('.hero-cta');
  const img   = document.querySelector('.hero-bg');
  const si    = document.querySelector('.scroll-indicator');

  const tl = gsap.timeline({ delay: 0.9 });
  tl.to(badge, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to(lines,  { y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
    .to(sub,    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.55')
    .to(cta,    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45')
    .to(si,     { opacity: 1, duration: 0.5 }, '-=0.3');

  // Image reveal
  if (img) {
    gsap.to(img, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.3, ease: 'power3.inOut', delay: 1.1 });
  }

  // Parallax
  const hero    = document.getElementById('hero');
  const overlay = document.querySelector('.hero-overlay');
  ScrollTrigger.create({
    trigger: hero, start: 'top top', end: 'bottom top', scrub: true,
    onUpdate(self) {
      if (img) gsap.set(img, { yPercent: self.progress * 18 });
      if (overlay) gsap.set(overlay, { opacity: self.progress * 0.45 });
    }
  });
})();

/* ── Marquee fade-in ─────────────────────────── */
gsap.to('#marquee', {
  opacity: 1, duration: 0.8,
  scrollTrigger: { trigger: '#marquee', start: 'top 92%' }
});

/* ── About ───────────────────────────────────── */
(function () {
  // Heading split
  const heading = document.querySelector('.about-heading');
  if (heading) {
    // simple line split
    const text = heading.innerHTML;
    heading.innerHTML = text;
    gsap.from(heading, {
      opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: heading, start: 'top 80%' }
    });
  }

  // Image reveal
  gsap.to('.about-img', {
    clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.3, ease: 'power3.inOut',
    scrollTrigger: { trigger: '.about-img', start: 'top 80%' }
  });

  // Text paragraphs
  gsap.to('.about-text p', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15,
    scrollTrigger: { trigger: '.about-text', start: 'top 78%' }
  });

  // Stat count-up
  document.querySelectorAll('.stat-count').forEach(el => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    gsap.fromTo({ val: 0 }, { val: 0 }, {
      val: target, duration: 1.6, ease: 'power2.out',
      onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suffix; },
      scrollTrigger: { trigger: '.about-stats', start: 'top 82%', once: true }
    });
  });

  // Philosophy cards
  gsap.from('.philosophy-card', {
    opacity: 0, y: 32, duration: 0.7, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '.philosophy-grid', start: 'top 78%' }
  });
})();

/* ── Manifesto horizontal scroll ────────────── */
(function () {
  const pin   = document.querySelector('.manifesto-pin');
  const track = document.querySelector('.manifesto-track');
  if (!pin || !track) return;

  const intro = document.querySelector('.manifesto-intro');
  gsap.from(intro, {
    opacity: 0, y: 40, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: intro, start: 'top 82%' }
  });

  const getDistance = () => track.scrollWidth - pin.offsetWidth;

  ScrollTrigger.create({
    trigger: pin,
    start: 'top top',
    end: () => `+=${getDistance() + 200}`,
    pin: true,
    scrub: 1.5,
    anticipatePin: 1,
    onUpdate(self) {
      gsap.set(track, { x: -self.progress * getDistance() });
    }
  });
})();

/* ── Trips ───────────────────────────────────── */
(function () {
  const container = document.getElementById('trips-grid');
  const emptyMsg  = document.getElementById('trips-empty');
  const filters   = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  function spotBar(trip) {
    if (trip.status === 'past') return '';
    const pct    = ((trip.spotsTotal - trip.spotsAvailable) / trip.spotsTotal) * 100;
    const reqPct = (trip.spotsRequired / trip.spotsTotal) * 100;
    const label  = trip.spotsAvailable === 0
      ? 'SOLD OUT'
      : `${trip.spotsAvailable} of ${trip.spotsTotal} spots left`;
    return `
      <div class="spot-bar-wrap">
        <div class="spot-bar-label">
          <span>${label}</span>
          <span>Min ${trip.spotsRequired} needed</span>
        </div>
        <div class="spot-bar-track">
          <div class="spot-bar-fill" style="width:${pct}%"></div>
          <div class="spot-bar-min" style="left:${reqPct}%"></div>
        </div>
        <div class="spot-bar-ends"><span>0</span><span>${trip.spotsTotal}</span></div>
      </div>`;
  }

  function catBadge(cat) {
    if (cat === 'young-wild') return '<span class="trip-cat-badge cat-yw">Young & Wild</span>';
    if (cat === 'old-wise')   return '<span class="trip-cat-badge cat-ow">Old & Wise</span>';
    return '<span class="trip-cat-badge cat-all">All Ages</span>';
  }

  function statusBadge(status) {
    const map = { upcoming:'status-upcoming', open:'status-open', full:'status-full' };
    const labels = { upcoming:'Filling Up', open:'Open', full:'Sold Out' };
    return `<span class="trip-status-badge ${map[status]||''}">${labels[status]||''}</span>`;
  }

  function renderTrips() {
    const trips = getTrips().filter(t => t.status !== 'past');
    const filtered = activeFilter === 'all'
      ? trips
      : trips.filter(t => t.category === activeFilter || t.category === 'all');

    container.innerHTML = '';
    if (!filtered.length) {
      emptyMsg.style.display = 'block';
      return;
    }
    emptyMsg.style.display = 'none';

    filtered.forEach(trip => {
      const card = document.createElement('div');
      card.className = 'trip-card';
      card.innerHTML = `
        <div class="trip-card-img">
          <div class="img-placeholder">${trip.destination}</div>
          <div class="trip-badge-row">
            ${catBadge(trip.category)}
            ${statusBadge(trip.status)}
          </div>
        </div>
        <div class="trip-body">
          <div class="trip-title-row">
            <h3 class="trip-title">${trip.title}</h3>
            <span class="trip-price">${trip.price}</span>
          </div>
          <p class="trip-dest">${trip.destination}</p>
          <p class="trip-tagline">"${trip.tagline}"</p>
          <p class="trip-desc">${trip.description}</p>
          <div class="trip-highlights">
            ${trip.highlights.slice(0,3).map(h=>`<span class="trip-hl">${h}</span>`).join('')}
            ${trip.highlights.length>3?`<span class="trip-hl">+${trip.highlights.length-3}</span>`:''}
          </div>
          <div class="trip-meta">
            <span>${trip.dates}</span><span>${trip.duration}</span>
          </div>
          ${spotBar(trip)}
          ${trip.status!=='full'
            ? `<a href="#contact" class="btn-primary" style="width:100%;margin-top:12px;">Request to Join</a>`
            : `<a href="#contact" class="btn-outline" style="width:100%;margin-top:12px;opacity:.7;">Join Waitlist</a>`
          }
        </div>`;
      container.appendChild(card);
    });

    // Animate in
    gsap.fromTo('.trip-card',
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: container, start: 'top 85%' } }
    );
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderTrips();
    });
  });

  renderTrips();

  // Heading
  gsap.from('#trips h2', {
    opacity: 0, y: 40, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '#trips h2', start: 'top 82%' }
  });
})();

/* ── Past Trips ──────────────────────────────── */
(function () {
  const listEl   = document.getElementById('past-list');
  const preview  = document.getElementById('past-preview');
  const trips    = getTrips().filter(t => t.status === 'past');
  let active     = trips[0] || null;

  function catClass(cat) {
    if (cat==='young-wild') return 'past-cat-yw';
    if (cat==='old-wise')   return 'past-cat-ow';
    return 'past-cat-all';
  }
  function catLabel(cat) {
    if (cat==='young-wild') return 'Young & Wild';
    if (cat==='old-wise')   return 'Old & Wise';
    return 'All Ages';
  }

  function renderList() {
    listEl.innerHTML = '';
    trips.forEach(trip => {
      const item = document.createElement('div');
      item.className = 'past-item' + (active?.id === trip.id ? ' active' : '');
      item.innerHTML = `
        <div class="past-item-left">
          <div class="past-item-meta">
            <div class="past-dot"></div>
            <span class="past-date">${trip.dates}</span>
          </div>
          <h3 class="past-title">${trip.title}</h3>
          <p class="past-dest-sm">${trip.destination}</p>
        </div>
        <div class="past-item-right">
          <div class="past-duration">${trip.duration}</div>
          <div class="past-cat ${catClass(trip.category)}">${catLabel(trip.category)}</div>
        </div>`;
      item.addEventListener('click', () => selectTrip(trip));
      listEl.appendChild(item);
    });

    gsap.fromTo('.past-item',
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: listEl, start: 'top 75%' } }
    );
  }

  function renderPreview(trip) {
    preview.innerHTML = `
      <div class="past-preview-img">
        <div class="img-placeholder">${trip.destination}</div>
      </div>
      <h3 class="past-preview-title">${trip.title}</h3>
      <p class="past-preview-tagline">"${trip.tagline}"</p>
      <p class="past-preview-desc">${trip.description}</p>
      <div style="border-top:1px solid var(--border);padding-top:18px;margin-bottom:14px;">
        <p class="past-hl-label">Trip Highlights</p>
        <div class="past-highlights">
          ${trip.highlights.map(h=>`<span class="past-hl-tag">${h}</span>`).join('')}
        </div>
      </div>
      <div class="past-photo-grid">
        <div class="img-placeholder" style="aspect-ratio:1">Photo 1</div>
        <div class="img-placeholder" style="aspect-ratio:1">Photo 2</div>
        <div class="img-placeholder" style="aspect-ratio:1">Photo 3</div>
      </div>`;
  }

  function selectTrip(trip) {
    active = trip;
    gsap.fromTo(preview, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.38, ease: 'power2.out' });
    renderPreview(trip);
    listEl.querySelectorAll('.past-item').forEach(el => {
      el.classList.toggle('active', el.querySelector('.past-title').textContent === trip.title);
    });
  }

  if (active) renderPreview(active);
  renderList();

  gsap.from('#past h2', {
    opacity: 0, y: 40, duration: 0.9,
    scrollTrigger: { trigger: '#past h2', start: 'top 82%' }
  });
})();

/* ── Community ───────────────────────────────── */
(function () {
  gsap.to('.community-heading', {
    opacity: 1, y: 0, duration: 1, ease: 'power2.out',
    scrollTrigger: { trigger: '.community-heading', start: 'top 80%' }
  });
  gsap.to('.testi-card', {
    opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
    scrollTrigger: { trigger: '.testimonials-grid', start: 'top 78%' }
  });
  gsap.to('.community-bg-stripe', {
    yPercent: -20, ease: 'none',
    scrollTrigger: { trigger: '#community', start: 'top bottom', end: 'bottom top', scrub: 2 }
  });
})();

/* ── Contact ─────────────────────────────────── */
(function () {
  gsap.to('.contact-heading', {
    opacity: 1, y: 0, duration: 1, ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-heading', start: 'top 82%' }
  });
  gsap.to('.contact-intro', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.15,
    scrollTrigger: { trigger: '.contact-intro', start: 'top 82%' }
  });

  // Vibe buttons
  document.querySelectorAll('.vibe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vibe-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Form submit
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  form.addEventListener('submit', e => {
    e.preventDefault();
    gsap.to(form, {
      opacity: 0, y: -16, duration: 0.38, ease: 'power2.in',
      onComplete() {
        form.style.display = 'none';
        success.classList.add('show');
        gsap.from(success, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
      }
    });
  });
})();
