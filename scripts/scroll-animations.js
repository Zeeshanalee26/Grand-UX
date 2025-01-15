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
      h1:not(.logo-text),
      h2:not(.logo-text),
      h3:not(.logo-text),
      .hero-subtitle,
      .section-3-text .text-line span,
      .service-header h2,
      .service-header h1,
      .service-item h3,
      .service-item p,
      .section-6-header .label,
      .section-6-header .title,
      .project-info h3,
      .project-info p,
      .capability-title,
      .capability-heading,
      .results-title,
      .reviews-title,
      .review-text,
      .pricing-title,
      .pricing-subtitle,
      .model-title,
      .model-description,
      .cta-title
    `);

    textElements.forEach(element => {
      if (element.querySelector('.text-reveal__content')) return;
      if (element.classList.contains('text-reveal')) return;

      const originalContent = element.innerHTML;
      element.innerHTML = `<div class="text-reveal"><div class="text-reveal__content">${originalContent}</div></div>`;
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