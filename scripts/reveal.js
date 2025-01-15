class RevealOnScroll {
  constructor() {
    this.sections = document.querySelectorAll([
      '.section-2',
      '.section-3',
      '.service-areas',
      '.project-card',
      '.capability-section',
      '.results-container',
      '.reviews-container',
      '.pricing-container',
      '.cta-container',
      '.reveal-hidden'
    ].join(','));

    this.observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.40
    };

    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
    this.init();
  }

  init() {
    this.sections.forEach(section => {
      if (!section.classList.contains('reveal-hidden')) {
        section.classList.add('reveal-hidden');
      }
      this.observer.observe(section);
    });
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('reveal-visible');
        });
        this.observer.unobserve(entry.target);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RevealOnScroll();
}); 