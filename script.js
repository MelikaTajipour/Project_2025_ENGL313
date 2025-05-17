document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript loaded successfully!");

    // Section Title Hover Effect
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseover', () => {
            title.style.color = 'palevioletred';
        });
        title.addEventListener('mouseout', () => {
            title.style.color = 'aquamarine';
        });
    });

    // Slider Functionality
    const projectsSection = document.querySelector('[data-section="projects"]');
    if (!projectsSection) {
        console.error("Projects section not found!");
        return;
    }

    const slides = projectsSection.querySelectorAll('.slide');
    const indicators = projectsSection.querySelectorAll('.indicator');
    const prevBtn = projectsSection.querySelector('#prevBtn');
    const nextBtn = projectsSection.querySelector('#nextBtn');

    if (!slides.length || !prevBtn || !nextBtn || !indicators.length) {
        console.error("Slider elements missing:", {
            slides: slides.length,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn,
            indicators: indicators.length
        });
        return;
    }

    console.log(`Found ${slides.length} slides, prev/next buttons, and ${indicators.length} indicators`);

    let currentSlide = 0;
    let autoSlideInterval;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active-slide');
            indicators[i].classList.remove('active');
            if (i === index) {
                slide.classList.add('active-slide');
                indicators[i].classList.add('active');
            }
        });
        console.log(`Showing slide ${index}`);
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentSlide = parseInt(indicator.getAttribute('data-slide'));
            showSlide(currentSlide);
            resetAutoSlide();
        });
    });

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
        console.log("Auto-slide started");
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Initialize slider
    showSlide(currentSlide);
    startAutoSlide();

    // Scroll to Top Button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerText = "↑ Top";
    scrollBtn.className = "scroll-top-btn";
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '20px';
    scrollBtn.style.right = '20px';
    scrollBtn.style.background = 'linear-gradient(45deg, #ff0066, #ff99cc)';
    scrollBtn.style.color = 'white';
    scrollBtn.style.border = 'none';
    scrollBtn.style.padding = '10px 20px';
    scrollBtn.style.borderRadius = '25px';
    scrollBtn.style.cursor = 'pointer';
    scrollBtn.style.display = 'none';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
});