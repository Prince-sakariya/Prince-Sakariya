document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'navigation-dots';
    dotsContainer.style.cssText = `
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 1000;
    `;
    
    let currentSectionIndex = 0;

    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.style.cssText = `
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ccc;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
        `;
        
        if (index === 0) {
            dot.style.backgroundColor = '#333';
            dot.style.transform = 'scale(1.2)';
        }
        
        dot.addEventListener('click', () => scrollToSection(index));
        dotsContainer.appendChild(dot);
    });
    
    document.body.appendChild(dotsContainer);
    document.body.style.cssText += `
      scroll-behavior: smooth;
      overflow-y: auto;
      height: 100vh;
      margin: 0;
      padding: 0;
    `;
    
    sections.forEach(section => {
        section.style.cssText += `
          height: 100vh;
          scroll-snap-align: start;
          position: relative;
        `;
    });

    function updateActiveDot() {
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            if (index === currentSectionIndex) {
                dot.style.backgroundColor = '#23d5c8';
                dot.style.transform = 'scale(1.2)';
            } else {
                dot.style.backgroundColor = '#ccc';
                dot.style.transform = 'scale(1)';
            }
        });
    }

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            currentSectionIndex = index;
            window.scrollTo({
                top: sections[index].offsetTop,
                behavior: 'smooth'
            });
            
            // Apply smooth ease-out transition
            document.documentElement.style.scrollBehavior = 'auto';
            sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.documentElement.style.scrollBehavior = '';
            
            updateActiveDot();
        }
    }

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let scrollPosition = window.scrollY;
            let closestSectionIndex = 0;
            let minDistance = Math.abs(sections[0].offsetTop - scrollPosition);

            sections.forEach((section, index) => {
                let distance = Math.abs(section.offsetTop - scrollPosition);
                if (distance < minDistance) {
                    closestSectionIndex = index;
                    minDistance = distance;
                }
            });

            scrollToSection(closestSectionIndex);
        }, 100); // Adjust delay for better effect
    });
    
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.key === 'ArrowUp') {
            scrollToSection(currentSectionIndex - 1);
        }
    });
});
