/* =====================================================
   PLUG-IN - Gaming Style JavaScript Effects
   Interactive Animations & Effects
   ===================================================== */

// =====================================================
// NAVBAR EFFECTS
// =====================================================

// Shrink navbar on scroll with smooth transition
const navbar = document.querySelector('.tech-navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// =====================================================
// THEME TOGGLE
// =====================================================

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.className = 'bi bi-sun';
        } else {
            icon.className = 'bi bi-moon';
        }
        
        // Save preference
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    const themeToggleIcon = document.querySelector('.theme-toggle i');
    if (themeToggleIcon) {
        themeToggleIcon.className = 'bi bi-sun';
    }
}

// =====================================================
// PARTICLE BACKGROUND EFFECT
// =====================================================

class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.1})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > window.innerWidth) this.x = 0;
        if (this.x < 0) this.x = window.innerWidth;
        if (this.y > window.innerHeight) this.y = 0;
        if (this.y < 0) this.y = window.innerHeight;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particle canvas
const canvas = document.createElement('canvas');
canvas.id = 'particleCanvas';
canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;';
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 100), 50);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// =====================================================
// PRODUCT CARD INTERACTIONS
// =====================================================

document.querySelectorAll('.product-card').forEach(card => {
    // Add 3D tilt effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
    
    // Add stock status data attribute
    const addToCartBtn = card.querySelector('.btn-primary');
    if (addToCartBtn) {
        card.setAttribute('data-stock', 'in');
    } else {
        card.setAttribute('data-stock', 'out');
    }
});

// =====================================================
// BUTTON CLICK EFFECTS
// =====================================================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =====================================================
// SMOOTH SCROLL WITH PROGRESS
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================================
// COUNTER ANIMATION
// =====================================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// =====================================================
// LOADING ANIMATION
// =====================================================

window.addEventListener('load', () => {
    // Animate elements on page load
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// =====================================================
// CURSOR FOLLOWER
// =====================================================

const cursor = document.createElement('div');
cursor.id = 'customCursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #8b5cf6;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, width 0.2s, height 0.2s, border-color 0.2s;
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
`;
document.body.appendChild(cursor);

let cursorVisible = false;

document.addEventListener('mouseenter', () => {
    cursorVisible = true;
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorVisible = false;
    cursor.style.opacity = '0';
});

document.addEventListener('mousemove', (e) => {
    if (cursorVisible) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .product-card, .dropdown-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.borderColor = '#06b6d4';
        cursor.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = '#8b5cf6';
        cursor.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.5)';
    });
});

// Hide custom cursor on touch devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
}

// =====================================================
// SEARCH BOX ANIMATION
// =====================================================

const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
}

// =====================================================
// ADD TO CART BUTTON ANIMATION
// =====================================================

document.querySelectorAll('.product-card .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product info
        const card = this.closest('.product-card');
        const title = card.querySelector('.product-title').textContent;
        
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 10000;
        `;
        notification.textContent = `✓ ${title} added to cart!`;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Update cart badge
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = parseInt(cartBadge.textContent) + 1;
            cartBadge.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartBadge.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Remove notification
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    });
});

// =====================================================
// GLITCH EFFECT ON BRAND
// =====================================================

const brand = document.querySelector('.navbar-brand');
if (brand) {
    brand.addEventListener('mouseenter', () => {
        brand.classList.add('glitch');
        brand.setAttribute('data-text', 'PlugIn');
    });
    
    brand.addEventListener('mouseleave', () => {
        brand.classList.remove('glitch');
    });
}

// =====================================================
// PARALLAX EFFECT ON CARDS
// =====================================================

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        const moveX = (xPercent - 0.5) * 10;
        const moveY = (yPercent - 0.5) * 10;
        
        const img = card.querySelector('.product-thumb');
        if (img) {
            img.style.transform = `scale(1.15) translate(${-moveX}px, ${-moveY}px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.product-thumb');
        if (img) {
            img.style.transform = '';
        }
    });
});

// =====================================================
// SKELETON LOADING EFFECT
// =====================================================

document.querySelectorAll('.product-card').forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    
    // Add shimmer effect
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        animation: shimmer 2s infinite;
    `;
    
    // Only add shimmer if not loaded yet (you can control this)
    // card.appendChild(shimmer);
});

// =====================================================
// KEYBOARD NAVIGATION HIGHLIGHT
// =====================================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-nav');
});

// =====================================================
// INITIALIZE ALL EFFECTS
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 PlugIn Store - Gaming Mode Activated!');
    
    // Add loaded class to body for entrance animations
    document.body.classList.add('loaded');
    
    // Animate navbar
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        navbar.style.transition = 'all 0.5s ease';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
});

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Random number between min and max
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
