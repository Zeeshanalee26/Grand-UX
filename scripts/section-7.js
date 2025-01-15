class CapabilitySection {
  constructor() {
    this.groups = document.querySelectorAll('.capability-group');
    this.activeGroup = null;
    this.initializeGroups();
    this.openDefaultGroup();
  }

  initializeGroups() {
    // Remove any active classes on initialization
    this.groups.forEach(group => {
      group.classList.remove('active');
      
      const header = group.querySelector('.capability-header');
      header.addEventListener('click', () => {
        // Close current active group if it exists
        if (this.activeGroup) {
          this.activeGroup.classList.remove('active');
        }
        
        // If clicking the same group, just close it
        if (this.activeGroup === group) {
          this.activeGroup = null;
          return;
        }
        
        // Open the clicked group
        group.classList.add('active');
        this.activeGroup = group;
      });
    });
  }

  openDefaultGroup() {
    // Open the first group (Research) by default
    const researchGroup = this.groups[0];
    if (researchGroup) {
      researchGroup.classList.add('active');
      this.activeGroup = researchGroup;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CapabilitySection();
}); 