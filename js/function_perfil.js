document.addEventListener("DOMContentLoaded", () => {
  const btnEditProfile = document.getElementById("btnEditProfile");
  const saveProfileBtn = document.getElementById("saveProfileBtn");

  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario")) || {
    nickname: "Nickname",
    idade: "N/A",
    sexo: "N/A",
    especialidade: "N/A",
    gols: "0",
    victorys: "0",
    partidasJogadas: "0",
    rank: "bronze",
  };

  const preencherPerfil = () => {
    document.querySelector(".nickname").innerText = dadosUsuario.nickname || "Nickname";
    document.querySelector(".idade").innerText = dadosUsuario.idade || "N/A";
    document.querySelector(".sexo").innerText = dadosUsuario.sexo || "N/A";
    document.querySelector(".especialidade").innerText = dadosUsuario.especialidade || "N/A";
    document.querySelector(".gols span").innerText = dadosUsuario.gols || "0";
    document.querySelector(".victorys span").innerText = dadosUsuario.victorys || "0";
    document.querySelector(".partidas-jogadas span").innerText =
      dadosUsuario.partidasJogadas || "0";
    document.querySelector(".rank span").innerText = dadosUsuario.rank || "bronze"; 
  };

  const preencherModal = () => {
    document.getElementById("nickname").value = dadosUsuario.nickname || "";
    document.getElementById("idade").value = dadosUsuario.idade || "";
    document.getElementById("sexo").value = dadosUsuario.sexo || "Masculino";
    document.getElementById("especialidade").value = dadosUsuario.especialidade || "Atacante";
    document.getElementById("gols").value = dadosUsuario.gols || "0";
    document.getElementById("victorys").value = dadosUsuario.victorys || "0";
    document.getElementById("partidas-jogadas").value = dadosUsuario.partidasJogadas || "0";
  };

  btnEditProfile.addEventListener("click", () => {
    preencherModal();
    const modal = new bootstrap.Modal(document.getElementById("editProfileModal"));
    modal.show();
  });

  saveProfileBtn.addEventListener("click", () => {
    dadosUsuario.nickname = document.getElementById("nickname").value;
    dadosUsuario.idade = document.getElementById("idade").value;
    dadosUsuario.sexo = document.getElementById("sexo").value;
    dadosUsuario.especialidade = document.getElementById("especialidade").value;
    dadosUsuario.gols = document.getElementById("gols").value;
    dadosUsuario.victorys = document.getElementById("victorys").value;
    dadosUsuario.partidasJogadas = document.getElementById("partidas-jogadas").value;

    localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));

    preencherPerfil();

    const modal = bootstrap.Modal.getInstance(document.getElementById("editProfileModal"));
    modal.hide();
  });

  preencherPerfil();
});


document.addEventListener("DOMContentLoaded", () => {
  // Seletores de imagens e elementos do DOM
  const perfilImages = document.querySelectorAll("#imageGalleryPerfil .gallery-image");
  const bannerImages = document.querySelectorAll("#imageGalleryBanner .gallery-image");
  const perfilPreview = document.getElementById("imagemSelecionadaPerfil");
  const bannerPreview = document.getElementById("imagemSelecionadaBanner");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  const perfilImgElement = document.querySelector(".perfil-img img");
  const bannerImgElement = document.querySelector(".banner-perfil img");

  // Carregar dados do Local Storage
  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario")) || {};

  // Preenche o perfil e o banner com as imagens salvas
  const preencherPerfil = () => {
    if (dadosUsuario.perfilImg) perfilImgElement.src = dadosUsuario.perfilImg;
    if (dadosUsuario.bannerImg) bannerImgElement.src = dadosUsuario.bannerImg;
  };

  // Atualiza as imagens no Local Storage
  const salvarImagemNoLocalStorage = (key, imgElement) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgElement.src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      dadosUsuario[key] = dataURL;
      localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
    };
  };

  // Função para selecionar imagem e mostrar preview
  const configurarSelecaoDeImagem = (images, previewElement) => {
    images.forEach(img => {
      img.addEventListener("click", () => {
        previewElement.src = img.src; // Define o preview com a imagem clicada
        previewElement.alt = img.alt; // Define o texto alternativo
      });
    });
  };

  // Configura as galerias de imagens
  configurarSelecaoDeImagem(perfilImages, perfilPreview);
  configurarSelecaoDeImagem(bannerImages, bannerPreview);

  // Salva as alterações de perfil e banner ao clicar em "Salvar"
  saveProfileBtn.addEventListener("click", () => {
    if (perfilPreview.src) {
      perfilImgElement.src = perfilPreview.src;
      salvarImagemNoLocalStorage("perfilImg", perfilPreview);
    }
    if (bannerPreview.src) {
      bannerImgElement.src = bannerPreview.src;
      salvarImagemNoLocalStorage("bannerImg", bannerPreview);
    }

    // Fechar modal usando Bootstrap
    const modal = bootstrap.Modal.getInstance(document.getElementById("editProfileModal"));
    modal.hide();
  });

  // Preenche o perfil com as imagens salvas
  preencherPerfil();
});
