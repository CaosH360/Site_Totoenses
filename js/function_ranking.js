const jogadoresFakes = [
    { nickname: "Jogador1", victorys: 20, gols: 25, rank: "Bronze" },
    { nickname: "Jogador2", victorys: 15, gols: 36, rank: "Prata" },
    { nickname: "Darkness", victorys: 20, gols: 15, rank: "Bronze" },
    { nickname: "kaiser", victorys: 60, gols: 40, rank: "Ouro" },
    { nickname: "Jogador5", victorys: 27, gols: 17, rank: "Bronze" },
    { nickname: "Estrela", victorys: 40, gols: 30, rank: "Prata" },
    { nickname: "Rei do Toto", victorys: 500, gols: 450, rank: "Lenda" },
  ];
  
  const getUserData = () => {
    const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario")) || {};
    return dadosUsuario;
  };
  
  const atualizarRanking = () => {
    const rankingBody = document.getElementById("rankingBodyVporG");
  
    // Recuperar os dados do usuário
    const dadosUsuario = getUserData();
  
    // Combinar jogadores fictícios com o jogador real
    const jogadores = [...jogadoresFakes];
  
    if (dadosUsuario.nickname && dadosUsuario.victorys && dadosUsuario.gols) {
      jogadores.push({
        nickname: dadosUsuario.nickname,
        victorys: parseInt(dadosUsuario.victorys),
        gols: parseInt(dadosUsuario.gols),
        rank: dadosUsuario.rank || "Bronze",
      });
    }
  
    // Calcular o ratio (Vitória por Gol) e ordenar os jogadores
    jogadores.forEach((jogador) => {
      jogador.ratio = ((jogador.victorys * 0.7) / (jogador.gols * 0.5)).toFixed(2);
    });
  
    jogadores.sort((a, b) => b.ratio - a.ratio);
  
    // Limpar a tabela
    rankingBody.innerHTML = "";
  
    // Adicionar os jogadores ao ranking
    jogadores.forEach((jogador, index) => {
      const isUser = jogador.nickname === dadosUsuario.nickname; // Verifica se é o jogador do localStorage
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
    dadosUsuario.nickname = userName;
    dadosUsuario.victorys = parseInt(userVictories);
    dadosUsuario.gols = parseInt(userGoals);
  
    if (dadosUsuario.victorys > 50) {
      dadosUsuario.rank = "Lenda";
    } else if (dadosUsuario.victorys > 30) {
      dadosUsuario.rank = "Ouro";
    } else if (dadosUsuario.victorys > 20) {
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
  