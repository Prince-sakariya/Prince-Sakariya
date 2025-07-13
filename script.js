// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const circuitPattern = document.querySelector('.circuit-pattern');
    
    if (hero && circuitPattern) {
        const rate = scrolled * -0.5;
        circuitPattern.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active state styles to CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--color-accent) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-white);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        font-family: var(--font-primary);
        color: var(--color-black);
        font-size: 1.2rem;
    }
`;
document.head.appendChild(loadingStyle); 

// Timeline Slider Interactivity
(function() {
    const nodes = document.querySelectorAll('.timeline-slider-node');
    const infoCards = document.querySelectorAll('.timeline-slider-info-card');
    const leftArrow = document.querySelector('.timeline-arrow-left');
    const rightArrow = document.querySelector('.timeline-arrow-right');
    let current = 0;
    function setActive(idx) {
        nodes.forEach((node, i) => node.classList.toggle('active', i === idx));
        infoCards.forEach((card, i) => card.classList.toggle('active', i === idx));
        current = idx;
    }
    nodes.forEach((node, i) => {
        node.addEventListener('click', () => setActive(i));
    });
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            setActive((current - 1 + nodes.length) % nodes.length);
        });
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            setActive((current + 1) % nodes.length);
        });
    }
    setActive(0);
})(); 

// Timeline vertical animation on scroll
(function() {
    const cards = document.querySelectorAll('.timeline-vertical-card');
    if (!cards.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    cards.forEach(card => {
        observer.observe(card);
    });
})(); 

// Dark mode toggle
(function() {
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    const icon = toggleBtn ? toggleBtn.querySelector('i') : null;
    const html = document.documentElement;
    const darkKey = 'theme-dark-mode';

    function setDarkMode(isDark) {
        if (isDark) {
            html.setAttribute('data-theme', 'dark');
            if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
        } else {
            html.removeAttribute('data-theme');
            if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
        }
        localStorage.setItem(darkKey, isDark ? '1' : '0');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = html.getAttribute('data-theme') !== 'dark';
            setDarkMode(isDark);
        });
    }

    // On load, set mode from localStorage
    const saved = localStorage.getItem(darkKey);
    if (saved === '1') setDarkMode(true);
    else setDarkMode(false);
})(); 

// Floating navbar show/hide logic
function handleNavbarFloating() {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero.hero-minimal');
  if (!navbar || !hero) return;
  const heroRect = hero.getBoundingClientRect();
  if (heroRect.bottom <= 0) {
    navbar.classList.add('navbar-floating');
  } else {
    navbar.classList.remove('navbar-floating');
  }
}
window.addEventListener('scroll', handleNavbarFloating);
window.addEventListener('resize', handleNavbarFloating);
document.addEventListener('DOMContentLoaded', handleNavbarFloating); 

// Section Reveal Animation: Only one main section visible at a time
function activateVisibleSection() {
  const sections = Array.from(document.querySelectorAll('.main-section'));
  let activeSection = sections[0];
  let minDistance = Infinity;
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    // Distance from center of viewport to center of section
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      activeSection = section;
    }
  });

  sections.forEach(section => {
    if (section === activeSection) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}

function activateVisibleProject() {
  const practicalSection = document.querySelector('.practical-experience-section.main-section.active');
  if (!practicalSection) return;
  const projects = Array.from(practicalSection.querySelectorAll('.project-section'));
  if (!projects.length) return;
  let activeProject = projects[0];
  let minDistance = Infinity;
  const viewportHeight = window.innerHeight;

  projects.forEach(project => {
    const rect = project.getBoundingClientRect();
    const projectCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    const distance = Math.abs(projectCenter - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      activeProject = project;
    }
  });

  projects.forEach(project => {
    if (project === activeProject) {
      project.classList.add('active');
    } else {
      project.classList.remove('active');
    }
  });
}

function activateVisibleTimelineCard() {
  const timelineSection = document.querySelector('.timeline-experience-section.main-section.active');
  if (!timelineSection) return;
  const cards = Array.from(timelineSection.querySelectorAll('.timeline-horizontal-card'));
  if (!cards.length) return;
  let activeCard = cards[0];
  let minDistance = Infinity;
  const viewportWidth = window.innerWidth;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const viewportCenter = viewportWidth / 2;
    const distance = Math.abs(cardCenter - viewportCenter);
    if (distance < minDistance) {
      minDistance = distance;
      activeCard = card;
    }
  });

  cards.forEach(card => {
    if (card === activeCard) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', () => {
  activateVisibleSection();
  activateVisibleProject();
  activateVisibleTimelineCard();
}, { passive: true });
window.addEventListener('resize', () => {
  activateVisibleSection();
  activateVisibleProject();
  activateVisibleTimelineCard();
});
document.addEventListener('DOMContentLoaded', () => {
  activateVisibleSection();
  activateVisibleProject();
  activateVisibleTimelineCard();

  // Navbar smooth scroll and section activation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target && target.classList.contains('main-section')) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            document.querySelectorAll('.main-section').forEach(section => section.classList.remove('active'));
            target.classList.add('active');
            if (target.classList.contains('practical-experience-section')) {
              activateVisibleProject();
            }
            if (target.classList.contains('timeline-experience-section')) {
              activateVisibleTimelineCard();
            }
          }, 400);
        }
      }
    });
  });
}); 