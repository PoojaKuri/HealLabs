// Smooth scrolling for navigation links, excluding those within the carousel
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (!anchor.closest('.carousel')) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Change navbar background on scroll
const navbar = document.querySelector('.navbar');
const transparentClass = 'transparent';
const solidClass = 'solid';

function updateNavbar() {
    if (window.scrollY > 50 || window.location.pathname.includes("contact.html")) {
        navbar.classList.add(solidClass);
        navbar.classList.remove(transparentClass);
    } else {
        navbar.classList.remove(solidClass);
        navbar.classList.add(transparentClass);
    }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar(); // Initial call to set navbar state

// Fade-in effect for sections on scroll
const sections = document.querySelectorAll("section");
window.addEventListener('scroll', function() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Change the hero section background on carousel slide
$(document).ready(function () {
    $('#carouselExampleIndicators').on('slide.bs.carousel', function (e) {
        var nextBackground = $(e.relatedTarget).data('background');
        $('.hero.banner').css('background-image', 'url(' + nextBackground + ')');
    });
});

// Toggle product description visibility
function toggleDescription(button) {
    const description = button.parentElement.querySelector('.product-description');
    if (description.style.display === 'flex') {
        description.style.display = 'none';
        button.textContent = 'Description';
    } else {
        description.style.display = 'flex';
        button.textContent = 'Hide Description';
    }
}

// Show and hide specific descriptions by ID
function showDescription(id) {
    document.getElementById(id).style.display = 'flex';
}
function hideDescription(id) {
    document.getElementById(id).style.display = 'none';
}

// Reveal testimonial cards when they enter the viewport
function revealTestimonialCards() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    testimonials.forEach(card => observer.observe(card));
}

window.addEventListener('load', revealTestimonialCards);

// Show hidden footer elements on DOM content load
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".footer-info.hidden, .footer-box.hidden");
    elements.forEach(el => el.classList.remove("hidden"));
});

// Toggle logo visibility based on navbar state
function toggleLogo() {
    const logo = document.getElementById("navbar-logo");
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse.classList.contains("show")) {
        logo.style.display = "block";
    } else {
        logo.style.display = "none";
    }
}



//showing full image when 
function showFullImage(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    modal.style.display = 'flex';  // Show modal
    modalImage.src = imageSrc;    // Set the clicked image to modal image

    // Set initial small size for the image
    modalImage.style.transform = 'scale(0.5)';  // Start with 50% zoom (small)
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none'; // Close the modal
}

function zoomIn() {
    const modalImage = document.getElementById('modalImage');
    let currentScale = getCurrentScale(modalImage);
    modalImage.style.transform = `scale(${currentScale + 0.1})`; // Zoom in
}

function zoomOut() {
    const modalImage = document.getElementById('modalImage');
    let currentScale = getCurrentScale(modalImage);
    modalImage.style.transform = `scale(${Math.max(currentScale - 0.1, 0.5)})`; // Zoom out, but not smaller than initial size
}

function getCurrentScale(image) {
    const transform = window.getComputedStyle(image).transform;
    const matrix = new DOMMatrix(transform);
    return matrix.isIdentity ? 1 : matrix.a;
}
  