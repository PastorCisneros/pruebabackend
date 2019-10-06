const db =  require('../database/db.js');
const bcrypt = require('bcrypt');

const insertUser = (request, response) => {
    const { name,email, password } = request.body;
    bcrypt.hash(request.body.password,10, function(error, hash){
        if(error){
            response.status(400).send(error);
        }
        else{
            db.pool.query('INSERT INTO public.users ("name", email, "password") VALUES($1,$2,$3)', [ name,email,hash], (error, results) => {
                if (error) {
                  response.status(400).send(error);
                }
                else{
                  response.status(201).send(results)
                }
            });
        }
    });

    
    
}
module.exports = {
    insertUser
}