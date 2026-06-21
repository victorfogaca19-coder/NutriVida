let imagens = document.querySelectorAll('.carrossel img');
let indice = 0;

function trocarImagem() {
  if (imagens.length === 0) return;
  imagens[indice].classList.remove('ativa');
  indice = (indice + 1) % imagens.length;
  imagens[indice].classList.add('ativa');
}

setInterval(trocarImagem, 3000);

let captions = document.querySelectorAll('figcaption');

captions.forEach(function(caption) {
  caption.addEventListener('mouseenter', function() {
    caption.style.backgroundColor = '#2e6d2e';
    caption.style.color = 'white';
    caption.style.fontWeight = 'bold';
  });

  caption.addEventListener('mouseleave', function() {
    caption.style.backgroundColor = '#f2f7f0';
    caption.style.color = '#333';
    caption.style.fontWeight = 'normal';
  });
});
