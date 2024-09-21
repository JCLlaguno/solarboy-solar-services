"use strict";

const navBtn = document.querySelector(".nav-toggle-btn");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

// H-Projects Slider
new Swiper(".slides-wrapper", {
  // Optional parameters
  // direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 16,
  // centeredSlides: true,
  simulateTouch: true,

  // Responsive breakpoints
  breakpoints: {
    900: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 5000,
  },
  // autoplay: false,

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Slide Preview
const slidePreview = (targetEl, previewEl) => {
  const closePreviewBtn = document.querySelector(".btn-close-preview");

  const showPreview = (el, index) => {
    if (!el[index]) return;
    el[index].classList.add("show");
    el[index].parentElement.classList.add("show-preview");
    body.style.overflow = "hidden"; // hide scrollbar
  };
  const closePreview = (el, index) => {
    if (!el[index]) return;
    el[index].classList.remove("show");
    el[index].parentElement.classList.remove("show-preview");
    body.style.overflow = "visible"; // show scrollbar
  };

  targetEl.forEach((target, i) => {
    // show preview when target is clicked
    target.addEventListener("click", () => showPreview(previewEl, i));

    // close preview
    closePreviewBtn?.addEventListener("click", () =>
      closePreview(previewEl, i)
    );
    // close preview when ESC is pressed
    window.addEventListener("keydown", (e) => {
      if (!e.key === "Escape") return;
      closePreview(el, i);
    });
  });
};

// home slide
const slides = document.querySelectorAll(".swiper-slide");
const previewElements = document.querySelectorAll(".slide-preview");
// projects slide
const projectImgs = document.querySelectorAll(".project-img-container");
const previewElementsProjects = document.querySelectorAll(
  ".project-img-preview"
);
slidePreview(slides, previewElements);
slidePreview(projectImgs, previewElementsProjects);

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
  const markerIcon = L.icon({
    iconUrl: "./img/marker.svg",
    iconSize: [40, 40],
  });

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
      // if current index is less than or equal to numCards,
      // display it, else hide it
      // service.style.display = i <= numCards - 1 ? "grid" : "none";
      if (i <= numCards - 1) {
        service.style.border = "2px solid var(--fg-2)";
        service.style.padding = "1rem";
        service.style.height = "300px";
        service.style.marginBottom = "2rem";
        service.style.opacity = 1;
      } else {
        service.style.border = "none";
        service.style.padding = 0;
        service.style.paddingLeft = "1rem";
        service.style.height = 0;
        service.style.marginBottom = 0;
        service.style.opacity = 0;
      }
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

    // reduce numCards value by 4 every time showLessBtn is pressed
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

// project show/hide details
const showHideDetails = () => {
  const loadMoreBtn = document.querySelectorAll(".project-load-more-btn");
  const showLessBtn = document.querySelectorAll(".project-show-less-btn");

  loadMoreBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      btn.parentElement.parentElement.classList.add("show-details");
      const descriptionList = btn.parentElement.nextElementSibling;
      const projectDetail =
        btn.parentElement.nextElementSibling.nextElementSibling;

      descriptionList.style.maxHeight = descriptionList.scrollHeight + "px";
      descriptionList.style.marginBottom = "1rem";
      descriptionList.style.opacity = 1;
      projectDetail.style.maxHeight = projectDetail.scrollHeight + "px";
      projectDetail.style.marginBottom = "1rem";
      projectDetail.style.opacity = 1;
    })
  );

  showLessBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      btn.parentElement.parentElement.classList.remove("show-details");
      const descriptionList = btn.parentElement.nextElementSibling;
      const projectDetail =
        btn.parentElement.nextElementSibling.nextElementSibling;

      descriptionList.style.maxHeight = null;
      descriptionList.style.marginBottom = 0;
      descriptionList.style.opacity = 0;
      projectDetail.style.maxHeight = null;
      projectDetail.style.marginBottom = 0;
      projectDetail.style.opacity = 0;
    })
  );
};
showHideDetails();

const loadCustomSelect = () => {
  // Get all custom select elements
  let customSelects = document.querySelectorAll(".custom-select");

  // Attach click event listeners to each custom select
  customSelects.forEach(function (select) {
    let selectSelected = select.querySelector(".select-selected");
    let selectItems = select.querySelector(".select-items");
    let options = selectItems.querySelectorAll("div");

    // Toggle the dropdown visibility when the select box is clicked
    selectSelected.addEventListener("click", function () {
      if (selectItems.style.display === "block") {
        selectItems.style.display = "none";
      } else {
        selectItems.style.display = "block";
      }
    });

    // Set the selected option and hide the dropdown when an option is clicked
    options.forEach(function (option) {
      option.addEventListener("click", function () {
        selectSelected.textContent = option.textContent;
        selectItems.style.display = "none";
      });
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener("click", function (e) {
      if (!select.contains(e.target)) {
        selectItems.style.display = "none";
      }
    });
  });
};
loadCustomSelect();
