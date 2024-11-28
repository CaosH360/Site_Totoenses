document.addEventListener("DOMContentLoaded", () => {
    const btnEditProfile = document.getElementById("btnEditProfile");
    const saveProfileBtn = document.getElementById("saveProfileBtn");
    const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario")) || {};

    const preencherModal = () => {
      document.getElementById("nickname").value = dadosUsuario.nickname || "";
      document.getElementById("idade").value = dadosUsuario.idade || "";
      document.getElementById("sexo").value = dadosUsuario.sexo || "Masculino";
      document.getElementById("especialidade").value = dadosUsuario.especialidade || "Atacante";
    };

    const preencherPerfil = () => {
      document.querySelector(".nickname").innerText = dadosUsuario.nickname || "Nickname";
      document.querySelector(".idade").innerText = dadosUsuario.idade || "N/A";
      document.querySelector(".sexo").innerText = dadosUsuario.sexo || "N/A";
      document.querySelector(".especialidade").innerText = dadosUsuario.especialidade || "N/A";
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

      localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
      preencherPerfil();

      const modal = bootstrap.Modal.getInstance(document.getElementById("editProfileModal"));
      modal.hide();
    });

    preencherPerfil();
  });