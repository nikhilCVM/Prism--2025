// Function to open fullscreen for the specific image
function openFullscreen(img) {
    let fullscreenOverlay = document.getElementById('fullscreen-overlay');
    let fullscreenImage = document.getElementById('fullscreen-image');

    fullscreenOverlay.style.display = 'flex';
    fullscreenImage.src = img.src;

    // Store the current index based on all images in the slider
    let allImages = Array.from(document.querySelectorAll('.slider-image'));
    fullscreenImage.currentIndex = allImages.indexOf(img);
}

// Function to close fullscreen
function closeFullscreen() {
    let fullscreenOverlay = document.getElementById('fullscreen-overlay');
    fullscreenOverlay.style.display = 'none';
}

// Function to change image in slider and fullscreen mode
function changeImage(direction) {
    let allImages = Array.from(document.querySelectorAll('.slider-image'));
    let fullscreenImage = document.getElementById('fullscreen-image');
    let fullscreenOverlay = document.getElementById('fullscreen-overlay');

    if (fullscreenOverlay.style.display === 'flex') {
        // Fullscreen navigation
        let currentIndex = (fullscreenImage.currentIndex + direction + allImages.length) % allImages.length;
        fullscreenImage.src = allImages[currentIndex].src;
        fullscreenImage.currentIndex = currentIndex;
    } else {
        // Regular slider navigation
        let visibleImages = document.querySelectorAll('.slider-image:not([style*="display: none"])');
        if (direction > 0) {
            // Show next set of images
            visibleImages.forEach(img => img.style.display = 'none');
            let nextIndex = (Array.from(allImages).indexOf(visibleImages[0]) + 1) % allImages.length;
            for (let i = 0; i < 5; i++) {
                let index = (nextIndex + i) % allImages.length;
                allImages[index].style.display = 'block';
            }
        } else {
            // Show previous set of images
            visibleImages.forEach(img => img.style.display = 'none');
            let firstVisibleIndex = Array.from(allImages).indexOf(visibleImages[0]);
            let prevIndex = ((firstVisibleIndex - 5) + allImages.length) % allImages.length;
            for (let i = 0; i < 5; i++) {
                let index = (prevIndex + i) % allImages.length;
                allImages[index].style.display = 'block';
            }
        }
    }
}

// Function to initialize the slider
function refreshSlider(sliderContainer) {
    let images = Array.from(sliderContainer.querySelectorAll('.slider-image'));

    // Initially show only first 5 images
    images.forEach((img, index) => {
        img.style.display = index < 5 ? 'block' : 'none';
        img.onclick = () => openFullscreen(img);
    });

    // Style the container for 5 images per row
    sliderContainer.style.display = 'grid';
    sliderContainer.style.gridTemplateColumns = 'repeat(5, 1fr)';
    sliderContainer.style.gap = '10px';

    // Add navigation arrows if not already added
    if (!sliderContainer.querySelector('.prev')) {
        let prevArrow = document.createElement('span');
        prevArrow.className = 'prev';
        prevArrow.innerHTML = '&#10094;';
        prevArrow.onclick = () => {
            changeImage(-1);
        };
        sliderContainer.prepend(prevArrow);

        let nextArrow = document.createElement('span');
        nextArrow.className = 'next';
        nextArrow.innerHTML = '&#10095;';
        nextArrow.onclick = () => {
            changeImage(1);
        };
        sliderContainer.appendChild(nextArrow);
    }
}

// Initialize the slider for each image-slider container
document.querySelectorAll('.image-slider').forEach(slider => refreshSlider(slider));

// Event listeners for keyboard navigation in fullscreen mode
document.addEventListener('keydown', function(event) {
    let fullscreenOverlay = document.getElementById('fullscreen-overlay');

    if (fullscreenOverlay.style.display === 'flex') {
        if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'Escape') {
            closeFullscreen();
        }
    }
});