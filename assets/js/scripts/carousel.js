// Project Carousel Script
document.addEventListener('DOMContentLoaded', function() {
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const projects = document.querySelectorAll('.project-box');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let projectsPerView = window.innerWidth > 992 ? 2 : 1;
    const totalProjects = projects.length;
    
    // Variables for drag scroll functionality
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    
    // Clone projects for infinite scroll effect
    const cloneFirstProjects = () => {
      for (let i = 0; i < projectsPerView; i++) {
        const clone = projects[i].cloneNode(true);
        projectsWrapper.appendChild(clone);
      }
    };
    
    const cloneLastProjects = () => {
      for (let i = totalProjects - 1; i >= totalProjects - projectsPerView; i--) {
        const clone = projects[i].cloneNode(true);
        projectsWrapper.insertBefore(clone, projectsWrapper.firstChild);
      }
    };
    
    // Create navigation dots
    const createDots = () => {
      // Clear existing dots
      dotsContainer.innerHTML = '';
      
      for (let i = 0; i < totalProjects; i += projectsPerView) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      }
      updateDots();
    };
    
    // Update active dot
    const updateDots = () => {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === Math.floor(currentIndex / projectsPerView) % Math.ceil(totalProjects / projectsPerView)) {
          dot.classList.add('active');
        }
      });
    };
    
    // Initialize carousel
    const initCarousel = () => {
      // Clone for infinite scroll
      cloneLastProjects();
      cloneFirstProjects();
      
      // Set initial position
      currentIndex = projectsPerView;
      updateCarousel(false);
      
      // Create navigation dots
      createDots();
      
      // Add event listeners for navigation
      prevButton.addEventListener('click', goToPrev);
      nextButton.addEventListener('click', goToNext);
      
      // Add responsive handling
      window.addEventListener('resize', handleResize);
      
      // Add drag event listeners for touch and mouse
      addDragListeners();
      
      // Start auto-scroll
      startAutoScroll();
    };
    
    // Update carousel position
    const updateCarousel = (withTransition = true) => {
      const projectWidth = projects[0].offsetWidth + 30; // width + margin (2 * 15px)
      const translateX = -currentIndex * projectWidth;
      
      if (withTransition) {
        projectsWrapper.style.transition = 'transform 0.5s ease';
      } else {
        projectsWrapper.style.transition = 'none';
      }
      
      projectsWrapper.style.transform = `translateX(${translateX}px)`;
      prevTranslate = translateX;
      currentTranslate = translateX;
      updateDots();
    };
    
    // Handle transitions for infinite scroll
    const handleTransitionEnd = () => {
      projectsWrapper.removeEventListener('transitionend', handleTransitionEnd);
      
      // When we reach the cloned elements
      if (currentIndex >= totalProjects + projectsPerView) {
        currentIndex = projectsPerView;
        updateCarousel(false);
      } else if (currentIndex <= 0) {
        currentIndex = totalProjects;
        updateCarousel(false);
      }
    };
    
    // Go to previous slide
    const goToPrev = () => {
      stopAutoScroll(); // Pause auto-scroll when user interacts
      currentIndex--;
      updateCarousel();
      projectsWrapper.addEventListener('transitionend', handleTransitionEnd);
      resetAutoScrollTimer(); // Reset auto-scroll timer
    };
    
    // Go to next slide
    const goToNext = () => {
      stopAutoScroll(); // Pause auto-scroll when user interacts
      currentIndex++;
      updateCarousel();
      projectsWrapper.addEventListener('transitionend', handleTransitionEnd);
      resetAutoScrollTimer(); // Reset auto-scroll timer
    };
    
    // Go to specific slide
    const goToSlide = (index) => {
      stopAutoScroll(); // Pause auto-scroll when user interacts
      currentIndex = index + projectsPerView;
      updateCarousel();
      projectsWrapper.addEventListener('transitionend', handleTransitionEnd);
      resetAutoScrollTimer(); // Reset auto-scroll timer
    };
    
    // Handle window resize
    const handleResize = () => {
      stopAutoScroll(); // Stop auto-scroll during resize
      
      const newProjectsPerView = window.innerWidth > 992 ? 2 : 1;
      
      if (newProjectsPerView !== projectsPerView) {
        projectsPerView = newProjectsPerView;
        
        // Reset carousel with new settings
        while (projectsWrapper.firstChild) {
          projectsWrapper.removeChild(projectsWrapper.firstChild);
        }
        
        // Re-add original projects
        for (let i = 0; i < totalProjects; i++) {
          projectsWrapper.appendChild(projects[i].cloneNode(true));
        }
        
        // Re-initialize with new settings
        cloneLastProjects();
        cloneFirstProjects();
        currentIndex = projectsPerView;
        updateCarousel(false);
        createDots();
      }
      
      resetAutoScrollTimer(); // Reset auto-scroll timer
    };
    
    // Drag functionality for mouse and touch
    function addDragListeners() {
      // Touch events
      projectsWrapper.addEventListener('touchstart', dragStart);
      projectsWrapper.addEventListener('touchmove', drag);
      projectsWrapper.addEventListener('touchend', dragEnd);
      
      // Mouse events
      projectsWrapper.addEventListener('mousedown', dragStart);
      projectsWrapper.addEventListener('mousemove', drag);
      projectsWrapper.addEventListener('mouseup', dragEnd);
      projectsWrapper.addEventListener('mouseleave', dragEnd);
      
      // Prevent context menu on right click
      projectsWrapper.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
    }
    
    function dragStart(e) {
      stopAutoScroll(); // Pause auto-scroll when user interacts
      
      // Get proper event position whether it's touch or mouse
      startPos = getPositionX(e);
      isDragging = true;
      
      // Cancel any existing animation frame
      cancelAnimationFrame(animationID);
      
      // Add grabbing cursor
      projectsWrapper.style.cursor = 'grabbing';
    }
    
    function drag(e) {
      if (isDragging) {
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
        
        // Apply transformation directly (smoother than requestAnimationFrame for this)
        projectsWrapper.style.transition = 'none';
        projectsWrapper.style.transform = `translateX(${currentTranslate}px)`;
      }
    }
    
    function dragEnd() {
      isDragging = false;
      
      const projectWidth = projects[0].offsetWidth + 30; // width + margin (2 * 15px)
      const movedBy = currentTranslate - prevTranslate;
      
      // If moved enough to change slide
      if (movedBy < -50) {
        // Moved left -> go to next slide
        currentIndex++;
      } else if (movedBy > 50) {
        // Moved right -> go to previous slide
        currentIndex--;
      }
      
      updateCarousel(true);
      projectsWrapper.addEventListener('transitionend', handleTransitionEnd);
      
      // Reset cursor
      projectsWrapper.style.cursor = 'grab';
      
      resetAutoScrollTimer(); // Reset auto-scroll timer
    }
    
    function getPositionX(e) {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
    
    // Auto-scroll functionality
    let autoScrollInterval;
    const autoScrollDelay = 5000; // 5 seconds
    
    const startAutoScroll = () => {
      stopAutoScroll(); // Clear any existing interval first
      autoScrollInterval = setInterval(goToNext, autoScrollDelay);
    };
    
    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    };
    
    const resetAutoScrollTimer = () => {
      stopAutoScroll();
      startAutoScroll();
    };
    
    // Pause auto-scroll when hovering
    projectsWrapper.addEventListener('mouseenter', stopAutoScroll);
    projectsWrapper.addEventListener('mouseleave', startAutoScroll);
    
    // Initialize the carousel
    initCarousel();
  });