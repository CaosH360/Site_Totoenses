document.getElementById("btnCadastrar").addEventListener("click", function () {

    const email = document.getElementById("Email").value.trim();
    const senha = document.getElementById("Senha").value.trim();
    const senhaConfirm = document.getElementById("SenhaConfirm").value.trim();
    const nome = document.getElementById("Name").value.trim();
    const nickname = document.getElementById("NameUser").value.trim();
    const idade = document.getElementById("Idade").value.trim();
    const sexo = document.getElementById("sexo").value;
    const especialidade = document.getElementById("Especialidade").value;

    if (!email || !senha || !senhaConfirm || !nome || !nickname || !idade || !sexo || !especialidade) {
        alert("Por favor preencha todos os campos obrigatórios");
        return;
    }

    if (senha !== senhaConfirm) {
        alert("As senhas nao coincidem!")
        return;
    }

    const usuario = { email, senha, nome, nickname, idade, sexo, especialidade };
    localStorage.setItem("dadosUsuario", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso");

    window.location.href = "login.html"
});