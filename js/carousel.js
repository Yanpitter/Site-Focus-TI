// Carrossel simples por JS puro
(function(){ 
  // Seleciona o elemento com a classe "carousel-track" (a faixa onde ficam os slides)
  const track = document.querySelector('.carousel-track');

  if(!track) return; // Se não existir o carrossel, a função termina (previne erro em páginas sem carrossel)
  
  const items = Array.from(track.children); // Converte os filhos do track (os slides) em um array
  
  // Seleciona os botões de navegação "anterior" e "próximo"
  const prev = document.getElementById('prev'); 
  const next = document.getElementById('next');
  
  // Índice que indica qual slide está visível
  let index = 0;

  // Função que exibe um slide específico pelo índice "i"
  function show(i){
    // Pega a largura do primeiro slide (assumindo que todos têm a mesma largura)
    const w = items[0].getBoundingClientRect().width;
    // Move a faixa do carrossel para a esquerda (-i * largura)
    track.style.transform = `translateX(${ -i * w }px)`;
    // Atualiza o índice atual
    index = i;
  }

  // Se existir o botão "prev", adiciona evento de clique para mostrar o slide anterior
  prev && prev.addEventListener('click', ()=> 
  show((index-1+items.length)%items.length));
  
  // Se existir o botão "next", adiciona evento de clique para mostrar o próximo slide
  next && next.addEventListener('click', ()=> show((index+1)%items.length));

  // Auto-play: muda automaticamente para o próximo slide a cada 5 segundos
  setInterval(()=> show((index+1)%items.length), 5000);
})();