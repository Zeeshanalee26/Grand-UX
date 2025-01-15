class ReviewsSlider {
  constructor() {
    this.slider = document.querySelector('.reviews-slider');
    this.reviews = Array.from(document.querySelectorAll('.review'));
    this.currentIndex = 0;
    this.isAnimating = false;

    // Initialize all reviews with correct positioning
    this.reviews.forEach((review, index) => {
      if (index === 0) {
        review.classList.add('active');
      } else {
        review.classList.add('slide-right');
      }
    });

    this.setupNavigation();
    this.setupCursor();
  }

  setupNavigation() {
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
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);

    const updateCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener('mousemove', updateCursor);

    const leftNav = this.slider.querySelector('.nav-left');
    const rightNav = this.slider.querySelector('.nav-right');

    leftNav.addEventListener('mouseenter', () => {
      cursor.classList.add('active', 'prev');
    });
    leftNav.addEventListener('mouseleave', () => {
      cursor.classList.remove('active', 'prev');
    });

    rightNav.addEventListener('mouseenter', () => {
      cursor.classList.add('active', 'next');
    });
    rightNav.addEventListener('mouseleave', () => {
      cursor.classList.remove('active', 'next');
    });
  }

  navigate(direction) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const currentReview = this.reviews[this.currentIndex];
    let nextIndex = direction === 'next' 
      ? (this.currentIndex + 1) % this.reviews.length 
      : (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
    const nextReview = this.reviews[nextIndex];

    // Set initial positions
    nextReview.style.display = 'flex';
    nextReview.classList.add(direction === 'next' ? 'slide-right' : 'slide-left');
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Animate transition
        currentReview.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
        currentReview.classList.remove('active');
        nextReview.classList.add('active');
        nextReview.classList.remove('slide-left', 'slide-right');
      });
    });

    this.currentIndex = nextIndex;

    setTimeout(() => {
      this.isAnimating = false;
      currentReview.style.display = 'none';
    }, 600); // Match the longest transition duration
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ReviewsSlider();
}); 