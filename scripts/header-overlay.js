class HeaderOverlay {
  constructor() {
    this.menuButton = document.querySelector('.menu-button');
    this.header = document.querySelector('.header');
    this.menuText = 'Menu';
    this.closeText = 'Close';
    this.isOpen = false;
    this.isClosing = false;
    
    this.init();
  }

  init() {
    this.createOverlay();
    this.addEventListeners();
  }

  createOverlay() {
    const overlayHTML = `
      <div class="header-overlay">
        <div class="header-overlay__content">
          <nav class="header-overlay__nav">
            <ul class="header-overlay__nav-list">
              <li><a href="#services" class="header-overlay__nav-link">Services</a></li>
              <li><a href="#projects" class="header-overlay__nav-link">Projects</a></li>
              <li><a href="#about" class="header-overlay__nav-link">About</a></li>
              <li><a href="#contact" class="header-overlay__nav-link">Contact</a></li>
            </ul>
          </nav>
          <div class="header-overlay__contact">
            <p class="header-overlay__label">Get in touch</p>
            <a href="mailto:hello@grand-ux.com" class="header-overlay__email">hello@grand-ux.com</a>
          </div>
          <div class="header-overlay__social">
            <a href="#" class="header-overlay__social-link">LinkedIn</a>
            <a href="#" class="header-overlay__social-link">Instagram</a>
            <a href="#" class="header-overlay__social-link">Dribbble</a>
            <a href="#" class="header-overlay__social-link">Behance</a>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', overlayHTML);
    this.overlay = document.querySelector('.header-overlay');
  }

  addEventListeners() {
    this.menuButton.addEventListener('click', () => {
      if (this.isOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    });

    const overlayLinks = this.overlay.querySelectorAll('a');
    overlayLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        overlayLinks.forEach(l => l.classList.remove('clicked'));
        link.classList.add('clicked');
        
        setTimeout(() => {
          this.closeMenu();
          setTimeout(() => {
            window.location.href = link.href;
          }, 500);
        }, 100);
      });
    });

    // Remove clicked state when mouse leaves
    overlayLinks.forEach(link => {
      link.addEventListener('mouseleave', () => {
        if (!this.isClosing) {
          link.classList.remove('clicked');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    this.overlay.addEventListener('transitionend', (e) => {
      if (!this.isOpen) {
        this.overlay.style.visibility = 'hidden';
      }
    });
  }

  openMenu() {
    this.isOpen = true;
    this.overlay.style.visibility = 'visible';
    this.overlay.classList.add('active');
    this.menuButton.classList.add('active');
    this.header.classList.add('menu-open');
    this.updateButtonText(this.closeText);
    this.disableScroll();
  }

  closeMenu() {
    this.isOpen = false;
    this.isClosing = true;
    this.overlay.classList.remove('active');
    this.menuButton.classList.remove('active');
    this.header.classList.remove('menu-open');
    this.updateButtonText(this.menuText);
    
    setTimeout(() => {
      this.enableScroll();
      this.isClosing = false;
      this.overlay.querySelectorAll('a').forEach(link => {
        link.classList.remove('clicked');
      });
    }, 500);
  }

  updateButtonText(text) {
    this.menuButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${text === 'Menu' ? 
          '<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' :
          '<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        }
      </svg>
      ${text}
    `;
  }

  disableScroll() {
    this.scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
  }

  enableScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, this.scrollPosition);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeaderOverlay();
}); 