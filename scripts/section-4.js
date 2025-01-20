document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('logoTrack');
    if (!track) return;

    // Clone logos multiple times to ensure smooth infinite scroll
    const originalLogos = track.innerHTML;
    track.innerHTML = originalLogos + originalLogos + originalLogos + originalLogos;

    let position = 0;
    const speed = 1;

    function moveLogos() {
        position -= speed;
        
        // Reset position seamlessly when reaching half of the content
        if (Math.abs(position) >= track.offsetWidth / 2) {
            position = 0;
        }
        
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(moveLogos);
    }

    // Start the animation
    requestAnimationFrame(moveLogos);

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        position = 0;
        track.style.transform = `translateX(${position}px)`;
    });
});