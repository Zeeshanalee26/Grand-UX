let lastScrollY = window.scrollY;
let ticking = false;
let scrollThreshold = 1000;
let accumulatedScroll = 0;

function updateHeader() {
  const header = document.querySelector('.header');
  const currentScrollY = window.scrollY;
  const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  
  if (scrollDirection === 'down') {
    accumulatedScroll = 0;
    header.classList.add('header--hidden');
  } 
  else if (scrollDirection === 'up') {
    accumulatedScroll += (lastScrollY - currentScrollY);
    
    if (accumulatedScroll >= scrollThreshold) {
      header.classList.remove('header--hidden');
    }
  }
  
  if (currentScrollY === 0) {
    header.classList.remove('header--hidden');
    accumulatedScroll = 0;
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