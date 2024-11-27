document.getElementById("btnCadastrar").addEventListener("click", function () {

    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;
    const senhaConfirm = document.getElementById("SenhaConfirm").value;
    const nome = document.getElementById("Name").value;
    const nickname = document.getElementById("NameUser").value;
    const idade = document.getElementById("Idade").value;
    const sexo = document.getElementById("sexo").value;
    const especialidade = document.getElementById("Especialidade").value;

    let mensagensErro = [];
    if (!email) mensagensErro.push("E-mail");
    if (!senha) mensagensErro.push("Senha");
    if (!senhaConfirm) mensagensErro.push("Confirmação de senha");
    if (!nome) mensagensErro.push("Nome Completo");
    if (!nickname) mensagensErro.push("Nickname");
    if (!idade) mensagensErro.push("Idade");
    if (!sexo) mensagensErro.push("Sexo");
    if (!especialidade) mensagensErro.push("Especialidade de Jogo");

    if (mensagensErro.length > 0) {
        alert(
            "Os seguintes campos são obrigatorios e não foram preenchidos:\n" + 
            mensagensErro.join(", ")
        );
        return;
    }

    if (senha !== senhaConfirm) {
        alert("As senhas nao coincidem!")
        return;
    }

    const usuario = {
        email,
        senha,
        nome,
        nickname,
        idade,
        sexo,
        especialidade,
    };

    localStorage.setItem("dadosUsuario", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso");

    window.location.href = "../pages/login.html"
});