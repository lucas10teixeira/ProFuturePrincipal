
function mostrarSenha() {
    
    let inputsenha = document.getElementById('senhaLogin');
    
    let mostrarSenha = document.getElementById('btn-senha');

    if (inputsenha.type === 'password') {
        inputsenha.setAttribute('type', 'text');
        
        // Altera a classe do botão para indicar que a senha está sendo mostrada
        // Substitui a classe 'bi-eye-fill' por 'bi-eye-slash-fill (icon do bootstrap)'
        mostrarSenha.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
        // Se o tipo do input não for 'password' muda o tipo para 'password' para ocultar a senha
        inputsenha.setAttribute('type', 'password');
        
        // Altera a classe do botão para indicar que a senha está sendo ocultada
        // Substitui a classe 'bi-eye-slash-fill' por 'bi-eye-fill'
        mostrarSenha.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
}