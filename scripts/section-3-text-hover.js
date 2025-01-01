document.addEventListener('DOMContentLoaded', () => {
  // Find the relevant spans
  const interactive = document.querySelector('.text-line:nth-child(1) .white-text');
  const designPrototypes = document.querySelector('.text-line:nth-child(2) .white-text');
  const impactful = document.querySelector('.text-line:nth-child(3) .white-text');
  const redefineWebApp = document.querySelector('.text-line:nth-child(4) .white-text');
  const experiences = document.querySelector('.text-line:nth-child(5) .white-text');

  // Function to toggle hover state for interactive + design prototypes
  const toggleInteractiveHover = (shouldHover) => {
      interactive.classList.toggle('hovered', shouldHover);
      designPrototypes.classList.toggle('hovered', shouldHover);
  };

  // Function to toggle hover state for redefine + experiences
  const toggleRedefineHover = (shouldHover) => {
      redefineWebApp.classList.toggle('hovered', shouldHover);
      experiences.classList.toggle('hovered', shouldHover);
  };

  // Add event listeners for interactive + design prototypes pair
  [interactive, designPrototypes].forEach(element => {
      element.addEventListener('mouseenter', () => toggleInteractiveHover(true));
      element.addEventListener('mouseleave', () => toggleInteractiveHover(false));
  });

  // Add event listeners for redefine + experiences pair
  [redefineWebApp, experiences].forEach(element => {
      element.addEventListener('mouseenter', () => toggleRedefineHover(true));
      element.addEventListener('mouseleave', () => toggleRedefineHover(false));
  });

  // Add independent hover effect for impactful
  impactful.addEventListener('mouseenter', () => {
      impactful.classList.add('hovered');
  });
  impactful.addEventListener('mouseleave', () => {
      impactful.classList.remove('hovered');
  });
});