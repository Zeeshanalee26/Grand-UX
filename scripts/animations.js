document.addEventListener('DOMContentLoaded', () => {
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class to the section
        entry.target.classList.add('animate-in');
        
        // Get the title and subtitle elements
        const title = entry.target.querySelector('.hero-title');
        const subtitle = entry.target.querySelector('.hero-subtitle');
        
        // Add animation classes with delay
        if (title) title.classList.add('animate-in');
        if (subtitle) {
          setTimeout(() => {
            subtitle.classList.add('animate-in');
          }, 300); // 300ms delay for subtitle
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Get hero section
  const heroSection = document.querySelector('.hero-section');
  
  // If hero section is already visible (above the fold), animate immediately
  if (heroSection && heroSection.getBoundingClientRect().top < window.innerHeight) {
    heroSection.classList.add('animate-in');
    const title = heroSection.querySelector('.hero-title');
    const subtitle = heroSection.querySelector('.hero-subtitle');
    
    if (title) title.classList.add('animate-in');
    if (subtitle) {
      setTimeout(() => {
        subtitle.classList.add('animate-in');
      }, 300);
    }
  } else if (heroSection) {
    observer.observe(heroSection);
  }
});
  