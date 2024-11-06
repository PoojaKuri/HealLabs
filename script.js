// Smooth scrolling for navigation links
$(document).ready(function() {
    $("a.nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });
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

// Call updateNavbar on scroll and when the page loads
window.addEventListener('scroll', updateNavbar);
updateNavbar(); // Initial check on page load

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


// JavaScript to change the background of the hero section on carousel slide
$(document).ready(function () {
    $('#carouselExampleIndicators').on('slide.bs.carousel', function (e) {
        var nextBackground = $(e.relatedTarget).data('background');
        $('.hero.banner').css('background-image', 'url(' + nextBackground + ')');
    });
});

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


function showDescription(id) {
    document.getElementById(id).style.display = 'flex';
}
function hideDescription(id) {
    document.getElementById(id).style.display = 'none';
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


    // Function to handle the reveal of testimonial cards when they enter the viewport
    function revealTestimonialCards() {
        const testimonials = document.querySelectorAll('.testimonial-card');

        // Create an IntersectionObserver to detect when testimonial cards are in view
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the 'visible' class to the card to trigger the animation
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the element is in view
        });

        testimonials.forEach(card => {
            observer.observe(card); // Observe each testimonial card
        });
    }

    // Initialize the function when the page loads
    window.addEventListener('load', revealTestimonialCards);


    document.addEventListener("DOMContentLoaded", function () {
        const elements = document.querySelectorAll(".footer-info.hidden, .footer-box.hidden");
        elements.forEach((el) => {
            el.classList.remove("hidden");
        });
    });