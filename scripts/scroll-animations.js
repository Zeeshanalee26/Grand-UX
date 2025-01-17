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
      h1:not(.logo-text):not(.service-content h3):not(.project-info h3):not(.model-title),
      h2:not(.logo-text):not(.model-title),
      h3:not(.logo-text):not(.service-content h3):not(.project-info h3):not(.model-title),
      .hero-subtitle,
      .section-3-text .text-line span,
      .service-header h2,
      .service-header h1,
      .capability-title,
      .capability-heading,
      .results-title,
      .reviews-title,
      .review-text,
      .pricing-title,
      .pricing-subtitle,
      .cta-title
    `);

    textElements.forEach(element => {
      if (element.querySelector('.text-reveal__content')) return;
      if (element.classList.contains('text-reveal')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'text-reveal';
      wrapper.style.height = 'auto';
      wrapper.style.overflow = 'visible';

      const content = document.createElement('div');
      content.className = 'text-reveal__content';
      content.style.height = 'auto';
      content.style.overflow = 'visible';
      content.innerHTML = element.innerHTML;

      wrapper.appendChild(content);
      element.innerHTML = '';
      element.appendChild(wrapper);
    });
  }

  setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const reveal = entry.target.querySelector('.text-reveal');
            if (reveal) {
              reveal.style.height = 'auto';
              reveal.style.overflow = 'visible';
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