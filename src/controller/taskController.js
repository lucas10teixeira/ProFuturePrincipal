const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeTask(request, response) {
    const params = Array(

        request.body.nome,
        request.body.email,
        request.body.senha
    );

    const query = "INSERT INTO task(nome,email,senha) VALUES(?,?,?)";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
                .status(201)
                .json({
                    sucess: true, 
                    message: "Sucesso!",
                    data: results
                })
        } else{
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "ops, deu problema!",
                    data: err
                })
                
        }
    })

}
 
async function loginUser(request, response) {

    const { email, senha } = request.body;

    // define a consulta SQL para ver o email e senha
    const query = "SELECT * FROM task WHERE email = ? AND senha = ?";

    // Executa a consulta no banco de dados
    connection.query(query, [email, senha], (err, results) => {
        // Se houver um erro na consulta
        if (err) {
            response.status(500).json({
                success: false,
                message: "Erro ao fazer login",
                data: err
            });
        // achar resultado da consulta
        } else if (results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Login bem-sucedido",
                data: results[0]
            });
        // Se a consulta nao retorna resultados, o email ou a senha estão incorretos
        } else {
            response.status(400).json({
                success: false,
                message: "Email ou senha incorretos"
            });
        }
    });
}

module.exports = {
    storeTask,
    loginUser
};