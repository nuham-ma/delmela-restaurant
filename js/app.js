/**
 * Delmela Restaurant & Café — Interactive Engine
 * Bilingual i18n, Multi-Branch location switcher, filtering, lightbox, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Bilingual State & I18n Engine
  const defaultLang = 'am'; // Amharic as default per requirements
  let currentLang = localStorage.getItem('delmela_lang') || defaultLang;

  const langAmBtns = document.querySelectorAll('.lang-btn-am');
  const langEnBtns = document.querySelectorAll('.lang-btn-en');

  // Branch data
  const branchesData = {
    bole: {
      coords: '8.992143,38.788249',
      nameKey: 'branch_bole_name',
      addressKey: 'branch_bole_address',
      descKey: 'branch_bole_desc',
      phone1: '+251980635959',
      phone1Display: '+251 98 063 5959',
      phone2: '+251935955598',
      phone2Display: '+251 93 595 5598',
      img: 'assets/images/interior-centerpiece-indoor-tree.webp',
      mapUrl: 'https://maps.google.com/maps?q=8.992143,38.788249&hl=en&z=16&output=embed',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=8.992143,38.788249'
    },
    sarbet: {
      coords: '8.9965,38.7350',
      nameKey: 'branch_sarbet_name',
      addressKey: 'branch_sarbet_address',
      descKey: 'branch_sarbet_desc',
      phone1: '+251935955598',
      phone1Display: '+251 93 595 5598',
      phone2: '+251980635959',
      phone2Display: '+251 98 063 5959',
      img: 'assets/images/interior-arched-brick-window-sunlight.webp',
      mapUrl: 'https://maps.google.com/maps?q=8.9965,38.7350&hl=en&z=16&output=embed',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=8.9965,38.7350'
    },
    summit: {
      coords: '9.0210,38.8520',
      nameKey: 'branch_summit_name',
      addressKey: 'branch_summit_address',
      descKey: 'branch_summit_desc',
      phone1: '+251980635959',
      phone1Display: '+251 98 063 5959',
      phone2: '+251935955598',
      phone2Display: '+251 93 595 5598',
      img: 'assets/images/restaurant-exterior-rustic-patio.webp',
      mapUrl: 'https://maps.google.com/maps?q=9.0210,38.8520&hl=en&z=16&output=embed',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9.0210,38.8520'
    }
  };

  let activeBranch = 'bole';

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('delmela_lang', lang);
    document.documentElement.lang = lang;

    // Update active class on all language switcher buttons (desktop + mobile)
    langAmBtns.forEach(btn => btn.classList.toggle('active', lang === 'am'));
    langEnBtns.forEach(btn => btn.classList.toggle('active', lang === 'en'));

    // Apply translations to all DOM elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update live operating status
    updateLiveStatus();

    // Update active branch specific texts
    updateBranchUI(activeBranch);

    // Update document title
    if (translations[lang].site_title) {
      document.title = translations[lang].site_title;
    }
  }

  function updateLiveStatus() {
    const liveStatusPill = document.getElementById('hero-live-status');
    const liveStatusText = document.getElementById('live-status-text');
    if (!liveStatusPill || !liveStatusText) return;

    // Calculate current Addis Ababa Time (UTC+3)
    const now = new Date();
    const utcHours = now.getUTCHours();
    const eatHours = (utcHours + 3) % 24;

    // Open from 8:00 AM (8) to 10:00 PM (22)
    const isOpen = eatHours >= 8 && eatHours < 22;

    if (isOpen) {
      liveStatusPill.classList.remove('closed');
      liveStatusText.textContent = translations[currentLang].live_status_open || 'Open Now (Until 10:00 PM)';
    } else {
      liveStatusPill.classList.add('closed');
      liveStatusText.textContent = translations[currentLang].live_status_closed || 'Closed Now (Opens at 8:00 AM)';
    }
  }

  function updateBranchUI(branchId) {
    const data = branchesData[branchId];
    if (!data) return;
    activeBranch = branchId;

    const branchNameEl = document.getElementById('branch-active-name');
    const branchAddressEl = document.getElementById('branch-active-address');
    const branchDescEl = document.getElementById('branch-active-desc');
    const branchMapIframe = document.getElementById('branch-map-iframe');
    const branchDirectionsBtn = document.getElementById('branch-directions-btn');
    const branchPhone1 = document.getElementById('branch-phone-1');
    const branchPhone2 = document.getElementById('branch-phone-2');

    if (branchNameEl && translations[currentLang][data.nameKey]) {
      branchNameEl.textContent = translations[currentLang][data.nameKey];
    }
    if (branchAddressEl && translations[currentLang][data.addressKey]) {
      branchAddressEl.textContent = translations[currentLang][data.addressKey];
    }
    if (branchDescEl && translations[currentLang][data.descKey]) {
      branchDescEl.textContent = translations[currentLang][data.descKey];
    }
    if (branchMapIframe) {
      branchMapIframe.src = data.mapUrl;
    }
    if (branchDirectionsBtn) {
      branchDirectionsBtn.href = data.directionsUrl;
    }
    if (branchPhone1) {
      branchPhone1.href = `tel:${data.phone1}`;
      branchPhone1.querySelector('.phone-text').textContent = data.phone1Display;
    }
    if (branchPhone2) {
      branchPhone2.href = `tel:${data.phone2}`;
      branchPhone2.querySelector('.phone-text').textContent = data.phone2Display;
    }
  }

  // Bind Language switch events
  langAmBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage('am');
    });
  });

  langEnBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage('en');
    });
  });

  // Branch Switcher Tabs
  const branchTabs = document.querySelectorAll('.branch-tab-btn');
  branchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      branchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const branchId = tab.getAttribute('data-branch');
      updateBranchUI(branchId);
    });
  });

  // Initialize Language & Branch
  setLanguage(currentLang);

  // 2. Sticky Header Elevation on Scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Drawer Navigation
  const menuToggleBtn = document.querySelector('.menu-toggle-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  function toggleMobileMenu() {
    const isOpen = mobileDrawer.classList.toggle('open');
    menuToggleBtn.classList.toggle('open', isOpen);
    menuToggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    menuToggleBtn.classList.remove('open');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggleBtn && mobileDrawer) {
    menuToggleBtn.addEventListener('click', toggleMobileMenu);
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileMenu();
      }
    });
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // 4. Menu Category Filtering
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const dishCards = document.querySelectorAll('.dish-card');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      dishCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (category && category.includes(filter))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Gallery Category Filtering (Branches & Food)
  const galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-gallery-cat');
        if (filter === 'all' || category === filter || (category && category.includes(filter))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 6. Native Lightbox Modal with <dialog>
  const lightboxDialog = document.getElementById('lightbox-dialog');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  if (lightboxDialog && lightboxImg) {
    const zoomableItems = document.querySelectorAll('[data-zoomable]');
    zoomableItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-full-img') || item.querySelector('img')?.src;
        if (imgSrc) {
          lightboxImg.src = imgSrc;
          lightboxDialog.showModal();
        }
      });
    });

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', () => lightboxDialog.close());
    }

    lightboxDialog.addEventListener('click', (e) => {
      if (e.target === lightboxDialog) {
        lightboxDialog.close();
      }
    });
  }

  // 7. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-fade');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
