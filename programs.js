'use strict';

/* ═══════════════════════════════════════════
   PRICE TOGGLE
═══════════════════════════════════════════ */
(function initPriceToggle() {
  const buttons  = document.querySelectorAll('.price-toggle__btn');
  const monthly  = document.getElementById('price-monthly');
  const upfront  = document.getElementById('price-upfront');
  const cta      = document.getElementById('featured-cta');
  if (!buttons.length || !monthly || !upfront) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', function () {
      buttons.forEach((b) => b.classList.remove('price-toggle__btn--active'));
      this.classList.add('price-toggle__btn--active');

      if (this.dataset.plan === 'monthly') {
        monthly.hidden = false;
        upfront.hidden = true;
        if (cta) {
          cta.textContent = 'Start Custom Coaching — $47/mo →';
          cta.href = cta.dataset.urlMonthly;
        }
      } else {
        monthly.hidden = true;
        upfront.hidden = false;
        if (cta) {
          cta.textContent = 'Start Custom Coaching — $100 upfront →';
          cta.href = cta.dataset.urlUpfront;
        }
      }
    });
  });
})();


/* ═══════════════════════════════════════════
   FAQ ACCORDION
═══════════════════════════════════════════ */
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';

      items.forEach((i) => {
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-answer').style.maxHeight = null;
        i.classList.remove('faq-item--open');
      });

      if (!isOpen) {
        this.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        item.classList.add('faq-item--open');
      }
    });
  });
})();
