// Toggle Icon Navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// Typed.js Animation (if library is loaded)
if (window.Typed) {
    const typed = new Typed('.multiple-text', {
        strings: ['Computer Science Student', 'Software Developer', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

// Contact form mock submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out! Your message has been sent successfully.');
    this.reset();
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');
const certImages = document.querySelectorAll('.cert-img');

certImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Close lightbox when click outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// -----------------------------------------------------------------
// Background Canvas Particle Animation
// -----------------------------------------------------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 80;

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener('resize', () => {
    resizeCanvas();
    init();
});

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
        // Primary color
        this.color = 'rgba(0, 171, 240, 0.8)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
function init() {
    particlesArray = [];
    // Reduce particle count on smaller screens
    const particleCount = window.innerWidth < 768 ? 40 : numberOfParticles;
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
}

// Connect particles
function connect() {
    let opacityValue = 1;
    const maxDistance = 15000; 
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = dx * dx + dy * dy;
            
            if (distance < maxDistance) {
                opacityValue = 1 - (distance / maxDistance);
                ctx.strokeStyle = `rgba(0, 171, 240, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connect();
}

init();
animate();
