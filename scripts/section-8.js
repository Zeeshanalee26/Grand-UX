class CounterAnimation {
  constructor() {
    this.init();
  }

  init() {
    const counters = document.querySelectorAll('.section-8 .counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-target'));
          this.animateValue(element, target);
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-10% 0px'
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateValue(element, target) {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easeOutQuad = t => t * (2 - t);
      const currentValue = Math.floor(easeOutQuad(progress) * target);

      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(update);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CounterAnimation();
}); 