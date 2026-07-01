
(function () {
  /* ── 1. Resolve config ── */
  var cfg = window.TopBarConfig || {};
  var mode = cfg.mode || 'main';
  var supertitle = cfg.supertitle || 'SSS Sit & Sync';
  var title = cfg.title || 'Page';
  var backHref = cfg.backHref || 'SSS PROTOTYPE.html';
  var showTheme = cfg.showTheme !== false; // default true

  /* ── 2. Inject CSS (once) ── */
  if (!document.getElementById('topbar-js-styles')) {
    var style = document.createElement('style');
    style.id = 'topbar-js-styles';
    style.textContent = [
      '/* ── topbar.js injected styles ── */',
      '.topbar {',
      '  position: sticky;',
      '  top: 0;',
      '  z-index: 20;',
      '  padding: 20px var(--gutter, 18px) 18px;',
      '  background: linear-gradient(135deg, var(--appbar-from, #0038A8) 0%, var(--appbar-to, #003090) 100%);',
      '  border-bottom: 1px solid rgba(255,255,255,0.08);',
      '  box-shadow: 0 4px 24px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.06) inset;',
      '}',
      '.topbar-content {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '}',
      /* ── main mode ── */
      '.topbar-logo-area {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 12px;',
      '}',
      '.topbar-logo-box {',
      '  width: 44px;',
      '  height: 44px;',
      '  background: #ffffff;',
      '  border-radius: 14px;',
      '  display: grid;',
      '  place-items: center;',
      '  overflow: hidden;',
      '  box-shadow: 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.5) inset;',
      '  flex-shrink: 0;',
      '}',
      '.topbar-logo-box img {',
      '  width: 100%;',
      '  height: 100%;',
      '  object-fit: contain;',
      '  padding: 5px;',
      '}',
      '.topbar-brand-text .topbar-org {',
      '  font-family: Arial, sans-serif;',
      '  font-weight: 600;',
      '  font-size: 11.5px;',
      '  letter-spacing: 0.08em;',
      '  text-transform: uppercase;',
      '  color: rgba(255,255,255,0.9);',
      '}',
      '.topbar-brand-text .topbar-portal-name {',
      '  font-size: 12px;',
      '  color: rgba(255,255,255,0.5);',
      '  margin-top: 1px;',
      '  letter-spacing: 0.02em;',
      '}',
      /* ── sub mode ── */
      '.topbar-left {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 12px;',
      '}',
      '.topbar-back-btn {',
      '  display: grid;',
      '  place-items: center;',
      '  width: 38px;',
      '  height: 38px;',
      '  border-radius: 50%;',
      '  background: rgba(255,255,255,0.1);',
      '  border: 1px solid rgba(255,255,255,0.18);',
      '  cursor: pointer;',
      '  transition: background 0.2s, transform 0.15s;',
      '  flex-shrink: 0;',
      '  -webkit-tap-highlight-color: transparent;',
      '  text-decoration: none;',
      '}',
      '.topbar-back-btn:hover { background: rgba(255,255,255,0.18); }',
      '.topbar-back-btn:active { transform: scale(0.9); }',
      '.topbar-back-btn .material-icons-round { font-size: 20px; color: rgba(255,255,255,0.9); }',
      '.topbar-page-title { display: flex; flex-direction: column; }',
      '.topbar-page-title .topbar-supertitle {',
      '  font-size: 11px;',
      '  font-weight: 600;',
      '  letter-spacing: 0.1em;',
      '  text-transform: uppercase;',
      '  color: rgba(255,255,255,0.5);',
      '}',
      '.topbar-page-title .topbar-title {',
      '  font-family: var(--font-display, serif);',
      '  font-weight: 700;',
      '  font-size: 18px;',
      '  color: #fff;',
      '  letter-spacing: -0.01em;',
      '}',
      /* ── theme toggle (shared) ── */
      '.topbar-theme-toggle {',
      '  display: grid;',
      '  place-items: center;',
      '  width: 40px;',
      '  height: 40px;',
      '  border-radius: 50%;',
      '  background: rgba(255,255,255,0.1);',
      '  border: 1px solid rgba(255,255,255,0.18);',
      '  cursor: pointer;',
      '  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;',
      '  flex-shrink: 0;',
      '}',
      '.topbar-theme-toggle:hover { background: rgba(255,255,255,0.18); box-shadow: 0 0 0 4px rgba(255,255,255,0.06); }',
      '.topbar-theme-toggle:active { transform: scale(0.9); }',
      '.topbar-theme-toggle .material-icons-round { font-size: 19px; color: rgba(255,255,255,0.9); }'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ── 3. Build HTML ── */
  var leftHTML = '';

  if (mode === 'main') {
    leftHTML = [
      '<div class="topbar-logo-area">',
      '  <div class="topbar-logo-box"><img src="sss.png" alt="SSS Logo"></div>',
      '  <div class="topbar-brand-text">',
      '    <div class="topbar-org">Social Security System</div>',
      '    <div class="topbar-portal-name">Sit &amp; Sync Portal</div>',
      '  </div>',
      '</div>'
    ].join('');
  } else {
    leftHTML = [
      '<div class="topbar-left">',
      '  <div class="topbar-back-btn" role="button" tabindex="0" aria-label="Go back"',
      '       onclick="(window.topbarGoBack ? window.topbarGoBack() : (window.go ? go(\'' + backHref + '\') : (window.location.href=\'' + backHref + '\')))"',
      '       onkeydown="if(event.key===\'Enter\'||event.key===\' \') this.click()">',
      '    <span class="material-icons-round">arrow_back</span>',
      '  </div>',
      '  <div class="topbar-page-title">',
      '    <div class="topbar-supertitle">' + _esc(supertitle) + '</div>',
      '    <div class="topbar-title">' + _esc(title) + '</div>',
      '  </div>',
      '</div>'
    ].join('');
  }

  var themeBtn = showTheme
    ? '<div class="topbar-theme-toggle" role="button" tabindex="0" aria-label="Toggle dark mode"' +
    ' onclick="topbarToggleDark()" onkeydown="if(event.key===\'Enter\'||event.key===\' \') topbarToggleDark()">' +
    '<span class="material-icons-round" id="topbar-theme-icon">dark_mode</span></div>'
    : '';

  var html = [
    '<header class="topbar" id="shared-topbar">',
    '  <div class="topbar-content">',
    '    ' + leftHTML,
    '    ' + themeBtn,
    '  </div>',
    '</header>'
  ].join('\n');

  /* ── 4. Mount before the first child of <body> ── */
  var mount = document.getElementById('shared-topbar-mount');
  if (mount) {
    mount.outerHTML = html;
  } else {
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  /* ── 5. Theme toggle logic ── */
  window.topbarToggleDark = function () {
    var dark = document.body.classList.toggle('dark');
    var icon = document.getElementById('topbar-theme-icon');
    if (icon) icon.textContent = dark ? 'light_mode' : 'dark_mode';
    // Keep in sync with any existing toggleDark on the page
    try { localStorage.setItem('sitSyncTheme', dark ? 'dark' : 'light'); } catch (e) { }
  };

  /* ── 6. Restore saved theme ── */
  (function initTheme() {
    try {
      var saved = localStorage.getItem('sitSyncTheme');
      if (saved === 'dark') {
        document.body.classList.add('dark');
        var icon = document.getElementById('topbar-theme-icon');
        if (icon) icon.textContent = 'light_mode';
      }
    } catch (e) { }
  })();

  /* ── helpers ── */
  function _esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
