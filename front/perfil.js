
document.addEventListener('DOMContentLoaded', async () => {
  
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error('ID do usuário não encontrado.');
        return;
    }

    // Função para buscar os dados do usuário na API.
    async function fetchUserData() {
        try {
            // GET para buscar os dados do usuário.
            const response = await fetch(`http://localhost:3001/api/user/${userId}`)

            if (!response.ok) {
                throw new Error('Erro ao obter dados do usuário');
            }

            // transforma em JSON.
            const userData = await response.json();

         
            console.log(userData);

            if (userData.success && userData.data) {
                // Se o campo "nome" estiver presente, insere o valor no campo HTML correspondente.
                if (userData.data.nome) {
                    document.getElementById('nome').value = userData.data.nome;
                } else {
                    // Se o nome não for encontrado nos dados, exibe uma mensagem de erro.
                    console.error('Nome do usuário não encontrado nos dados recebidos:', userData);
                }

                // Se o campo "sobre" estiver presente, insere o valor no campo HTML correspondente.
                if (userData.data.sobre) {
                    document.getElementById('sobre').value = userData.data.sobre;
                } else {
                    // Se a descrição "sobre" não for encontrada, aparece uma mensagem de erro.
                    console.error('Descrição sobre o usuário não encontrada nos dados recebidos:', userData);
                }
            }
        } catch (error) {
            // Se ocorrer um erro durante a busca dos dados, exibe uma mensagem de erro no console.
            console.error('Erro ao buscar dados do usuário:', error);
        }
    }

    // Função para atualizar os dados do usuário na API.
    async function updateUserData() {
        // pega os valores dos campos HTML "nome" e "sobre".
        let nome = document.getElementById("nome").value;
        let sobre = document.getElementById("sobre").value;

       
        if (!nome.trim()) {
            Swal.fire('Erro', 'Por favor, preencha o nome antes de salvar!', 'error');
            return;
        }

        
        let data = { nome, sobre };
        try {
            // PUT para atualizar os dados do perfil do usuário.
            const response = await fetch(`http://localhost:3001/api/updateUserProfile/${userId}`, {
                method: "PUT",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data) // Converte o objeto "data" para uma string JSON.
            });

            // Se a resposta não for bem-sucedida, lança um erro.
            if (!response.ok) {
                throw new Error('Erro ao atualizar perfil');
            }
            // Converte a resposta para JSON.
            const content = await response.json();

            // Se a atualização for bem-sucedida, exibe uma mensagem de sucesso.
            if (content.success) {
                Swal.fire('Perfil atualizado com sucesso!', '', 'success');
            } else {
                // Se a atualização falhar, exibe uma mensagem de erro.
                Swal.fire('Erro', 'Não foi possível atualizar o perfil!', 'error');
            }
        } catch (error) {
            // Se ocorrer um erro durante a atualização do perfil, exibe uma mensagem de erro no console.
            console.error('Erro ao atualizar perfil:', error);
        }
    }

    // Obtém o botão "Salvar" e associa a função de atualização ao evento de clique.
    let button = document.getElementById("saveButton");
    button.onclick = updateUserData;

    // Chama a função para buscar os dados do usuário ao carregar a página.
    await fetchUserData();
});
