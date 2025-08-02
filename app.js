// Cosby Concrete Landing Page JavaScript - Enhanced for Accessibility and Modern Design

// Smooth scroll to contact section with enhanced accessibility
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus management for accessibility
        contactSection.setAttribute('tabindex', '-1');
        contactSection.focus();
        
        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = 'Scrolled to contact information section';
        document.body.appendChild(announcement);
        
        // Clean up announcement after screen reader has time to read it
        setTimeout(() => {
            document.body.removeChild(announcement);
            contactSection.removeAttribute('tabindex');
        }, 1000);
        
    } else {
        console.error('Contact section not found');
    }
}

// Enhanced animations with reduced motion support
function initializeAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Add intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe service cards for animation
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Observe credential badges
        const credentialBadges = document.querySelectorAll('.credential-badge');
        credentialBadges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px)';
            badge.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            observer.observe(badge);
        });
    }
}

// Enhanced keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Enter or Space key on CTA button
        const ctaButton = document.querySelector('.cta-button');
        if ((e.key === 'Enter' || e.key === ' ') && e.target === ctaButton) {
            e.preventDefault();
            scrollToContact();
        }
    });
}

// Enhanced phone and email link interactions
function enhanceContactLinks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    // Enhanced phone link functionality
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Phone link clicked:', this.textContent);
            
            // Visual feedback for mobile devices
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Touch feedback for mobile
        link.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'rgba(96, 165, 250, 0.2)';
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.backgroundColor = 'transparent';
            }, 200);
        });
    });
    
    // Enhanced email link functionality
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Email link clicked:', this.textContent);
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Modern header scroll effects
function setupHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add enhanced shadow when scrolling
        if (scrollTop > 0) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Enhanced service card interactions
function setupServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Mouse interactions
        card.addEventListener('mouseenter', function() {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
        });
        
        // Focus interactions for keyboard navigation
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid #dc2626';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        // Make cards focusable for keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
    });
}

// Enhanced CTA button with better accessibility
function setupCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        // Remove any existing onclick attribute and add proper event listener
        ctaButton.removeAttribute('onclick');
        
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('CTA button clicked - Get Free Estimate');
            scrollToContact();
            
            // Analytics event (placeholder for future implementation)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'engagement',
                    event_label: 'get_free_estimate'
                });
            }
        });
        
        // Enhanced button feedback
        ctaButton.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        ctaButton.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
}

// Error handling and performance monitoring
function setupPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)} milliseconds`);
        
        // Check for critical rendering issues
        const criticalElements = [
            '.header',
            '.hero',
            '.services',
            '.contact'
        ];
        
        criticalElements.forEach(selector => {
            const element = document.querySelector(selector);
            if (!element) {
                console.error(`Critical element missing: ${selector}`);
            }
        });
        
        // Mark page as fully loaded
        document.body.classList.add('loaded');
        
        // Announce page load completion to screen readers
        const loadAnnouncement = document.createElement('div');
        loadAnnouncement.setAttribute('aria-live', 'polite');
        loadAnnouncement.className = 'sr-only';
        loadAnnouncement.textContent = 'Page fully loaded';
        document.body.appendChild(loadAnnouncement);
        
        setTimeout(() => {
            if (document.body.contains(loadAnnouncement)) {
                document.body.removeChild(loadAnnouncement);
            }
        }, 2000);
    });
}

// Accessibility enhancements
function setupAccessibilityFeatures() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = '#dc2626';
    skipLink.style.color = 'white';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.borderRadius = '4px';
    skipLink.style.zIndex = '1000';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.setAttribute('id', 'main-content');
        heroSection.setAttribute('role', 'main');
    }
    
    // Enhance focus indicators
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.5)';
        });
        
        element.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cosby Concrete - Initializing enhanced application...');
    
    // Initialize all features
    setupCTAButton();
    enhanceContactLinks();
    setupKeyboardNavigation();
    setupHeaderEffects();
    setupServiceCardEffects();
    initializeAnimations();
    setupPerformanceMonitoring();
    setupAccessibilityFeatures();
    
    // Verify contact section exists
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        console.log('✓ Contact section found successfully');
    } else {
        console.error('✗ Contact section not found - check HTML ID');
    }
    
    console.log('✓ All features initialized successfully');
});

// Global functions for external access
window.CosbyConcreteApp = {
    scrollToContact: scrollToContact,
    version: '2.0.0-accessible'
};

// Make scrollToContact globally available for any legacy code
window.scrollToContact = scrollToContact;