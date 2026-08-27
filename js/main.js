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

  // Organization page — click a role to reveal its biodata in a modal
  const bioModal = document.getElementById('bioModal');
  const rankItems = document.querySelectorAll('.rank-item');
  if (bioModal && rankItems.length) {
    const roleEl = document.getElementById('bioModalRole');
    const titleEl = document.getElementById('bioModalTitle');
    const nameEl = document.getElementById('bioModalName');
    const sinceEl = document.getElementById('bioModalSince');
    const bioEl = document.getElementById('bioModalBio');
    const tasksEl = document.getElementById('bioModalTasks');
    let lastFocused = null;

    const openBio = (item) => {
      roleEl.textContent = item.dataset.role || '';
      titleEl.textContent = item.dataset.title || '';
      nameEl.textContent = item.dataset.name || '—';
      sinceEl.textContent = item.dataset.since || '—';
      bioEl.textContent = item.dataset.bio || '';
      tasksEl.innerHTML = '';
      (item.dataset.tasks || '').split('|').filter(Boolean).forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.trim();
        tasksEl.appendChild(li);
      });
      lastFocused = document.activeElement;
      bioModal.classList.add('is-open');
      bioModal.setAttribute('aria-hidden', 'false');
      bioModal.querySelector('.bio-modal-close').focus();
      document.body.style.overflow = 'hidden';
    };

    const closeBio = () => {
      bioModal.classList.remove('is-open');
      bioModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    rankItems.forEach(item => {
      item.addEventListener('click', () => openBio(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openBio(item);
        }
      });
    });

    bioModal.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', closeBio);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bioModal.classList.contains('is-open')) closeBio();
    });
  }
});
