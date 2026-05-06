const hero = document.querySelector('.hero');

setInterval(() => {
  hero.classList.add('glitch-active');

  setTimeout(() => {
    hero.classList.remove('glitch-active');
  }, 300);

}, Math.random() * 5000 + 2000);
