function toggleMenu() {
    const menu = document.getElementById("menuLateral");
    if (menu.style.right === "0px") {
      menu.style.right = "-250px";
    } else {
      menu.style.right = "0px";
    }
  }
  
  // Exibe a seção selecionada
  function exibirConteudo(secao) {
    const secoes = document.querySelectorAll('.secao-conteudo');
    secoes.forEach(secao => secao.classList.remove('ativo'));
    document.getElementById(secao).classList.add('ativo');
  }
  
  // Carrossel de slides
  let slideIndex = 0;
  function mostrarSlide(index) {
    const slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.classList.remove("ativo"));
    slideIndex = (index + slides.length) % slides.length;
    slides[slideIndex].classList.add("ativo");
  }
  
  function mudarSlide(direcao) {
    mostrarSlide(slideIndex + direcao);
  }
  
  // Inicializa o carrossel automaticamente
  setInterval(() => mudarSlide(1), 3000); // Muda a cada 3 segundos
  


