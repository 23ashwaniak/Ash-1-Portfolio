// Portfolio Website JavaScript - Optimized and Scalable
// Author: Ashwani Singh
// Version: 2.0

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Initialize all components
    Navigation.init();
    ScrollEffects.init();
    Animations.init();
    FormHandler.init();

    // Add loading animation
    PageLoader.init();

    // Initialize page-specific features
    const currentPage = getCurrentPage();
    PageSpecific.init(currentPage);

    // Console welcome message
    console.log(
        "%c Welcome to Ashwani Singh's Portfolio! ",
        "background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 10px; border-radius: 5px; font-size: 16px;"
    );
    console.log(
        "Thanks for checking out the code! Feel free to reach out if you have any questions."
    );
}

// ===================== Navigation Module =====================
const Navigation = {
    init() {
        this.setupMobileMenu();
        this.setupActiveNavigation();
        this.setupSmoothScrolling();
    },

    setupMobileMenu() {
        const mobileMenu = document.querySelector(".mobile-menu");
        const navMenu = document.querySelector(".nav-menu");

        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener("click", () => {
                navMenu.classList.toggle("active");
                mobileMenu.classList.toggle("active");
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll(".nav-link").forEach((link) => {
                link.addEventListener("click", () => {
                    navMenu.classList.remove("active");
                    mobileMenu.classList.remove("active");
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener("click", (e) => {
                if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove("active");
                    mobileMenu.classList.remove("active");
                }
            });
        }
    },

    setupActiveNavigation() {
        const currentPage = getCurrentPage();
        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {
            const linkPage = link.getAttribute("href");
            if (
                linkPage === currentPage ||
                (currentPage === "" && linkPage === "index.html")
            ) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    },

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    const offset = 80; // Account for fixed navbar
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            });
        });
    },
};

// ===================== Scroll Effects Module =====================
const ScrollEffects = {
    init() {
        this.setupNavbarScroll();
        this.setupProgressBar();
        this.setupScrollToTop();
        this.setupParallaxEffects();
    },

    setupNavbarScroll() {
        window.addEventListener(
            "scroll",
            Utils.debounce(() => {
                const navbar = document.querySelector(".navbar");
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.style.background = "rgba(255, 255, 255, 0.98)";
                        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.15)";
                    } else {
                        navbar.style.background = "rgba(255, 255, 255, 0.95)";
                        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
                    }
                }
            }, 10)
        );
    },

    setupProgressBar() {
        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
            window.addEventListener(
                "scroll",
                Utils.debounce(() => {
                    const scrollHeight =
                        document.documentElement.scrollHeight - window.innerHeight;
                    const scrolled = (window.scrollY / scrollHeight) * 100;
                    progressBar.style.width = Math.min(scrolled, 100) + "%";
                }, 10)
            );
        }
    },

    setupScrollToTop() {
        let scrollToTopBtn = document.getElementById("scrollToTop");

        // Create scroll to top button if it doesn't exist
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement("button");
            scrollToTopBtn.id = "scrollToTop";
            scrollToTopBtn.className = "scroll-to-top";
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
            document.body.appendChild(scrollToTopBtn);
        }

        window.addEventListener(
            "scroll",
            Utils.debounce(() => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add("visible");
                } else {
                    scrollToTopBtn.classList.remove("visible");
                }
            }, 10)
        );

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    },

    setupParallaxEffects() {
        const hero = document.querySelector(".hero");
        const pageHeader = document.querySelector(".page-header");

        if (hero || pageHeader) {
            window.addEventListener(
                "scroll",
                Utils.debounce(() => {
                    const scrolled = window.pageYOffset;
                    if (hero && scrolled < hero.offsetHeight) {
                        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                    }
                    if (pageHeader && scrolled < pageHeader.offsetHeight) {
                        pageHeader.style.transform = `translate3d(0, ${
                            scrolled * -0.5
                        }px, 0)`;
                    }
                }, 10)
            );
        }
    },
};

// ===================== Animations Module =====================
const Animations = {
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTypingAnimation();
    },

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);

        // Observe fade-in elements
        const animateElements = document.querySelectorAll(
            ".fade-in, .about-text, .quick-facts, .cta-buttons, .skill-card, .certificate-card, .contact-preview-content"
        );
        animateElements.forEach((el) => {
            el.classList.add("fade-in");
            observer.observe(el);
        });
    },

    setupHoverEffects() {
        // Profile image hover
        document.querySelectorAll(".profile-image").forEach((img) => {
            img.addEventListener("mouseenter", () => {
                img.style.transform = "scale(1.05) rotate(2deg)";
            });
            img.addEventListener("mouseleave", () => {
                img.style.transform = "scale(1) rotate(0deg)";
            });
        });

        // Button hover
        document
            .querySelectorAll(".btn-primary, .btn-secondary, .cta-button")
            .forEach((button) => {
                button.addEventListener("mouseenter", () => {
                    button.style.transform = "translateY(-3px)";
                });
                button.addEventListener("mouseleave", () => {
                    button.style.transform = "translateY(0)";
                });
            });

        // Skill cards stagger
        const skillsSection = document.querySelector(".skills-grid");
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.animateSkills();
                            skillsObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3 }
            );
            skillsObserver.observe(skillsSection);
        }
    },

    animateSkills() {
        document.querySelectorAll(".skill-card").forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = "translateY(-15px) scale(1.05)";
                setTimeout(() => {
                    card.style.transform = "translateY(0) scale(1)";
                }, 300);
            }, index * 100);
        });
    },

    setupTypingAnimation() {
        const mainHeading = document.querySelector(".hero h1, .about-text h2");
        if (mainHeading && window.location.pathname.endsWith("index.html")) {
            const originalText = mainHeading.textContent;
            setTimeout(() => {
                this.typeWriter(mainHeading, originalText, 100);
            }, 1000);
        }
    },

    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = "";
        element.style.borderRight = "2px solid #6366f1";

        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = "none";
                }, 1000);
            }
        };
        type();
    },
};

// ===================== Form Handler Module =====================
const FormHandler = {
    init() {
        this.setupContactForm();
    },

    setupContactForm() {
        const contactForm = document.querySelector("#contactForm, .contact-form form");
        if (contactForm) {
            contactForm.addEventListener("submit", this.handleSubmit.bind(this));
        }
    },

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (!this.validateForm(data)) return;

        const submitBtn = form.querySelector("button[type='submit'], .submit-btn");
        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        setTimeout(() => {
            this.showSuccessMessage();
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    },

    validateForm(data) {
        const required = ["name", "email", "message"];
        for (let field of required) {
            if (!data[field] || data[field].trim() === "") {
                this.showError(`Please fill in the ${field} field.`);
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showError("Please enter a valid email address.");
            return false;
        }
        return true;
    },

    showError(message) {
        alert(message);
    },

    showSuccessMessage() {
        alert("Thank you for your message! I'll get back to you soon.");
    },
};

// ===================== Page Loader Module =====================
const PageLoader = {
    init() {
        this.setupPageTransition();
    },

    setupPageTransition() {
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.5s ease";

        window.addEventListener("load", () => {
            setTimeout(() => {
                document.body.style.opacity = "1";
            }, 100);
        });
    },
};

// ===================== Page-specific Features =====================
const PageSpecific = {
    init(currentPage) {
        switch (currentPage) {
            case "index.html":
            case "":
                this.initHomePage();
                break;
            case "about.html":
                this.initAboutPage();
                break;
            case "skills.html":
                this.initSkillsPage();
                break;
            case "certificates.html":
                this.initCertificatesPage();
                break;
            default:
                break;
        }
    },

    initHomePage() {
        console.log("Home page initialized");
    },

    initAboutPage() {
        console.log("About page initialized");
    },

    initSkillsPage() {
        this.setupSkillBars();
        console.log("Skills page initialized");
    },

    setupSkillBars() {
        const skillBars = document.querySelectorAll(".skill-progress");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const width = entry.target.getAttribute("data-width");
                        setTimeout(() => {
                            entry.target.style.width = width;
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        skillBars.forEach((bar) => observer.observe(bar));
    },

    initCertificatesPage() {
        this.setupCertificateModal();
        console.log("Certificates page initialized");
    },

    setupCertificateModal() {
        window.viewCertificate = this.viewCertificate;
        window.downloadCertificate = this.downloadCertificate;
        window.closeCertModal = this.closeCertModal;
    },

    viewCertificate(certId) {
        const modal = document.getElementById("certModal");
        const modalContent = document.getElementById("modalContent");

        // Certificate data
        const certificates = {
            html5: {
                title: "HTML5 Certification",
                provider: "Web Development Institute",
                date: "November 2024",
                description:
                    "This certification validates proficiency in HTML5, semantic markup, accessibility standards, and modern web development practices.",
                skills: [
                    "HTML5",
                    "Semantic Elements",
                    "Forms",
                    "Canvas API",
                    "Web Storage",
                    "Accessibility",
                ],
            },
            css3: {
                title: "CSS3 & Responsive Design",
                provider: "Advanced Styling Academy",
                date: "October 2024",
                description:
                    "Comprehensive certification covering advanced CSS3 features, responsive design, animations, and modern layout techniques.",
                skills: ["CSS3", "Flexbox", "Grid", "Media Queries", "Animations", "Sass/SCSS"],
            },
            javascript: {
                title: "JavaScript Programming",
                provider: "Modern JS Institute",
                date: "September 2024",
                description:
                    "In-depth certification covering ES6+ JavaScript, DOM manipulation, async programming, and modern development practices.",
                skills: ["ES6+", "Promises", "Async/Await", "DOM API", "Event Handling", "Modules"],
            },
            react: {
                title: "React Development",
                provider: "Frontend Framework Academy",
                date: "August 2024",
                description:
                    "Specialized certification in React development, component architecture, state management, and modern React patterns.",
                skills: ["React", "JSX", "Hooks", "Context API", "Redux", "Testing"],
            },
            python: {
                title: "Python Programming",
                provider: "Python Development Institute",
                date: "July 2024",
                description:
                    "Comprehensive Python certification covering core programming concepts, web development, and automation.",
                skills: [
                    "Python 3",
                    "Web Frameworks",
                    "Database Integration",
                    "API Development",
                    "Testing",
                    "Automation",
                ],
            },
            webdev: {
                title: "Web Development Fundamentals",
                provider: "Full Stack Academy",
                date: "June 2024",
                description:
                    "Foundation certification covering web development principles, HTTP protocols, browser APIs, and best practices.",
                skills: [
                    "HTTP/HTTPS",
                    "RESTful APIs",
                    "Browser DevTools",
                    "Web Performance",
                    "Security",
                    "SEO",
                ],
            },
        };

        const cert = certificates[certId];
        if (cert) {
            modalContent.innerHTML = `
                <div class="modal-cert-content">
                    <div class="modal-cert-header">
                        <h2>${cert.title}</h2>
                        <div class="cert-meta">
                            <p><strong>Provider:</strong> ${cert.provider}</p>
                            <p><strong>Date Issued:</strong> ${cert.date}</p>
                        </div>
                    </div>
                    <div class="modal-cert-body">
                        <p>${cert.description}</p>
                        <h4>Skills Covered:</h4>
                        <div class="modal-skills">
                            ${cert.skills
                                .map((skill) => `<span class="modal-skill-tag">${skill}</span>`)
                                .join("")}
                        </div>
                        <div class="cert-placeholder">
                            <i class="fas fa-certificate"></i>
                            <p>Certificate Preview</p>
                            <small>Actual certificate would be displayed here</small>
                        </div>
                    </div>
                </div>
            `;
            modal.style.display = "block";
        }
    },

    downloadCertificate(certId) {
        alert(
            `Certificate download for ${certId} will be available soon. Please contact for the actual certificate file.`
        );
    },

    closeCertModal() {
        const modal = document.getElementById("certModal");
        modal.style.display = "none";
    },
};

// ===================== Utils =====================
const Utils = {
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        );
    },

        scrollToElement(element, offset = 80) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    },
};
