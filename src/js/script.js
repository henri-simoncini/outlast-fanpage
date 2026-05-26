
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
  { num: 1, title: "The Murkoff Files #1", desc: "Documentos vazados revelam os primeiros experimentos da Murkoff.", cover: "assets/img/hqs/collection-1.webp" },
  { num: 2, title: "The Murkoff Files #2", desc: "O horror se intensifica enquanto os sujeitos de teste começam a desaparecer.", cover: "assets/img/hqs/collection-2.webp" },
  { num: 3, title: "The Murkoff Files #3", desc: "Um jornalista infiltrado descobre a verdade sobre o Projeto Walrider.", cover: "assets/img/hqs/collection-3.webp" },
  { num: 4, title: "The Murkoff Files #4", desc: "Os arquivos secretos expõem a cumplicidade do governo.", cover: "assets/img/hqs/collection-4.webp" },
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

const cards = document.querySelectorAll('.carrossel-jogos .card');
const trailerTrack = document.getElementById('trailer-track');
const trailerFrames = trailerTrack.querySelectorAll('iframe');

function goToTrailer(index) {
  trailerTrack.style.transform = `translateX(-${index * 100}%)`;

  trailerFrames.forEach((f, i) => {
    f.classList.toggle('active', i === index);
  });
}

cards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;

    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    goToTrailer(index);
  });
});

// Inicia no primeiro
cards[0].classList.add('active');
goToTrailer(0);
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // anima só uma vez
    }
  });
}, {
  threshold: 0.15 // dispara quando 15% do elemento está visível
});

reveals.forEach(el => observer.observe(el));
const galeriaSection = document.querySelector('.galeria');
const galeriaImgs = document.querySelectorAll('.grade-galeria .linha img');
const viewerImg = document.getElementById('viewer-img');
const viewerClose = document.getElementById('viewer-close');
const viewerPrev = document.getElementById('viewer-prev');
const viewerNext = document.getElementById('viewer-next');
const viewerThumbs = document.getElementById('viewer-thumbs');
const viewerCounter = document.getElementById('viewer-counter');

const THUMBS_VISIBLE = 4;
let currentIndex = 0;
const images = [...galeriaImgs].map(img => img.src);

// Cria os thumbnails no viewer
images.forEach((src, i) => {
  const thumb = document.createElement('img');
  thumb.src = src;
  thumb.className = 'viewer-thumb';
  thumb.addEventListener('click', () => goTo(i));
  viewerThumbs.appendChild(thumb);
});

const thumbEls = viewerThumbs.querySelectorAll('.viewer-thumb');

function goTo(index) {
  currentIndex = index;

  // Atualiza imagem principal
  viewerImg.style.opacity = 0;
  setTimeout(() => {
    viewerImg.src = images[index];
    viewerImg.style.opacity = 1;
  }, 150);

  // Atualiza seleção no grid
  galeriaImgs.forEach((img, i) => img.classList.toggle('selected', i === index));

  // Atualiza thumbs
  thumbEls.forEach((t, i) => t.classList.toggle('active', i === index));

  // Move o track dos thumbs
  const offset = Math.min(index, Math.max(0, images.length - THUMBS_VISIBLE));
  viewerThumbs.style.transform = `translateX(-${offset * (100 / THUMBS_VISIBLE)}%)`;

  // Contador
  viewerCounter.textContent = `${index + 1} / ${images.length}`;
}

function openViewer(index) {
  galeriaSection.classList.add('open');
  goTo(index);
}

function closeViewer() {
  galeriaSection.classList.remove('open');
  galeriaImgs.forEach(img => img.classList.remove('selected'));
}

// Clique nas imagens do grid
galeriaImgs.forEach((img, i) => {
  img.addEventListener('click', () => openViewer(i));
});

viewerClose.addEventListener('click', closeViewer);
viewerPrev.addEventListener('click', () => goTo((currentIndex - 1 + images.length) % images.length));
viewerNext.addEventListener('click', () => goTo((currentIndex + 1) % images.length));
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenImg = document.getElementById('fullscreen-img');
const fullscreenClose = document.getElementById('fullscreen-close');
const fullscreenPrev = document.getElementById('fullscreen-prev');
const fullscreenNext = document.getElementById('fullscreen-next');
const fullscreenCounter = document.getElementById('fullscreen-counter');

function openFullscreen(index) {
  currentIndex = index;
  fullscreenImg.src = images[index];
  fullscreenCounter.textContent = `${index + 1} / ${images.length}`;
  fullscreenOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
  fullscreenOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function switchFullscreen(index) {
  fullscreenImg.classList.add('switching');

  setTimeout(() => {
    currentIndex = index;
    fullscreenImg.src = images[currentIndex];
    fullscreenCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    goTo(currentIndex);
    fullscreenImg.classList.remove('switching');
  }, 200);
}

document.getElementById('viewer-fullscreen').addEventListener('click', () => {
  openFullscreen(currentIndex);
});

fullscreenClose.addEventListener('click', closeFullscreen);

fullscreenPrev.addEventListener('click', () => {
  switchFullscreen((currentIndex - 1 + images.length) % images.length);
});

fullscreenNext.addEventListener('click', () => {
  switchFullscreen((currentIndex + 1) % images.length);
});

document.addEventListener('keydown', (e) => {
  if (!fullscreenOverlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeFullscreen();
  if (e.key === 'ArrowLeft') switchFullscreen((currentIndex - 1 + images.length) % images.length);
  if (e.key === 'ArrowRight') switchFullscreen((currentIndex + 1) % images.length);
});

fullscreenOverlay.addEventListener('click', (e) => {
  if (e.target === fullscreenOverlay) closeFullscreen();
});

const recTimer = document.getElementById('rec-timer');
if (recTimer) {
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    recTimer.textContent = `${h}:${m}:${s}`;
  }, 1000);
}
document.addEventListener('DOMContentLoaded', () => {

  // ===================== FILTROS =====================
  const filtros = document.querySelectorAll('.filtro-btn');
  const buscaInput = document.getElementById('busca-input');
  const POR_PAGINA = 8;
  let paginaAtual = 1;

  if (!filtros.length) return;

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      paginaAtual = 1;
      aplicarFiltroEPagina();
    });
  });

  if (buscaInput) {
    buscaInput.addEventListener('input', () => {
      paginaAtual = 1;
      aplicarFiltroEPagina();
    });
  }

  // Tags do aside
  document.querySelectorAll('.aside-tags span').forEach(tag => {
    tag.addEventListener('click', () => {
      const filtro = tag.dataset.filtro;
      filtros.forEach(b => b.classList.remove('active'));
      const btnAlvo = document.querySelector(`.filtro-btn[data-filtro="${filtro}"]`);
      if (btnAlvo) btnAlvo.classList.add('active');
      paginaAtual = 1;
      aplicarFiltroEPagina();
    });
  });

  // ===================== LÓGICA CENTRAL =====================
  function aplicarFiltroEPagina() {
    const filtroAtivo = document.querySelector('.filtro-btn.active')?.dataset.filtro || 'todos';
    const busca = buscaInput?.value.toLowerCase().trim() || '';
    const todosCards = [...document.querySelectorAll('.noticia-card:not(.destaque)')];
    const destaque = document.querySelector('.noticia-card.destaque');

    // Filtra quais cards passam
    const cardsFiltrados = todosCards.filter(card => {
      const categoria = card.dataset.categoria;
      const titulo = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const texto = card.querySelector('p')?.textContent.toLowerCase() || '';
      const passaFiltro = filtroAtivo === 'todos' || categoria === filtroAtivo;
      const passaBusca = busca === '' || titulo.includes(busca) || texto.includes(busca);
      return passaFiltro && passaBusca;
    });

    // Esconde todos primeiro
    todosCards.forEach(c => c.style.display = 'none');

    // Página 1: mostra destaque + 8 cards
    // Páginas seguintes: só 8 cards, sem destaque
    const ehPrimeiraPagina = paginaAtual === 1;

    if (destaque) {
      const destaquePassaFiltro = filtroAtivo === 'todos' || destaque.dataset.categoria === filtroAtivo;
      const destaquePassaBusca = busca === '' ||
        destaque.querySelector('h3')?.textContent.toLowerCase().includes(busca) ||
        destaque.querySelector('p')?.textContent.toLowerCase().includes(busca);
      destaque.style.display = (destaquePassaFiltro && destaquePassaBusca && ehPrimeiraPagina) ? '' : 'none';
    }

    const inicio = ehPrimeiraPagina ? 0 : (paginaAtual - 1) * POR_PAGINA - (destaque ? 0 : 0);
    const cardsPagina = ehPrimeiraPagina
      ? cardsFiltrados.slice(0, POR_PAGINA)
      : cardsFiltrados.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA);

    cardsPagina.forEach(c => c.style.display = '');

    // Total de páginas: página 1 tem 8, restantes têm 8 cada
    const totalPaginas = Math.max(1, Math.ceil(cardsFiltrados.length / POR_PAGINA));

    renderNums(paginaAtual, totalPaginas);
    document.getElementById('pag-prev').disabled = paginaAtual === 1;
    document.getElementById('pag-next').disabled = paginaAtual === totalPaginas;
  }

  // ===================== PAGINAÇÃO =====================
  function renderNums(atual, total) {
    const container = document.getElementById('pag-nums');
    container.innerHTML = '';

    let pages = [];
    if (total <= 5) {
      pages = Array.from({ length: total }, (_, i) => i + 1);
    } else {
      pages = [1];
      if (atual > 3) pages.push('...');
      for (let i = Math.max(2, atual - 1); i <= Math.min(total - 1, atual + 1); i++) pages.push(i);
      if (atual < total - 2) pages.push('...');
      pages.push(total);
    }

    pages.forEach(p => {
      if (p === '...') {
        const el = document.createElement('span');
        el.textContent = '...';
        el.style.cssText = 'color:var(--text-muted);font-size:.8rem;display:flex;align-items:center;padding:0 4px';
        container.appendChild(el);
      } else {
        const btn = document.createElement('button');
        btn.className = 'pag-num' + (p === atual ? ' active' : '');
        btn.textContent = p;
        btn.addEventListener('click', () => {
          paginaAtual = p;
          aplicarFiltroEPagina();
          window.scrollTo({ top: document.querySelector('.noticias-main').offsetTop - 100, behavior: 'smooth' });
        });
        container.appendChild(btn);
      }
    });
  }

  document.getElementById('pag-prev').addEventListener('click', () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      aplicarFiltroEPagina();
      window.scrollTo({ top: document.querySelector('.noticias-main').offsetTop - 100, behavior: 'smooth' });
    }
  });

  document.getElementById('pag-next').addEventListener('click', () => {
    paginaAtual++;
    aplicarFiltroEPagina();
    window.scrollTo({ top: document.querySelector('.noticias-main').offsetTop - 100, behavior: 'smooth' });
  });

  // Inicializa
  aplicarFiltroEPagina();
});