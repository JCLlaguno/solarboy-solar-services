"use-strict";

const body = document.body;

// MOBILE NAV TOGGLE
const loadMobileNavToggle = () => {
  const navBtn = document.querySelector(".nav-toggle-btn");
  const navLinks = document.querySelector(".nav-links");
  navBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (navLinks.classList.contains("show-links")) {
      navLinks.classList.remove("show-links");
      navLinks.style.height = 0;
    } else {
      navLinks.classList.add("show-links");
      navLinks.style.height = `${navLinks.scrollHeight}px`;
    }
  });
};
loadMobileNavToggle();

// SWIPER SLIDER
const loadSlider = () => {
  new Swiper(".slides-wrapper", {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 16,
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
    autoplay: true,

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

  // slide preview
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
        closePreview(previewEl, i);
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
};
loadSlider();

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

// SERVICES SHOW MORE/LESS
const mobileLoadMore = () => {
  const servicesList = document.querySelectorAll(".service");
  const loadMoreBtn = document.querySelector(".services-show-more");
  const showLessBtn = document.querySelector(".services-show-less");
  const servicesLength = servicesList.length;

  // max num of cards to be displayed
  let numCards = 4;

  // MAIN function to show services cards
  const showServices = (servicesList, numCards) => {
    servicesList.forEach((service, i) => {
      // if current index is less than or equal to numCards,
      // display it, else hide it
      if (i <= numCards - 1) {
        // 8
        service.style.border = "var(--border-small)";
        service.style.padding = "1rem";
        service.style.height = "300px";
        service.style.marginBottom = "2rem";
      } else {
        service.style.border = "none";
        service.style.padding = 0;
        service.style.height = 0;
        service.style.marginBottom = 0;
      }
    });
  };

  // initial page load
  if (!showLessBtn) return;

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

// PROJECT SHOW/HIDE DETAILS
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

// CUSTOM DROPDOWN ON CONTACTS PAGE
const loadCustomSelect = () => {
  /* Look for any elements with the class "custom-select": */
  const customSelectDiv = document.querySelector(".custom-select");
  if (!customSelectDiv) return;

  // get first option element
  const selElmnt = customSelectDiv.getElementsByTagName("select")[0]; // <option> inside <select>
  const selElmntLength = selElmnt.length; // length of all <option>

  /* For each element, create a new DIV that will act as the selected item: */
  const selectedDiv = document.createElement("DIV");
  selectedDiv.setAttribute("class", "select-selected");
  selectedDiv.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  customSelectDiv.appendChild(selectedDiv);

  /* For each element, create a new DIV that will contain the option list: */
  const optionListDiv = document.createElement("DIV");
  optionListDiv.setAttribute("class", "select-items select-hide");

  /* For each option in the original select element,
        create a new DIV that will act as an option item: */
  for (let j = 1; j < selElmntLength; j++) {
    const optionItemDiv = document.createElement("DIV");
    optionItemDiv.innerHTML = selElmnt.options[j].innerHTML;

    /* When an item is clicked, update the original select box,
          and the selected item: */
    optionItemDiv.addEventListener("click", function () {
      const selectEl =
        this.parentNode.parentNode.getElementsByTagName("select")[0];
      const selectElLength = selectEl.length;
      const selectSelected = this.parentNode.previousSibling;

      for (let i = 0; i < selectElLength; i++) {
        if (selectEl.options[i].innerHTML == this.innerHTML) {
          selectEl.selectedIndex = i;
          selectSelected.innerHTML = this.innerHTML;
          const sameAsSelected =
            this.parentNode.getElementsByClassName("same-as-selected");
          const sameAsSelectedLength = sameAsSelected.length;
          for (let k = 0; k < sameAsSelectedLength; k++) {
            sameAsSelected[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      selectSelected.click();
    });
    optionListDiv.appendChild(optionItemDiv);
  }
  customSelectDiv.appendChild(optionListDiv);

  /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
  selectedDiv.addEventListener("click", function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });

  /* A function that will close all select boxes in the document,
      except the current select box: */
  function closeAllSelect(elmnt) {
    let arrNo = [];
    const selectItems = document.getElementsByClassName("select-items");
    const selectSelected2 = document.getElementsByClassName("select-selected");
    const selectItemsLength = selectItems.length;
    let selectSelected2Length = selectSelected2.length;

    for (let i = 0; i < selectSelected2Length; i++) {
      if (elmnt == selectSelected2[i]) {
        arrNo.push(i);
      } else {
        selectSelected2[i].classList.remove("select-arrow-active");
      }
    }

    for (let i = 0; i < selectItemsLength; i++) {
      if (arrNo.indexOf(i)) {
        selectItems[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
};
loadCustomSelect();

// SCROLL REVEAL ANIMATION
const revealOnScroll = () => {
  // observer for all elements with .hidden class
  const options = {
    rootMargin: "-16px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, options);
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));
};
revealOnScroll();

// SMOOTH SCROLLING PROJECTS PAGE
const projectsSmoothScroll = () => {
  // image-links to projects
  const projectGalleryLinks = document.querySelectorAll(".project-link");
  // projects
  const projects = Array.from(document.querySelectorAll(".project"));

  // function for smooth scrolling
  const scrollToProject = (selector) => {
    window.scrollTo({
      behavior: "smooth",
      top:
        selector.getBoundingClientRect().top -
        90 -
        body.getBoundingClientRect().top,
    });
  };
  // loop through each project gallery image
  projectGalleryLinks.forEach((projectGalleryLink, i) => {
    // attach a click event listener to each image
    // when gallery image is clicked, go to project with same image
    projectGalleryLink.addEventListener("click", () => {
      // return the project which matches gallery img's index
      const targetProject = projects.find((_, index) => index === i);

      // go to project
      scrollToProject(targetProject);
    });
  });
};
projectsSmoothScroll();

// BACK TO TOP BUTTON
const backToTop = () => {
  // btn element
  const backToTopBtn = document.querySelector(".back-to-top");

  // function to show/hide back to top button
  // display back to top button when scrollTop value > 250
  const toggleBackToTop = () => {
    document.documentElement.scrollTop > 200
      ? backToTopBtn.classList.add("show")
      : backToTopBtn.classList.remove("show");
  };
  // function to scroll to top of the page
  const scrollToTop = () =>
    body.scrollIntoView({ behavior: "smooth", block: "start" });
  // call the toggle function when page is scrolled 250px
  window.addEventListener("scroll", () => toggleBackToTop());
  // when button is clicked call the scroll function
  backToTopBtn.addEventListener("click", scrollToTop);
};
backToTop();

// ACTIVATE STICKY NAV ON SCROLL
const stickyNav = () => {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () =>
    navbar.classList.toggle("sticky", window.scrollY > 0)
  );
};
stickyNav();

// LIGHT / DARK MODE TOGGLE
const loadDarkmodeToggle = () => {
  // 1. get the darkMode state, store in variable 'darkMode'
  let darkMode = localStorage.getItem("dark"); //
  // console.log("dark mode outside", darkMode);

  // 2. create function to enable/disable dark mode
  const enableDarkMode = () => {
    localStorage.setItem("dark", "active");
    body.classList.add("dark");
  };
  const disableDarkMode = () => {
    localStorage.setItem("dark", null);
    body.classList.remove("dark");
  };

  // 3. on reload, check if darkmode is enabled/disabled
  if (darkMode === "null") disableDarkMode();

  // 4. enable/disable dark mode when toggle is pressed
  const toggleBtnsArr = Array.from(
    document.querySelectorAll(".darkmode-toggle")
  ); // store the elements on array

  // loop through each element, attach an event listener
  toggleBtnsArr.forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      darkMode = localStorage.getItem("dark");
      if (darkMode === "active") disableDarkMode();
      else enableDarkMode();
    });
  });
};
loadDarkmodeToggle();

// SUB-HERO TYPING EFFECT
const loadTypingEffect = () => {
  const subHeroText = document.querySelector(".sub-hero-description");
  const subHeroTextArr = Array.from(subHeroText.textContent);
  let typedText = "";
  subHeroTextArr.forEach((letter, i) => {
    setTimeout(() => {
      typedText += letter;
      subHeroText.textContent = typedText;
    }, i * 30);
  });
};
loadTypingEffect();
