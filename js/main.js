// background img animation/parallax
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const header_img = document.querySelector("#hero1Img");

  header_img.style.transform = `
    translateY(${scrollY * -0.5}px)
    scale(${1 + scrollY * 0.0004})
  `;
});
const hero2Img = document.querySelector("#hero2Img");
const skillsWrapper = document.querySelector("#skills-wrapper");

window.addEventListener("scroll", () => {
  const rect = skillsWrapper.getBoundingClientRect();
  const vh = window.innerHeight;

  // only run while wrapper overlaps the viewport
  const visible = rect.bottom > 0 && rect.top < vh;

  if (!visible) {
    hero2Img.style.transform = ""; // stop when not near/visible
    return;
  }

  // progress 0..1 while passing the wrapper
  const progress = (vh - rect.top) / (vh + rect.height);

  // parallax strength (tweak these)
  const y = (progress - 0.5) * -720; // px range

  hero2Img.style.transform = `translateY(${y}px) `;
});
const hero3Img = document.querySelector("#hero3Img");
const contactSection = document.querySelector("#contact"); // change if needed

window.addEventListener("scroll", () => {
  const rect = contactSection.getBoundingClientRect();
  const vh = window.innerHeight;

  if (rect.top > vh) {
    hero3Img.style.transform = "translateY(120px)";
    return;
  }

  if (rect.bottom < 0) {
    hero3Img.style.transform = "translateY(0px)";
    return;
  }

  // progress 0 → 1
  const progress = Math.min(1, Math.max(0, (vh - rect.top) / vh));

  const y = 120 * (1 - progress);

  hero3Img.style.transform = `translateY(${y}px)`;
});


// swiper code for the cards in projects
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
let skillsContaining = document.querySelectorAll(".skill-imgs");
navBarItems.classList.add("glass");
jumpToTopBtn.classList.add("glass");
contactform.classList.add("glass");

skillsContaining.forEach(s =>{
  s.classList.add("glass");
})
// add hsla gradient
let gradientCard = document.querySelectorAll(".card-item");
gradientCard.forEach((c) => {
  c.classList.add("hslaGrad1");
});
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
let lastScrollBottom = 0;
window.addEventListener("scroll", () => {
  let scrollBottom =
    window.pageYOffset || document.documentElement.scrollBottom;
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
// reveal project cards information and close
let read_more_btns = document.querySelectorAll(".read-more");
let projectsInfo_container = document.querySelector(".projectsInfo-container");
let closeInfoBtn = document.querySelector("#closeInfo");
let bodyy = document.querySelector("#bodyy");

function hideProjectInfo() {
  projectsInfo_container.classList.add("hidden");
  projectsInfo_container.classList.remove("display");
}
hideProjectInfo();
read_more_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    projectsInfo_container.classList.add("display");
  });
});

closeInfoBtn.addEventListener("click", () => {
  hideProjectInfo();
});
// TODO make pic from yourself
// TODO make website responsive for tablet and phone
// TODO make dutch version with json fetch
// TODO link the linkedin etc in banner + setup linkeding profile
