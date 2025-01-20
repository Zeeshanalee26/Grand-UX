document.addEventListener('DOMContentLoaded', () => {
  const serviceItems = document.querySelectorAll('.section-3-mobile-only__service-item');
  const servicesSection = document.querySelector('.section-3-mobile-only');
  
  const options = {
    root: null,
    rootMargin: '-47% 0px -47% 0px', // More precise center targeting
    threshold: Array.from({ length: 150 }, (_, i) => i / 149) // More granular thresholds
  };

  let activeItem = null;

  const setItemState = (item, progress) => {
    const span = item.querySelector('span');
    
    if (progress > 0) {
      // Enhanced smooth transitions with easing
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Custom easing curve
      
      const scale = 1 + (Math.min(easeProgress, 1) * 0.05);
      const fontSize = 30 + (Math.min(easeProgress, 1) * 4);
      const weight = 400 + (Math.min(easeProgress, 1) * 200);
      
      // Smoother color transition
      const colorValue = Math.round(70 + (easeProgress * 185));
      const color = progress > 0.5 
        ? `rgb(255, 255, 255)` 
        : `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
      
      // Apply enhanced transitions
      span.style.transform = `scale(${scale.toFixed(3)})`;
      span.style.fontSize = `${fontSize.toFixed(1)}px`;
      span.style.fontWeight = String(Math.round(weight));
      span.style.color = color;

      if (progress > 0.5) {
        if (activeItem && activeItem !== item) {
          setItemState(activeItem, 0);
        }
        item.classList.add('active');
        activeItem = item;
      } else {
        item.classList.remove('active');
      }
    } else {
      // Smooth reset state
      item.classList.remove('active');
      span.style.transform = 'scale(1)';
      span.style.fontSize = '30px';
      span.style.fontWeight = '400';
      span.style.color = 'rgb(70, 70, 70)';
    }
  };

  const observer = new IntersectionObserver((entries) => {
    // Sort entries by visibility to handle overlapping transitions better
    const sortedEntries = entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    
    sortedEntries.forEach(entry => {
      const item = entry.target;
      const progress = entry.intersectionRatio;
      
      requestAnimationFrame(() => {
        setItemState(item, progress);
      });
    });
  }, options);

  // Initialize first item as active with smooth transition
  if (serviceItems.length > 0) {
    const firstItem = serviceItems[0];
    requestAnimationFrame(() => {
      setItemState(firstItem, 1);
    });
  }

  // Observe all items
  serviceItems.forEach(item => {
    observer.observe(item);
  });
}); 