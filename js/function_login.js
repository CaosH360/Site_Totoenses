document.getElementById("btnEntrar").addEventListener("click", function (e) {
    e.preventDefault(); 

    const email = document.getElementById("Email").ariaValueMax.trim();
    const senha = document.getElementById("Senha").ariaValueMax.trim();

    const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsusario"));

    if (!dadosUsuario) {
        alert("Nenhum usuário cadastrado foi encontrado.");
        return;
    }

    if (email === dadosUsuario.email && senha === dadosUsuario.senha) {
        alert("||Login realizado com sucesso!");
        window.location.href = "../pages/home.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
});