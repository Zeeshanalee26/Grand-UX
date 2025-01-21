class LogoSlider {
  constructor() {
    this.track = document.querySelector('.logo-track');
    this.logos = this.track.children;
    this.isMobile = window.innerWidth < 768;
    this.visibleLogos = this.isMobile ? 3 : this.logos.length;
    
    this.init();
  }

  init() {
    // Clone logos for infinite scroll
    const originalLogos = Array.from(this.logos);
    originalLogos.forEach(logo => {
      const clone = logo.cloneNode(true);
      this.track.appendChild(clone);
    });

    this.startAnimation();
    this.handleResize();
  }

  startAnimation() {
    let currentScroll = 0;
    const totalWidth = this.logos[0].offsetWidth * this.logos.length / 2;
    
    const animate = () => {
      currentScroll += 1;
      if (currentScroll >= totalWidth) {
        currentScroll = 0;
      }
      this.track.style.transform = `translateX(-${currentScroll}px)`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      this.visibleLogos = this.isMobile ? 3 : this.logos.length;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LogoSlider();
}); 