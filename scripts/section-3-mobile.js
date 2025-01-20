document.addEventListener('DOMContentLoaded', () => {
  const serviceItems = document.querySelectorAll('.section-3-mobile-only__service-item');
  const servicesSection = document.querySelector('.section-3-mobile-only');
  
  const options = {
    root: servicesSection,
    rootMargin: '-40% 0px -40% 0px',
    threshold: Array.from({ length: 100 }, (_, i) => i / 99)
  };

  let activeIndex = 0;
  let lastScrollY = servicesSection.scrollTop;

  const setItemState = (item, index, progress) => {
    const span = item.querySelector('span');
    
    if (index === activeIndex) {
      // Active item animation
      const scale = 1 + (progress * 0.05);
      const fontSize = 30 + (progress * 4);
      const weight = 400 + (progress * 200);
      const colorValue = Math.round(70 + (progress * 185));
      
      span.style.transform = `scale(${scale.toFixed(4)})`;
      span.style.fontSize = `${fontSize.toFixed(2)}px`;
      span.style.lineHeight = `${36 + (progress * 4)}px`;
      span.style.fontWeight = String(Math.round(weight));
      span.style.color = progress > 0.5 ? 'white' : `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
      
      if (progress > 0.7) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    } else if (index < activeIndex) {
      // Items before active stay highlighted
      span.style.transform = 'scale(1.05)';
      span.style.fontSize = '34px';
      span.style.lineHeight = '40px';
      span.style.fontWeight = '600';
      span.style.color = 'white';
      item.classList.add('active');
    } else {
      // Items after active stay dim
      span.style.transform = 'scale(1)';
      span.style.fontSize = '30px';
      span.style.lineHeight = '36px';
      span.style.fontWeight = '400';
      span.style.color = 'rgb(70, 70, 70)';
      item.classList.remove('active');
    }
  };

  const observer = new IntersectionObserver((entries) => {
    const currentScrollY = servicesSection.scrollTop;
    const isScrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;

    // Find the most visible item
    const mostVisible = entries.reduce((prev, current) => {
      return (prev?.intersectionRatio > current.intersectionRatio) ? prev : current;
    });

    if (mostVisible && mostVisible.intersectionRatio > 0.5) {
      // Get the index of the most visible item
      const currentIndex = Array.from(serviceItems).indexOf(mostVisible.target);
      
      if (isScrollingDown) {
        activeIndex = Math.max(currentIndex, activeIndex);
      } else {
        activeIndex = Math.min(currentIndex, activeIndex);
      }

      // Update all items based on their position relative to active index
      serviceItems.forEach((item, index) => {
        requestAnimationFrame(() => {
          const entry = entries.find(e => e.target === item);
          const progress = entry ? entry.intersectionRatio : 0;
          setItemState(item, index, progress);
        });
      });
    }
  }, options);

  // Initialize first item
  setItemState(serviceItems[0], 0, 1);
  
  // Observe all items
  serviceItems.forEach(item => {
    observer.observe(item);
  });

  // Handle touch events for smoother mobile scrolling
  let touchStartY = 0;
  
  servicesSection.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  servicesSection.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    touchStartY = touchY;

    requestAnimationFrame(() => {
      const currentScroll = servicesSection.scrollTop;
      servicesSection.scrollTop = currentScroll + deltaY;
    });
  }, { passive: true });
}); 