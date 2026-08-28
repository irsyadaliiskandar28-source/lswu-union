// LSWU — shared behaviour for every page

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const burger = document.getElementById('burgerBtn');
  const header = document.getElementById('siteHeader');
  if (burger && header) {
    burger.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        header.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mark the current page's nav link as active
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .notice');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Scroll progress bar
  const bar = document.getElementById('scrollProgress');
  if (bar) {
    const updateBar = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  // Detail modal — used on Organization, Partnership, and News pages.
  // Any element with class "detail-trigger" opens the shared #detailModal,
  // populated from its data-* attributes.
  const detailModal = document.getElementById('detailModal');
  const triggers = document.querySelectorAll('.detail-trigger');
  if (detailModal && triggers.length) {
    const eyebrowEl = document.getElementById('detailModalEyebrow');
    const titleEl = document.getElementById('detailModalTitle');
    const meta1Wrap = document.getElementById('detailModalMeta1');
    const meta1LabelEl = document.getElementById('detailModalMeta1Label');
    const meta1ValueEl = document.getElementById('detailModalMeta1Value');
    const meta2Wrap = document.getElementById('detailModalMeta2');
    const meta2LabelEl = document.getElementById('detailModalMeta2Label');
    const meta2ValueEl = document.getElementById('detailModalMeta2Value');
    const bodyEl = document.getElementById('detailModalBody');
    const listWrap = document.getElementById('detailModalListWrap');
    const listLabelEl = document.getElementById('detailModalListLabel');
    const listEl = document.getElementById('detailModalList');
    let lastFocused = null;

    const fillMeta = (wrap, labelEl, valueEl, label, value) => {
      if (label && value) {
        labelEl.textContent = label;
        valueEl.textContent = value;
        wrap.classList.remove('is-hidden');
      } else {
        wrap.classList.add('is-hidden');
      }
    };

    const openDetail = (item) => {
      eyebrowEl.textContent = item.dataset.eyebrow || '';
      titleEl.textContent = item.dataset.title || '';
      fillMeta(meta1Wrap, meta1LabelEl, meta1ValueEl, item.dataset.meta1Label, item.dataset.meta1Value);
      fillMeta(meta2Wrap, meta2LabelEl, meta2ValueEl, item.dataset.meta2Label, item.dataset.meta2Value);
      bodyEl.textContent = item.dataset.body || '';
      const listItems = (item.dataset.list || '').split('|').map(s => s.trim()).filter(Boolean);
      listEl.innerHTML = '';
      if (listItems.length) {
        listLabelEl.textContent = item.dataset.listLabel || '';
        listItems.forEach(entry => {
          const li = document.createElement('li');
          li.textContent = entry;
          listEl.appendChild(li);
        });
        listWrap.classList.remove('is-hidden');
      } else {
        listWrap.classList.add('is-hidden');
      }
      lastFocused = document.activeElement;
      detailModal.classList.add('is-open');
      detailModal.setAttribute('aria-hidden', 'false');
      detailModal.querySelector('.detail-modal-close').focus();
      document.body.style.overflow = 'hidden';
    };

    const closeDetail = () => {
      detailModal.classList.remove('is-open');
      detailModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    triggers.forEach(item => {
      item.addEventListener('click', () => openDetail(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetail(item);
        }
      });
    });

    detailModal.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', closeDetail);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && detailModal.classList.contains('is-open')) closeDetail();
    });
  }
});
