document.addEventListener('DOMContentLoaded', () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.reveal-hidden').forEach(el => {
    observer.observe(el);
  });
}); 