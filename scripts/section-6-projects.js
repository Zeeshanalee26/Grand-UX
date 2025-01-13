const backgroundColors = [
  '#FFE0E0',  // Soft Red
  '#E0FFEF',  // Soft Mint
  '#E0F0FF',  // Soft Blue
  '#F5E0FF'   // Soft Purple
];

class ProjectReveal {
  constructor() {
    this.setupProjects();
    this.initializeObserver();
    this.setupCustomCursor();
    this.setupHoverEffects();
  }

  setupProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      const image = card.querySelector('.project-image');
      const imageParent = image.parentElement;
      
      // Create container for image and background
      const container = document.createElement('div');
      container.className = 'project-image-container';
      
      // Create background element
      const background = document.createElement('div');
      background.className = 'project-image-background';
      background.style.backgroundColor = backgroundColors[index % backgroundColors.length];
      
      // Restructure DOM
      imageParent.replaceChild(container, image);
      container.appendChild(background);
      container.appendChild(image);
    });
  }

  initializeObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateProject(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
    });
  }

  animateProject(card) {
    const container = card.querySelector('.project-image-container');
    const background = card.querySelector('.project-image-background');
    const image = card.querySelector('.project-image');

    requestAnimationFrame(() => {
      background.classList.add('background-visible');
      
      setTimeout(() => {
        image.classList.add('image-visible');
      }, 400);
    });
  }

  setupCustomCursor() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorInner = document.createElement('div');
    cursorInner.className = 'custom-cursor-inner';
    
    const cursorCircle = document.createElement('div');
    cursorCircle.className = 'custom-cursor-circle';
    
    const cursorText = document.createElement('div');
    cursorText.className = 'custom-cursor-text';
    cursorText.textContent = 'View';

    cursorInner.appendChild(cursorCircle);
    cursorInner.appendChild(cursorText);
    cursor.appendChild(cursorInner);
    document.body.appendChild(cursor);

    let cursorX = 0;
    let cursorY = 0;
    let currentX = 0;
    let currentY = 0;

    // Smooth cursor movement
    const moveCursor = () => {
      const ease = 0.15;
      
      currentX += (cursorX - currentX) * ease;
      currentY += (cursorY - currentY) * ease;
      
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      
      requestAnimationFrame(moveCursor);
    };

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    // Start the animation
    requestAnimationFrame(moveCursor);

    // Handle cursor visibility and interactions
    document.querySelectorAll('.project-image-container').forEach(container => {
      container.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });

      container.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });

      container.addEventListener('mousemove', () => {
        cursorCircle.style.transform = 'scale(1.1)';
        setTimeout(() => {
          cursorCircle.style.transform = 'scale(1)';
        }, 100);
      });
    });
  }

  setupHoverEffects() {
    document.querySelectorAll('.project-image-container').forEach(container => {
      const projectCard = container.closest('.project-card');
      
      container.addEventListener('mouseenter', () => {
        const title = projectCard.querySelector('.project-info h3');
        title.style.transition = 'all 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProjectReveal();
});