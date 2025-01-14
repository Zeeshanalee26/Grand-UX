class ResultsCounter {
  constructor() {
    this.initRevealAnimations();
    this.initCounters();
  }

  initRevealAnimations() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.classList.contains('results-container')) {
            // Start counting immediately when section is visible
            this.startCounting();
          }
        }
      });
    }, {
      threshold: 0.3
    });

    document.querySelectorAll('.reveal-slide-up').forEach(element => {
      revealObserver.observe(element);
    });
  }

  initCounters() {
    this.counters = document.querySelectorAll('.counter');
  }

  startCounting() {
    this.counters.forEach((counter, index) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const startTime = performance.now();
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smoother easing function
        const easing = t => t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const easedProgress = easing(progress);
        
        const currentValue = Math.floor(easedProgress * target);
        counter.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      requestAnimationFrame(updateCounter);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ResultsCounter();
}); 