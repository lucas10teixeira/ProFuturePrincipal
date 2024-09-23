// O código será executado assim que o conteúdo do DOM estiver completamente carregado.
document.addEventListener('DOMContentLoaded', () => {
    
    const videoBtns = document.querySelectorAll('.video-btn');
 
    const modal = document.getElementById('video-modal');
 
    const closeModal = document.querySelector('.close');
   
    const videoFrame = document.getElementById('video-frame');

    // Adiciona um evento de clique para cada botão de vídeo.
    videoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
       
            const videoUrl = btn.getAttribute('data-video');
          
            videoFrame.src = videoUrl;
          
            modal.style.display = 'flex';
        });
    });

    // Adiciona um evento de clique ao botão de fechar o modal.
    closeModal.addEventListener('click', () => {
        // Oculta o modal definindo o estilo de exibição como 'none'.
        modal.style.display = 'none';
      
        videoFrame.src = '';
    });


    window.addEventListener('click', (event) => {
        // Verifica se o clique foi fora do modal (no fundo).
        if (event.target === modal) {
            // Oculta o modal e limpa o 'src' do iframe.
            modal.style.display = 'none';
            videoFrame.src = '';
        }
    });
});
