class PricingSection {
  constructor() {
    this.initRevealAnimations();
  }

  initRevealAnimations() {
    const options = {
      threshold: 0.2,
      rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, options);

    document.querySelectorAll('.pricing-container').forEach(element => {
      revealObserver.observe(element);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PricingSection();
}); 