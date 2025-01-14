class CapabilitySection {
  constructor() {
    this.groups = document.querySelectorAll('.capability-group');
    this.activeGroup = null;
    this.initializeGroups();
  }

  initializeGroups() {
    this.groups.forEach(group => {
      const header = group.querySelector('.capability-header');
      header.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleGroup(group);
      });
    });
  }

  toggleGroup(clickedGroup) {
    // If there's an active group and it's different from the clicked one
    if (this.activeGroup && this.activeGroup !== clickedGroup) {
      // Store the current scroll position
      const scrollPos = window.scrollY;
      
      // Close the active group
      this.activeGroup.classList.remove('active');
      
      // Wait for close animation
      setTimeout(() => {
        // Open the clicked group
        clickedGroup.classList.add('active');
        this.activeGroup = clickedGroup;
        
        // Restore the scroll position
        window.scrollTo({
          top: scrollPos,
          behavior: 'instant'
        });
      }, 300); // Match this with your CSS transition time
    } else {
      // If no active group or clicking the same group
      if (clickedGroup.classList.contains('active')) {
        clickedGroup.classList.remove('active');
        this.activeGroup = null;
      } else {
        clickedGroup.classList.add('active');
        this.activeGroup = clickedGroup;
        
        // Ensure the header stays in view
        const header = clickedGroup.querySelector('.capability-header');
        const headerRect = header.getBoundingClientRect();
        
        if (headerRect.top < 100) { // Add some padding from top
          const newScrollPos = window.scrollY + headerRect.top - 100;
          window.scrollTo({
            top: newScrollPos,
            behavior: 'smooth'
          });
        }
      }
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CapabilitySection();
}); 