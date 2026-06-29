/**
 * nav.js — Shared bottom navigation for SSS Sit & Sync Portal
 * Edit the `navItems` array below to update the nav across ALL pages at once.
 */
(function () {
  /* ── 1. Define your nav items here ── */
  var navItems = [
    {
      label: 'Home',
      icon: 'home',        // Material Icons name  (leave imgSrc blank to use icon)
      imgSrc: '',            // e.g. 'sss.png' — overrides icon when set
      href: 'SSS PROTOTYPE.html',
      match: ['SSS PROTOTYPE.html', 'SSS PROTOTYPE.html', '/', '']
    },
    {
      label: 'SSS Portal',
      icon: '',
      imgSrc: 'sss.png',
      href: 'https://sso.sss.gov.ph/oam/server/obrareq.cgi?ECID-Context=1.000Q2IxAFs56qIWFLzVK8A0006cG000Hhq%3BkXjE',
      match: []             // external link — never marked active
    },
    {
      label: 'About Us',
      icon: 'info',
      imgSrc: '',
      href: 'about.html',
      match: ['about.html']
    }
  ];

  /* ── 2. Detect current page ── */
  var currentFile = window.location.pathname.split('/').pop() || '';

  /* ── 3. Build the <nav> HTML ── */
  var navEl = document.getElementById('shared-bottom-nav');
  if (!navEl) return;

  var html = '<nav class="nav" aria-label="Main navigation">';

  navItems.forEach(function (item) {
    var isActive = item.match.some(function (m) {
      return currentFile === m || decodeURIComponent(currentFile) === m;
    });

    var activeClass = isActive ? ' is-active' : '';

    /* icon or image */
    var iconHtml;
    if (item.imgSrc) {
      iconHtml = '<img src="' + item.imgSrc + '" alt="' + item.label + '" '
        + 'style="width:24px;height:24px;object-fit:contain;'
        + 'transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1);">';
    } else {
      iconHtml = '<span class="material-icons-round">' + item.icon + '</span>';
    }

    html += '<div class="nav-item' + activeClass + '" role="button" tabindex="0" '
      + 'onclick="go(\'' + item.href.replace(/'/g, "\\'") + '\')">'
      + iconHtml
      + item.label
      + '</div>';
  });

  html += '</nav>';
  navEl.innerHTML = html;
})();
