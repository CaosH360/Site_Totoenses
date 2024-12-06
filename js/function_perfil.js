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
