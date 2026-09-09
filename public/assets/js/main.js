(() => {
  const button = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!button || !nav) return;
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
    const header = document.querySelector('.site-header');
    if (header) header.classList.toggle('is-open', !open);
  });
})();

(() => {
  const header = document.querySelector('.home .site-header');
  if (!header) return;

  let scheduled = false;
  const updateHeader = () => {
    const isOpen = header.classList.contains('is-dynamic-island');
    if (!isOpen && window.scrollY > 120) {
      header.classList.add('is-dynamic-island');
      header.classList.add('is-dynamic-island-resolved');
    } else if (isOpen && window.scrollY < 8) {
      header.classList.remove('is-dynamic-island');
    }
    scheduled = false;
  };
  const requestHeaderUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateHeader);
  };

  updateHeader();
  window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
})();

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) {
    document.documentElement.classList.add('motion-reduced');
    return;
  }

  const hero = document.querySelector('.fg-hero, .hero');
  const revealGroups = [
    ['.fg-scenes', '.fg-scene'],
    ['.fg-pillars', '.fg-pillars > article'],
    ['.fg-split', '.fg-copy, .fg-phone-card'],
    ['.fg-step-grid', '.fg-step-grid > article'],
    ['.fg-security-grid', '.fg-secure-main, .fg-secure-stack > article'],
    ['.fg-learn-grid', '.fg-learn-grid > article'],
    ['.fg-newsletter-in', '.fg-newsletter-art, .fg-newsletter-in > div:last-child'],
    ['.fg-faq-list', '.fg-faq-list > details'],
    ['.fg-final', '.fg-final-phone, .fg-final-copy'],
    ['.site-footer__inner', '.site-footer__logo, .site-footer__grid, .site-footer__contact, .site-footer__download']
  ];
  const revealSections = [
    '.fg-heading',
    '.fg-download',
    '.fg-promo-copy',
    '.fg-promo-cards',
    '.fg-security-intro',
    '.fg-faq > .fg-wrap > .fg-kicker',
    '.fg-faq > .fg-wrap > h2'
  ];

  document.documentElement.classList.add('motion-ready');

  revealGroups.forEach(([groupSelector, itemSelector]) => {
    document.querySelectorAll(groupSelector).forEach((group) => {
      group.querySelectorAll(itemSelector).forEach((item, index) => {
        item.dataset.reveal = '';
        item.style.setProperty('--reveal-order', String(Math.min(index, 5)));
      });
    });
  });

  document.querySelectorAll(revealSections.join(',')).forEach((section) => {
    section.dataset.reveal = '';
    section.style.setProperty('--reveal-order', '0');
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  document.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item));

  if (hero) {
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-intro-ready')));
  }

  const parallaxMedia = [...document.querySelectorAll(
    '.fg-scene img, .fg-phone-card img, .fg-promo-cards img, .fg-secure-main img, .fg-final-device'
  )];
  const scenePhones = [...document.querySelectorAll('.fg-scenes .fg-scene img')];
  const accountPhone = document.querySelector('.fg-phone-card img');
  const promoCards = document.querySelector('.fg-promo-cards');
  let ticking = false;

  const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
  const entranceProgress = (element, startRatio = .92, finishRatio = .4) => {
    const rect = element.getBoundingClientRect();
    const start = window.innerHeight * startRatio;
    const finish = window.innerHeight * finishRatio;
    return clamp((start - rect.top) / (start - finish));
  };

  const updateMotion = () => {
    const viewportCenter = window.innerHeight / 2;
    parallaxMedia.forEach((media) => {
      const rect = media.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
      const distance = (rect.top + rect.height / 2 - viewportCenter) / window.innerHeight;
      const travel = Math.max(-1, Math.min(1, distance)) * -18;
      media.style.setProperty('--media-parallax', `${travel.toFixed(2)}px`);
    });

    if (hero) {
      const progress = Math.max(0, Math.min(1, window.scrollY / Math.max(hero.offsetHeight, 1)));
      const scrollProgress = progress;
      const travel = window.innerWidth <= 600 ? -300 : -500;
      hero.style.setProperty('--hero-scroll-y', `${(scrollProgress * travel).toFixed(2)}px`);
    }

    scenePhones.forEach((phone, index) => {
      const progress = entranceProgress(phone.closest('.fg-scenes'), .92, .08);
      const displaced = 1 - progress;
      const direction = index === 0 ? -1 : 1;
      phone.style.setProperty('--scene-shift-x', `${(direction * displaced * 82).toFixed(2)}px`);
      phone.style.setProperty('--scene-shift-y', `${(displaced * 44).toFixed(2)}px`);
      phone.style.setProperty('--scene-tilt', `${(direction * displaced * 12).toFixed(2)}deg`);
      phone.style.setProperty('--scene-scale', (0.9 + progress * .1).toFixed(3));
    });

    if (accountPhone) {
      const progress = entranceProgress(accountPhone.closest('.fg-split'), .82, .25);
      accountPhone.style.setProperty('--account-scale', (1.16 - progress * .16).toFixed(3));
      accountPhone.style.setProperty('--account-lift', `${((1 - progress) * -46).toFixed(2)}px`);
      accountPhone.style.setProperty('--account-tilt', `${((1 - progress) * 3).toFixed(2)}deg`);
    }

    if (promoCards) {
      const progress = entranceProgress(promoCards.closest('.fg-promo-in'), 1.14, .2);
      const spread = 1 - progress;
      promoCards.style.setProperty('--gold-card-x', `${(-spread * 104).toFixed(2)}px`);
      promoCards.style.setProperty('--gold-card-y', `${(-spread * 54).toFixed(2)}px`);
      promoCards.style.setProperty('--gold-card-tilt', `${(-spread * 8).toFixed(2)}deg`);
      promoCards.style.setProperty('--signature-card-x', `${(spread * 112).toFixed(2)}px`);
      promoCards.style.setProperty('--signature-card-y', `${(spread * 66).toFixed(2)}px`);
      promoCards.style.setProperty('--signature-card-tilt', `${(spread * 8).toFixed(2)}deg`);
      promoCards.style.setProperty('--promo-card-scale', (0.94 + progress * .06).toFixed(3));
    }

    ticking = false;
  };

  const requestMotionUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateMotion);
  };

  window.addEventListener('scroll', requestMotionUpdate, { passive: true });
  window.addEventListener('resize', requestMotionUpdate, { passive: true });
  requestMotionUpdate();
})();
