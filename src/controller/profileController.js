const connection = require('../config/db');

async function getUserProfile(request, response) {
    const userId = request.params.id;

    const query = "SELECT id, nome, email, sobre FROM task WHERE id = ?";

    connection.query(query, [userId], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar dados do usuário",
                data: err
            });
        }

        if (results.length > 0) {
            return response.status(200).json({
                success: true,
                data: results[0]
            });
        } else {
            return response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }
    });
}

async function updateUserProfile(request, response) {
    const userId = request.params.id;
    const { nome, sobre } = request.body;

    const query = "UPDATE task SET nome = ?, sobre = ? WHERE id = ?";

    connection.query(query, [nome, sobre, userId], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao atualizar dados do usuário",
                data: err
            });
        }

        return response.status(200).json({
            success: true,
            message: "Perfil atualizado com sucesso",
            data: results
        });
    });
}

module.exports = {
    getUserProfile,
    updateUserProfile,
};
