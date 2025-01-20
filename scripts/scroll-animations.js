class TextAnimator {
  constructor() {
    this.init();
  }

  init() {
    this.wrapTextElements();
    this.setupObserver();
  }

  wrapTextElements() {
    const textElements = document.querySelectorAll(`
      h1:not(.logo-text):not(.service-content h3):not(.project-info h3):not(.model-title):not(.pricing-title),
      h2:not(.logo-text):not(.model-title):not(.pricing-title):not(.pricing-subtitle),
      h3:not(.logo-text):not(.service-content h3):not(.project-info h3):not(.model-title):not(.pricing-title):not(.pricing-subtitle),
      .hero-subtitle,
      .section-3-text .text-line span,
      .service-header h2,
      .service-header h1,
      .capability-title,
      .capability-heading,
      .results-title,
      .reviews-title,
      .review-text,
      .cta-title
    `);

    textElements.forEach(element => {
      if (element.querySelector('.text-reveal__content')) return;
      if (element.classList.contains('text-reveal')) return;

      const originalContent = element.innerHTML;
      element.innerHTML = `<div class="text-reveal" style="padding-bottom: 0.1em"><div class="text-reveal__content">${originalContent}</div></div>`;
    });
  }

  setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const reveal = entry.target.querySelector('.text-reveal');
            if (reveal) {
              setTimeout(() => {
                reveal.classList.add('active');
              }, 150);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '-15% 0px',
        threshold: 0.15
      }
    );

    document.querySelectorAll('.text-reveal').forEach(el => {
      observer.observe(el.parentElement);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TextAnimator();
}); 