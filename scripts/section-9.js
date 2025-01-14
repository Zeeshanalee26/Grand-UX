class ReviewsSlider {
  constructor() {
    this.currentIndex = 0;
    this.isAnimating = false;
    this.isVisible = false;
    this.container = document.querySelector('.reviews-slider');
    this.reviews = Array.from(this.container.querySelectorAll('.review'));
    this.totalReviews = this.reviews.length;
    
    // Initialize all reviews with correct positioning
    this.reviews.forEach((review, index) => {
      review.style.position = 'absolute';
      review.style.top = '0';
      review.style.left = '0';
      review.style.width = '100%';
      review.style.display = index === 0 ? 'block' : 'none';
    });
    
    // Show first review
    this.reviews[0].classList.add('active');
    
    this.init();
    this.initRevealAnimations();
    this.initInteractions();
  }

  init() {
    // Create cursor dot
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'cursor-dot';
    document.body.appendChild(this.cursorDot);
  }

  initInteractions() {
    let clickTimeout;
    
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const isRightSide = e.clientX > rect.left + rect.width / 2;
      
      this.cursorDot.style.left = e.clientX + 'px';
      this.cursorDot.style.top = e.clientY + 'px';
      
      this.cursorDot.classList.add('active');
      this.cursorDot.classList.toggle('next', isRightSide);
      this.cursorDot.classList.toggle('prev', !isRightSide);
    });

    this.container.addEventListener('mouseleave', () => {
      this.cursorDot.classList.remove('active', 'next', 'prev');
    });

    // Debounced click handler
    this.container.addEventListener('click', (e) => {
      if (this.isAnimating) return;
      
      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => {
        const rect = this.container.getBoundingClientRect();
        const isRightSide = e.clientX > rect.left + rect.width / 2;
        
        if (isRightSide) {
          this.showNextReview();
        } else {
          this.showPrevReview();
        }
      }, 50);
    });
  }

  initRevealAnimations() {
    const options = {
      threshold: 0.2,
      rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isVisible) {
          this.isVisible = true;
          entry.target.classList.add('active');
          
          // Animate reviews sequentially
          this.reviews.forEach((review, index) => {
            setTimeout(() => {
              review.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
              review.style.transitionDelay = `${0.6 + (index * 0.2)}s`;
              review.style.opacity = index === 0 ? '1' : '0';
              review.style.transform = 'translateY(0)';
            }, 100);
          });
        } else if (!entry.isIntersecting && this.isVisible) {
          this.isVisible = false;
          entry.target.classList.remove('active');
          
          // Reset animations when scrolling up
          this.reviews.forEach(review => {
            review.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            review.style.transitionDelay = '0s';
            review.style.opacity = '0';
            review.style.transform = 'translateY(40px)';
          });
        }
      });
    }, options);

    document.querySelectorAll('.reviews-container').forEach(element => {
      revealObserver.observe(element);
    });
  }

  showNextReview() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    const nextIndex = (this.currentIndex + 1) % this.totalReviews;
    const currentReview = this.reviews[this.currentIndex];
    const nextReview = this.reviews[nextIndex];
    
    // Reset any existing transitions
    this.reviews.forEach(review => {
      review.style.transition = 'none';
      review.style.display = 'none';
    });
    
    // Setup initial states
    currentReview.style.display = 'block';
    nextReview.style.display = 'block';
    nextReview.style.transform = 'translateX(100px)';
    nextReview.style.opacity = '0';
    
    // Force reflow
    nextReview.offsetHeight;
    
    // Start animation
    requestAnimationFrame(() => {
      currentReview.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
      nextReview.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
      
      currentReview.style.transform = 'translateX(-100px)';
      currentReview.style.opacity = '0';
      
      nextReview.style.transform = 'translateX(0)';
      nextReview.style.opacity = '1';
      
      currentReview.classList.remove('active');
      nextReview.classList.add('active');
      
      this.currentIndex = nextIndex;
      
      setTimeout(() => {
        currentReview.style.display = 'none';
        this.isAnimating = false;
      }, 600);
    });
  }

  showPrevReview() {
    // Similar to showNextReview but with opposite directions
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    const prevIndex = (this.currentIndex - 1 + this.totalReviews) % this.totalReviews;
    const currentReview = this.reviews[this.currentIndex];
    const prevReview = this.reviews[prevIndex];
    
    this.reviews.forEach(review => {
      review.style.transition = 'none';
      review.style.display = 'none';
    });
    
    currentReview.style.display = 'block';
    prevReview.style.display = 'block';
    prevReview.style.transform = 'translateX(-100px)';
    prevReview.style.opacity = '0';
    
    prevReview.offsetHeight;
    
    requestAnimationFrame(() => {
      currentReview.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
      prevReview.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
      
      currentReview.style.transform = 'translateX(100px)';
      currentReview.style.opacity = '0';
      
      prevReview.style.transform = 'translateX(0)';
      prevReview.style.opacity = '1';
      
      currentReview.classList.remove('active');
      prevReview.classList.add('active');
      
      this.currentIndex = prevIndex;
      
      setTimeout(() => {
        currentReview.style.display = 'none';
        this.isAnimating = false;
      }, 600);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ReviewsSlider();
}); 