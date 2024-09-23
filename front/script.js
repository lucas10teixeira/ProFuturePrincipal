let button = document.getElementById("entrar");

button.onclick = async function() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let verificaremail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
        // let verificaremail = /^[^\s@]+@[gmail].+\.[^\s@]+$/;  teste para validar apenas dominios de email.

    if(!email || !senha || !nome) {
        Swal.fire(
            'Preencha todos os campos!',
            '',
            'error'
        );
        return false;
        
    }   else if (!verificaremail.test(email)) {
            Swal.fire(
                'Email inválido!',
                'Por favor, insira um email válido.',
                'error'
            );
            return false;
    }   else if (senha.length < 6) { // Verifica se a senha tem pelo menos 6 caracteres
                Swal.fire(
                    'Senha muito curta!',
                    'A senha deve ter pelo menos 6 caracteres.',
                    'error'
                );
            return false;
    }   else if (nome.length < 4) {
        Swal.fire(
            'Nome muito curto!',
            'O nome deve ter pelo menos 4 caracteres.',
            'error'
                );
                return false;

    }     else {
   
    let data = {nome,email,senha};
    
    const response = await fetch ('http://localhost:3001/api/store/task', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    let content = await response.json();

    console.log(content);
        if(content.sucess) {
         Swal.fire(
            'Cadastrado com sucesso!',
            'Aproveite jogador!',
            'success'
            ).then(() => {
             localStorage.setItem('userId', content.data.insertId);
            window.location.href = "../front/login.html";
            
    });   
       
}   else {
        Swal.fire(
            'Erro',
            'Email já cadastrado!',
            'error'
        );
    }
}
    }



