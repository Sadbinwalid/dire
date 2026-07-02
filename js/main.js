document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav ──────────────────────────────────────────
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // ── Active nav link ──────────────────────────────────────
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ── Generic form confirmation ────────────────────────────
  document.querySelectorAll('[data-form-confirm]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const targetId = form.dataset.formConfirm;
      const wrap = form.closest('.form-wrap');
      const submitBtn = form.querySelector('[type=submit]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      setTimeout(() => {
        if (wrap) wrap.classList.add('submitted');
        if (targetId) {
          const conf = document.getElementById(targetId);
          if (conf) { form.style.display = 'none'; conf.style.display = 'block'; }
        }
      }, 900);
    });
  });

  // ── Valuation form ───────────────────────────────────────
  const valForm = document.getElementById('valuation-form');
  if (valForm) {
    valForm.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('valuation-form-card').style.display = 'none';
      document.getElementById('valuation-confirm').style.display = 'block';
    });
  }

  // ── Mortgage calculator ──────────────────────────────────
  function runMortgage() {
    const priceEl = document.getElementById('m-price');
    const downEl  = document.getElementById('m-down');
    const rateEl  = document.getElementById('m-rate');
    const termEl  = document.getElementById('m-term');
    const resEl   = document.getElementById('mortgage-result');
    if (!priceEl || !resEl) return;
    const price = parseFloat(String(priceEl.value).replace(/,/g,'')) || 0;
    const down  = parseFloat(downEl?.value) || 20;
    const rate  = parseFloat(rateEl?.value) || 7.0;
    const term  = parseInt(termEl?.value)   || 30;
    const principal = price * (1 - down / 100);
    const r = rate / 100 / 12;
    const n = term * 12;
    if (r === 0 || n === 0) { resEl.textContent = '—'; return; }
    const pmt = principal * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n) - 1);
    resEl.textContent = isNaN(pmt) || pmt <= 0 ? '—' : '$' + Math.round(pmt).toLocaleString() + '/mo';
  }
  document.querySelectorAll('.mortgage-input').forEach(el => el.addEventListener('input', runMortgage));
  runMortgage();

  // ── Category filter (blog / content hub) ────────────────
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.category-filter')
         ?.querySelectorAll('.cat-btn')
         .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── Map toggle placeholder (search page) ────────────────
  const mapBtn = document.getElementById('map-toggle');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      const label = mapBtn.querySelector('.map-label');
      const grid  = document.getElementById('results-grid');
      const mapBox = document.getElementById('map-placeholder');
      if (label && grid && mapBox) {
        const showMap = mapBox.style.display === 'none' || !mapBox.style.display;
        mapBox.style.display = showMap ? 'block' : 'none';
        grid.style.display = showMap ? 'none' : 'grid';
        label.textContent = showMap ? 'Show List' : 'Map View';
      }
    });
  }

  // ── Sticky header shadow on scroll ──────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(28,25,23,.12)'
        : '0 2px 12px rgba(28,25,23,.06)';
    }, { passive: true });
  }

});
