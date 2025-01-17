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
      
      // Create wrapper for animation
      const wrapper = document.createElement('div');
      wrapper.className = 'project-wrapper';
      
      // Create container for image and background
      const container = document.createElement('div');
      container.className = 'project-image-container';
      
      // Create background element with clip-path
      const background = document.createElement('div');
      background.className = 'project-image-background';
      background.style.backgroundColor = backgroundColors[index % backgroundColors.length];
      
      // Wrap image in a clip container
      const imageClip = document.createElement('div');
      imageClip.className = 'project-image-clip';
      
      // Restructure DOM
      imageParent.replaceChild(wrapper, image);
      wrapper.appendChild(container);
      container.appendChild(background);
      container.appendChild(imageClip);
      imageClip.appendChild(image);

      // Add hover animation elements
      const hoverReveal = document.createElement('div');
      hoverReveal.className = 'hover-reveal';
      container.appendChild(hoverReveal);
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
    const background = card.querySelector('.project-image-background');
    const imageClip = card.querySelector('.project-image-clip');
    const image = card.querySelector('.project-image');
    const info = card.querySelector('.project-info');

    // Initial states
    gsap.set([background, imageClip], { 
      clipPath: 'inset(100% 0% 0% 0%)'
    });
    
    gsap.set(image, {
      scale: 1.2,
      opacity: 0,
      y: 100
    });

    gsap.set(info, {
      y: 30,
      opacity: 0
    });

    // Animation sequence
    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.inOut",
      }
    });

    tl.to(background, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.8
    })
    .to(imageClip, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.8
    }, '-=0.6')
    .to(image, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, '-=0.4')
    .to(info, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, '-=0.8');
  }

  setupHoverEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
      const image = card.querySelector('.project-image');
      const hoverReveal = card.querySelector('.hover-reveal');
      let isHovering = false;
      
      card.addEventListener('mouseenter', () => {
        isHovering = true;
        gsap.to(image, {
          scale: 1.1,
          duration: 1,
          ease: 'power2.out'
        });
        
        gsap.to(hoverReveal, {
          opacity: 1,
          duration: 0.4
        });
      });

      card.addEventListener('mouseleave', () => {
        isHovering = false;
        gsap.to(image, {
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        });
        
        gsap.to(hoverReveal, {
          opacity: 0,
          duration: 0.4
        });
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        gsap.to(image, {
          duration: 1,
          x: (mouseX - bounds.width / 2) * 0.03,
          y: (mouseY - bounds.height / 2) * 0.03,
          ease: 'power3.out'
        });
      });
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
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });

      card.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });

      card.addEventListener('mousemove', () => {
        cursorCircle.style.transform = 'scale(1.1)';
        setTimeout(() => {
          cursorCircle.style.transform = 'scale(1)';
        }, 100);
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProjectReveal();
});