// Portfolio Website JavaScript - Fixed Version
// Author: Ashwani Singh
// Version: 2.1 - FIXED COMPLETE

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
    CertificateHandler.init();

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

// Get current page
function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
}

// ===================== Navigation Module - FIXED =====================
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
                (currentPage === "index.html" && linkPage === "index.html") ||
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

// ===================== Scroll Effects Module - FIXED =====================
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
                        navbar.classList.add("scrolled");
                    } else {
                        navbar.classList.remove("scrolled");
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

// ===================== Animations Module - FIXED =====================
const Animations = {
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTypingAnimation();
        this.setupSkillBars();
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
            ".fade-in, .about-text, .quick-facts, .cta-buttons, .skill-card, .certificate-card, .contact-preview-content, .resume-section, .personal-values, .journey-section, .about-cta"
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

        // Button hover effects
        document.querySelectorAll(".btn-primary, .btn-secondary, .cta-button").forEach((button) => {
            button.addEventListener("mouseenter", () => {
                button.style.transform = "translateY(-3px)";
            });
            button.addEventListener("mouseleave", () => {
                button.style.transform = "translateY(0)";
            });
        });

        // Card hover effects
        document.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("mouseenter", () => {
                if (!card.style.transform.includes("translateY")) {
                    card.style.transform = "translateY(-5px)";
                }
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "translateY(0)";
            });
        });
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

    setupTypingAnimation() {
        const mainHeading = document.querySelector(".hero h1");
        if (mainHeading && getCurrentPage() === "index.html") {
            const originalText = mainHeading.textContent;
            setTimeout(() => {
                this.typeWriter(mainHeading, originalText, 100);
            }, 1000);
        }
    },

    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = "";
        element.style.borderRight = "2px solid white";

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

// ===================== Form Handler Module - FIXED =====================
const FormHandler = {
    init() {
        this.setupContactForm();
        this.setupResumeDownload();
        this.setupFormValidation();
    },

    setupContactForm() {
        const contactForm = document.querySelector("#contactForm, .contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", this.handleSubmit.bind(this));
        }
    },

    setupResumeDownload() {
        const downloadBtn = document.getElementById('downloadResume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                alert('Resume download will be available soon. Please contact for the actual resume file.');
            });
        }
    },

    setupFormValidation() {
        const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('focus', () => {
                input.style.borderColor = '#6366f1';
                this.clearError(input);
            });

            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.style.borderColor = '#10b981';
                }
            });
        });
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        if (!value) {
            isValid = false;
            message = `${this.getFieldName(field)} is required.`;
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address.';
            }
        }

        if (isValid) {
            field.style.borderColor = '#10b981';
            this.clearError(field);
        } else {
            field.style.borderColor = '#ef4444';
            this.showError(field, message);
        }

        return isValid;
    },

    getFieldName(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        if (label) {
            return label.textContent.replace('*', '').trim();
        }
        return field.name || field.id || 'This field';
    },

    showError(field, message) {
        this.clearError(field);
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    },

    clearError(field) {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    },

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isFormValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormError("Please fix the errors above and try again.");
            return;
        }

        const submitBtn = form.querySelector(".submit-btn");
        const originalContent = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage();
            form.reset();
            
            // Reset form styling
            requiredFields.forEach(field => {
                field.style.borderColor = '#f8fafc';
                this.clearError(field);
            });

            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }, 2000);
    },

    showFormError(message) {
        // Create or update form error message
        let errorDiv = document.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.cssText = `
                background: #fef2f2;
                color: #dc2626;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                border: 1px solid #fecaca;
            `;
            const form = document.querySelector('#contactForm, .contact-form');
            form.insertBefore(errorDiv, form.firstChild);
        }
        errorDiv.textContent = message;
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: #f0fdf4;
            color: #166534;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            border: 1px solid #bbf7d0;
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            max-width: 400px;
        `;
        successDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle"></i>
                <span>Thank you for your message! I'll get back to you soon.</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: auto;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(successDiv);

        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }
};

// ===================== Certificate Handler Module - FIXED =====================
const CertificateHandler = {
    init() {
        this.setupCertificateModal();
        // Make functions global for onclick handlers
        window.viewCertificate = this.viewCertificate.bind(this);
        window.downloadCertificate = this.downloadCertificate.bind(this);
        window.closeCertModal = this.closeCertModal.bind(this);
    },

    viewCertificate(certId) {
        const modal = document.getElementById("certModal");
        const modalContent = document.getElementById("modalContent");

        if (!modal || !modalContent) return;

        // Certificate data
        const certificates = {
            html5: {
                title: "HTML5 Certification",
                provider: "Web Development Institute",
                date: "November 2024",
                description: "This certification validates proficiency in HTML5, semantic markup, accessibility standards, and modern web development practices.",
                skills: ["HTML5", "Semantic Elements", "Forms", "Canvas API", "Web Storage", "Accessibility"]
            },
            css3: {
                title: "CSS3 & Responsive Design",
                provider: "Advanced Styling Academy",
                date: "October 2024",
                description: "Comprehensive certification covering advanced CSS3 features, responsive design, animations, and modern layout techniques.",
                skills: ["CSS3", "Flexbox", "Grid", "Media Queries", "Animations", "Sass/SCSS"]
            },
            javascript: {
                title: "JavaScript Programming",
                provider: "Modern JS Institute",
                date: "September 2024",
                description: "In-depth certification covering ES6+ JavaScript, DOM manipulation, async programming, and modern development practices.",
                skills: ["ES6+", "Promises", "Async/Await", "DOM API", "Event Handling", "Modules"]
            },
            react: {
                title: "React Development",
                provider: "Frontend Framework Academy",
                date: "August 2024",
                description: "Specialized certification in React development, component architecture, state management, and modern React patterns.",
                skills: ["React", "JSX", "Hooks", "Context API", "Redux", "Testing"]
            },
            python: {
                title: "Python Programming",
                provider: "Python Development Institute",
                date: "July 2024",
                description: "Comprehensive Python certification covering core programming concepts, web development, and automation.",
                skills: ["Python 3", "Web Frameworks", "Database Integration", "API Development", "Testing", "Automation"]
            },
            webdev: {
                title: "Web Development Fundamentals",
                provider: "Full Stack Academy",
                date: "June 2024",
                description: "Foundation certification covering web development principles, HTTP protocols, browser APIs, and best practices.",
                skills: ["HTTP/HTTPS", "RESTful APIs", "Browser DevTools", "Web Performance", "Security", "SEO"]
            }
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
                            ${cert.skills.map(skill => `<span class="modal-skill-tag">${skill}</span>`).join("")}
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
            document.body.style.overflow = "hidden";
        }
    },

    downloadCertificate(certId) {
        alert(`Certificate download for ${certId} will be available soon. Please contact for the actual certificate file.`);
    },

    closeCertModal() {
        const modal = document.getElementById("certModal");
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    },

    setupCertificateModal() {
        // Close modal when clicking outside of it
        window.addEventListener('click', (event) => {
            const modal = document.getElementById("certModal");
            if (event.target === modal) {
                this.closeCertModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeCertModal();
            }
        });
    }
};

// ===================== Page Loader Module - FIXED =====================
const PageLoader = {
    init() {
        this.setupPageTransition();
        this.updateCurrentYear();
    },

    setupPageTransition() {
        // Show page after content loads
        window.addEventListener("load", () => {
            setTimeout(() => {
                document.body.classList.add("loaded");
            }, 100);
        });
    },

    updateCurrentYear() {
        // Dynamic year in footer
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = `© ${currentYear} Ashwani Singh. All rights reserved.`;
        }
    }
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
            case "contact.html":
                this.initContactPage();
                break;
            case "resume.html":
                this.initResumePage();
                break;
            default:
                break;
        }
    },

    initHomePage() {
        console.log("Home page initialized");
        // Add any home-specific functionality
    },

    initAboutPage() {
        console.log("About page initialized");
        // Add any about-specific functionality
    },

    initSkillsPage() {
        console.log("Skills page initialized");
        // Skills page already handled by Animations.setupSkillBars()
    },

    initCertificatesPage() {
        console.log("Certificates page initialized");
        // Certificate functionality already handled by CertificateHandler
    },

    initContactPage() {
        console.log("Contact page initialized");
        // Contact functionality already handled by FormHandler
    },

    initResumePage() {
        console.log("Resume page initialized");
        // Resume download functionality already handled by FormHandler
    }
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
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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

    // Analytics tracking placeholder
    trackEvent(eventName, properties = {}) {
        console.log('Event tracked:', eventName, properties);
        // Replace with actual analytics implementation
    }
};

// ===================== Enhanced Features =====================

// Track important user interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track CTA button clicks
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            Utils.trackEvent('CTA_Click', {
                button_text: btn.textContent.trim(),
                page: getCurrentPage()
            });
        });
    });

    // Enhanced card interactions
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading states to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.classList.contains('submit-btn')) {
            btn.addEventListener('click', function() {
                if (this.href && !this.href.includes('#')) {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                    this.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.pointerEvents = 'auto';
                    }, 1000);
                }
            });
        }
    });
});

// Performance optimization - lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Console styling for development
if (typeof console !== 'undefined' && console.log) {
    setTimeout(() => {
        console.log(
            '%c🚀 Portfolio Website Loaded Successfully!',
            'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;'
        );
        console.log(
            '%cDeveloped by: Ashwani Singh\nVersion: 2.1 (Fixed)\nAll issues resolved ✅',
            'color: #6366f1; font-size: 12px; margin-top: 5px;'
        );
    }, 1000);
}

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Portfolio JS Error:', e.message);
});

// Handle page visibility changes for animations
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Re-trigger animations when page becomes visible
        document.querySelectorAll('.fade-in').forEach(el => {
            if (Utils.isInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }
});