/**
 * BESPOKE BY YENI — Luxury Bridal Atelier Interactive Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. PRELOADER
     -------------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('is-hidden')) {
      preloader.classList.add('is-hidden');
    }
  };
  window.addEventListener('load', () => setTimeout(hidePreloader, 650));
  setTimeout(hidePreloader, 1800); // Fallback

  /* --------------------------------------------------------------------------
     2. STICKY HEADER & MOBILE DRAWER
     -------------------------------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__nav a, .mobile-drawer__cta');

  const toggleDrawer = (open) => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.toggle('is-open', open);
    document.body.classList.toggle('locked', open);
  };

  if (menuToggle) menuToggle.addEventListener('click', () => toggleDrawer(true));
  if (drawerClose) drawerClose.addEventListener('click', () => toggleDrawer(false));
  drawerLinks.forEach((link) => link.addEventListener('click', () => toggleDrawer(false)));

  /* --------------------------------------------------------------------------
     3. HERO EDITORIAL SLIDER
     -------------------------------------------------------------------------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval = null;

  const setSlide = (index) => {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
  };

  const startSlider = () => {
    stopSlider();
    slideInterval = setInterval(() => setSlide(currentSlide + 1), 4800);
  };

  const stopSlider = () => {
    if (slideInterval) clearInterval(slideInterval);
  };

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      setSlide(idx);
      startSlider();
    });
  });

  const heroStage = document.querySelector('.hero-stage');
  if (heroStage) {
    heroStage.addEventListener('mouseenter', stopSlider);
    heroStage.addEventListener('mouseleave', startSlider);
  }
  startSlider();

  /* --------------------------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
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
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     5. LOOKBOOK FILTERING & QUICK SILHOUETTE INQUIRY
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const lookCards = document.querySelectorAll('.look-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      lookCards.forEach((card) => {
        const categories = (card.dataset.category || '').split(' ');
        const match = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  // Quick "Request This Silhouette" button on lookbook cards
  const silhouetteBtns = document.querySelectorAll('.look-card__inquire-btn');
  const dreamLookInput = document.getElementById('brideMessage');
  const interestSelect = document.getElementById('brideService');

  silhouetteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const gownName = btn.dataset.gown || 'Bespoke Bridal Gown';
      const serviceType = btn.dataset.service || 'Wedding dress';

      if (interestSelect) {
        interestSelect.value = serviceType;
      }
      if (dreamLookInput) {
        const prefix = `I love the "${gownName}" silhouette from your portfolio and would like something inspired by this look.`;
        dreamLookInput.value = dreamLookInput.value
          ? `${prefix}\n\n${dreamLookInput.value}`
          : prefix;
      }
      const inquireSection = document.getElementById('inquire');
      if (inquireSection) {
        inquireSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => dreamLookInput && dreamLookInput.focus(), 700);
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. FULL-SCREEN LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const galleryTriggers = Array.from(document.querySelectorAll('.look-card__media'));
  let activeGalleryIndex = 0;

  const openLightbox = (index) => {
    if (!lightbox || !galleryTriggers.length) return;
    activeGalleryIndex = (index + galleryTriggers.length) % galleryTriggers.length;
    const trigger = galleryTriggers[activeGalleryIndex];
    const imgEl = trigger.querySelector('img');
    const title = trigger.dataset.title || (imgEl ? imgEl.alt : '');
    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = title;
    }
    lightbox.classList.add('is-open');
    document.body.classList.add('locked');
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.classList.remove('locked');
  };

  galleryTriggers.forEach((trigger, idx) => {
    trigger.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => openLightbox(activeGalleryIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => openLightbox(activeGalleryIndex + 1));

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(activeGalleryIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(activeGalleryIndex + 1);
  });

  /* --------------------------------------------------------------------------
     7. INTERACTIVE BESPOKE BRIDAL SUITE ESTIMATOR
     -------------------------------------------------------------------------- */
  const serviceRows = document.querySelectorAll('.service-row');
  const estimatorList = document.getElementById('estimatorList');
  const estimatorTotal = document.getElementById('estimatorTotal');
  const estimatorDeposit = document.getElementById('estimatorDeposit');
  const partyQtyWrap = document.getElementById('partyQtyWrap');
  const partyQtyVal = document.getElementById('partyQtyVal');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const applyEstimateBtn = document.getElementById('applyEstimateBtn');

  let partyPieces = 4;

  const formatNaira = (num) => '₦' + Number(num).toLocaleString('en-NG');

  const updateEstimator = () => {
    if (!estimatorList || !estimatorTotal || !estimatorDeposit) return;

    const selected = Array.from(serviceRows).filter((row) => row.classList.contains('is-selected'));
    estimatorList.innerHTML = '';

    let total = 0;
    let hasPerPiece = false;

    if (selected.length === 0) {
      estimatorList.innerHTML = `<li class="estimator-item"><span>Select any service on the left to build your custom bridal estimate.</span></li>`;
    } else {
      selected.forEach((row) => {
        const name = row.dataset.name;
        const basePrice = parseInt(row.dataset.price || '0', 10);
        const isPerPiece = row.dataset.perPiece === 'true';

        if (isPerPiece) hasPerPiece = true;
        const itemTotal = isPerPiece ? basePrice * partyPieces : basePrice;
        total += itemTotal;

        const li = document.createElement('li');
        li.className = 'estimator-item';
        li.innerHTML = `
          <span>${name}${isPerPiece ? ` (×${partyPieces})` : ''}</span>
          <strong>${formatNaira(itemTotal)}</strong>
        `;
        estimatorList.appendChild(li);
      });
    }

    if (partyQtyWrap) {
      partyQtyWrap.style.display = hasPerPiece ? 'flex' : 'none';
    }

    estimatorTotal.textContent = formatNaira(total);
    const deposit = Math.round(total * 0.6);
    estimatorDeposit.textContent = formatNaira(deposit);
  };

  serviceRows.forEach((row) => {
    row.addEventListener('click', () => {
      row.classList.toggle('is-selected');
      updateEstimator();
    });
  });

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (partyPieces > 1) {
        partyPieces -= 1;
        if (partyQtyVal) partyQtyVal.textContent = partyPieces;
        updateEstimator();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      if (partyPieces < 50) {
        partyPieces += 1;
        if (partyQtyVal) partyQtyVal.textContent = partyPieces;
        updateEstimator();
      }
    });
  }

  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      const selected = Array.from(serviceRows).filter((row) => row.classList.contains('is-selected'));
      const names = selected.map((r) => {
        const n = r.dataset.name;
        return r.dataset.perPiece === 'true' ? `${n} (×${partyPieces} pieces)` : n;
      });
      const totalStr = estimatorTotal ? estimatorTotal.textContent : '';

      if (names.length && dreamLookInput) {
        const summaryLine = `Selected Bridal Package (${totalStr} starting estimate): ${names.join(', ')}.`;
        dreamLookInput.value = dreamLookInput.value
          ? `${summaryLine}\n\n${dreamLookInput.value}`
          : summaryLine;
      }

      const inquireSection = document.getElementById('inquire');
      if (inquireSection) inquireSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  updateEstimator();

  /* --------------------------------------------------------------------------
     8. ALONUKO-INSPIRED APPOINTMENT CATEGORY SELECTOR & TIMELINE CHECKER
     -------------------------------------------------------------------------- */
  const apptOptions = document.querySelectorAll('.appt-option');
  let selectedApptCategory = 'Full Bridal Consultation (₦20,000 — Credited to Order)';

  apptOptions.forEach((opt) => {
    opt.addEventListener('click', () => {
      apptOptions.forEach((o) => {
        o.classList.remove('is-active');
        const btn = o.querySelector('.appt-option__btn');
        if (btn) btn.textContent = 'SELECT';
      });
      opt.classList.add('is-active');
      const activeBtn = opt.querySelector('.appt-option__btn');
      if (activeBtn) activeBtn.textContent = 'SELECTED';
      selectedApptCategory = opt.dataset.appt || selectedApptCategory;

      const mappedService = opt.dataset.service;
      if (mappedService && interestSelect) {
        interestSelect.value = mappedService;
      }
    });
  });

  // Wedding Date Lead-Time Checker
  const dateInput = document.getElementById('brideDate');
  const dateFeedback = document.getElementById('dateFeedback');

  if (dateInput && dateFeedback) {
    dateInput.addEventListener('change', () => {
      if (!dateInput.value) {
        dateFeedback.textContent = '';
        return;
      }
      const chosen = new Date(dateInput.value);
      const now = new Date();
      const diffDays = Math.ceil((chosen - now) / (1000 * 60 * 60 * 24));
      const approxMonths = (diffDays / 30.44).toFixed(1);

      if (diffDays <= 0) {
        dateFeedback.textContent = 'Please select an upcoming wedding or event date.';
      } else if (diffDays < 115) {
        dateFeedback.textContent = `⚡ Note: Your date is ~${approxMonths} months away. Standard lead time is 4–6 months; rush orders are accepted subject to schedule availability (a rush fee applies).`;
      } else {
        dateFeedback.textContent = `✓ Wonderful timeline! Your date is ~${approxMonths} months away — ideal for bespoke sketching, fabric sourcing, and two fittings.`;
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. WHATSAPP & EMAIL INQUIRY DISPATCH
     -------------------------------------------------------------------------- */
  const buildInquiryText = () => {
    const name = (document.getElementById('brideName')?.value || '').trim() || 'Prospective Bride';
    const phone = (document.getElementById('bridePhone')?.value || '').trim() || 'Not provided';
    const date = (document.getElementById('brideDate')?.value || '').trim() || 'To be confirmed';
    const service = (document.getElementById('brideService')?.value || '').trim() || 'Wedding dress';
    const message = (document.getElementById('brideMessage')?.value || '').trim() || 'I would love to book a bridal consultation and discuss my custom outfit.';

    return [
      '✨ *BESPOKE BY YENI — BRIDAL INQUIRY* ✨',
      '',
      `*Name:* ${name}`,
      `*Phone / WhatsApp:* ${phone}`,
      `*Appointment Type:* ${selectedApptCategory}`,
      `*Primary Outfit Interest:* ${service}`,
      `*Wedding / Event Date:* ${date}`,
      '',
      '*Dream Look & Details:*',
      message
    ].join('\n');
  };

  const whatsappBtn = document.getElementById('sendWhatsappBtn');
  const emailBtn = document.getElementById('sendEmailBtn');

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const text = buildInquiryText();
      const url = `https://wa.me/2347034460677?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const plainText = buildInquiryText().replace(/\*/g, '');
      const name = (document.getElementById('brideName')?.value || '').trim();
      const subject = name ? `Bridal Inquiry — ${name} | Bespoke by Yeni` : 'Bridal Inquiry | Bespoke by Yeni';
      window.location.href = `mailto:bespokebyyeni@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainText)}`;
    });
  }
});
