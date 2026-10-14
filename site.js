(() => {
  const year = document.getElementById('year');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const bookingDialog = document.getElementById('booking-dialog');
  const closeBooking = document.getElementById('close-booking');
  let trigger = null;
  if (year) year.textContent = new Date().getFullYear();
  function closeMenu() { if (!nav || !menuToggle) return; nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open menu'); }
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded',String(open)); menuToggle.setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  }
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });
  document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click',() => { closeMenu(); trigger = button; if (bookingDialog && typeof bookingDialog.showModal === 'function') { if(!bookingDialog.open) bookingDialog.showModal(); } else window.location.href='https://mhsportsmassage.setmore.com/'; }));
  if (bookingDialog && closeBooking) {
    closeBooking.addEventListener('click',() => bookingDialog.close());
    bookingDialog.addEventListener('close',() => { if(trigger) trigger.focus(); });
    bookingDialog.addEventListener('click',e => { if(e.target !== bookingDialog) return; const b=bookingDialog.getBoundingClientRect(); if(e.clientX<b.left || e.clientX>b.right || e.clientY<b.top || e.clientY>b.bottom) bookingDialog.close(); });
  }
})();
