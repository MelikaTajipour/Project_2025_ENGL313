// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript is connected and working!");

    // Example: Smooth scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerText = "↑ Top";
    scrollBtn.className = "scroll-top-btn";
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
});
  