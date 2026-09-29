(function(){
  // ==========================================
  // 1. MENU MOBILE (ABRIR / FECHAR)
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ==========================================
  // 2. ALTERNADOR DE TEMA (DARK / LIGHT MODE)
  // ==========================================
  const themeBtns = document.querySelectorAll('[id^="theme-toggle"]');
  const savedTheme = localStorage.getItem('theme');
  
  // Aplica o tema salvo caso exista
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // Evento de clique para alternar o tema
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {  
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  });

  // ==========================================
  // 3. BOTÃO "VOLTAR AO TOPO"
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 4. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO
  // ==========================================
  const form = document.getElementById('contact-form');
  if (form) {
    const feedback = document.getElementById('form-feedback');
    
    form.addEventListener('submit', (e) => {
      // IMPEDE O RECARREGAMENTO E EVITA O ERRO HTTP 405 NO LIVE SERVER / GITHUB PAGES
      e.preventDefault();

      // Pega os valores e remove espaços extras
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Validação de campos vazios
      if (!name || !email || !message) {
        feedback.style.color = 'crimson';
        feedback.textContent = 'Por favor, preencha todos os campos.';
        return;
      }

      // Regex para validar o formato de e-mail
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
      if (!emailRegex.test(email)) {
        feedback.style.color = 'crimson';
        feedback.textContent = 'Por favor, insira um e-mail válido.';
        return;
      }

      // Sucesso na validação
      feedback.style.color = 'green';
      feedback.textContent = 'Mensagem enviada com sucesso!';
      
      // Limpa os campos do formulário após o envio
      form.reset();
    });
  }

  // ==========================================
  // 5. DESTAQUE DA PÁGINA ATIVA NO MENU
  // ==========================================
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop();

  links.forEach(a => {
    const href = a.getAttribute('href');
    
    // Ativa o link se for a página inicial ou se coincidir com o caminho atual
    if ((currentPath === '' || currentPath === 'index.html') && href === 'index.html') {
      a.classList.add('active');
    } else if (currentPath === href) {
      a.classList.add('active');
    }
  });
})();

// ==========================================
// 6. CARROSSEL DE IMAGENS / BANNER ROTATIVO
// ==========================================
(function(){ 
  const track = document.querySelector('.carousel-track');
  if (!track) return; // Encerra se a página não tiver carrossel
  
  const items = Array.from(track.children);
  const prevBtn = document.getElementById('prev'); 
  const nextBtn = document.getElementById('next');
  let currentIndex = 0;

  function showSlide(index) {
    if (items.length === 0) return;
    const width = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(${ -index * width }px)`;
    currentIndex = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide((currentIndex - 1 + items.length) % items.length);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide((currentIndex + 1) % items.length);
    });
  }

  // Rotação automática a cada 5 segundos
  setInterval(() => {
    showSlide((currentIndex + 1) % items.length);
  }, 5000);
})();