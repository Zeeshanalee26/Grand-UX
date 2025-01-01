document.addEventListener('DOMContentLoaded', () => {
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Get hero section
  const heroSection = document.querySelector('.hero-section');
  
  // If hero section is already visible (above the fold), animate it immediately
  if (heroSection.getBoundingClientRect().top < window.innerHeight) {
    heroSection.classList.add('animate-in');
  } else {
    // Otherwise, observe it for when it comes into view
    observer.observe(heroSection);
  }
});