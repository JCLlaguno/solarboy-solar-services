"use strict";

const navBtn = document.querySelector(".nav-toggle-btn");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

// Hero Video
// let count = 1;
// const heroVideo = document.getElementById("hero-video");
// heroVideo.addEventListener(
//   "ended",
//   () => {
//     if (count === 1) {
//       count++;
//       heroVideo.src = `./videos/main${count}.mp4`;
//     }
//   },
//   true
// );

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
  autoplay: false,

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

  const coords = [13.2557788, 123.6847076];

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
  const loadMoreBtn = document.querySelector(".services-show-more");
  const showLessBtn = document.querySelector(".services-show-less");
  const test = document.querySelector(".nav-logo");
  const servicesLength = servicesList.length;

  // max num of cards to be displayed
  let numCards = 4;

  // MAIN function to show services cards
  const showServices = (servicesList, numCards) => {
    let delay = 0;
    servicesList.forEach((service, i) => {
      // if current index is less than or equal to numCards,
      // display it, else hide it
      // service.style.display = i <= numCards - 1 ? "grid" : "none";
      if (i <= numCards - 1) {
        // 8
        service.style.border = "2px solid var(--fg-2)";
        service.style.padding = "1rem";
        service.style.height = "300px";
        service.style.marginBottom = "2rem";
        service.style.opacity = 1;

        // if current index is greater or equal 4 and
        // if current index is less than or equal to numCards,
        // increase transition delay by 200ms
        if (i >= servicesList.length - 4) {
          // 4
          service.style.transitionDelay = `${delay}ms`;
          delay += 200;
        }
      } else {
        service.style.border = "none";
        service.style.padding = 0;
        service.style.height = 0;
        service.style.marginBottom = 0;
        service.style.opacity = 0;
        delay = 0;
      }
    });
  };

  // initial page load
  if (!showLessBtn) return;
  // if total cards number = 4, hide show less button
  // if (numCards === 4) showLessBtn.style.display = "none";

  // hide showLessBtn by default
  showLessBtn.style.display = "none";

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
  const showDetails = document.querySelectorAll(".project-show-details");
  const hideDetails = document.querySelectorAll(".project-hide-details");

  showDetails.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      btn.parentElement.parentElement.classList.add("show-details");
      const btnContainer = btn.parentElement;
      const descriptionList = btn.parentElement.nextElementSibling;
      const projectDetail =
        btn.parentElement.nextElementSibling.nextElementSibling;

      descriptionList.style.maxHeight = descriptionList.scrollHeight + "px";
      descriptionList.style.marginBottom = "1rem";
      descriptionList.style.opacity = 1;
      projectDetail.style.maxHeight = projectDetail.scrollHeight + "px";
      projectDetail.style.marginBottom = "1rem";
      projectDetail.style.opacity = 1;
      btnContainer.style.marginBottom = "1rem";
    })
  );

  hideDetails.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      btn.parentElement.parentElement.classList.remove("show-details");
      const btnContainer = btn.parentElement;
      const descriptionList = btn.parentElement.nextElementSibling;
      const projectDetail =
        btn.parentElement.nextElementSibling.nextElementSibling;

      descriptionList.style.maxHeight = null;
      descriptionList.style.marginBottom = 0;
      descriptionList.style.opacity = 0;
      projectDetail.style.maxHeight = null;
      projectDetail.style.marginBottom = 0;
      projectDetail.style.opacity = 0;
      btnContainer.style.marginBottom = "1rem";
    })
  );
};
showHideDetails();

const loadCustomSelect = () => {
  // Get all dropdowns from the document
  const dropdowns = document.querySelectorAll(".dropdown");

  //   loop through all dropdown elements
  dropdowns.forEach((dropdown) => {
    // Get inner elements from each dropdown
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    // Add a click event to the select element
    select.addEventListener("click", () => {
      // Add the clicked select styles to the select element
      select.classList.toggle("select-clicked");
      //   Add the rotate styles to the caret element
      caret.classList.toggle("caret-rotate");
      //   Add the open styles to the menu element
      menu.classList.toggle("menu-open");
    });
    //   Loop through all option elements
    options.forEach((option) => {
      // Add a click event to the option element
      option.addEventListener("click", () => {
        // Change selected inner text to clicked option inner text
        selected.innerText = option.innerText;
        //   Add clicked select styles to the select element
        select.classList.remove("select-clicked");
        // Add the rotate styles to the caret element
        caret.classList.remove("caret-rotate");
        // Add the open styles to the menu element
        menu.classList.remove("menu-open");
        // Remove active class from all option elements
        options.forEach((option) => {
          option.classList.remove("active");
        });
        // Add active class to clicked option element
        option.classList.add("active");
      });
    });
  });
};
loadCustomSelect();
