class TextEffect {
  constructor() {
    this.container = document.querySelector('.section-3-text');
    this.initializeHoverGroups();
  }

  initializeHoverGroups() {
    // Group 1: interactive + design prototypes
    const group1Elements = this.container.querySelectorAll('.hover-group-1');
    this.setupHoverGroup(group1Elements);

    // Group 2: MVPs
    const group2Elements = this.container.querySelectorAll('.hover-group-2');
    this.setupHoverGroup(group2Elements);

    // Group 3: redefine web & app + experiences
    const group3Elements = this.container.querySelectorAll('.hover-group-3');
    this.setupHoverGroup(group3Elements);
  }

  setupHoverGroup(elements) {
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        elements.forEach(el => el.classList.add('hovered'));
      });

      element.addEventListener('mouseleave', () => {
        elements.forEach(el => el.classList.remove('hovered'));
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TextEffect();
});