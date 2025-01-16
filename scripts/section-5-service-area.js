document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceImageContainer = document.querySelector('.service-image');
    const SLIDE_DURATION = 5000;
    let currentIndex = 0;
    let slideInterval;
    let isHovered = false;
  
    function initialize() {
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
                
                const rect = item.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const distanceFromCenter = Math.abs((rect.top + rect.height/2) - viewportHeight/2);
                const delay = (distanceFromCenter / viewportHeight) * 200; 
                
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        item.classList.add('revealed');
                        
                        const content = item.querySelector('.service-content');
                        if (content) {
                            content.style.transform = 'scale(1)';
                            content.style.opacity = '1';
                        }
                    });
                }, delay);
                
                serviceObserver.unobserve(item);
            }
        });
    }, serviceObserverOptions);

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

    const addScrollAnimations = () => {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        serviceItems.forEach((item, index) => {
            if (item.classList.contains('revealed')) {
                const offset = (index + 1) * 0.1;
                const scale = 1 + (scrollProgress * 0.02);
                item.style.transform = `scale(${scale})`;
            }
        });
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(addScrollAnimations);
    }, { passive: true });
  
    initialize();
    startAutoplay();

    function initializeMobileLayout() {
        if (window.innerWidth <= 1023) {
            const serviceItems = document.querySelectorAll('.service-item');
            let activeItem = null;

            // Clear any existing mobile setup
            serviceItems.forEach(item => {
                const existingImage = item.querySelector('.service-image');
                if (existingImage) {
                    existingImage.remove();
                }
            });

            // Setup mobile layout
            serviceItems.forEach(item => {
                // Create and insert image container
                const image = item.getAttribute('data-image');
                const imageContainer = document.createElement('div');
                imageContainer.className = 'service-image';
                imageContainer.innerHTML = `<img src="${image}" alt="Service Image">`;
                
                const content = item.querySelector('.service-content');
                item.insertBefore(imageContainer, content);

                // Add click handler
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    if (activeItem === item) {
                        item.classList.remove('active');
                        activeItem = null;
                    } else {
                        if (activeItem) {
                            activeItem.classList.remove('active');
                        }
                        
                        setTimeout(() => {
                            item.classList.add('active');
                            activeItem = item;
                            
                            // Scroll into view if needed
                            const itemRect = item.getBoundingClientRect();
                            const isVisible = (itemRect.top >= 0) && 
                                            (itemRect.bottom <= window.innerHeight);
                            
                            if (!isVisible) {
                                item.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'start',
                                    inline: 'nearest'
                                });
                            }
                        }, activeItem ? 300 : 0);
                    }
                });
            });

            // Disable desktop functionality
            if (typeof slideInterval !== 'undefined') {
            clearInterval(slideInterval);
            }
        }
    }

    // Call initializeMobileLayout on page load and resize
    window.addEventListener('resize', initializeMobileLayout);
    document.addEventListener('DOMContentLoaded', initializeMobileLayout);
});