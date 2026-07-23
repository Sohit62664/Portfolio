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
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector("button");
        btn.textContent = "Message Sent ✓";
        btn.style.background = "#22c55e";

        setTimeout(() => {
            btn.textContent = "Send Message";
            btn.style.background = "#f97316";
            contactForm.reset();
        }, 3000);
    });
}


// ─── 10. Skill Card Stagger Animation ────────────────────────
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});