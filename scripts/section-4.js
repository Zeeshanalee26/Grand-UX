document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('logoTrack');
    const container = track.parentElement;
    const logos = [...track.getElementsByClassName('logo')];
    
    const logoWidth = logos[0].offsetWidth;
    
    const numberOfLogosNeeded = Math.ceil(container.offsetWidth / logoWidth) + logos.length;
    
    for(let i = 0; i < numberOfLogosNeeded; i++) {
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            track.appendChild(clone);
        });
    }

    let scrollInterval;
    let position = 0;
    const speed = 1;

    function moveLogos() {
        position -= speed;
        
        if (Math.abs(position) >= logoWidth * logos.length) {
            position = 0;
        }
        
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(moveLogos);
    }

    requestAnimationFrame(moveLogos);

    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

    window.addEventListener('resize', () => {
        position = 0;
        track.style.transform = `translateX(${position}px)`;
    });
});