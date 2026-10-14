const menuButton = document.querySelector('#menu-toggle');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const dialog = document.querySelector('#booking-dialog');
const content = document.querySelector('#booking-content');
const closeButton = document.querySelector('#close-booking');
const config = window.MH_CONFIG || {};
function openBooking() {
  const url = config.bookingUrl;
  if (url && /^https:\/\//i.test(url) && config.bookingMode === 'link') {
    window.open(url, '_blank', 'noopener,noreferrer'); return;
  }
  if (url && /^https:\/\//i.test(url) && config.bookingMode === 'iframe') {
    content.replaceChildren();
    const frame = document.createElement('iframe');
    frame.src = url; frame.title = 'MH Sports Massage appointment booking';
    frame.setAttribute('loading', 'lazy'); frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    frame.className = 'booking-frame'; content.append(frame);
  }
  dialog.showModal();
}
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', openBooking));
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  const frame = content.querySelector('iframe'); if (frame) frame.remove();
});
