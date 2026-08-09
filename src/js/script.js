// ANIMAÇÃO DE GLITCH
const hero = document.querySelector('.hero');
if (hero) {
  setInterval(() => {
    hero.classList.add('glitch-active');

    setTimeout(() => {
      hero.classList.remove('glitch-active');
    }, 300);

  }, Math.random() * 5000 + 2000);
}

// SWIPER
if (document.querySelector('.mySwiper')) {
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
}

(function ($) {

  $(document).ready(function () {

    var s = $('.slider');
    if (!s.length) return;

    var sWrapper = s.find('.slider-wrapper'),
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

if (header) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

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
}

// ===================== MENU MOBILE =====================
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
  function setMenu(open) {
    navToggle.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  navToggle.addEventListener('click', () => {
    setMenu(!mobileMenu.classList.contains('open'));
  });

  // Clicar num link navega e fecha
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMenu(false);
  });

  // Voltou pro desktop com o menu aberto? Fecha, senão o scroll fica travado
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mobileMenu.classList.contains('open')) setMenu(false);
  });
}

// ===================== LINK ATIVO CONFORME A SEÇÃO VISÍVEL =====================
const navLinks = [...document.querySelectorAll('.header nav a[href^="#"], .mobile-menu nav a[href^="#"]')];

if (navLinks.length) {
  const vistos = new Set();
  const alvos = [];

  navLinks.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    if (!id || vistos.has(id)) return;
    const el = document.getElementById(id);
    if (el) {
      vistos.add(id);
      alvos.push(el);
    }
  });

  // A faixa central da tela decide qual seção está "ativa"
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  alvos.forEach(el => spy.observe(el));
}

// ===================== HQs =====================
const hqTrack = document.getElementById('hqs-track');
if (hqTrack) {
  const hqs = [
    { num: 1, title: "The Murkoff Files #1", desc: "Documentos vazados revelam os primeiros experimentos da Murkoff.", cover: "assets/img/hqs/collection-1.webp" },
    { num: 2, title: "The Murkoff Files #2", desc: "O horror se intensifica enquanto os sujeitos de teste começam a desaparecer.", cover: "assets/img/hqs/collection-2.webp" },
    { num: 3, title: "The Murkoff Files #3", desc: "Um jornalista infiltrado descobre a verdade sobre o Projeto Walrider.", cover: "assets/img/hqs/collection-3.webp" },
    { num: 4, title: "The Murkoff Files #4", desc: "Os arquivos secretos expõem a cumplicidade do governo.", cover: "assets/img/hqs/collection-4.webp" },
  ];

  let currentHQ = 0;

  // Quantas capas cabem por vez — menos espaço, menos capas
  function hqVisible() {
    if (window.innerWidth <= 480) return 2;
    if (window.innerWidth <= 768) return 3;
    return 4;
  }

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
    const visible = hqVisible();
    hqTrack.style.setProperty('--hq-visible', visible);
    hqTrack.querySelectorAll('.slide').forEach((s, i) => s.classList.toggle('active', i === currentHQ));
    const offset = Math.min(currentHQ, Math.max(0, hqs.length - visible));
    hqTrack.style.transform = `translateX(-${offset * (100 / visible)}%)`;
    document.getElementById('hqs-title').textContent = hqs[currentHQ].title;
    document.getElementById('hqs-desc').textContent = hqs[currentHQ].desc;
  }

  document.getElementById('hqs-prev').onclick = () => { currentHQ = Math.max(0, currentHQ - 1); updateHQ(); };
  document.getElementById('hqs-next').onclick = () => { currentHQ = Math.min(hqs.length - 1, currentHQ + 1); updateHQ(); };

  buildHQSlides();
  updateHQ();

  window.addEventListener('resize', updateHQ);
}

// ===================== CARROSSEL DE JOGOS / TRAILERS =====================
const trailerTrack = document.getElementById('trailer-track');
if (trailerTrack) {
  const cards = document.querySelectorAll('.carrossel-jogos .card');
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
  if (cards.length) {
    cards[0].classList.add('active');
    goToTrailer(0);
  }
}

// ===================== REVEAL ON SCROLL =====================
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

// ===================== GALERIA =====================
const galeriaSection = document.querySelector('.galeria');
if (galeriaSection) {
  const galeriaImgs = document.querySelectorAll('.grade-galeria .linha img');
  const viewerImg = document.getElementById('viewer-img');
  const viewerClose = document.getElementById('viewer-close');
  const viewerPrev = document.getElementById('viewer-prev');
  const viewerNext = document.getElementById('viewer-next');
  const viewerThumbs = document.getElementById('viewer-thumbs');
  const viewerCounter = document.getElementById('viewer-counter');

  // Quantas miniaturas cabem por vez — mais espaço no mobile, onde o viewer ocupa a largura toda
  function thumbsVisible() {
    if (window.innerWidth <= 480) return 4;
    if (window.innerWidth <= 992) return 6;
    return 4;
  }

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
    const visible = thumbsVisible();
    viewerThumbs.style.setProperty('--thumbs-visible', visible);
    const offset = Math.min(index, Math.max(0, images.length - visible));
    viewerThumbs.style.transform = `translateX(-${offset * (100 / visible)}%)`;

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

  // Clique nas imagens do grid.
  // No mobile o viewer lateral não cabe (ele existe para ficar lado a lado com a
  // grade), então o clique abre direto em tela cheia.
  galeriaImgs.forEach((img, i) => {
    img.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        openFullscreen(i);
      } else {
        openViewer(i);
      }
    });
  });

  viewerClose.addEventListener('click', closeViewer);
  viewerPrev.addEventListener('click', () => goTo((currentIndex - 1 + images.length) % images.length));
  viewerNext.addEventListener('click', () => goTo((currentIndex + 1) % images.length));

  // ===================== FULLSCREEN =====================
  const fullscreenOverlay = document.getElementById('fullscreen-overlay');
  const fullscreenImg = document.getElementById('fullscreen-img');
  const fullscreenClose = document.getElementById('fullscreen-close');
  const fullscreenPrev = document.getElementById('fullscreen-prev');
  const fullscreenNext = document.getElementById('fullscreen-next');
  const fullscreenCounter = document.getElementById('fullscreen-counter');
  const viewerFullscreenBtn = document.getElementById('viewer-fullscreen');

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

  viewerFullscreenBtn?.addEventListener('click', () => {
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
}

// ===================== REC TIMER =====================
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

// ===================== NOTÍCIAS: FILTROS + PAGINAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {

  // ===================== ESTADO / ELEMENTOS =====================
  const filtros = document.querySelectorAll('.filtro-btn');
  const buscaInput = document.getElementById('busca-input');
  const pagPrev = document.getElementById('pag-prev');
  const pagNext = document.getElementById('pag-next');
  const pagNums = document.getElementById('pag-nums');
  const POR_PAGINA = 8;
  let paginaAtual = 1;

  if (!filtros.length) return;

  // ===================== FILTROS =====================
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

  // ===================== PAGINAÇÃO =====================
  pagPrev?.addEventListener('click', () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      aplicarFiltroEPagina();
    }
  });

  pagNext?.addEventListener('click', () => {
    paginaAtual++;
    aplicarFiltroEPagina();
  });

  function renderNums(atual, total) {
    pagNums.innerHTML = '';

    for (let i = 1; i <= total; i++) {
      const btn = document.createElement('button');

      btn.classList.add('pag-num');
      if (i === atual) btn.classList.add('active');
      btn.textContent = i;

      btn.addEventListener('click', () => {
        paginaAtual = i;
        aplicarFiltroEPagina();
      });

      pagNums.appendChild(btn);
    }
  }

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

    // Página 1: mostra destaque + 8 cards. Páginas seguintes: só 8 cards, sem destaque
    const ehPrimeiraPagina = paginaAtual === 1;

    if (destaque) {
      const destaquePassaFiltro = filtroAtivo === 'todos' || destaque.dataset.categoria === filtroAtivo;
      const destaquePassaBusca = busca === '' ||
        destaque.querySelector('h3')?.textContent.toLowerCase().includes(busca) ||
        destaque.querySelector('p')?.textContent.toLowerCase().includes(busca);
      destaque.style.display = (destaquePassaFiltro && destaquePassaBusca && ehPrimeiraPagina) ? '' : 'none';
    }

    // Fatia correta de cards para a página atual
    const inicio = (paginaAtual - 1) * POR_PAGINA;
    const fim = inicio + POR_PAGINA;
    cardsFiltrados.slice(inicio, fim).forEach(c => c.style.display = '');

    // Total de páginas
    const totalPaginas = Math.max(1, Math.ceil(cardsFiltrados.length / POR_PAGINA));
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    renderNums(paginaAtual, totalPaginas);
    pagPrev.disabled = paginaAtual === 1;
    pagNext.disabled = paginaAtual === totalPaginas;
  }

  aplicarFiltroEPagina();
});