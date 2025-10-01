// Portfolio Website JavaScript - Simple Version for Freshers
// Author: Ashwani Singh

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization
function initializeWebsite() {
    setupMobileMenu();
    setupScrollEffects();
    setupAnimations();
    setupContactForm();
    setupCertificates();
    
    // Show page content
    document.body.classList.add('loaded');
    
    console.log('Portfolio loaded successfully!');
}

// ============ MOBILE MENU ============
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuBtn || !navMenu) return;
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
}

// ============ SCROLL EFFECTS ============
function setupScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }
    
    // Scroll to top button
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============ ANIMATIONS ============
function setupAnimations() {
    // Fade in elements when scrolling
    const fadeElements = document.querySelectorAll('.fade-in, .card, .about-text, .skill-card');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(function(element) {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(function() {
                    entry.target.style.width = width;
                }, 300);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(function(bar) {
        skillObserver.observe(bar);
    });
}

// ============ CONTACT FORM ============
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Add input validation
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(function(input) {
        // Check on blur (when user leaves field)
        input.addEventListener('blur', function() {
            validateInput(input);
        });
        
        // Clear error on focus
        input.addEventListener('focus', function() {
            input.style.borderColor = '#6366f1';
            clearError(input);
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(function(input) {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields correctly.');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual form submission)
        setTimeout(function() {
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset field styles
            inputs.forEach(function(input) {
                input.style.borderColor = '#f8fafc';
            });
        }, 2000);
    });
}

// Validate single input field
function validateInput(input) {
    const value = input.value.trim();
    
    if (value === '') {
        input.style.borderColor = '#ef4444';
        showError(input, 'This field is required');
        return false;
    }
    
    // Email validation
    if (input.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            input.style.borderColor = '#ef4444';
            showError(input, 'Please enter a valid email');
            return false;
        }
    }
    
    input.style.borderColor = '#10b981';
    clearError(input);
    return true;
}

// Show error message
function showError(input, message) {
    clearError(input);
    const error = document.createElement('span');
    error.className = 'error-message';
    error.style.color = '#ef4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    input.parentNode.appendChild(error);
}

// Clear error message
function clearError(input) {
    const error = input.parentNode.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

// ============ CERTIFICATES ============
function setupCertificates() {
    // Certificate data
    const certData = {
        html5: {
            title: 'HTML5 Certification',
            provider: 'Web Development Institute',
            description: 'Comprehensive HTML5 knowledge including semantic markup, accessibility, and modern web standards.',
            skills: ['HTML5', 'Semantic Elements', 'Accessibility', 'Forms', 'Canvas API']
        },
        css3: {
            title: 'CSS3 & Responsive Design',
            provider: 'Advanced Styling Academy',
            description: 'Advanced CSS3, responsive design, flexbox, grid, and modern layout techniques.',
            skills: ['CSS3', 'Flexbox', 'Grid', 'Media Queries', 'Animations']
        },
        javascript: {
            title: 'JavaScript Programming',
            provider: 'Modern JS Institute',
            description: 'ES6+ JavaScript, DOM manipulation, async programming, and best practices.',
            skills: ['ES6+', 'DOM API', 'Async/Await', 'Event Handling', 'Modules']
        },
        react: {
            title: 'React Development',
            provider: 'Frontend Framework Academy',
            description: 'React components, hooks, state management, and modern patterns.',
            skills: ['React', 'JSX', 'Hooks', 'Context API', 'Component Design']
        },
        python: {
            title: 'Python Programming',
            provider: 'Python Development Institute',
            description: 'Python fundamentals, web development, and automation.',
            skills: ['Python 3', 'Web Frameworks', 'APIs', 'Testing', 'Automation']
        },
        webdev: {
            title: 'Web Development Fundamentals',
            provider: 'Full Stack Academy',
            description: 'Core web development concepts, HTTP, APIs, and best practices.',
            skills: ['HTTP/HTTPS', 'REST APIs', 'Web Performance', 'Security', 'SEO']
        }
    };
    
    // Make functions globally accessible
    window.viewCertificate = function(certId) {
        const cert = certData[certId];
        if (!cert) return;
        
        const modal = document.getElementById('certModal');
        const modalContent = document.getElementById('modalContent');
        
        if (!modal || !modalContent) return;
        
        // Build modal content
        let skillsHTML = '';
        cert.skills.forEach(function(skill) {
            skillsHTML += '<span style="background: #6366f1; color: white; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.875rem; margin: 0.25rem;">' + skill + '</span>';
        });
        
        modalContent.innerHTML = `
            <h2 style="color: #1f2937; margin-bottom: 1rem;">${cert.title}</h2>
            <p style="color: #6366f1; font-weight: 500; margin-bottom: 0.5rem;">${cert.provider}</p>
            <p style="color: #64748b; line-height: 1.6; margin-bottom: 1rem;">${cert.description}</p>
            <h4 style="color: #1f2937; margin: 1rem 0 0.5rem 0;">Skills Covered:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                ${skillsHTML}
            </div>
            <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 0.5rem; padding: 2rem; text-align: center; color: #94a3b8;">
                <i class="fas fa-certificate" style="font-size: 3rem; margin-bottom: 0.5rem;"></i>
                <p style="margin: 0; font-weight: 600;">Certificate Preview</p>
                <small>Actual certificate would be displayed here</small>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    
    window.downloadCertificate = function(certId) {
        alert('Certificate download will be available soon. Please contact for the actual file.');
    };
    
    window.closeCertModal = function() {
        const modal = document.getElementById('certModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('certModal');
        if (e.target === modal) {
            window.closeCertModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeCertModal();
        }
    });
}

// ============ RESUME DOWNLOAD ============
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        alert('Resume download will be available soon. Please contact for the actual resume file.');
    });
}

// Update copyright year
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = '© ' + currentYear + ' Ashwani Singh. All rights reserved.';
}