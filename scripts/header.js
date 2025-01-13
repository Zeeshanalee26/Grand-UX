let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
  const header = document.querySelector('.header');
  const currentScrollY = window.scrollY;
  
  // Hide header when scrolling down, show when scrolling up
  if (currentScrollY > lastScrollY) {
    header.classList.add('header--hidden');
  } else {
    header.classList.remove('header--hidden');
  }
  
  // Always show header at the top of the page
  if (currentScrollY === 0) {
    header.classList.remove('header--hidden');
  }
  
  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
});