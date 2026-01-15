//  script for scrollbar cards
const swiper = new Swiper(".projects-container", {
  loop: true,
  spaceBetween: 30,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// flag select stuff change language
let dutchFlag = document.querySelector("#nederlands");
let englishFlag = document.querySelector("#engels");

let currentlyActive = 1;

function toggle() {
  currentlyActive *= -1;
  
  if (currentlyActive < 0) {
    dutchFlag.classList.add("hidden");
    englishFlag.classList.remove("hidden");
  } else {
    dutchFlag.classList.remove("hidden");
    englishFlag.classList.add("hidden");
  }
}


dutchFlag.addEventListener("click", toggle);
englishFlag.addEventListener("click", toggle);