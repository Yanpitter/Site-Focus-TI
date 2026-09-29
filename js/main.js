(function(){
  // Seleciona o botão de abrir/fechar menu (mobile)
  const menuToggle = document.querySelector('.menu-toggle');
  // Seleciona a navegação principal
  const nav = document.querySelector('.nav');
  // Se existir o botão, adiciona o evento de clique para abrir/fechar o menu
  menuToggle && menuToggle.addEventListener('click', ()=> nav.classList.toggle('open'));
  // Seleciona todos os botões de alternar tema cujo id começa com "theme-toggle"
  const themeBtns = document.querySelectorAll('[id^="theme-toggle"]');
  // Verifica se existe um tema salvo no localStorage
  const saved = localStorage.getItem('theme');
  
  if(saved){
    // Aplica o tema salvo no atributo data-theme do <html>
    document.documentElement.setAttribute('data-theme', saved);
  }

  // Para cada botão de tema, adiciona o evento de clique
  themeBtns.forEach(btn => btn.addEventListener('click', ()=>{  
    // Pega o tema atual (dark ou light)
    const current = document.documentElement.getAttribute('data-theme');
    // Define qual será o próximo tema
    const next = current === 'dark' ? 'light' : 'dark';
    // Aplica o novo tema no <html>
    document.documentElement.setAttribute('data-theme', next);
    // Salva a preferência do usuário no localStorage
    localStorage.setItem('theme', next);
  }));

  // Botão "Voltar ao topo"
  const back = document.getElementById('back-to-top');
  // Quando a página for rolada
  window.addEventListener('scroll', ()=>{
    // Exibe o botão se o scrollY for maior que 300px, senão esconde
    if(window.scrollY > 300) back.style.display = 'block'; else back.style.display = 'none';
  });
  // Se existir o botão, adiciona o evento de clique para rolar suavemente até o topo
  back && back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Seleciona o formulário de contato
  const form = document.getElementById('contact-form');
  if(form){
    // Seleciona a área de feedback (mensagem de erro/sucesso)
    const feedback = document.getElementById('form-feedback');
    // Adiciona evento de submit no formulário
    form.addEventListener('submit', (e)=>{
      // Pega os valores preenchidos e remove espaços extras
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if(!name || !email || !message){
        // Se algum campo estiver vazio
        e.preventDefault(); // Impede o envio
        feedback.style.color = 'crimson';
        feedback.textContent = 'Por favor, preencha todos os campos.';
        return;
      }

      // Regex para validar o formato de e-mail
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
      if(!re.test(email)){
        e.preventDefault(); // Impede o envio
        feedback.style.color = 'crimson';
        feedback.textContent = 'E-mail inválido.';
        return;
      }

      // Se tudo estiver certo, mostra mensagem de envio
      feedback.style.color = 'green';
      feedback.textContent = 'Enviando...';
    });
  }

  // Destacar no menu qual página está ativa
  const links = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    const href = a.getAttribute('href'); // pega o destino do link
    const path = window.location.pathname.split('/').pop(); // pega o arquivo atual (ex: "sobre.html")
    
    // Se for página inicial (sem nada ou index.html), ativa o link "Início"
    if((path === '' || path === 'index.html') && href === 'index.html') 
    a.classList.add('active');

     // Se o link for igual ao arquivo atual, marca como ativo
    if(path === href) a.classList.add('active');
  });
})();