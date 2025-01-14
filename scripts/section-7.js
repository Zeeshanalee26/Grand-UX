class CapabilityAccordion {
  constructor() {
    this.init();
    this.initRevealAnimations();
  }

  init() {
    const groups = document.querySelectorAll('.capability-group');
    
    groups.forEach(group => {
      const header = group.querySelector('.capability-header');
      header.addEventListener('click', () => this.toggleGroup(group));
    });
  }

  initRevealAnimations() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal-slide-up').forEach(element => {
      revealObserver.observe(element);
    });
  }

  toggleGroup(group) {
    const isActive = group.classList.contains('active');
    const section = document.querySelector('.section-7');
    const sectionRect = section.getBoundingClientRect();
    const header = group.querySelector('.capability-header');
    const headerRect = header.getBoundingClientRect();

    // Close other groups first
    document.querySelectorAll('.capability-group.active').forEach(activeGroup => {
      if (activeGroup !== group) {
        activeGroup.classList.remove('active');
      }
    });

    if (!isActive) {
      // Add active class to expand the group
      group.classList.add('active');

      // Calculate scroll position
      requestAnimationFrame(() => {
        const headerTop = headerRect.top + window.pageYOffset;
        const sectionTop = sectionRect.top + window.pageYOffset;
        const sectionPadding = 140; // Section's top padding
        
        // Calculate the target scroll position
        let targetScroll = headerTop - sectionPadding;

        // Ensure we don't scroll above the section
        targetScroll = Math.max(targetScroll, sectionTop);
        
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      });
    } else {
      group.classList.remove('active');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CapabilityAccordion();
}); 