document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Hero Section Initial Animations (Text & Image Fade/Slide In) ---
    const heroIntro = document.querySelector('.hero-intro');
    const heroHeadline = document.querySelector('.hero-headline');
    const heroDescription = document.querySelector('.hero-description');
    const heroImage = document.querySelector('.reveal-image');
    const heroBtn = document.querySelector('.hero-section .btn');

    // Add 'animated' class to trigger CSS transitions after a short delay
    setTimeout(() => {
        heroIntro.classList.add('animated');
        heroHeadline.classList.add('animated');
        heroDescription.classList.add('animated');
        heroImage.classList.add('animated');
        heroBtn.classList.add('animated'); // Add if you have a separate animation for the button
    }, 100); // Small delay to ensure CSS is rendered before JS triggers

    // --- Scroll Reveal Animations (Using Intersection Observer) ---
    const elementsToAnimate = document.querySelectorAll('.reveal-on-scroll, .section-title, .contact-form-wrapper, .contact-info, .service-card');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // For skill bars, trigger their fill animation
                if (entry.target.classList.contains('about-skills')) {
                    document.querySelectorAll('.skill-bar').forEach(bar => {
                        bar.classList.add('filled');
                        const level = bar.dataset.level || 0;
                        bar.style.setProperty('--skill-level', `${level}%`);
                    });
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Handle portfolio items separately for staggered animation
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100); // Staggered delay
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    portfolioItems.forEach(item => {
        portfolioObserver.observe(item);
    });


    // --- Portfolio Modal Functionality ---
    const modal = document.getElementById('portfolioModal');
    const closeButton = document.querySelector('.modal .close-button');
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');

    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectImage = document.getElementById('modalProjectImage');
    const modalProjectDescription = document.getElementById('modalProjectDescription');
    const modalLiveDemoBtn = document.getElementById('modalLiveDemoBtn');
    const modalGithubBtn = document.getElementById('modalGithubBtn');

    // Dummy project data (replace with your actual project data)
    const projects = {
        1: {
            title: "E-commerce Website Redesign",
            image: "img/project1-full.jpg",
            description: "A modern, responsive e-commerce platform focusing on user experience and conversion optimization. Built with React and Node.js.",
            liveDemo: "https://www.example.com/project1",
            github: "https://github.com/yourusername/project1"
        },
        2: {
            title: "Mobile App UI/UX Concept",
            image: "img/project2-full.jpg",
            description: "Designed a clean and intuitive mobile application for daily task management, emphasizing minimalist aesthetics.",
            liveDemo: "https://www.example.com/project2",
            github: "https://github.com/yourusername/project2"
        },
        3: {
            title: "Landscape Photography Series",
            image: "img/project3-full.jpg",
            description: "A collection of serene landscape photographs captured during my travels across Kenya. Focus on natural light and composition.",
            liveDemo: "https://www.example.com/project3",
            github: "#" // No GitHub for photography usually
        },
        4: {
            title: "Corporate Branding Package",
            image: "img/project4-full.jpg",
            description: "Developed a comprehensive brand identity including logo, color palette, typography, and brand guidelines for a tech startup.",
            liveDemo: "https://www.example.com/project4",
            github: "#"
        }
        // Add more projects here
    };

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;
            const project = projects[projectId];

            if (project) {
                modalProjectTitle.textContent = project.title;
                modalProjectImage.src = project.image;
                modalProjectImage.alt = project.title;
                modalProjectDescription.textContent = project.description;

                if (project.liveDemo && project.liveDemo !== '#') {
                    modalLiveDemoBtn.href = project.liveDemo;
                    modalLiveDemoBtn.style.display = 'inline-block';
                } else {
                    modalLiveDemoBtn.style.display = 'none';
                }

                if (project.github && project.github !== '#') {
                    modalGithubBtn.href = project.github;
                    modalGithubBtn.style.display = 'inline-block';
                } else {
                    modalGithubBtn.style.display = 'none';
                }

                modal.style.display = 'flex'; // Use flex to center
            }
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of the content
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- Portfolio Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Animate items out, then filter, then animate in
            portfolioGrid.querySelectorAll('.portfolio-item').forEach(item => {
                item.classList.remove('animated'); // Reset animation
                item.style.transition = 'none'; // Disable transition for immediate hide
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)'; // Shrink it
            });

            setTimeout(() => { // Give time for elements to hide
                portfolioItems.forEach((item, index) => {
                    const itemCategory = item.dataset.category;

                    if (filter === 'all' || itemCategory === filter) {
                        item.style.display = 'block';
                        // Re-enable transition and animate in
                        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, index * 100); // Staggered reveal
                    } else {
                        item.style.display = 'none';
                    }
                });
            }, 300); // Delay before showing new items
        });
    });

});