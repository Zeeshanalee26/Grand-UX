class CapabilitySection {
  constructor() {
    this.activeGroup = null;
    this.init();
  }

  init() {
    const groups = document.querySelectorAll('.capability-group');
    const isMobile = window.innerWidth <= 1023;

    const researchGroup = document.querySelector('.capability-group[data-group="research"]');
    if (researchGroup) {
      this.toggleCapabilityGroup(researchGroup, true);
      this.activeGroup = researchGroup;
    }

    groups.forEach(group => {
      const header = group.querySelector('.capability-header');
      header.addEventListener('click', () => {
        if (group === this.activeGroup) {
          this.toggleCapabilityGroup(group, false);
          this.activeGroup = null;
          return;
        }

        if (this.activeGroup) {
          this.toggleCapabilityGroup(this.activeGroup, false);
        }

        this.toggleCapabilityGroup(group, true);
        this.activeGroup = group;
      });
    });
  }

  toggleCapabilityGroup(group, shouldOpen) {
    const list = group.querySelector('.capability-list');
    const items = group.querySelectorAll('.capability-item');
    const isMobile = window.innerWidth <= 1023;

    if (shouldOpen) {
      group.classList.add('active');
      if (isMobile) {
        list.style.maxHeight = `${list.scrollHeight}px`;
        list.style.opacity = '1';
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
          }, index * 50);
        });
      }
    } else {
      group.classList.remove('active');
      if (isMobile) {
        list.style.maxHeight = '0px';
        list.style.opacity = '0';
        items.forEach(item => {
          item.style.transform = 'translateY(20px)';
          item.style.opacity = '0';
        });
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CapabilitySection();
});