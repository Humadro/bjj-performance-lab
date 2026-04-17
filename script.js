'use strict';

/* ═══════════════════════════════════════════
   SCROLL-TRIGGERED REVEAL
═══════════════════════════════════════════ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ═══════════════════════════════════════════
   FORM HANDLING
═══════════════════════════════════════════ */
(function initForms() {
  const forms = document.querySelectorAll('.opt-in-form');

  forms.forEach((form) => {
    form.addEventListener('submit', handleSubmit);
  });

  function handleSubmit(e) {
    e.preventDefault();
    const form    = e.currentTarget;
    const wrapper = form.closest('.opt-in-box');
    const success = wrapper.querySelector('.form-success');

    const nameInput  = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');

    // Clear prior errors
    [nameInput, emailInput].forEach((el) => el.classList.remove('error'));

    const name  = nameInput.value.trim();
    const email = emailInput.value.trim();

    let valid = true;
    if (!name) { nameInput.classList.add('error'); nameInput.focus(); valid = false; }
    if (!isValidEmail(email)) {
      emailInput.classList.add('error');
      if (valid) emailInput.focus();
      valid = false;
    }
    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled    = true;
    btn.textContent = 'Sending…';

    fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: { FIRSTNAME: name },
        listIds: [2],   // ← el número de tu lista (lo ves en Contacts → Lists)
        updateEnabled: true,
      }),
    })
      .then((r) => {
        if (r.ok) {
          showSuccess(form, success);
        } else {
          btn.disabled    = false;
          btn.textContent = 'Try again';
        }
      })
      .catch(() => {
        btn.disabled    = false;
        btn.textContent = 'Try again';
      });
  }

  function showSuccess(form, successEl) {
    form.style.display      = 'none';
    successEl.hidden        = false;
    successEl.style.display = 'flex';

    // Scroll into view if off-screen
    successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }
})();


/* ═══════════════════════════════════════════
   SMOOTH ANCHOR SCROLL (fallback for older browsers)
═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
