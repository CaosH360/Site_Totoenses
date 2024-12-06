const jogadoresFakes = [
  { nickname: "Galego Original", victorys: 20, gols: 25, rank: "Bronze" },
  { nickname: "Galego Ancião", victorys: 15, gols: 36, rank: "Prata" },
  { nickname: "Darkness", victorys: 20, gols: 15, rank: "Bronze" },
  { nickname: "kaiser", victorys: 60, gols: 40, rank: "Ouro" },
  { nickname: "Namibo", victorys: 27, gols: 17, rank: "Bronze" },
  { nickname: "Estrela", victorys: 40, gols: 30, rank: "Prata" },
  { nickname: "Rei do Toto", victorys: 500, gols: 1200, rank: "Lenda" },
  { nickname: "Caos O criador", victorys: 300, gols: 900, rank: "Lenda" },
  { nickname: "TH O melhor jogador de toto", victorys: 300, gols: 900, rank: "Lenda" },
];

const getUserData = () => {
  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario")) || {};
  return dadosUsuario;
};

const atualizarRanking = () => {
  const rankingBody = document.getElementById("rankingBodyVporG");

  const dadosUsuario = getUserData();

  const jogadores = [...jogadoresFakes];

  if (dadosUsuario.nickname && dadosUsuario.victorys && dadosUsuario.gols) {
    jogadores.push({
      nickname: dadosUsuario.nickname.trim(),
      victorys: parseInt(dadosUsuario.victorys),
      gols: parseInt(dadosUsuario.gols),
      rank: dadosUsuario.rank || "Bronze",
    });
  }

  jogadores.forEach((jogador) => {
    jogador.ratio = (((jogador.victorys * 3 + jogador.gols * 2)) / 10).toFixed(2);
  });

  jogadores.sort((a, b) => b.ratio - a.ratio);


  rankingBody.innerHTML = "";

  jogadores.forEach((jogador, index) => {
    const isUser = jogador.nickname.toLowerCase() === dadosUsuario.nickname?.toLowerCase().trim();

    const row = `
      <tr class="${isUser ? "highlight" : ""}">
        <td>${index + 1}</td>
        <td>${jogador.nickname}</td>
        <td>${isNaN(jogador.ratio) ? "N/A" : jogador.ratio}</td>
        <td>${jogador.rank}</td>
      </tr>
    `;
    rankingBody.innerHTML += row;
  });
};


const salvarDadosUsuario = (e) => {
  e.preventDefault();

  const userName = document.getElementById("userName").value.trim();
  const userVictories = document.getElementById("userVictories").value.trim();
  const userGoals = document.getElementById("userGoals").value.trim();

  if (!userName || !userVictories || !userGoals) {
    alert("Preencha todos os campos antes de salvar.");
    return;
  }

  const dadosUsuario = getUserData();
  dadosUsuario.nickname = userName.trim();
  dadosUsuario.victorys = parseInt(userVictories);
  dadosUsuario.gols = parseInt(userGoals);

  if (dadosUsuario.victorys > 200) {
    dadosUsuario.rank = "Lenda";
  } else if (dadosUsuario.victorys > 100) {
    dadosUsuario.rank = "Ouro";
  } else if (dadosUsuario.victorys > 50) {
    dadosUsuario.rank = "Prata";
  } else {
    dadosUsuario.rank = "Bronze";
  }

  localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));

  atualizarRanking();

  alert("Dados do usuário atualizados com sucesso!");
};

const mostrarInfoUsuario = () => {
  const userDataDisplay = document.getElementById("userDataDisplay");
  const userDataText = document.getElementById("userDataText");

  const dadosUsuario = getUserData();

  if (dadosUsuario.nickname && dadosUsuario.victorys && dadosUsuario.gols) {
    userDataText.innerHTML = `
      <strong>Nome:</strong> ${dadosUsuario.nickname}<br>
      <strong>Vitórias:</strong> ${dadosUsuario.victorys}<br>
      <strong>Gols:</strong> ${dadosUsuario.gols}<br>
      <strong>Rank:</strong> ${dadosUsuario.rank || "Bronze"}
    `;
    userDataDisplay.style.display = "block";
  } else {
    alert("Nenhum dado encontrado para exibir.");
    userDataDisplay.style.display = "none";
  }
};

const showTab = (tabId) => {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => tab.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
};

document.addEventListener("DOMContentLoaded", () => {
  atualizarRanking();
  document.getElementById("userForm").addEventListener("submit", salvarDadosUsuario);
  document.getElementById("showUserInfoButton").addEventListener("click", mostrarInfoUsuario);
});
