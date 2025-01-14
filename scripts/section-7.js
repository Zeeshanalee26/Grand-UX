class CapabilitySection {
  constructor() {
    this.groups = document.querySelectorAll('.capability-group');
    this.activeGroup = null;
    this.initializeGroups();
    this.setupItemAnimations();
  }

  setupItemAnimations() {
    this.groups.forEach(group => {
      const items = group.querySelectorAll('.capability-item');
      items.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
      });
    });
  }

  initializeGroups() {
    this.groups.forEach(group => {
      const header = group.querySelector('.capability-header');
      header.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.isAnimating) {
          this.toggleGroup(group);
        }
      });
    });
  }

  toggleGroup(clickedGroup) {
    this.isAnimating = true;

    if (this.activeGroup && this.activeGroup !== clickedGroup) {
      const scrollPos = window.scrollY;
      
      // Smooth close of active group
      this.activeGroup.classList.remove('active');
      
      setTimeout(() => {
        clickedGroup.classList.add('active');
        this.activeGroup = clickedGroup;
        
        window.scrollTo({
          top: scrollPos,
          behavior: 'instant'
        });
        
        setTimeout(() => {
          this.isAnimating = false;
        }, 800);
      }, 400);
    } else {
      if (clickedGroup.classList.contains('active')) {
        clickedGroup.classList.remove('active');
        this.activeGroup = null;
      } else {
        clickedGroup.classList.add('active');
        this.activeGroup = clickedGroup;
        
        const header = clickedGroup.querySelector('.capability-header');
        const headerRect = header.getBoundingClientRect();
        
        if (headerRect.top < 100) {
          const newScrollPos = window.scrollY + headerRect.top - 100;
          window.scrollTo({
            top: newScrollPos,
            behavior: 'smooth'
          });
        }
      }
      
      setTimeout(() => {
        this.isAnimating = false;
      }, 800);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CapabilitySection();
}); 