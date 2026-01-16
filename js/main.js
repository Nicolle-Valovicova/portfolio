document.querySelectorAll(".projects-shell").forEach((shell) => {
  const swiperEl = shell.querySelector(".projects-container");

  new Swiper(swiperEl, {
    loop: true,
    spaceBetween: 30,

    pagination: {
      el: shell.querySelector(".swiper-pagination"),
      clickable: true,
      dynamicBullets: true,
    },

    navigation: {
      nextEl: shell.querySelector(".swiper-button-next"),
      prevEl: shell.querySelector(".swiper-button-prev"),
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
});
// add glass effects
let navBarItems = document.querySelector(".headerLinks");
let jumpToTopBtn = document.querySelector(".jumpToTop");
let contactform = document.querySelector("#contactform");
navBarItems.classList.add("glass");
jumpToTopBtn.classList.add("glass");
contactform.classList.add("glass");
// scroll reveal
// for navbar
let lastScrollTop = 0;

// for jump to top btn
let navBar = document.querySelector("#header-bar");
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navBar.style.top = "-120px";
  } else {
    navBar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});
// for jump to top btn
let lastScrollBottom =0;
window.addEventListener("scroll", () => {
  let scrollBottom = window.pageYOffset || document.documentElement.scrollBottom;
  if (scrollBottom > lastScrollBottom) {
    jumpToTopBtn.style.bottom = "0px";
  } else {
    jumpToTopBtn.style.bottom = "-120px";
  }
  lastScrollBottom = scrollBottom;
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
