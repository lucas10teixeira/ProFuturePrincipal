const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storefeed(request, response) {
    const params = Array(

        request.body.descricao
   
      
        
    );

    const query = "INSERT INTO feed (descricao) VALUES (?)";

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

module.exports = {
    storefeed
};
