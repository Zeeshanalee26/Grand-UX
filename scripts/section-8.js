class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.counter');
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
    
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
    this.init();
  }

  init() {
    this.counters.forEach(counter => {
      counter.innerText = '0';
      this.observer.observe(counter);
    });
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.animateCounter(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = (target / duration) * 16; // 16ms is roughly one frame
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.innerText = Math.round(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    requestAnimationFrame(updateCounter);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CounterAnimation();
}); 