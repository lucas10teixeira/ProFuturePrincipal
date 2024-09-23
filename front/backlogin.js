
let button = document.getElementById("logar");

button.onclick = async function() {
    // pega valores dos campos de email e senha
    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;

    // olha se os campos de email e senha estão preenchidos
    if (!email || !senha) {
        // Se n tiver aparece essa msg
        Swal.fire('Preencha todos os campos!', '', 'error');
        return;
    }
    
    // pega os dados de email e senha
    let data = { email, senha };

    // Envia para o servidor com os dados de login
    const response = await fetch ('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // olha a resposta do servidor
    const result = await response.json();

    if (result.success) {
    
        Swal.fire('Login bem-sucedido!', 'Bem-vindo!', 'success')
            .then(() => {
                window.location.href = "../front/index.html"; 
                localStorage.setItem('userId', content.data.insertId);
            });
    } else {

        Swal.fire('Erro', 'Email ou senha incorretos.', 'error');
    }
};
