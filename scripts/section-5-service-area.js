document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceImageContainer = document.querySelector('.service-image');
    const SLIDE_DURATION = 5000;
    let currentIndex = 0;
    let slideInterval;
    let isHovered = false;
  
    function initialize() {
        // Remove any existing transforms or animations that might affect positioning
        serviceItems.forEach(item => {
            item.style.transform = 'none';
            const content = item.querySelector('.service-content');
            if (content) {
                content.style.transform = 'none';
            }
        });

        const firstImage = createImage(serviceItems[0].getAttribute('data-image'));
        firstImage.classList.add('active');
        serviceImageContainer.appendChild(firstImage);
        serviceItems[0].classList.add('active');
        startTimer(0);
    }
  
    function createImage(src) {
        const img = document.createElement('img');
        img.src = src;
        return img;
    }
  
    function startTimer(index) {
        const timerFill = serviceItems[index].querySelector('.timer-fill');
        timerFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
        timerFill.style.width = '100%';
    }
  
    function resetTimer(index) {
        const timerFill = serviceItems[index].querySelector('.timer-fill');
        timerFill.style.transition = 'none';
        timerFill.style.width = '0';
        void timerFill.offsetWidth; 
    }
  
    function switchSlide(newIndex, immediate = false) {
        resetTimer(currentIndex);
        serviceItems[currentIndex].classList.remove('active');
  
        const currentImage = serviceImageContainer.querySelector('img.active');
        const newImage = createImage(serviceItems[newIndex].getAttribute('data-image'));
        serviceImageContainer.appendChild(newImage);
  
        if (!immediate) {
            void newImage.offsetWidth; 
            currentImage.style.opacity = '0';
            currentImage.style.transform = 'translateY(-20px)'; 
        }
        newImage.classList.add('active');
  
        serviceItems[newIndex].classList.add('active');
        startTimer(newIndex);
  
        setTimeout(() => {
            if (currentImage) serviceImageContainer.removeChild(currentImage);
        }, 500);
  
        currentIndex = newIndex;
    }
  
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % serviceItems.length;
        switchSlide(nextIndex);
    }
  
    function startAutoplay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            if (!isHovered) nextSlide();
        }, SLIDE_DURATION);
    }
  
    serviceItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            isHovered = true;
            clearInterval(slideInterval);
            if (currentIndex !== index) {
                const currentImage = serviceImageContainer.querySelector('img.active');
                if (currentImage) {
                    currentImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease'; 
                    currentImage.style.transform = 'translateY(-20px)'; 
                    currentImage.style.opacity = '0'; 
                }
                switchSlide(index, true);
            }
        });
  
        item.addEventListener('mouseleave', () => {
            isHovered = false;
            resetTimer(currentIndex);
            startTimer(currentIndex);
            startAutoplay();
        });
    });
  
    const serviceObserverOptions = {
        threshold: [0, 0.1, 0.2], 
        rootMargin: '100px 0px',
    };

    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.style.visibility = 'visible';
                item.classList.add('revealed');
                
                const content = item.querySelector('.service-content');
                if (content) {
                    content.style.transform = 'none'; // Remove scale transform
                    content.style.opacity = '1';
                }
                
                serviceObserver.unobserve(item);
            }
        });
    }, { threshold: 0.1 });

    serviceItems.forEach((item, index) => {
        item.style.visibility = 'visible';
        item.classList.remove('revealed');
        
        const staggerDelay = Math.pow(1.05, index) * 0.25;
        item.style.transitionDelay = `${staggerDelay}s`;
        
        const content = item.querySelector('.service-content');
        if (content) {
            content.style.transform = 'scale(0.98)';
            content.style.opacity = '0';
            content.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        }
        
        serviceObserver.observe(item);
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                serviceItems.forEach(item => {
                    if (item.classList.contains('revealed')) {
                        const rect = item.getBoundingClientRect();
                        const scrollPercent = rect.top / window.innerHeight;
                        const moveY = scrollPercent * 15; 
                        item.style.transform = `translateY(${moveY}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    const containerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                requestAnimationFrame(() => {
                    container.classList.add('revealed');
                });
                containerObserver.unobserve(container);
            }
        });
    }, { threshold: 0.1 });

    const serviceArea = document.querySelector('.service-areas');
    containerObserver.observe(serviceArea);

    function addScrollAnimations() {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        serviceItems.forEach((item, index) => {
            if (item.classList.contains('revealed')) {
                // Remove any transforms that might affect layout
                item.style.transform = 'none';
                
                // Ensure content stays in place
                const content = item.querySelector('.service-content');
                if (content) {
                    content.style.transform = 'none';
                }
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(addScrollAnimations);
    }, { passive: true });
  
    initialize();
    startAutoplay();

    function initializeMobileLayout() {
        if (window.innerWidth <= 1023) {
            const serviceItems = document.querySelectorAll('.service-item');
            let activeItem = null;

            function setupServiceItem(item) {
                if (!item.querySelector('.service-image')) {
                    const imageUrl = item.getAttribute('data-image');
                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'service-image';
                    imageContainer.innerHTML = `
                        <img 
                            src="${imageUrl}" 
                            alt="Service"
                            loading="lazy"
                            style="opacity: 0; transition: opacity 0.3s ease;"
                            onload="this.style.opacity='1'"
                        >`;
                    
                    // Insert image before the content
                    const content = item.querySelector('.service-content');
                    if (content) {
                        item.insertBefore(imageContainer, content);
                    } else {
                        item.insertBefore(imageContainer, item.firstChild);
                    }
                }
            }

            function toggleItem(item) {
                if (activeItem === item) {
                    // Close if clicking the active item
                    item.classList.remove('active');
                    const image = item.querySelector('.service-image');
                    if (image) {
                        image.style.height = '0';
                        image.style.marginBottom = '0';
                    }
                    activeItem = null;
                } else {
                    // Close previous item
                    if (activeItem) {
                        activeItem.classList.remove('active');
                        const prevImage = activeItem.querySelector('.service-image');
                        if (prevImage) {
                            prevImage.style.height = '0';
                            prevImage.style.marginBottom = '0';
                        }
                    }
                    
                    // Open new item
                    item.classList.add('active');
                    const image = item.querySelector('.service-image');
                    if (image) {
                        image.style.height = '350px';
                        image.style.marginBottom = '24px';
                    }
                    activeItem = item;
                    
                    // Scroll into view with offset for header
                    setTimeout(() => {
                        const headerHeight = 86;
                        const itemTop = item.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: itemTop - headerHeight - 20,
                            behavior: 'smooth'
                        });
                    }, 50);
                }
            }

            // Setup each service item
            serviceItems.forEach((item) => {
                setupServiceItem(item);

                // Click handler
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleItem(item);
                });
            });
        }
    }

    // Call on load and resize
    window.addEventListener('resize', initializeMobileLayout);
    document.addEventListener('DOMContentLoaded', initializeMobileLayout);
});