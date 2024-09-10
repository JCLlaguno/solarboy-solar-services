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
  spaceBetween: 16,
  centeredSlides: true,
  simulateTouch: true,

  // Responsive breakpoints
  breakpoints: {
    1200: {
      slidesPerView: 3,
    },
  },
  // autoplay: {
  //   // delay: 5000,
  // },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Slide Preview
slides.forEach((slide, i) => {
  // show preview when a slide is clicked
  slide.addEventListener("click", () => showPreview(i, slide));
  // close preview
  closePreviewBtn.addEventListener("click", () => closePreview(i, slide));
  // close preview when ESC is pressed
  window.addEventListener("keydown", (e) => {
    if (!e.key === "Escape") return;
    closePreview(i, slide);
  });
});

const showPreview = (index, slide) => {
  previewElements[index].classList.add("show");
  previewElements[index].parentElement.classList.add("show-preview");
  body.style.overflow = "hidden"; // hide scrollbar
  // slide.style.overflow = "visible";
};
const closePreview = (index, slide) => {
  previewElements[index].classList.remove("show");
  previewElements[index].parentElement.classList.remove("show-preview");
  body.style.overflow = "visible"; // show scrollbar
  // slide.style.overflow = "hidden";
};

// Nav Toggle
navBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navLinks.classList.toggle("show-links");
});

// LOCATION MAP
// initialize the map on the "map" div with a given center and zoom
const lat = 13.2548727;
const lng = 123.6655128;
const map = L.map("map", { scrollWheelZoom: false }).setView([lat, lng], 12);
const markerIcon = L.icon({
  iconUrl: "./img/marker.svg",
  iconSize: [40, 40], // size of the icon
  // iconAnchor: [15, 42], // half of width + height
});
const marker = new L.Marker([lat, lng], { icon: markerIcon });

L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
}).addTo(map);

marker
  .bindTooltip("SolarBoy", {
    permanent: true,
    direction: "top",
    className: "loc-label",
    offset: [5, -25],
  })
  .addTo(map);

document
  .querySelector("#map")
  .addEventListener("wheel", preventScroll, { passive: false });

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();

  return false;
}
