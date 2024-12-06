function toggleMenu() {
  const menu = document.getElementById("menuLateral");
  if (menu.style.right === "0px") {
    menu.style.right = "-250px";
  } else {
    menu.style.right = "0px";
  }
}

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

setInterval(() => mudarSlide(1), 3000);

const showTab = (tabId) => {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => tab.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
};

document.querySelectorAll('.gallery-image').forEach(image => {
  image.addEventListener('click', function () {
    const imagemSelecionada = document.getElementById('imagemSelecionada');
    imagemSelecionada.src = this.src; 
    imagemSelecionada.alt = this.alt;

    document.querySelectorAll('.gallery-image').forEach(img => img.style.borderColor = 'transparent');

    this.style.borderColor = '#fcb24a';
  });
});


function salvarEventosNoLocalStorage() {
  const eventos = [];
  document.querySelectorAll(".evento").forEach(evento => {
    const id = evento.getAttribute("data-id");
    const imagem = evento.querySelector("img").src;
    const nome = evento.querySelector(".evento-nome").textContent;
    const horario = evento.querySelector(".evento-horario").textContent.replace("Horário: ", "");
    const local = evento.querySelector(".evento-local").textContent.replace("Local: ", "");
    const descricao = evento.querySelector(".evento-descricao").textContent;

    eventos.push({ id, imagem, nome, horario, local, descricao });
  });
  localStorage.setItem("eventos", JSON.stringify(eventos));
}


function carregarEventosDoLocalStorage() {
  const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  eventos.forEach(evento => {
    criarEventoDOM(evento); 
  });
}


function criarEventoDOM(evento) {
  const newEvent = document.createElement("div");
  newEvent.classList.add("evento", "col", "mx-1", "my-1");
  newEvent.setAttribute("data-id", evento.id);
  newEvent.innerHTML = `
    <img src="${evento.imagem}" alt="${evento.nome}" class="evento-imagem">
    <div class="evento-conteudo">
      <h2 class="evento-nome">${evento.nome}</h2>
      <p class="evento-horario">Horário: ${evento.horario}</p>
      <p class="evento-local">Local: ${evento.local}</p>
      <p class="evento-descricao">${evento.descricao}</p>
      <button class="btn btn-danger btn-sm excluir-evento">Excluir</button>
    </div>
  `;
  document.querySelector("#eventos .row").appendChild(newEvent);
}


document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const eventName = document.getElementById("eventName").value;
  const horario = document.getElementById("horario").value;
  const local = document.getElementById("local").value;
  const descricao = document.getElementById("descricao").value;
  const imagemSelecionadaSrc = document.getElementById("imagemSelecionada").src;

  const novoEvento = {
    id: Date.now().toString(), 
    imagem: imagemSelecionadaSrc,
    nome: eventName,
    horario: horario,
    local: local,
    descricao: descricao,
  };

  criarEventoDOM(novoEvento); 
  salvarEventosNoLocalStorage(); 

  document.getElementById("eventForm").reset();
  document.getElementById("imagemSelecionada").src = "";
  document.getElementById("imagemSelecionada").alt = "Nenhuma imagem selecionada";
  showTab("eventos");
});

document.querySelector("#eventos").addEventListener("click", function (e) {
  if (e.target.classList.contains("excluir-evento")) {
    const eventoParaExcluir = e.target.closest(".evento");
    const id = eventoParaExcluir.getAttribute("data-id");

    eventoParaExcluir.remove();

    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    const eventosAtualizados = eventos.filter(evento => evento.id !== id);
    localStorage.setItem("eventos", JSON.stringify(eventosAtualizados));
  }
});

window.addEventListener("DOMContentLoaded", carregarEventosDoLocalStorage);


