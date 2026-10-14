(() => {
  'use strict';
  const KEY = 'mh_privacy_preferences';
  const VERSION = 1;
  const LIFE = 180 * 24 * 60 * 60 * 1000;
  const FONT_URL = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap';
  const banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.hidden = true;
  banner.setAttribute('aria-label', 'Cookie and privacy settings');
  banner.innerHTML = `<div class="cookie-copy"><h2>Cookies & privacy</h2><p>This site has no analytics or advertising trackers. We save your privacy choice on this device. Optional Google Fonts share your IP address with Google when loaded; choose whether to allow them.</p><p><a href="cookie-policy.html">Cookie policy</a> · <a href="privacy-policy.html">Privacy policy</a></p></div><div class="cookie-actions"><button type="button" data-choice="false">Essential only</button><button type="button" data-choice="true">Allow external fonts</button></div>`;
  document.body.append(banner);
  let returnFocus = null;
  let expiryTimer;
  function read() {
    try {
      const p = JSON.parse(localStorage.getItem(KEY));
      if (p && p.version === VERSION && typeof p.externalFonts === 'boolean' && Number.isFinite(p.savedAt) && p.savedAt <= Date.now() && Date.now() - p.savedAt < LIFE) return p;
      localStorage.removeItem(KEY);
    } catch (_) {}
    return null;
  }
  function apply(p) {
    const existing = document.getElementById('optional-google-fonts');
    if (p && p.externalFonts) {
      if (!existing) {
        const link = document.createElement('link');
        link.id = 'optional-google-fonts'; link.rel = 'stylesheet'; link.href = FONT_URL;
        document.head.append(link);
      }
    } else if (existing) existing.remove();
    clearTimeout(expiryTimer);
    if (p) expiryTimer = setTimeout(() => { const current = read(); apply(current); banner.hidden = !!current; }, Math.min(LIFE - (Date.now() - p.savedAt), 2147483647));
  }
  function save(externalFonts) {
    const p = {version: VERSION, externalFonts, savedAt: Date.now()};
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (_) {}
    apply(p); banner.hidden = true;
    if (returnFocus) { returnFocus.focus(); returnFocus = null; }
  }
  banner.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => save(button.dataset.choice === 'true')));
  document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => {
    returnFocus = button; banner.hidden = false;
    banner.querySelector('button').focus();
  }));
  window.addEventListener('storage', event => {
    if (event.key === KEY || event.key === null) { const p = read(); apply(p); banner.hidden = !!p; }
  });
  const initial = read(); apply(initial); banner.hidden = !!initial;
})();
