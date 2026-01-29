// Shrink navbar on scroll
window.addEventListener("scroll", () => {
    document.querySelector(".tech-navbar")
        .classList.toggle("shrink", window.scrollY > 60);
});

// Dark / Light mode
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggle.innerHTML = document.body.classList.contains("light-mode")
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon"></i>';
});


// for productimage

document.getElementById('productImageCarousel')
    .addEventListener('slide.bs.carousel', function () {
        document.querySelectorAll('.product-video').forEach(video => {
            video.pause();
        });
    });


