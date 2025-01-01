let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
  const header = document.querySelector('.header');
  const currentScrollY = window.scrollY;
  
  if (Math.abs(currentScrollY - lastScrollY) > 20) {
    if (currentScrollY > lastScrollY) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    lastScrollY = currentScrollY;
  }
  
  ticking = false;
}

let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeader();
    });
    ticking = true;
  }
  
  clearTimeout(scrollTimeout);
  
  scrollTimeout = setTimeout(() => {
    if (window.scrollY <= 0) {
      document.querySelector('.header').classList.remove('header--hidden');
    }
  }, 150);
});