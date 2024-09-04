"use-strict";

const navBtn = document.querySelector(".nav-toggle-btn");
const navLinks = document.querySelector(".nav-links");
navBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navLinks.classList.toggle("show-links");
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,

  // Responsive breakpoints
  breakpoints: {
    1200: {
      slidesPerView: 1.8,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
