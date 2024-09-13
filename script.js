"use strict";

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
  autoplay: {
    delay: 5000,
  },
  // autoplay: false,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Slide Preview
slides.forEach((slide, i) => {
  // show preview when a slide is clicked
  slide.addEventListener("click", () => showPreview(i));
  // close preview
  closePreviewBtn.addEventListener("click", () => closePreview(i));
  // close preview when ESC is pressed
  window.addEventListener("keydown", (e) => {
    if (!e.key === "Escape") return;
    closePreview(i);
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

// Nav Toggle
navBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navLinks.classList.toggle("show-links");
});

// LOCATION MAP
const loadMap = () => {
  if (!L) return;
  if (!document.getElementById("map")) return;

  const coords = [13.2548727, 123.6655128];

  const map = L.map("map", {
    scrollWheelZoom: false,
    zoom: 12,
    center: coords,
  });
  // .setView(coords, 12);
  const markerIcon = L.icon({
    iconUrl: "./img/marker.svg",
    iconSize: [40, 40],
  });

  // map location marker
  new L.Marker(coords, { icon: markerIcon }).addTo(map);
  L.popup({ closeButton: false, offset: [1, -8] })
    .setLatLng(coords)
    .setContent("SolarBoy")
    .openOn(map);

  // map bg
  L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);
};
loadMap();

// services Load More toggle
const mobileLoadMore = () => {
  const servicesList = document.querySelectorAll(".service");
  const loadMoreBtn = document.querySelector(".services-load-more-btn");
  const showLessBtn = document.querySelector(".services-show-less-btn");
  const servicesLength = servicesList.length;

  // max num of cards to be displayed
  let numCards = 4;

  // MAIN function to show services cards
  const showServices = (servicesList, numCards) => {
    servicesList.forEach((service, i) => {
      // if current service is less than or equal to numCards display it
      // display it
      service.style.display = i <= numCards - 1 ? "grid" : "none";
    });
  };

  // initial page load
  // if total cards number = 4, hide show less button
  if (!showLessBtn) return;
  if (numCards === 4) showLessBtn.style.display = "none";

  // load 4 services
  showServices(servicesList, numCards);

  // when loadMoreBtn pressed = load more services
  loadMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // increase numCards value every time loadMoreBtn is pressed
    // if numCards is less than total length of services, add 4 to current numCard value. otherwise,
    // set numCard value to total length of services (servicesLength).
    numCards = numCards < servicesLength ? numCards + 4 : servicesLength;

    // update services cards
    showServices(servicesList, numCards);

    // if numCard is equal to total length of services, hide load more button
    if (numCards === servicesLength) loadMoreBtn.style.display = "none";
    if (numCards > 4) showLessBtn.style.display = "block";
  });

  // when showLessBtn is pressed = hide services
  showLessBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // reduce numCards value by every time showLessBtn is pressed
    // if numCards is greater than 4, subtract 4 to current numCard value.
    // otherwise, set numCard value to 4.
    numCards = numCards > 4 ? numCards - 4 : 4;

    // update services cards
    showServices(servicesList, numCards);

    // show loadMoreBtn
    loadMoreBtn.style.display = "block";
    // hide showLessBtn if numCards = 4
    if (numCards === 4) showLessBtn.style.display = "none";
  });
};
mobileLoadMore();
