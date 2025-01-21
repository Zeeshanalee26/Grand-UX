document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('logoTrack');
    if (!track) return;

    // Get the original logos
    const logos = Array.from(track.children);
    const logoWidth = logos[0].offsetWidth;
    const totalLogos = logos.length;

    // Clone enough logos to ensure smooth infinite scroll
    for (let i = 0; i < totalLogos * 3; i++) {
        const clone = logos[i % totalLogos].cloneNode(true);
        track.appendChild(clone);
    }

    let position = 0;
    let speed = 1;
    let isPaused = false;
    let animationId = null;

    function moveLogos() {
        if (!isPaused) {
            position -= speed;
            
            // Reset position when reaching one set of logos
            // This creates the infinite loop effect
            if (Math.abs(position) >= logoWidth * totalLogos) {
                position = 0;
            }
            
            track.style.transform = `translateX(${position}px)`;
        }
        animationId = requestAnimationFrame(moveLogos);
    }

    // Start the animation
    moveLogos();

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    track.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        cancelAnimationFrame(animationId);
        
        resizeTimeout = setTimeout(() => {
            // Reset position and recalculate logo width
            position = 0;
            track.style.transform = `translateX(${position}px)`;
            moveLogos();
        }, 150);
    });
});