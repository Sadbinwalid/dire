/**
 * CHAT BUBBLE — sticky WhatsApp / SMS contact widget
 *
 * Single source of truth for the floating contact button on every page.
 * To change the phone number: update SITE_CONFIG.CONTACT.phone in config.js.
 * To add a third contact option: add another <a> inside buildPanel() below.
 *
 * This script injects its own CSS and HTML — no HTML changes needed per page.
 * Load order: config.js → main.js → chat-bubble.js
 */
(function () {
  'use strict';

  // Pull phone from SITE_CONFIG (config.js must load first).
  // Strip non-digits for URL usage; keep formatted string for display.
  var rawPhone = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.CONTACT && SITE_CONFIG.CONTACT.phone)
    ? SITE_CONFIG.CONTACT.phone
    : '9194270069';
  var digits   = rawPhone.replace(/\D/g, '');
  var waUrl    = 'https://wa.me/1' + digits;
  var smsUrl   = 'sms:' + digits;

  /* ── CSS ── */
  var css = [
    '#cb-wrap{position:fixed;bottom:28px;right:28px;z-index:9998;display:flex;flex-direction:column;align-items:flex-end;gap:12px;}',
    /* Trigger button */
    '#cb-btn{width:58px;height:58px;border-radius:50%;background:var(--navy,#1a2744);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(28,25,23,.28);transition:transform .2s,background .2s;opacity:0;transform:translateY(12px);}',
    '#cb-btn.visible{animation:cb-rise .5s ease forwards;}',
    '#cb-btn:hover{background:var(--navy-dark,#131d38);transform:scale(1.08);}',
    '#cb-btn i{font-size:24px;color:#fff;pointer-events:none;}',
    /* Pulse ring */
    '#cb-btn::after{content:"";position:absolute;width:58px;height:58px;border-radius:50%;border:2px solid var(--gold,#c9963b);animation:cb-pulse 2.8s ease-out 3s infinite;opacity:0;}',
    /* Panel */
    '#cb-panel{background:#fff;border:1px solid var(--gray-200,#e5e7eb);border-radius:16px;box-shadow:0 8px 32px rgba(28,25,23,.18);padding:20px 22px 16px;min-width:248px;max-width:290px;opacity:0;transform:translateY(10px) scale(.96);pointer-events:none;transition:opacity .22s,transform .22s;transform-origin:bottom right;}',
    '#cb-panel.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}',
    '#cb-panel-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:14px;}',
    '#cb-panel-msg{font-size:13px;line-height:1.6;color:var(--gray-700,#374151);font-family:inherit;margin:0;flex:1;}',
    '#cb-panel-msg strong{color:var(--navy,#1a2744);font-size:14px;display:block;margin-bottom:3px;}',
    '#cb-close{background:none;border:none;cursor:pointer;color:var(--gray-400,#9ca3af);font-size:16px;line-height:1;padding:2px;flex-shrink:0;transition:color .15s;margin-top:-2px;}',
    '#cb-close:hover{color:var(--gray-700,#374151);}',
    '#cb-actions{display:flex;flex-direction:column;gap:9px;}',
    '#cb-actions a{display:flex;align-items:center;gap:10px;padding:11px 16px;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none;transition:all .17s;font-family:inherit;}',
    '#cb-wa{background:#25d366;color:#fff;}',
    '#cb-wa:hover{background:#1fba59;transform:translateY(-1px);}',
    '#cb-wa i{font-size:17px;}',
    '#cb-sms{background:var(--navy,#1a2744);color:#fff;}',
    '#cb-sms:hover{background:var(--navy-dark,#131d38);transform:translateY(-1px);}',
    '#cb-sms i{font-size:15px;}',
    /* Animations */
    '@keyframes cb-rise{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}',
    '@keyframes cb-pulse{0%{transform:scale(1);opacity:.6;}70%{transform:scale(1.5);opacity:0;}100%{opacity:0;}}',
    /* Mobile adjustments */
    '@media(max-width:480px){#cb-wrap{bottom:20px;right:16px;}#cb-btn{width:52px;height:52px;}#cb-btn i{font-size:21px;}#cb-panel{min-width:220px;max-width:calc(100vw - 32px);}}'
  ].join('');

  function buildBubble() {
    // Inject styles
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Wrapper
    var wrap = document.createElement('div');
    wrap.id = 'cb-wrap';

    // Panel
    var panel = document.createElement('div');
    panel.id = 'cb-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Contact Butch');
    panel.innerHTML =
      '<div id="cb-panel-top">' +
        '<p id="cb-panel-msg"><strong>Have a quick question?</strong>Reach Butch directly — he responds personally.</p>' +
        '<button id="cb-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
      '</div>' +
      '<div id="cb-actions">' +
        '<a id="cb-wa" href="' + waUrl + '" target="_blank" rel="noopener noreferrer">' +
          '<i class="fa-brands fa-whatsapp"></i> Message on WhatsApp' +
        '</a>' +
        '<a id="cb-sms" href="' + smsUrl + '">' +
          '<i class="fa-solid fa-comment-sms"></i> Text Butch Directly' +
        '</a>' +
      '</div>';

    // Trigger button
    var btn = document.createElement('button');
    btn.id = 'cb-btn';
    btn.setAttribute('aria-label', 'Contact Butch');
    btn.innerHTML = '<i class="fa-regular fa-comment-dots"></i>';

    wrap.appendChild(panel);
    wrap.appendChild(btn);
    document.body.appendChild(wrap);

    // Wire up interactions
    var isOpen = false;

    function openPanel() {
      panel.classList.add('open');
      btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      isOpen = true;
    }
    function closePanel() {
      panel.classList.remove('open');
      btn.innerHTML = '<i class="fa-regular fa-comment-dots"></i>';
      isOpen = false;
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isOpen) { closePanel(); } else { openPanel(); }
    });

    document.getElementById('cb-close').addEventListener('click', function (e) {
      e.stopPropagation();
      closePanel();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !wrap.contains(e.target)) {
        closePanel();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
        closePanel();
      }
    });

    // Fade in after 2 seconds (not immediately — let the page settle)
    setTimeout(function () {
      btn.classList.add('visible');
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBubble);
  } else {
    buildBubble();
  }
}());
