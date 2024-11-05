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
