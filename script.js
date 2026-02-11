// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuBtn.classList.remove('active');
    });
  });
}

// Scroll-based animations with IntersectionObserver
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe feature cards, steps, and SDK cards
document.querySelectorAll('.deploy-methods, .secrets-terminal, .feature-card, .step, .sdk-card, .cta-inner').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .feature-card.animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
  .feature-card.animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
  .feature-card.animate-on-scroll:nth-child(4) { transition-delay: 0.1s; }
  .feature-card.animate-on-scroll:nth-child(5) { transition-delay: 0.2s; }
  .feature-card.animate-on-scroll:nth-child(6) { transition-delay: 0.3s; }
  .sdk-card.animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
  .sdk-card.animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
  .sdk-card.animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// Smooth nav background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    nav.style.borderBottomColor = 'rgba(39, 39, 42, 0.8)';
  } else {
    nav.style.borderBottomColor = 'rgba(39, 39, 42, 0.3)';
  }
  lastScroll = currentScroll;
}, { passive: true });
