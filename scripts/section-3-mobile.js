document.addEventListener('DOMContentLoaded', () => {
  const serviceItems = document.querySelectorAll('.section-3-mobile-only__service-item');
  
  const options = {
    root: null,
    rootMargin: '-45% 0px -45% 0px',
    threshold: [0, 0.5, 1]
  };

  let activeItem = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        if (activeItem) {
          activeItem.classList.remove('active');
        }
        
        entry.target.classList.add('active');
        activeItem = entry.target;
      }
    });
  }, options);

  serviceItems.forEach(item => {
    observer.observe(item);
  });

  document.querySelector('.section-3-mobile-only').addEventListener('touchstart', (e) => {
    e.preventDefault();
  }, { passive: false });
}); 