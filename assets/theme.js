document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Expose the live header height so the hero can fill exactly from the
// base of the (sticky) header down to the bottom of the viewport.
const setHeaderHeight = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
};
setHeaderHeight();
window.addEventListener('resize', setHeaderHeight);
window.addEventListener('load', setHeaderHeight);

// ── Mobile Menu Drawer ─────────────────────────────────────────────────────

(function () {
  const drawer = document.getElementById('MobileMenuDrawer');
  const openBtn = document.querySelector('[data-mobile-menu-open]');
  if (!drawer) return;

  const open = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn && openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn && openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-mobile-menu-open]').forEach((el) => {
    el.addEventListener('click', open);
  });

  drawer.querySelectorAll('[data-mobile-menu-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });
})();

document.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const target = document.querySelector('[data-gallery-main]');
    if (!target) return;

    target.src = thumb.dataset.galleryFull;
    target.alt = thumb.alt;

    document.querySelectorAll('.product-thumb').forEach((btn) => btn.classList.remove('is-active'));
    thumb.closest('.product-thumb')?.classList.add('is-active');
  });
});

document.querySelectorAll('[data-quantity-selector]').forEach((selector) => {
  const input = selector.querySelector('[data-quantity-input]');
  if (!input) return;

  const step = (delta) => {
    const min = parseInt(input.min, 10) || 1;
    const next = (parseInt(input.value, 10) || min) + delta;
    input.value = Math.max(min, next);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };

  selector.querySelector('[data-quantity-minus]')?.addEventListener('click', () => step(-1));
  selector.querySelector('[data-quantity-plus]')?.addEventListener('click', () => step(1));
});

document.querySelectorAll('[data-slider]').forEach((slider) => {
  const track = slider.querySelector('[data-slider-track]');
  const slides = Array.from(slider.querySelectorAll('.lib-slider__slide'));
  const prevButton = slider.querySelector('[data-slider-prev]');
  const nextButton = slider.querySelector('[data-slider-next]');
  const dotsContainer = slider.querySelector('[data-slider-dots]');
  const mediaQuery = window.matchMedia('(min-width: 981px)');
  let index = 0;
  let dots = [];

  if (!track || slides.length === 0) return;

  const getPerView = () => (mediaQuery.matches ? 2 : 1);
  const getMaxIndex = () => Math.max(0, slides.length - getPerView());

  const renderDots = () => {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    dots = Array.from({ length: getMaxIndex() + 1 }, (_, dotIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to slide ${dotIndex + 1}`);
      dot.addEventListener('click', () => {
        index = dotIndex;
        update();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });
  };

  const update = () => {
    index = Math.min(Math.max(index, 0), getMaxIndex());
    const slideWidth = slider.clientWidth / getPerView();
    track.style.transform = `translate3d(-${index * slideWidth}px, 0, 0)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === getMaxIndex();
  };

  prevButton?.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextButton?.addEventListener('click', () => {
    index += 1;
    update();
  });

  window.addEventListener('resize', () => {
    renderDots();
    update();
  });

  renderDots();
  update();
});

document.querySelectorAll('[data-review-carousel]').forEach((carousel) => {
  const viewport = carousel.querySelector('.review-carousel__viewport');
  const track = carousel.querySelector('[data-review-carousel-track]');
  const slides = Array.from(carousel.querySelectorAll('.review-carousel__slide'));
  const prevButton = carousel.querySelector('[data-review-carousel-prev]');
  const nextButton = carousel.querySelector('[data-review-carousel-next]');
  const dotsContainer = carousel.querySelector('[data-review-carousel-dots]');
  const desktopQuery = window.matchMedia('(min-width: 981px)');
  const tabletQuery = window.matchMedia('(min-width: 641px)');
  let index = 0;
  let dots = [];

  if (!viewport || !track || slides.length === 0) return;

  const getPerView = () => {
    if (desktopQuery.matches) return 3;
    if (tabletQuery.matches) return 2;
    return 1;
  };

  const getMaxIndex = () => Math.max(0, slides.length - getPerView());

  const renderDots = () => {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    dots = Array.from({ length: getMaxIndex() + 1 }, (_, dotIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to review ${dotIndex + 1}`);
      dot.addEventListener('click', () => {
        index = dotIndex;
        update();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });
  };

  const update = () => {
    index = Math.min(Math.max(index, 0), getMaxIndex());
    const slideWidth = viewport.clientWidth / getPerView();
    track.style.transform = `translate3d(-${index * slideWidth}px, 0, 0)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === getMaxIndex();
  };

  prevButton?.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextButton?.addEventListener('click', () => {
    index += 1;
    update();
  });

  window.addEventListener('resize', () => {
    renderDots();
    update();
  });

  renderDots();
  update();
});

document.querySelectorAll('[data-featured-gallery]').forEach((gallery) => {
  const track = gallery.querySelector('[data-featured-gallery-track]');
  const slides = Array.from(gallery.querySelectorAll('.featured-gallery__slide'));
  const prevButton = gallery.querySelector('[data-featured-gallery-prev]');
  const nextButton = gallery.querySelector('[data-featured-gallery-next]');
  const dotsContainer = gallery.querySelector('[data-featured-gallery-dots]');
  let index = 0;
  let dots = [];

  if (!track || slides.length === 0) return;

  if (slides.length <= 1) {
    gallery.classList.add('is-static');
    return;
  }

  const renderDots = () => {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    dots = slides.map((_, dotIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to product image ${dotIndex + 1}`);
      dot.addEventListener('click', () => {
        index = dotIndex;
        update();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });
  };

  const update = () => {
    index = Math.min(Math.max(index, 0), slides.length - 1);
    track.style.transform = `translate3d(-${index * gallery.clientWidth}px, 0, 0)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === slides.length - 1;
  };

  prevButton?.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextButton?.addEventListener('click', () => {
    index += 1;
    update();
  });

  window.addEventListener('resize', update);

  renderDots();
  update();
});

// ── Review Badge (bottom-right pill) ───────────────────────────────────────
// Shows the store-wide average from ShopReviewData (Judge.me shop metafields).
// Falls back to the flagship product's jdgm widget data if shop avg = 0.

(function () {
  const badge   = document.getElementById('ReviewBadge');
  const dataEl  = document.getElementById('ShopReviewData');
  if (!badge || !dataEl) return;

  let shopData;
  try { shopData = JSON.parse(dataEl.textContent); } catch (_) { return; }

  const shopAvg   = parseFloat(shopData.shopAvg)    || 0;
  const shopCount = parseInt(shopData.shopCount, 10) || 0;
  const sourceId  = shopData.sourceId;

  const render = (avg, count) => {
    if (!avg) return;
    badge.querySelector('.review-badge__avg').textContent   = avg.toFixed(1);
    badge.querySelector('.review-badge__count').textContent =
      count.toLocaleString() + ' review' + (count !== 1 ? 's' : '');
    badge.hidden = false;
    setTimeout(() => badge.classList.add('is-visible'), 700);
  };

  if (shopAvg > 0) {
    // Shop-level metafield is populated — use it directly
    render(shopAvg, shopCount);
  } else if (sourceId) {
    // Fallback: read from the flagship product's jdgm widget data
    const tryRender = (attempts) => {
      const w        = window.jdgm;
      const jdgmData = w && w.data && w.data.reviewWidget && w.data.reviewWidget[sourceId];
      if (jdgmData) {
        const avg   = (jdgmData.bottomline && jdgmData.bottomline.averageScore) || 0;
        const count = (jdgmData.bottomline && jdgmData.bottomline.totalReview)  || 0;
        render(avg, count);
      } else if (attempts < 25) {
        setTimeout(() => tryRender(attempts + 1), 200);
      }
    };
    tryRender(0);
  }
})();

// ── Review Toast (bottom-left) ──────────────────────────────────────────────
// Reads individual review quotes from window.jdgm.data.reviewWidget[productId].
// ProductReviewData is injected by main-product.liquid (product pages) or
// layout/theme.liquid (all other pages) with the relevant product's ID.

(function () {
  const toast  = document.getElementById('ReviewToast');
  const dataEl = document.getElementById('ProductReviewData');
  if (!toast || !dataEl) return;

  let meta;
  try { meta = JSON.parse(dataEl.textContent); } catch (_) { return; }

  const productId = meta && meta.productId;
  if (!productId) return;

  // ── Helpers ────────────────────────────────────────────────────────

  const starHtml = (rating) =>
    Array.from({ length: 5 }, (_, i) =>
      `<span style="color:${i < Math.round(rating) ? '#c79b63' : 'rgba(33,29,32,0.2)'}">★</span>`
    ).join('');

  // Normalise Judge.me review — field names vary between widget versions
  const normalise = (r) => ({
    author: (r.reviewer && r.reviewer.name) || r.name || r.author || 'Customer',
    rating: r.score || r.rating || 5,
    body:   (r.body || r.content || '').substring(0, 90),
  });

  // ── Get jdgm widget data ───────────────────────────────────────────

  const getJdgmData = () => {
    const w = window.jdgm;
    return (w && w.data && w.data.reviewWidget && w.data.reviewWidget[productId]) || null;
  };

  // ── Build and start the toast ──────────────────────────────────────

  const build = (jdgmData) => {
    if (!jdgmData) return;

    const reviews = (jdgmData.reviews || [])
      .slice(0, 8)
      .map(normalise)
      .filter((r) => r.body.length > 0);

    if (reviews.length === 0) return;

    const avatarEl = toast.querySelector('.review-toast__avatar');
    const nameEl   = toast.querySelector('.review-toast__name');
    const starsEl  = toast.querySelector('.review-toast__stars');
    const textEl   = toast.querySelector('.review-toast__text');

    let idx         = 0;
    let rotateTimer = null;
    let dismissed   = false;

    const populate = (i) => {
      const r = reviews[i % reviews.length];
      avatarEl.textContent = (r.author || '?').charAt(0).toUpperCase();
      nameEl.textContent   = r.author;
      starsEl.innerHTML    = starHtml(r.rating);
      textEl.textContent   = r.body;
    };

    const show = () => {
      if (dismissed) return;
      populate(idx);
      toast.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('is-visible')));
    };

    const hide = (cb) => {
      toast.classList.remove('is-visible');
      setTimeout(() => { if (cb) cb(); }, 440);
    };

    const rotate = () => {
      if (dismissed || reviews.length <= 1) return;
      hide(() => {
        idx = (idx + 1) % reviews.length;
        populate(idx);
        requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('is-visible')));
      });
    };

    toast.querySelector('.review-toast__close')?.addEventListener('click', () => {
      dismissed = true;
      clearInterval(rotateTimer);
      hide(() => { toast.hidden = true; });
    });

    setTimeout(() => {
      show();
      if (reviews.length > 1) rotateTimer = setInterval(rotate, 7000);
    }, 2000);
  };

  // Try immediately; poll briefly if Judge.me JS hasn't finished yet
  const immediate = getJdgmData();
  if (immediate) {
    build(immediate);
  } else {
    let attempts = 0;
    const poll = setInterval(() => {
      const d = getJdgmData();
      if (d || attempts++ > 25) {
        clearInterval(poll);
        if (d) build(d);
      }
    }, 200);
  }
})();

// ── Product image lightbox ──────────────────────────────────────────────────

(function () {
  const lightbox = document.querySelector('[data-product-lightbox]');
  const lightboxImg = lightbox && lightbox.querySelector('[data-lightbox-img]');
  const zoomBtn = document.querySelector('[data-product-zoom]');

  if (!lightbox || !lightboxImg) return;

  const openLightbox = () => {
    const mainImg = document.querySelector('[data-gallery-main]');
    if (!mainImg) return;
    lightboxImg.src = mainImg.dataset.fullSrc || mainImg.src;
    lightboxImg.alt = mainImg.alt;
    lightboxImg.classList.remove('is-zoomed');
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    lightboxImg.classList.remove('is-zoomed');
  };

  zoomBtn && zoomBtn.addEventListener('click', openLightbox);

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  lightboxImg.addEventListener('click', () => {
    lightboxImg.classList.toggle('is-zoomed');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
})();

// ── Cart Drawer ────────────────────────────────────────────────────────────

const CartDrawer = (() => {
  const drawer = document.getElementById('CartDrawer');
  if (!drawer) return null;

  const bodyEl = drawer.querySelector('[data-cart-body]');
  const footEl = drawer.querySelector('[data-cart-foot]');

  const money = (cents) => {
    const currency = (typeof Shopify !== 'undefined' && Shopify.currency?.active) || 'USD';
    return new Intl.NumberFormat(navigator.language || 'en-US', {
      style: 'currency',
      currency,
    }).format(cents / 100);
  };

  const imgUrl = (url) => {
    if (!url) return '';
    return url.split('?')[0] + '?width=160&height=160&crop=center';
  };

  const render = (cart) => {
    // Update all cart count badges in the header
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = cart.item_count;
    });

    if (cart.item_count === 0) {
      bodyEl.innerHTML = '<p class="cart-drawer__empty">Your cart is empty.</p>';
      footEl.hidden = true;
      return;
    }

    bodyEl.innerHTML = cart.items
      .map(
        (item) => `
      <div class="cart-drawer__item" data-item-key="${item.key}">
        <a href="${item.url}">
          <img class="cart-drawer__item-img" src="${imgUrl(item.featured_image?.url)}" alt="${item.title}" width="76" height="76">
        </a>
        <div class="cart-drawer__item-info">
          <a class="cart-drawer__item-title" href="${item.url}">${item.product_title}</a>
          ${item.variant_title && item.variant_title !== 'Default Title' ? `<span class="cart-drawer__item-variant">${item.variant_title}</span>` : ''}
          <div class="cart-drawer__item-row">
            <div class="cart-drawer__qty">
              <button class="cart-drawer__qty-btn" data-qty-key="${item.key}" data-delta="-1" aria-label="Decrease quantity">−</button>
              <span class="cart-drawer__qty-count">${item.quantity}</span>
              <button class="cart-drawer__qty-btn" data-qty-key="${item.key}" data-delta="1" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-drawer__item-price">${money(item.final_line_price)}</span>
          </div>
        </div>
        <button class="cart-drawer__remove" data-remove-key="${item.key}" aria-label="Remove ${item.product_title}">×</button>
      </div>`
      )
      .join('');

    footEl.innerHTML = `
      <div class="cart-drawer__subtotal">
        <span>Subtotal</span>
        <span>${money(cart.total_price)}</span>
      </div>
      <p class="cart-drawer__note">Shipping &amp; taxes calculated at checkout.</p>
      <a href="/cart" class="button button--outline button--full">View Cart</a>
      <a href="/checkout" class="button button--full">Checkout</a>
    `;
    footEl.hidden = false;

    // Bind quantity and remove buttons
    bodyEl.querySelectorAll('[data-qty-key]').forEach((btn) => {
      btn.addEventListener('click', () => changeQty(btn.dataset.qtyKey, parseInt(btn.dataset.delta, 10)));
    });
    bodyEl.querySelectorAll('[data-remove-key]').forEach((btn) => {
      btn.addEventListener('click', () => removeItem(btn.dataset.removeKey));
    });
  };

  const fetchCart = async () => {
    const res = await fetch('/cart.js');
    return res.json();
  };

  const refresh = async () => {
    const cart = await fetchCart();
    render(cart);
  };

  const changeQty = async (key, delta) => {
    bodyEl.classList.add('cart-drawer__loading');
    const cart = await fetchCart();
    const item = cart.items.find((i) => i.key === key);
    if (!item) return;
    const newQty = Math.max(0, item.quantity + delta);
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: newQty }),
    });
    render(await res.json());
    bodyEl.classList.remove('cart-drawer__loading');
  };

  const removeItem = async (key) => {
    bodyEl.classList.add('cart-drawer__loading');
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 }),
    });
    render(await res.json());
    bodyEl.classList.remove('cart-drawer__loading');
  };

  const open = async () => {
    await refresh();
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Open triggers (cart icon in header)
  document.querySelectorAll('[data-cart-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  });

  // Close triggers (backdrop + close button)
  drawer.querySelectorAll('[data-cart-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });

  // Intercept all add-to-cart form submissions
  document.addEventListener('submit', async (e) => {
    const form = e.target;
    const action = form.getAttribute('action') || '';
    if (!action.includes('/cart/add')) return;
    e.preventDefault();
    try {
      const res = await fetch('/cart/add.js', { method: 'POST', body: new FormData(form) });
      if (res.ok) open();
    } catch (_) {
      form.submit();
    }
  });

  return { open, close, refresh };
})();

// ── Customer review form & star picker ─────────────────────────────────────

(function () {
  const writeBtn = document.querySelector('[data-write-review]');
  const cancelBtn = document.querySelector('[data-cancel-review]');
  const reviewForm = document.querySelector('[data-review-form]');

  if (writeBtn && reviewForm) {
    writeBtn.addEventListener('click', () => {
      reviewForm.hidden = false;
      reviewForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (cancelBtn && reviewForm) {
    cancelBtn.addEventListener('click', () => {
      reviewForm.hidden = true;
    });
  }

  const starPicker = document.querySelector('[data-star-picker]');
  const ratingHidden = document.querySelector('[data-rating-hidden]');

  if (starPicker) {
    const starBtns = Array.from(starPicker.querySelectorAll('.review-star-btn'));
    let selected = 5;

    const highlight = (upTo) => {
      starBtns.forEach((btn) => {
        btn.classList.toggle('is-selected', parseInt(btn.dataset.star, 10) <= upTo);
      });
    };

    highlight(selected);

    starBtns.forEach((btn) => {
      btn.addEventListener('mouseenter', () => highlight(parseInt(btn.dataset.star, 10)));
      btn.addEventListener('mouseleave', () => highlight(selected));
      btn.addEventListener('click', () => {
        selected = parseInt(btn.dataset.star, 10);
        highlight(selected);
        if (ratingHidden) ratingHidden.value = selected;
      });
    });
  }
})();

// ── Search Panel ────────────────────────────────────────────────────────────

(function () {
  const panel = document.getElementById('SearchPanel');
  if (!panel) return;

  const input    = panel.querySelector('[data-search-input]');
  const results  = panel.querySelector('[data-search-results]');
  const trending = panel.querySelector('[data-search-trending]');

  let debounceTimer = null;

  const formatPrice = (cents) => {
    const currency = (typeof Shopify !== 'undefined' && Shopify.currency?.active) || 'USD';
    return new Intl.NumberFormat(navigator.language || 'en-US', {
      style: 'currency',
      currency,
    }).format((cents || 0) / 100);
  };

  const open = () => {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus after slide-in completes
    setTimeout(() => input?.focus(), 390);
  };

  const close = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (input) input.value = '';
    if (results) results.innerHTML = '';
    if (trending) trending.hidden = false;
  };

  // Open triggers — the search icon button in the header
  document.querySelectorAll('[data-search-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  });

  // Close triggers — backdrop + X button
  panel.querySelectorAll('[data-search-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
  });

  // Predictive search via Shopify suggest API
  const doSearch = async (q) => {
    if (!q || q.length < 2) {
      results.innerHTML = '';
      if (trending) trending.hidden = false;
      return;
    }
    if (trending) trending.hidden = true;

    try {
      const url =
        `/search/suggest.json?q=${encodeURIComponent(q)}` +
        `&resources[type]=product&resources[limit]=6` +
        `&resources[options][fields]=title,product_type,variants.title`;

      const res  = await fetch(url);
      const data = await res.json();
      const products = data?.resources?.results?.products || [];

      if (products.length === 0) {
        results.innerHTML = '<p class="search-panel__no-results">No products found.</p>';
        return;
      }

      results.innerHTML = products
        .map((p) => {
          const imgSrc = p.featured_image?.url
            ? `${p.featured_image.url.split('?')[0]}?width=112&height=112&crop=center`
            : '';
          const imgTag = imgSrc
            ? `<img class="search-panel__result-img" src="${imgSrc}" alt="${p.title}" width="56" height="56" loading="lazy">`
            : `<div class="search-panel__result-img"></div>`;
          return `
            <a class="search-panel__result" href="${p.url}">
              ${imgTag}
              <div class="search-panel__result-info">
                <span class="search-panel__result-title">${p.title}</span>
                <span class="search-panel__result-price">${formatPrice(p.price)}</span>
              </div>
            </a>`;
        })
        .join('');
    } catch (_) {
      results.innerHTML = '';
    }
  };

  input?.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => doSearch(input.value.trim()), 260);
  });
})();

// ── Scroll Reveal ───────────────────────────────────────────────────────────

(function () {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Skip if IntersectionObserver not supported
  if (!window.IntersectionObserver) return;

  const SELECTORS = [
    '.section-heading',
    '.product-family-card',
    '.featured-product',
    '.about-value-card',
    '.about-team-tile',
    '.about-stat',
    '.about-mission__inner',
    '.about-image-break',
    '.about-story-split__content',
    '.about-story-split__media',
    '.guide-article__section',
    '.guide-article__callout',
    '.guide-article__cta',
    '.product-story__block',
    '.product-story__highlight',
    '.review-card',
    '.ymal-card',
    '.community-banner__inner',
    '.footer-col',
  ].join(',');

  const elements = document.querySelectorAll(SELECTORS);
  if (!elements.length) return;

  // Add base class; also stagger siblings that share the same grid/flex parent
  const staggeredParents = new Set();

  elements.forEach((el) => {
    el.classList.add('scroll-reveal');

    const parent = el.parentElement;
    if (!parent || staggeredParents.has(parent)) return;

    const siblings = Array.from(parent.children).filter((c) =>
      c.classList.contains('scroll-reveal')
    );
    if (siblings.length > 1) {
      staggeredParents.add(parent);
      siblings.forEach((sib, i) => {
        sib.style.transitionDelay = `${i * 0.09}s`;
      });
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -52px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();
