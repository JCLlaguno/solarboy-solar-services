"use-strict";

const navBtn = document.querySelector(".nav-toggle-btn");
const navLinks = document.querySelector(".nav-links");
const slides = document.querySelectorAll(".swiper-slide");
const previewElements = document.querySelectorAll(".slide-preview");
const closePreviewBtn = document.querySelector(".btn-close-preview");
const body = document.body;

// H-Projects Slider
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  simulateTouch: true,

  // Responsive breakpoints
  breakpoints: {
    1200: {
      slidesPerView: 1.8,
    },
  },
  autoplay: {
    delay: 5000,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Slide Preview
slides.forEach((slide, i) => {
  slide.addEventListener("click", () => {
    // show preview when a slide is clicked
    showPreview(i);

    // close preview when ESC is pressed
    window.addEventListener("keydown", (e) => {
      if (!e.key === "Escape") return;
      closePreview(i);
    });

    // close preview
    closePreviewBtn.addEventListener("click", () => closePreview(i));
  });
});

const showPreview = (index) => {
  previewElements[index].classList.add("show");
  previewElements[index].parentElement.classList.add("show-preview");
  body.style.overflow = "hidden"; // hide scrollbar
};
const closePreview = (index) => {
  previewElements[index].classList.remove("show");
  previewElements[index].parentElement.classList.remove("show-preview");
  body.style.overflow = "visible"; // show scrollbar
};

// swiper.on("slideChange", function (e) {
//   const activeSlide = e.slides.find((slide) =>
//     slide.classList.contains("swiper-slide-active")
//   );
//   // console.log(activeSlide);
// });

// Nav Toggle
navBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navLinks.classList.toggle("show-links");
});
