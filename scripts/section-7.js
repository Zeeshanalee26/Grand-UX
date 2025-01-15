class CapabilitySection {
  constructor() {
    this.groups = document.querySelectorAll('.capability-group');
    this.activeGroup = null;
    this.initializeGroups();
    this.openDefaultGroup();
  }

  initializeGroups() {
    this.groups.forEach(group => {
      group.classList.remove('active');
      
      const header = group.querySelector('.capability-header');
      header.addEventListener('click', () => {
        if (this.activeGroup === group) {
          // Smooth closing animation
          group.classList.remove('active');
          this.activeGroup = null;
          return;
        }

        // Smooth transition between groups
        if (this.activeGroup) {
          this.activeGroup.classList.remove('active');
        }

        requestAnimationFrame(() => {
          group.classList.add('active');
          this.activeGroup = group;
        });
      });
    });
  }

  openDefaultGroup() {
    const firstGroup = this.groups[0];
    if (firstGroup) {
      firstGroup.classList.add('active');
      this.activeGroup = firstGroup;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CapabilitySection();
});

function toggleCapabilityGroup(group) {
  const isActive = group.classList.contains('active');
  
  // Close all groups first
  document.querySelectorAll('.capability-group').forEach(g => {
    g.classList.remove('active');
  });

  if (!isActive) {
    group.classList.add('active');
    // Add staggered animation to items
    const items = group.querySelectorAll('.capability-item');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.05}s`;
    });
  }
}

document.querySelectorAll('.capability-header').forEach(header => {
  header.addEventListener('click', () => {
    const group = header.parentElement;
    toggleCapabilityGroup(group);
  });
}); 