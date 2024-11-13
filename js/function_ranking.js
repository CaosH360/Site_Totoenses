// Dados fictícios dos jogadores para cada seção
const jogadoresVporG = [
    { nome: 'Jogador 1', vitórias: 94, gols: 76 },
    { nome: 'Jogador 2', vitórias: 81, gols: 71 },
    { nome: 'Jogador 3', vitórias: 77, gols: 43 },
    { nome: 'Jogador 4', vitórias: 65, gols: 80 },
];

// Função para calcular Vitorias por Gol
function calcularVporG(vitorias, gols) {
    return gols > 0 ? ((vitorias * 0.7) + (gols * 0.5)).toFixed(2) : 0; 
}

// Função para atualizar o ranking de uma aba específica
function atualizarRanking(jogadores, rankingBodyId) {
    jogadores.sort((a, b) => calcularVporG(b.vitórias, b.gols) - calcularVporG(a.vitórias, a.gols));

    const rankingBody = document.getElementById(rankingBodyId);
    rankingBody.innerHTML = ''; 
    

    // Garantir que os jogadores fiquem com a posição correta
    jogadores.forEach((jogador, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${jogador.nome}</td>
            <td>${calcularVporG(jogador.vitórias, jogador.gols)}</td>
        `;
        rankingBody.appendChild(row);
    });
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');

    // Atualiza o ranking da aba ativa
    if (tabId === 'VporG') {
        atualizarRanking(jogadoresVporG, 'rankingBodyVporG');
    } else if (tabId === 'userInfoSection') {
    }
}

// Inicializador do ranking na aba VporG
atualizarRanking(jogadoresVporG, 'rankingBodyVporG');

// Variável global para armazenar o jogador atual
let usuarioAtual = null;

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nomeUsuario = document.getElementById('userName').value;
    const vitoriasUsuario = parseInt(document.getElementById('userVictories').value, 10);
    const golsUsuario = parseInt(document.getElementById('userGoals').value, 10);

    // Verifica se o jogador já existe baseado no nome
    const jogadorExistente = jogadoresVporG.find(jogador => jogador.nome === nomeUsuario);

    if (jogadorExistente) {
        // Atualiza as vitórias e gols do jogador existente
        jogadorExistente.vitórias = vitoriasUsuario;
        jogadorExistente.gols = golsUsuario;
        usuarioAtual = jogadorExistente; // Atualiza o usuário atual
    } else {
        // Adiciona um novo jogador se não existir
        const novoJogador = { nome: nomeUsuario, vitórias: vitoriasUsuario, gols: golsUsuario };
        jogadoresVporG.push(novoJogador);
        usuarioAtual = novoJogador; // Define o novo jogador como usuário atual
    }

    // Atualize o ranking após a inserção ou alteração
    atualizarRanking(jogadoresVporG, 'rankingBodyVporG');
});

// Lógica para mostrar as informações do usuário
document.getElementById('showUserInfoButton').addEventListener('click', function() {
    if (usuarioAtual) {
        const userDataText = document.getElementById('userDataText');
        userDataText.textContent = `Nome: ${usuarioAtual.nome}, Vitórias: ${usuarioAtual.vitórias}, Gols: ${usuarioAtual.gols}`;
        document.getElementById('userDataDisplay').style.display = 'block'; // Exibe as informações
    } else {
        alert('Nenhum dado do usuário encontrado. Por favor, salve primeiro.');
    }
});