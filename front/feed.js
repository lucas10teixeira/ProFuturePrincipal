// O código será executado assim que o conteúdo do DOM estiver completamente carregado.
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário de postagem, o campo de texto e o contêiner do feed.
    const postFeedForm = document.getElementById('postfeed');
    const descricao = document.getElementById('posttexto');
    const feedContainer = document.getElementById('feed');

    // Recupera o ID do usuário armazenado no localStorage.
    const userId = localStorage.getItem('userId');

    // Se o ID do usuário não for encontrado, exibe uma mensagem de erro e para a execução.
    if (!userId) {
        console.error('ID do usuário não encontrado.');
        return;
    }

    // Variável para armazenar o nome do usuário.
    let userName = '';

    // Função assíncrona para buscar o nome do usuário na API.
    async function fetchUserName() {
        try {
            // Faz uma requisição GET para buscar os dados do usuário.
            const response = await fetch(`http://localhost:3001/api/user/${userId}`);
            // Se a resposta não for bem-sucedida, lança um erro.
            if (!response.ok) {
                throw new Error('Erro ao obter dados do usuário');
            }

            // Converte a resposta para JSON.
            const userData = await response.json();
            console.log('Dados do usuário:', userData);

            // Verifica se a resposta foi bem-sucedida e se o nome do usuário está disponível.
            if (userData.success && userData.data && userData.data.nome) {
                userName = userData.data.nome;
                console.log('Nome do usuário:', userName);
            } else {
                // Se o nome do usuário não for encontrado nos dados, exibe uma mensagem de erro.
                console.error('Nome do usuário não encontrado nos dados recebidos:', userData);
            }
        } catch (error) {
            // Se ocorrer um erro durante a busca dos dados, exibe uma mensagem de erro no console.
            console.error('Erro ao buscar dados do usuário:', error);
        }
    }

    // Carrega os posts salvos no localStorage ao inicializar a página.
    loadPosts();

    // Adiciona um evento de envio ao formulário de postagem.
    postFeedForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado de forma tradicional.

        await fetchUserName(); // Garante que o nome do usuário está atualizado.
        console.log('Nome do usuário após fetch dentro do submit:', userName);

        // Obtém o texto do post e remove espaços em branco desnecessários.
        const texto = descricao.value.trim();
        console.log('Texto do post:', texto);

        // Verifica se o texto do post não está vazio.
        if (texto !== '') {
            // Cria um novo objeto de post com o texto e o nome do usuário.
            const newPost = {
                texto: texto,
                nome: userName || 'Usuário Desconhecido',
                userId: userId // Adiciona o ID do usuário ao post
            };
            console.log('Novo post:', newPost);

            addPost(newPost); // Adiciona o novo post à página.
            savePost(newPost); // Salva o novo post no localStorage.
            descricao.value = ''; // Limpa o campo de texto após a postagem.
        }
    });

    // Função para adicionar um post ao feed na página.
    function addPost(post) {
        console.log('Adicionando post:', post); // Log do post que está sendo adicionado.

        if (!post.nome) {
            console.error('Nome do usuário está ausente:', post);
        }

        // Cria um novo elemento div para o post.
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Verifica se o post foi criado pelo usuário logado.
        let deleteButton = '';
        if (userId === post.userId) {
            // Apenas o criador do post pode ver o botão de excluir
            deleteButton = `<button class="delete-post" data-id="${post.id}"><i class="bi bi-trash"></i></button>`;
        }

        // Define o conteúdo HTML do post, incluindo o nome do usuário, o texto do post e o botão de exclusão (se for o autor).
        postElement.innerHTML = `
            <p><strong>${post.nome}</strong></p>
            <p>${post.texto}</p>
            ${deleteButton}
        `;
        
        // Adiciona o novo post ao início do feed.
        feedContainer.prepend(postElement);

        // Se houver um botão de excluir, adiciona o evento de exclusão
        if (deleteButton) {
            const deleteBtn = postElement.querySelector('.delete-post');
            deleteBtn.addEventListener('click', async function() {
                const postId = this.getAttribute('data-id');
                await deletePost(postId);
                postElement.remove();  // Remove o post da interface
            });
        }
    }

    // Função para deletar um post
    async function deletePost(postId) {
        try {
            const response = await fetch(`http://localhost:3001/api/delete/feed/${postId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar o post');
            }
            const result = await response.json();
            console.log('Post deletado:', result);
        } catch (error) {
            console.error('Erro ao deletar post:', error);
        }
    }

    // Função para salvar um post no localStorage.
    function savePost(post) {
        const posts = getPosts(); // Obtém os posts já salvos.
        posts.push(post); // Adiciona o novo post à lista.
        localStorage.setItem('posts', JSON.stringify(posts)); // Salva a lista de posts atualizada no localStorage.
    }

    // Função para obter os posts salvos no localStorage.
    function getPosts() {
        const postsString = localStorage.getItem('posts');
        try {
            // Tenta converter os posts salvos de string JSON para um array.
            return postsString ? JSON.parse(postsString) : [];
        } catch (error) {
            // Se ocorrer um erro durante a conversão, exibe uma mensagem de erro e retorna um array vazio.
            console.error('Erro ao fazer parse dos posts:', error);
            return [];
        }
    }

    // Função para carregar e exibir os posts salvos ao iniciar a página.
    function loadPosts() {
        const posts = getPosts(); // Obtém os posts salvos.
        posts.forEach(post => addPost(post)); // Adiciona cada post ao feed.
    }
});
