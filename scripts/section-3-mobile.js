document.addEventListener('DOMContentLoaded', () => {
  const serviceItems = document.querySelectorAll('.section-3-mobile-only__service-item');
  const servicesSection = document.querySelector('.section-3-mobile-only');
  
  const options = {
    root: null,
    rootMargin: '-45% 0px -45% 0px',
    threshold: Array.from({ length: 20 }, (_, i) => i / 19) // Fewer thresholds for smoother single item animation
  };

  let activeItem = null;

  const observer = new IntersectionObserver((entries) => {
    // Sort entries by intersection ratio to find the most visible item
    const visibleEntries = entries
      .filter(entry => entry.intersectionRatio > 0)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    // Only process the most visible item
    const mostVisible = visibleEntries[0];
    
    entries.forEach(entry => {
      const item = entry.target;
      
      if (entry === mostVisible && entry.intersectionRatio > 0.3) {
        const progress = entry.intersectionRatio;
        
        // Smooth transition to active state
        if (progress > 0.5) {
          if (activeItem && activeItem !== item) {
            // Reset previous active item
            activeItem.style.transform = 'scale(1)';
            activeItem.style.fontSize = '30px';
            activeItem.style.fontWeight = '400';
            activeItem.style.color = 'rgb(70, 70, 70)';
            activeItem.classList.remove('active');
          }
          
          // Activate current item
          item.style.transform = 'scale(1.05)';
          item.style.fontSize = '34px';
          item.style.fontWeight = '600';
          item.style.color = 'white';
          item.classList.add('active');
          activeItem = item;
        } else {
          // Transitioning state
          const scale = 1 + (progress * 0.05);
          const fontSize = 30 + (progress * 4);
          const weight = 400 + (progress * 200);
          
          item.style.transform = `scale(${scale})`;
          item.style.fontSize = `${fontSize}px`;
          item.style.fontWeight = Math.round(weight);
          item.style.color = `rgb(${70 + progress * 185}, ${70 + progress * 185}, ${70 + progress * 185})`;
        }
      } else if (item !== activeItem) {
        // Reset non-active items
        item.style.transform = 'scale(1)';
        item.style.fontSize = '30px';
        item.style.fontWeight = '400';
        item.style.color = 'rgb(70, 70, 70)';
        item.classList.remove('active');
      }
    });
  }, options);

  serviceItems.forEach(item => {
    observer.observe(item);
  });

  // Enable smooth scrolling
  servicesSection.style.scrollBehavior = 'smooth';
}); 