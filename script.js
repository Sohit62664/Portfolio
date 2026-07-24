// ─── 1. Typewriter Effect ─────────────────────────────────────
const typewriterEl = document.querySelector(".typewriter");

if (typewriterEl) {
    const words = ["Web Developer", "DSA Enthusiast", "ECE Student", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Switch to deleting when word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1500); // pause before deleting
            return;
        }

        // Move to next word when fully deleted
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeWriter, isDeleting ? 60 : 100);
    }

    typeWriter();
}


// ─── 2. Navbar Scroll Effect ──────────────────────────────────
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ─── 3. Scroll-to-Top Button ──────────────────────────────────
const scrollTopBtn = document.createElement("button");
scrollTopBtn.classList.add("scroll-top");
scrollTopBtn.innerHTML = "&#8679;";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ─── 4. Scroll Fade-in Animation (IntersectionObserver) ───────
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

fadeElements.forEach((el) => observer.observe(el));


// ─── 5. Counter Animation ─────────────────────────────────────
function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        start += step;
        el.textContent = Math.floor(start) + "+";
        if (start >= target) {
            el.textContent = target + "+";
            clearInterval(timer);
        }
    }, 16);
}

// Trigger counters when stats section is visible
const statNumbers = document.querySelectorAll(".stat-item h2");

if (statNumbers.length > 0) {
    const targets = [10, 5, 100, 3]; // customize these numbers
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach((el, i) => {
                    animateCounter(el, targets[i] || 10, 1500);
                });
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach((el) => statsObserver.observe(el));
}


// ─── 6. Hamburger Menu (Mobile) ───────────────────────────────
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("open");
        });
    });
}


// ─── 7. Smooth Scroll for Nav Links ──────────────────────────
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});


// ─── 8. Active Nav Link on Scroll ────────────────────────────
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navAnchors.forEach((a) => {
        a.style.color = "";
        if (a.getAttribute("href") === "#" + current) {
            a.style.color = "#f97316";
        }
    });
});


// ─── 9. Contact Form Feedback ─────────────────────────────────
// const contactForm = document.querySelector(".contact-form");

// if (contactForm) {
//     contactForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const btn = contactForm.querySelector("button");
//         btn.textContent = "Message Sent ✓";
//         btn.style.background = "#22c55e";

//         setTimeout(() => {
//             btn.textContent = "Send Message";
//             btn.style.background = "#f97316";
//             contactForm.reset();
//         }, 3000);
//     });
// }


// ─── 10. Skill Card Stagger Animation ────────────────────────
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});


// Gallary 


const galleryImages = [

    {
        src: "Images/Trophy1.png",
        caption: "Achievement Trophy"
    },

    {
        src: "Images/Bangaluru_visit.jpeg",
        caption: "Bengaluru Visit"
    },

    {
        src: "Images/Invoked-certificate.jpeg",
        caption: "Shikshalokam Hackathon"
    },

    {
        src: "Images/Fyrstgen-certigicate.jpeg",
        caption: "Fyrstgen Hackathon"
    },

    {
        src: "Images/vit-Research-certificate.jpeg",
        caption: "VIT Intra College Research Certificate"
    },

    {
        src: "Images/fyrestgen.jpg",
        caption: "Fyrstgen"
    },

    {
        src: "Images/fyrestgen-certificate.jpg",
        caption: "Fyrstgen Certificate"
    },

    {
        src: "Images/shikshalokam.jpg",
        caption: "Shikshalokam"
    },

    {
        src: "Images/shikshalokam-certificate.jpg",
        caption: "Shikshalokam Certificate"
    }

];


let currentImage = 0;


function openGallery() {

    currentImage = 0;

    document.getElementById("statusGallery").style.display = "flex";

    document.body.style.overflow = "hidden";

    createProgress();

    showImage();
}


function closeGallery() {

    document.getElementById("statusGallery").style.display = "none";

    document.body.style.overflow = "auto";
}


function showImage() {

    document.getElementById("statusImage").src =
        galleryImages[currentImage].src;

    document.getElementById("statusCaption").innerText =
        galleryImages[currentImage].caption;

    updateProgress();
}


function nextImage() {

    if (currentImage < galleryImages.length - 1) {

        currentImage++;

        showImage();

    } else {

        closeGallery();

    }
}


function prevImage() {

    if (currentImage > 0) {

        currentImage--;

        showImage();
    }
}


function createProgress() {

    const container =
        document.getElementById("statusProgress");

    container.innerHTML = "";

    galleryImages.forEach(() => {

        const bar = document.createElement("div");

        bar.classList.add("progress-item");

        container.appendChild(bar);

    });
}


function updateProgress() {

    const bars =
        document.querySelectorAll(".progress-item");

    bars.forEach((bar, index) => {

        if (index <= currentImage) {

            bar.classList.add("active");

        } else {

            bar.classList.remove("active");

        }

    });
}


/* Keyboard Controls */

document.addEventListener("keydown", function (event) {

    const gallery =
        document.getElementById("statusGallery");

    if (gallery.style.display !== "flex")
        return;

    if (event.key === "ArrowRight")
        nextImage();

    if (event.key === "ArrowLeft")
        prevImage();

    if (event.key === "Escape")
        closeGallery();

});

