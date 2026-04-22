document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname.split("/").pop() || "index.html";

    const links = document.querySelectorAll(".nav-links a");
    if (!links.length) return;

    links.forEach((link) => {
        if (link.getAttribute("href") === path) {
            link.classList.add("active");
        }
    });
});