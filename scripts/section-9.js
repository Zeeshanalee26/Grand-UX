class ReviewsSlider {
  constructor() {
    this.slider = document.querySelector('.reviews-slider');
    this.reviews = Array.from(document.querySelectorAll('.review'));
    this.currentIndex = 0;
    this.isAnimating = false;
    this.swipeIndicator = this.slider.querySelector('.swipe-indicator');
    this.hasUserSwiped = false;
    
    this.setupReviews();
    this.setupNavigation();
    this.setupCursor();
    this.setupTouchEvents();
    this.setupSwipeButtons();
  }

  setupReviews() {
    this.reviews.forEach((review, index) => {
      if (index === 0) {
        review.style.display = 'flex';
        review.classList.add('active');
      } else {
        review.style.display = 'flex';
        review.classList.add('slide-right');
      }
    });
  }

  setupTouchEvents() {
    if (!this.isMobile()) return;

    let startX = 0;
    let currentTranslate = 0;

    const touchStart = (e) => {
      if (this.isAnimating) return;
      startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      
      // Hide indicator on first interaction
      if (!this.hasUserSwiped && this.swipeIndicator) {
        this.hasUserSwiped = true;
        this.swipeIndicator.classList.add('fade-out');
        
        // Remove the indicator after animation
        setTimeout(() => {
          this.swipeIndicator.style.display = 'none';
        }, 600);
      }
    };

    const touchMove = (e) => {
      if (this.isAnimating) return;
      e.preventDefault();
      
      const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const diff = currentX - startX;
      
      const resistance = 0.5;
      currentTranslate = diff * resistance;
      
      const currentReview = this.reviews[this.currentIndex];
      currentReview.style.transform = `translateX(${currentTranslate}px)`;
      currentReview.style.transition = 'none';
    };

    const touchEnd = () => {
      if (this.isAnimating) return;
      
      const currentReview = this.reviews[this.currentIndex];
      currentReview.style.transition = 'all 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
      currentReview.style.transform = '';
      
      if (Math.abs(currentTranslate) > 50) {
        this.navigate(currentTranslate < 0 ? 'next' : 'prev');
      }
      
      currentTranslate = 0;
    };

    this.slider.addEventListener('touchstart', touchStart, { passive: true });
    this.slider.addEventListener('touchmove', touchMove, { passive: false });
    this.slider.addEventListener('touchend', touchEnd);
  }

  setupNavigation() {
    if (this.isMobile()) return;

    const leftNav = document.createElement('div');
    const rightNav = document.createElement('div');
    leftNav.className = 'nav-area nav-left';
    rightNav.className = 'nav-area nav-right';
    leftNav.style.cssText = 'position: absolute; left: 0; top: 0; width: 50%; height: 100%; z-index: 2; cursor: none;';
    rightNav.style.cssText = 'position: absolute; right: 0; top: 0; width: 50%; height: 100%; z-index: 2; cursor: none;';

    leftNav.addEventListener('click', () => this.navigate('prev'));
    rightNav.addEventListener('click', () => this.navigate('next'));

    this.slider.appendChild(leftNav);
    this.slider.appendChild(rightNav);
  }

  setupCursor() {
    if (this.isMobile()) return;
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);

    const updateCursor = (e) => {
      requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    };

    document.addEventListener('mousemove', updateCursor);

    const leftNav = this.slider.querySelector('.nav-left');
    const rightNav = this.slider.querySelector('.nav-right');

    leftNav.addEventListener('mouseenter', () => cursor.classList.add('active', 'prev'));
    leftNav.addEventListener('mouseleave', () => cursor.classList.remove('active', 'prev'));
    rightNav.addEventListener('mouseenter', () => cursor.classList.add('active', 'next'));
    rightNav.addEventListener('mouseleave', () => cursor.classList.remove('active', 'next'));
  }

  navigate(direction) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const currentReview = this.reviews[this.currentIndex];
    let nextIndex = direction === 'next' 
      ? (this.currentIndex + 1) % this.reviews.length 
      : (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
    const nextReview = this.reviews[nextIndex];

    currentReview.style.transition = '';
    currentReview.style.transform = '';
    nextReview.style.transition = '';
    nextReview.style.transform = '';

    currentReview.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
    currentReview.classList.remove('active');
    
    nextReview.classList.remove('slide-left', 'slide-right');
    nextReview.classList.add('active');

    this.currentIndex = nextIndex;

    setTimeout(() => {
      this.isAnimating = false;
      currentReview.classList.remove('slide-left', 'slide-right');
      currentReview.classList.add(direction === 'next' ? 'slide-right' : 'slide-left');
    }, 600);
  }

  isMobile() {
    return window.innerWidth <= 1023;
  }

  resetSwipeIndicator() {
    if (!this.isMobile()) return;
    
    this.hasUserSwiped = false;
    if (this.swipeIndicator) {
      this.swipeIndicator.style.display = 'flex';
      this.swipeIndicator.classList.remove('fade-out');
    }
  }

  setupSwipeButtons() {
    if (!this.isMobile()) return;

    const prevButtons = document.querySelectorAll('.swipe-button.prev');
    const nextButtons = document.querySelectorAll('.swipe-button.next');

    prevButtons.forEach(button => {
      button.addEventListener('click', () => this.navigate('prev'));
    });

    nextButtons.forEach(button => {
      button.addEventListener('click', () => this.navigate('next'));
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ReviewsSlider();
}); 