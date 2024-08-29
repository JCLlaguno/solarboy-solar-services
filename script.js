"use-strict";

const navBtn = document.querySelector(".nav-toggle-btn");
const navLinks = document.querySelector(".nav-links");
navBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navLinks.classList.toggle("show-links");
});
