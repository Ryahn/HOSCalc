document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let currentIndex = 0;
    
    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        inner.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
    }
    
    carousel.querySelector('.carousel-button-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(currentIndex);
    });
    
    carousel.querySelector('.carousel-button-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    });
    
    // Auto advance
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }, 5000);
});