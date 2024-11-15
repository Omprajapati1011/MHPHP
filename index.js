// Form Submission and Notification Functionality
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification(data.message, 'success');
            document.getElementById('contact-form').reset(); // Clear the form
        } else {
            showNotification(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    });
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.innerHTML = `<div class="icon">${type === 'success' ? '✔️' : '❌'}</div> ${message}`;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}


// Carousel Functionality for Testimonial Slider
let currentTestimonialIndex = 0;

function showTestimonialSlide(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;

    // Calculate the correct index to show
    currentTestimonialIndex = (index + totalSlides) % totalSlides;

    const sliderContainer = document.querySelector('.slider-container');
    const slideWidth = sliderContainer.clientWidth / 3; // Display 3 slides at a time

    // Check if we are at the end, and if so, reset to the start
    if (currentTestimonialIndex >= totalSlides - 3) {
        setTimeout(() => {
            currentTestimonialIndex = 0;
            sliderContainer.style.transition = 'none';
            sliderContainer.style.transform = 'translateX(0px)';
        }, 500); // Delay to show the last slide before resetting
    } else {
        sliderContainer.style.transition = 'transform 0.5s ease-in-out';
        sliderContainer.style.transform = `translateX(-${currentTestimonialIndex * slideWidth}px)`;
    }
}

function autoSlide() {
    showTestimonialSlide(currentTestimonialIndex + 1);
    setTimeout(autoSlide, 3000); // Change slide every 3 seconds
}

// Carousel Functionality for the Main Slider
let currentIndex = 0;

function showMainSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    currentIndex = (index + totalSlides) % totalSlides;

    const carouselInner = document.querySelector('.carousel-inner');
    const width = document.querySelector('.carousel').clientWidth;
    carouselInner.style.transform = `translateX(-${currentIndex * width}px)`;
}

function autoSlideMain() {
    showMainSlide(currentIndex + 1);
    setTimeout(autoSlideMain, 3000); // Change slide every 3 seconds
}

function nextSlide() {
    showMainSlide(currentIndex + 1);
}

function prevSlide() {
    showMainSlide(currentIndex - 1);
}

// Countdown Functionality for Achievements Section
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/[^\d]/g, ''); // Remove non-numeric characters

            const speed = 100; // Adjust the speed here
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10); // Adjust timing to improve the counting effect
            } else {
                counter.innerText = target + (counter.getAttribute('data-target') === '99' ? '%' : '+');
            }
        };

        updateCount();
    });
}

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    autoSlide(); // Initialize auto-sliding for the testimonial carousel
    autoSlideMain(); // Initialize auto-sliding for the main carousel
    initCounters(); // Initialize counters for the achievements section
    window.addEventListener('resize', () => showTestimonialSlide(currentTestimonialIndex)); // Adjust testimonial slide position on window resize
    window.addEventListener('resize', () => showMainSlide(currentIndex)); // Adjust main slide position on window resize
});
