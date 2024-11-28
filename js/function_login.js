document.getElementById("btnEntrar").addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("Email").value.trim();
    const senha = document.getElementById("Senha").value.trim();

    const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

    if (!dadosUsuario) {
        alert("Nenhum usuário cadastrado foi encontrado.");
        return;
    }

    if (email === dadosUsuario.email && senha === dadosUsuario.senha) {
        alert("Login realizado com sucesso! Bem vindo " + dadosUsuario.nome);
        window.location.href = "home.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
});


