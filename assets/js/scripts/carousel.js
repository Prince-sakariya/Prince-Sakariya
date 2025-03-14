document.addEventListener('DOMContentLoaded', function() {
  const projectsWrapper = document.querySelector('.projects-wrapper');
  const projects = document.querySelectorAll('.project-box');
  const prevButton = document.querySelector('.nav-button.prev');
  const nextButton = document.querySelector('.nav-button.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  let projectsPerView = getProjectsPerView();
  const totalProjects = projects.length;
  
  // Function to determine projects per view based on screen width
  function getProjectsPerView() {
      const width = window.innerWidth;
      if (width > 1680) return 3;          // XLarge: 3 projects per view
      else if (width > 1280) return 2;     // Large: 2 projects per view
      else if (width > 980) return 1;      // Medium: 2 projects per view
      else return 1;                       // Small and below: 1 project per view
  }
  
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
    
    const numDots = Math.ceil(totalProjects / projectsPerView);
    
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
        goToSlide(i * projectsPerView);
      });
      dotsContainer.appendChild(dot);
    }
    updateDots();
  };
  
  // Update active dot
  const updateDots = () => {
    const dots = document.querySelectorAll('.dot');
    const activeDotIndex = Math.floor((currentIndex - projectsPerView) / projectsPerView);
    
    dots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === activeDotIndex % dots.length) {
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
    
    // Start auto-scroll
    startAutoScroll();
  };
  
  // Calculate the width of a single project including margins
  const getProjectWidth = () => {
    const project = document.querySelector('.project-box');
    const style = window.getComputedStyle(project);
    const marginLeft = parseInt(style.marginLeft);
    const marginRight = parseInt(style.marginRight);
    return project.offsetWidth + marginLeft + marginRight;
  };
  
  // Update carousel position
  const updateCarousel = (withTransition = true) => {
    const projectWidth = getProjectWidth();
    const translateX = -currentIndex * projectWidth;
    
    if (withTransition) {
      projectsWrapper.style.transition = 'transform 0.5s ease';
    } else {
      projectsWrapper.style.transition = 'none';
    }
    
    projectsWrapper.style.transform = `translateX(${translateX}px)`;
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
    currentIndex -= projectsPerView;
    updateCarousel();
    projectsWrapper.addEventListener('transitionend', handleTransitionEnd);
    resetAutoScrollTimer(); // Reset auto-scroll timer
  };
  
  // Go to next slide
  const goToNext = () => {
    stopAutoScroll(); // Pause auto-scroll when user interacts
    currentIndex += projectsPerView;
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
    
    const newProjectsPerView = getProjectsPerView();
    
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
    } else {
      // Just update position based on new sizes
      updateCarousel(false);
    }
    
    resetAutoScrollTimer(); // Reset auto-scroll timer
  };
  
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