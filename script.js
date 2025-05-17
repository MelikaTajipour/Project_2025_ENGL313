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

    // Slideshow Functionality
    const projectsSection = document.querySelector('[data-section="projects"]');
    if (!projectsSection) return;

    const slides = projectsSection.querySelectorAll('.slide');
    const indicators = projectsSection.querySelectorAll('.indicator');
    const prevBtn = projectsSection.querySelector('.prev');
    const nextBtn = projectsSection.querySelector('.next');

    if (!slides.length || !indicators.length || !prevBtn || !nextBtn) return;

    let slideIndex = 1;
    let isSliding = false;
    let lastTransitionTime = 0;

    const debounce = (func, wait) => {
        return (...args) => {
            const now = Date.now();
            if (now - lastTransitionTime < wait) return;
            lastTransitionTime = now;
            func(...args);
        };
    };

    const showSlides = (n) => {
        if (isSliding) return;
        isSliding = true;

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        slides[slideIndex - 1].style.display = 'block';
        indicators[slideIndex - 1].classList.add('active');

        setTimeout(() => {
            isSliding = false;
        }, 300); // basic debounce
    };

    const plusSlides = (n) => showSlides(slideIndex += n);
    const currentSlide = (n) => showSlides(slideIndex = n);

    const debouncedPlusSlides = debounce(plusSlides, 600);
    const debouncedCurrentSlide = debounce(currentSlide, 600);

    prevBtn.addEventListener('click', () => debouncedPlusSlides(-1));
    nextBtn.addEventListener('click', () => debouncedPlusSlides(1));

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            debouncedCurrentSlide(index + 1);
        });
    });

    showSlides(slideIndex);

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
