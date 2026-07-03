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

  // ── Favorites (localStorage) ─────────────────────────
  function initFavorites() {
    const stored = JSON.parse(localStorage.getItem('bd_favorites') || '[]');
    document.querySelectorAll('.btn-fav').forEach(btn => {
      const id = btn.dataset.listingId;
      if (id && stored.includes(id)) {
        btn.classList.add('active');
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-heart';
      }
      btn.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        const favs = JSON.parse(localStorage.getItem('bd_favorites') || '[]');
        const isActive = btn.classList.contains('active');
        const icon = btn.querySelector('i');
        if (isActive) {
          btn.classList.remove('active');
          if (icon) icon.className = 'fa-regular fa-heart';
          const idx = favs.indexOf(id);
          if (idx > -1) favs.splice(idx, 1);
        } else {
          btn.classList.add('active');
          if (icon) icon.className = 'fa-solid fa-heart';
          if (id && !favs.includes(id)) favs.push(id);
        }
        localStorage.setItem('bd_favorites', JSON.stringify(favs));
        updateFavBadge();
      });
    });
    updateFavBadge();
  }

  function updateFavBadge() {
    const count = JSON.parse(localStorage.getItem('bd_favorites') || '[]').length;
    document.querySelectorAll('.fav-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  // ── Save search (localStorage + email alert) ─────────
  function initSaveSearch() {
    const modal = document.getElementById('save-search-modal');
    if (!modal) return;
    document.querySelectorAll('.save-search-btn').forEach(btn => {
      btn.addEventListener('click', () => modal.classList.add('open'));
    });
    modal.querySelector('.modal-close')?.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    const form = document.getElementById('save-search-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const emailVal = form.querySelector('[name=email]')?.value || '';
        const labelEl  = document.querySelector('.results-count strong');
        const label    = labelEl ? labelEl.textContent + ' — Raleigh area' : 'Raleigh, NC search';
        const saved    = JSON.parse(localStorage.getItem('bd_saved_searches') || '[]');
        saved.unshift({ email: emailVal, label, date: new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}) });
        localStorage.setItem('bd_saved_searches', JSON.stringify(saved));
        const box = form.parentElement;
        box.innerHTML = `<div style="text-align:center;padding:12px 0;"><i class="fa-solid fa-circle-check" style="color:var(--gold);font-size:32px;display:block;margin-bottom:10px;"></i><p style="font-weight:700;color:var(--navy);margin-bottom:4px;">Search Saved!</p><p style="font-size:13px;color:var(--gray-500);margin:0;">New matches will be sent to ${emailVal}</p></div>`;
        setTimeout(() => modal.classList.remove('open'), 2800);
        renderSavedSearches();
      });
    }
    renderSavedSearches();
  }

  function renderSavedSearches() {
    const panel = document.getElementById('saved-searches-panel');
    if (!panel) return;
    const saved = JSON.parse(localStorage.getItem('bd_saved_searches') || '[]');
    if (!saved.length) { panel.style.display = 'none'; return; }
    panel.style.display = 'block';
    const list = panel.querySelector('.saved-list');
    if (!list) return;
    list.innerHTML = saved.map((s, i) => `
      <div class="saved-search-item">
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--navy);">${s.label}</div>
          <div style="font-size:11px;color:var(--gray-400);">Saved ${s.date} · alerts → ${s.email}</div>
        </div>
        <button class="saved-search-remove" data-i="${i}" title="Remove"><i class="fa-solid fa-xmark"></i></button>
      </div>`).join('');
    list.querySelectorAll('.saved-search-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const s2 = JSON.parse(localStorage.getItem('bd_saved_searches') || '[]');
        s2.splice(parseInt(btn.dataset.i), 1);
        localStorage.setItem('bd_saved_searches', JSON.stringify(s2));
        renderSavedSearches();
      });
    });
  }

  // ── Lead magnet forms ────────────────────────────────
  function initLeadMagnets() {
    document.querySelectorAll('.lead-magnet-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const card    = form.closest('.lead-magnet-card');
        const confirm = card?.querySelector('.lead-magnet-confirm');
        const btn     = form.querySelector('[type=submit]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        setTimeout(() => {
          if (confirm) { form.style.display = 'none'; confirm.style.display = 'block'; }
        }, 700);
      });
    });
  }

  // ── Modal utility (data-modal trigger) ───────────────
  function initModals() {
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        const modal = document.getElementById(trigger.dataset.modal);
        if (modal) modal.classList.add('open');
      });
    });
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
      modal.querySelector('.modal-close')?.addEventListener('click', () => modal.classList.remove('open'));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    });
  }

  initFavorites();
  initSaveSearch();
  initLeadMagnets();
  initModals();

});
