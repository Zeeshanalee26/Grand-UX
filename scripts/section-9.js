class ReviewsSlider {
  constructor() {
    this.currentIndex = 0;
    this.reviews = document.querySelectorAll('.review');
    this.totalReviews = this.reviews.length;
    this.isAnimating = false;
    this.isVisible = false;
    
    this.init();
    this.initRevealAnimations();
    this.initCustomCursor();
  }

  init() {
    // Create cursor dot
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
  }

  initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const sliderContainer = document.querySelector('.reviews-slider');
    const activeReview = () => document.querySelector('.review.active');
    
    // Track mouse movement on the slider
    sliderContainer.addEventListener('mousemove', (e) => {
      const rect = sliderContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isLeftHalf = x < rect.width / 2;
      
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      
      cursorDot.classList.toggle('prev', isLeftHalf);
      cursorDot.classList.toggle('next', !isLeftHalf);
    });

    // Show cursor only when hovering over the active review
    sliderContainer.addEventListener('mousemove', (e) => {
      const review = activeReview();
      const reviewRect = review.getBoundingClientRect();
      
      // Check if mouse is within the review boundaries
      if (
        e.clientX >= reviewRect.left &&
        e.clientX <= reviewRect.right &&
        e.clientY >= reviewRect.top &&
        e.clientY <= reviewRect.bottom
      ) {
        cursorDot.style.opacity = '1';
      } else {
        cursorDot.style.opacity = '0';
      }
    });

    // Hide cursor when leaving the slider
    sliderContainer.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
    });

    // Handle clicks on the review
    sliderContainer.addEventListener('click', (e) => {
      const review = activeReview();
      const reviewRect = review.getBoundingClientRect();
      
      // Only handle clicks within the review boundaries
      if (
        e.clientX >= reviewRect.left &&
        e.clientX <= reviewRect.right &&
        e.clientY >= reviewRect.top &&
        e.clientY <= reviewRect.bottom
      ) {
        const x = e.clientX - reviewRect.left;
        if (x < reviewRect.width / 2) {
          this.showPrevReview();
        } else {
          this.showNextReview();
        }
      }
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

  showPrevReview() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    const prevIndex = (this.currentIndex - 1 + this.totalReviews) % this.totalReviews;
    const currentReview = this.reviews[this.currentIndex];
    const prevReview = this.reviews[prevIndex];
    
    // Setup initial state
    prevReview.style.transition = 'none';
    prevReview.style.transform = 'translateX(-100px)';
    prevReview.style.opacity = '0';
    prevReview.style.display = 'block';
    
    // Force reflow
    prevReview.offsetHeight;
    
    // Start animation
    requestAnimationFrame(() => {
      prevReview.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      currentReview.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      
      // Animate out current review
      currentReview.style.transform = 'translateX(100px)';
      currentReview.style.opacity = '0';
      
      // Animate in previous review
      prevReview.style.transform = 'translateX(0)';
      prevReview.style.opacity = '1';
      
      // Update classes
      currentReview.classList.remove('active');
      prevReview.classList.add('active');
      
      this.currentIndex = prevIndex;
      
      // Reset after animation
      setTimeout(() => {
        currentReview.style.display = 'none';
        this.isAnimating = false;
      }, 1200);
    });
  }

  showNextReview() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    const nextIndex = (this.currentIndex + 1) % this.totalReviews;
    const currentReview = this.reviews[this.currentIndex];
    const nextReview = this.reviews[nextIndex];
    
    // Setup initial state
    nextReview.style.transition = 'none';
    nextReview.style.transform = 'translateX(100px)';
    nextReview.style.opacity = '0';
    nextReview.style.display = 'block';
    
    // Force reflow
    nextReview.offsetHeight;
    
    // Start animation
    requestAnimationFrame(() => {
      nextReview.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      currentReview.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      
      // Animate out current review
      currentReview.style.transform = 'translateX(-100px)';
      currentReview.style.opacity = '0';
      
      // Animate in next review
      nextReview.style.transform = 'translateX(0)';
      nextReview.style.opacity = '1';
      
      // Update classes
      currentReview.classList.remove('active');
      nextReview.classList.add('active');
      
      this.currentIndex = nextIndex;
      
      // Reset after animation
      setTimeout(() => {
        currentReview.style.display = 'none';
        this.isAnimating = false;
      }, 1200);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ReviewsSlider();
}); 