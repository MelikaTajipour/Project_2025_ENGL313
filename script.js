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

    const slider = projectsSection.querySelector('[data-slider-id="projects-slider"]');
    const slides = projectsSection.querySelectorAll('.slide');
    const indicators = projectsSection.querySelectorAll('.indicator');
    const prevBtn = projectsSection.querySelector('#prevBtn');
    const nextBtn = projectsSection.querySelector('#nextBtn');

    if (!slider || !slides.length || !prevBtn || !nextBtn || !indicators.length) {
        console.error("Slider elements missing:", {
            slider: !!slider,
            slides: slides.length,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn,
            indicators: indicators.length
        });
        return;
    }

    console.log(`Found ${slides.length} slides, prev/next buttons, and ${indicators.length} indicators`);

    // Check image loading
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img.complete) {
            img.setAttribute('data-img-loaded', 'true');
            console.log(`Image ${index} loaded: ${img.src}`);
        } else {
            img.addEventListener('load', () => {
                img.setAttribute('data-img-loaded', 'true');
                console.log(`Image ${index} loaded: ${img.src}`);
            });
            img.addEventListener('error', () => {
                console.error(`Failed to load image ${index}: ${img.src}`);
            });
        }
    });

    let currentSlide = 0;
    let autoSlideInterval = null;
    let isSliding = false;
    let lastTransitionTime = 0;

    // Debounce function to limit rapid interactions
    const debounce = (func, wait) => {
        return (...args) => {
            const now = Date.now();
            if (now - lastTransitionTime < wait) {
                console.log(`Debounced interaction, too soon since last transition`);
                return;
            }
            lastTransitionTime = now;
            func(...args);
        };
    };

    const showSlide = (index) => {
        if (isSliding) {
            console.log(`Slide transition in progress, ignoring index ${index}`);
            return;
        }
        if (index < 0 || index >= slides.length) {
            console.warn(`Invalid slide index: ${index}`);
            return;
        }
        isSliding = true;
        console.log(`Starting transition to slide ${index} at ${new Date().toISOString()}`);
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
        setTimeout(() => {
            isSliding = false;
        }, 1500); // instead of 2000
        
    };

    const nextSlide = () => {
        showSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    // Debounced event handlers
    const debouncedPrevSlide = debounce(prevSlide, 2000);
    const debouncedNextSlide = debounce(nextSlide, 2000);
    const debouncedShowSlide = debounce(showSlide, 2000);

    prevBtn.addEventListener('click', () => {
        debouncedPrevSlide();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        debouncedNextSlide();
        resetAutoSlide();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-slide'));
            debouncedShowSlide(index);
            resetAutoSlide();
        });
    });

    const startAutoSlide = () => {
        if (autoSlideInterval !== null) {
            console.log(`Clearing existing interval ${autoSlideInterval}`);
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(() => {
            console.log(`Auto-slide triggered at ${new Date().toISOString()}`);
            nextSlide();
        }, 10000);
        console.log(`Auto-slide started with ID ${autoSlideInterval} and 10s interval`);
    };

    const resetAutoSlide = () => {
        console.log(`Resetting auto-slide at ${new Date().toISOString()}`);
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