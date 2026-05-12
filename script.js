
// ANIMAÇÃO DE GLITCH
const hero = document.querySelector('.hero');

setInterval(() => {
  hero.classList.add('glitch-active');

  setTimeout(() => {
    hero.classList.remove('glitch-active');
  }, 300);

}, Math.random() * 5000 + 2000);

// SWIPER
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
(function ($) {

  $(document).ready(function () {

    var s = $('.slider'),
      sWrapper = s.find('.slider-wrapper'),
      sItem = s.find('.slide'),
      btn = s.find('.slider-link'),
      sWidth = sItem.width(),
      sCount = sItem.length,
      slide_date = s.find('.slide-date'),
      slide_title = s.find('.slide-title'),
      slide_text = s.find('.slide-text'),
      slide_more = s.find('.slide-more'),
      slide_image = s.find('.slide-image img'),
      sTotalWidth = sCount * sWidth;

    sWrapper.css('width', sTotalWidth);
    sWrapper.css('width', sTotalWidth);

    var clickCount = 0;

    btn.on('click', function (e) {
      e.preventDefault();

      if ($(this).hasClass('next')) {

        (clickCount < (sCount - 1)) ? clickCount++ : clickCount = 0;
      } else if ($(this).hasClass('prev')) {

        (clickCount > 0) ? clickCount-- : (clickCount = sCount - 1);
      }
      TweenMax.to(sWrapper, 0.4, { x: '-' + (sWidth * clickCount) })


      //CONTENT ANIMATIONS

      var fromProperties = { autoAlpha: 0, x: '-50', y: '-10' };
      var toProperties = { autoAlpha: 0.8, x: '0', y: '0' };

      TweenLite.fromTo(slide_image, 1, { autoAlpha: 0, y: '40' }, { autoAlpha: 1, y: '0' });
      TweenLite.fromTo(slide_date, 0.4, fromProperties, toProperties);
      TweenLite.fromTo(slide_title, 0.6, fromProperties, toProperties);
      TweenLite.fromTo(slide_text, 0.8, fromProperties, toProperties);
      TweenLite.fromTo(slide_more, 1, fromProperties, toProperties);

    });
  });
})(jQuery);

$('.overlay').addClass('overlay-blue');

let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (!header) return;

  if (currentScroll <= 0) {
    header.classList.remove("hide");
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
const hqs = [
  { num: 1, title: "The Murkoff Files #1", desc: "Documentos vazados revelam os primeiros experimentos da Murkoff.", cover: "assets/collection-1.webp" },
  { num: 2, title: "The Murkoff Files #2", desc: "O horror se intensifica enquanto os sujeitos de teste começam a desaparecer.", cover: "assets/collection-2.webp" },
  { num: 3, title: "The Murkoff Files #3", desc: "Um jornalista infiltrado descobre a verdade sobre o Projeto Walrider.", cover: "assets/collection-3.webp" },
  { num: 4, title: "The Murkoff Files #4", desc: "Os arquivos secretos expõem a cumplicidade do governo.", cover: "assets/collection-4.webp" },
];

let currentHQ = 0;
const VISIBLE = 4;
const hqTrack = document.getElementById('hqs-track');

function buildHQSlides() {
  hqTrack.innerHTML = '';
  hqs.forEach((h, i) => {
    const s = document.createElement('div');
    s.className = 'slide' + (i === currentHQ ? ' active' : '');
    s.innerHTML = `<img src="${h.cover}" alt="${h.title}"><span class="slide-num">${h.num}</span>`;
    s.addEventListener('click', () => { currentHQ = i; updateHQ(); });
    hqTrack.appendChild(s);
  });
}

function updateHQ() {
  hqTrack.querySelectorAll('.slide').forEach((s, i) => s.classList.toggle('active', i === currentHQ));
  const offset = Math.min(currentHQ, Math.max(0, hqs.length - VISIBLE));
  hqTrack.style.transform = `translateX(-${offset * (100 / VISIBLE)}%)`;
  document.getElementById('hqs-title').textContent = hqs[currentHQ].title;
  document.getElementById('hqs-desc').textContent = hqs[currentHQ].desc;
}

document.getElementById('hqs-prev').onclick = () => { currentHQ = Math.max(0, currentHQ - 1); updateHQ(); };
document.getElementById('hqs-next').onclick = () => { currentHQ = Math.min(hqs.length - 1, currentHQ + 1); updateHQ(); };

buildHQSlides();
updateHQ();